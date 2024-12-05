package com.datamannen1013.javachattapp.server;

import com.datamannen1013.javachattapp.client.constants.ClientConstants;
import com.datamannen1013.javachattapp.client.MessageHandler;
import com.datamannen1013.javachattapp.server.constants.ServerConstants;
import com.datamannen1013.javachattapp.server.databases.DatabaseManager;

import javax.swing.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.regex.Pattern;


public class ClientHandler implements Runnable {
    private final String userName;
    private final Socket clientSocket;
    private final Set<ClientHandler> clients;
    private final PrintWriter out;
    private final BufferedReader in;

    @SuppressWarnings("SynchronizationOnLocalVariableOrMethodParameter") // Suppressing warning as clients synchronization is intended behavior
    public ClientHandler(Socket socket, Set<ClientHandler> clients, String message) throws IOException {
        try {
            this.clientSocket = socket;
            this.clients = clients;
            String proposedUsername = message.replace(ServerConstants.JOIN_MESSAGE_PREFIX, "");
            this.userName = proposedUsername;

            // Validate username
            Pattern pattern = Pattern.compile(ClientConstants.USERNAME_PATTERN);
            if (!pattern.matcher(proposedUsername).matches()) {
                throw new IllegalArgumentException("Invalid username format");
            }

            // Initialize streams
            this.out = new PrintWriter(socket.getOutputStream(), true);  // true enables auto-flush
            this.in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

                synchronized (clients) {
                    clients.add(this);

                    // Send current online users
                    String onlineUsersMessage = ServerConstants.ONLINE_USERS_MESSAGE_PREFIX + getOnlineUsers();
                    ServerLogger.logInfo("Sending online users to new client: " + onlineUsersMessage);
                    broadcastMessage(onlineUsersMessage);
                }
                // Send recent messages to new client
                ChatServer.sendRecentMessagesToClient(this);

                // Send welcome message
                sendMessage("Welcome " + userName + "!");

                // Notify others about new user
                broadcastMessage(userName + " is now online.");

        } catch (IllegalArgumentException e) {
            throw new IOException("Invalid username format: " + e.getMessage(), e);
        }
    }

    private String getOnlineUsers() {
        StringBuilder onlineUsers = new StringBuilder();
        synchronized (clients) {
            for (ClientHandler client : clients) {
                onlineUsers.append(client.getUserName()).append(",");
            }
        }
        // Remove trailing comma if exists
        return !onlineUsers.isEmpty() ?
                onlineUsers.substring(0, onlineUsers.length() - 1) : "";
    }

    String getUserName() {
        return this.userName;
    }

    public void run() {
        try {
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                if (inputLine.endsWith(ServerConstants.LEAVE_MESSAGE_SUFFIX)) {
                    // Handle client disconnection
                    disconnect();
                }
                else {
                    broadcastMessage(inputLine);
                }

            }
        } catch (IOException e) {
            ServerLogger.logError("An error occurred: " + e.getMessage(), e);
        } finally {
            disconnect();
        }
    }


    private final java.util.concurrent.LinkedBlockingQueue<String> messageQueue = new java.util.concurrent.LinkedBlockingQueue<>();
    private static final Object DB_LOCK = new Object();
    private final AtomicBoolean isProcessingBroadcast = new AtomicBoolean(false);

    private void broadcastMessage(String message) {
        // Make sure the message is not a duplicate
        if (message.endsWith("is now online.") && isProcessingBroadcast.get()) {
            ServerLogger.logWarning("Skipping duplicate online broadcast: " + message);
            return;
        }
        // Only queue non-system messages
        if (!MessageHandler.isSystemMessage(message)) {
            if (messageQueue.offer(message)) {
                ServerLogger.logInfo("Message added to queue: " + message);
            } else {
                ServerLogger.logWarning("Failed to add message to queue: " + message);
            }
            ServerLogger.logInfo("Queue size: " + messageQueue.size());
            String output = DatabaseManager.extractMessageContent(message);
            DatabaseManager.saveMessage(userName, output);
        } else {
            // For system messages, just broadcast without queueing
            synchronized (clients) {
                for (ClientHandler client : clients) {
                    client.sendMessage(message);
                }
            }

        }
        // Only start a new BroadcastWorker if one isn't already running
        if (isProcessingBroadcast.compareAndSet(false, true)) {
            new BroadcastWorker().execute();
        }
    }

    private class BroadcastWorker extends SwingWorker<Void, String> {
        @Override
        protected Void doInBackground(){
            try {
                ServerLogger.logInfo("BroadcastWorker started");
                processPendingMessages();
            } finally {
                isProcessingBroadcast.set(false);
                // Check if new messages arrived while processing
                if (!messageQueue.isEmpty()) {
                    broadcastMessage(messageQueue.peek()); // Trigger new worker if needed
                }
            }
            return null;
        }

        @Override
        protected void done() {
            try {
                get();
                ServerLogger.logInfo("BroadcastWorker done successfully");
            } catch (InterruptedException e) {
                ServerLogger.logError("Interruption error!", e);
                // Cleanup?
                Thread.currentThread().interrupt();
            } catch (Exception e) {
                ServerLogger.logError("Error processing messages: " + e.getMessage(), e);
            }
        }

        private void processPendingMessages() {
            ServerLogger.logInfo("Starting processPendingMessages");
            java.util.List<String> messageBatch = new ArrayList<>();

            // Collect messages from queue
            String message;
            while ((message = messageQueue.poll()) != null) {
                ServerLogger.logInfo("Added to batch: " + message);
                messageBatch.add(message);
            }

            ServerLogger.logInfo("Batch size: " + messageBatch.size());

            synchronized (DB_LOCK) {
                for (String msg : messageBatch) {
                    ServerLogger.logInfo("Broadcasting message: " + msg);
                    for (ClientHandler client : clients) {
                        try {
                            client.sendMessage(msg);
                        } catch (Exception e) {
                            ServerLogger.logError("Error sending to client: " + e.getMessage(), e);
                        }
                    }
                }
            }
        }
    }

    void sendMessage(String message) {
        try {
            if (clientSocket.isClosed()) {
                ServerLogger.logWarning("Socket is closed, cannot send message");
                return;
            }
            if (out.checkError()) {
                ServerLogger.logWarning("PrintWriter is in error state");
                return;
            }
            out.println(message);
        } catch (Exception e) {
            ServerLogger.logError("Error sending message: " + e.getMessage(), e);
        }
    }

    void disconnect() {
        try {
            synchronized (clients) {
                if (isConnectionActive()) {
                    // Send final messages
                    String disconnectMsg = ServerConstants.CLIENT_DISCONNECT_PREFIX + userName;
                    broadcastSystemMessage(disconnectMsg);
                    
                    clients.remove(this);
                    String onlineUsersMessage = ServerConstants.ONLINE_USERS_MESSAGE_PREFIX + getOnlineUsers();
                    broadcastSystemMessage(onlineUsersMessage);
                    
                    // Flush remaining messages
                    out.flush();
                }
            }

            // Close resources
            in.close();
            out.close();
            clientSocket.close();
        } catch (IOException e) {
            ServerLogger.logError("Error during disconnect: " + e.getMessage(), e);
        }
    }
    private void broadcastSystemMessage(String message) {
        synchronized (clients) {
            for (ClientHandler client : clients) {
                client.sendMessage(message);
            }
        }
    }
    
    private boolean isConnectionActive() {
        return clientSocket != null && !clientSocket.isClosed() 
            && in != null && out != null;
    }
}
