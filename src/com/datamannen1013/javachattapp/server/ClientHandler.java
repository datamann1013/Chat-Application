package com.datamannen1013.javachattapp.server;

import com.datamannen1013.javachattapp.client.constants.ClientConstants;
import com.datamannen1013.javachattapp.client.MessageHandler;
import com.datamannen1013.javachattapp.server.constants.ServerConstants;
import com.datamannen1013.javachattapp.server.database.DatabaseManager;
import com.datamannen1013.javachattapp.server.database.repository.MessageRepository;
import com.datamannen1013.javachattapp.server.logger.ServerLogger;

import javax.swing.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.regex.Pattern;


public class ClientHandler implements Runnable {
    // Constants
    private static final Object DB_LOCK = new Object();

    // Instance fields - core components
    private final Socket clientSocket;
    private final String userName;
    private final Set<ClientHandler> clients;
    private final BufferedReader in;
    private final PrintWriter out;

    // Message handling components
    private final LinkedBlockingQueue<String> messageQueue;
    private final AtomicBoolean isProcessingBroadcast;

    public ClientHandler(Socket socket, Set<ClientHandler> clients, String message) throws IOException {
        this.messageQueue = new LinkedBlockingQueue<>();
        this.isProcessingBroadcast = new AtomicBoolean(false);

        try {
            this.clientSocket = socket;
            this.clients = clients;
            this.userName = validateUsername(message);

            // Initialize streams
            this.out = new PrintWriter(socket.getOutputStream(), true);
            this.in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            initializeClientConnection();
        } catch (IllegalArgumentException e) {
            throw new IOException("Invalid username format: " + e.getMessage(), e);
        }
    }

    @Override
    public void run() {
        try {
            processClientMessages();
        } catch (IOException e) {
            ServerLogger.logError("An error occurred: " + e.getMessage(), e);
        } finally {
            disconnect();
        }
    }

    // Public methods
    public String getUserName() {
        return this.userName;
    }

    public void sendMessage(String message) {
        try {
            if (!isValidConnection()) {
                return;
            }
            out.println(message);
        } catch (Exception e) {
            ServerLogger.logError("Error sending message: " + e.getMessage(), e);
        }
    }

    public void disconnect() {
        try {
            synchronized (clients) {
                if (isConnectionActive()) {
                    handleDisconnection();
                }
            }
            closeResources();
        } catch (IOException e) {
            ServerLogger.logError("Error during disconnect: " + e.getMessage(), e);
        }
    }



    // Private methods - Disconnection of server
    private void handleDisconnection() {
        try {
            // Notify client about server shutdown
            String serverShutdownMsg = ServerConstants.SERVER_SHUTDOWN_MESSAGE;
            sendMessage(serverShutdownMsg);

            // Give client time to receive the message
            try {
                Thread.sleep(100); // Brief delay to ensure message delivery
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                ServerLogger.logWarning("Shutdown notification interrupted for client: " + userName);
            }

            // Clear any pending messages
            messageQueue.clear();

            // Remove client from active clients list
            synchronized (clients) {
                clients.remove(this);
            }

            // Ensure final messages are sent
            flushOutput();

            ServerLogger.logInfo("Client " + userName + " disconnected due to server shutdown");
        } catch (Exception e) {
            ServerLogger.logError("Error during server shutdown disconnect for " + userName + ": " + e.getMessage(), e);
        }
    }

    private void flushOutput() {
        try {
            if (out != null && !out.checkError()) {
                out.flush();
            }
        } catch (Exception e) {
            ServerLogger.logError("Error flushing final messages to " + userName + ": " + e.getMessage(), e);
        }
    }

    // Private methods - Connection management
    private String validateUsername(String message) {
        String proposedUsername = message.replace(ServerConstants.JOIN_MESSAGE_PREFIX, "");
        Pattern pattern = Pattern.compile(ClientConstants.USERNAME_PATTERN);
        if (!pattern.matcher(proposedUsername).matches()) {
            throw new IllegalArgumentException("Invalid username format");
        }
        return proposedUsername;
    }

    private void initializeClientConnection() {
        synchronized (clients) {
            clients.add(this);
            sendInitialMessages();
        }
    }

    private void sendInitialMessages() {
        String onlineUsersMessage = ServerConstants.ONLINE_USERS_MESSAGE_PREFIX + getOnlineUsers();
        ServerLogger.logInfo("Sending online users to new client: " + onlineUsersMessage);
        broadcastMessage(onlineUsersMessage);

        ChatServer.sendRecentMessagesToClient(this);
        sendMessage("Welcome " + userName + "!");
        broadcastMessage(userName + " is now online.");
    }

    // Private methods - Message handling
    private void processClientMessages() throws IOException {
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            if (inputLine.endsWith(ServerConstants.LEAVE_MESSAGE_SUFFIX)) {
                break;
            }
            broadcastMessage(inputLine);
        }
    }

    private void broadcastMessage(String message) {
        if (isDuplicateMessage(message)) {
            return;
        }

        if (MessageHandler.isSystemMessage(message)) {
            broadcastSystemMessage(message);
        } else {
            queueRegularMessage(message);
        }
    }

    private void broadcastSystemMessage(String message) {
        synchronized (clients) {
            for (ClientHandler client : clients) {
                client.sendMessage(message);
            }
        }
    }

    private void queueRegularMessage(String message) {
        if (messageQueue.offer(message)) {
            ServerLogger.logInfo("Message queued: " + message);
            MessageRepository.saveMessage(userName, DatabaseManager.extractMessageContent(message));

            if (isProcessingBroadcast.compareAndSet(false, true)) {
                new BroadcastWorker().execute();
            }
        }
    }

    // Private methods - Utility
    private boolean isConnectionActive() {
        return clientSocket != null && !clientSocket.isClosed()
                && in != null && out != null;
    }

    private boolean isValidConnection() {
        if (clientSocket.isClosed()) {
            ServerLogger.logWarning("Socket is closed, cannot send message");
            return false;
        }
        if (out.checkError()) {
            ServerLogger.logWarning("PrintWriter is in error state");
            return false;
        }
        return true;
    }

    private void closeResources() throws IOException {
        in.close();
        out.close();
        clientSocket.close();
    }

    private String getOnlineUsers() {
        StringBuilder onlineUsers = new StringBuilder();
        synchronized (clients) {
            for (ClientHandler client : clients) {
                onlineUsers.append(client.getUserName()).append(",");
            }
        }
        return !onlineUsers.isEmpty() ?
                onlineUsers.substring(0, onlineUsers.length() - 1) : "";
    }

    // Private methods - Duplicate message handling
    private boolean isDuplicateMessage(String message) {
        // Check for duplicate online broadcast messages
        if (message.endsWith("is now online.") && isProcessingBroadcast.get()) {
            ServerLogger.logWarning("Skipping duplicate online broadcast: " + message);
            return true;
        }

        // Check for duplicate messages in queue
        if (!MessageHandler.isSystemMessage(message)) {
            for (String queuedMessage : messageQueue) {
                if (isSimilarMessage(message, queuedMessage)) {
                    ServerLogger.logWarning("Duplicate message detected: " + message);
                    return true;
                }
            }
        }

        return false;
    }

    private boolean isSimilarMessage(String message1, String message2) {
        // Get timestamps if they exist
        long timestamp1 = extractTimestamp(message1);
        long timestamp2 = extractTimestamp(message2);

        // If messages are within 2 seconds of each other
        if (Math.abs(timestamp1 - timestamp2) <= 2000) {
            // Remove timestamps and compare content
            String content1 = stripMetadata(message1);
            String content2 = stripMetadata(message2);

            return content1.equals(content2);
        }

        return false;
    }

    private long extractTimestamp(String message) {
        try {
            // Assuming timestamp is at the start of the message in a specific format
            // Adjust this based on your message format
            int timestampEnd = message.indexOf("]");
            if (timestampEnd != -1) {
                String timestamp = message.substring(1, timestampEnd);
                return Long.parseLong(timestamp);
            }
        } catch (Exception e) {
            ServerLogger.logWarning("Could not extract timestamp from message: " + message);
        }
        return System.currentTimeMillis();
    }

    private String stripMetadata(String message) {
        try {
            // Remove timestamp and any other metadata
            // Adjust this based on your message format
            int contentStart = message.indexOf("]") + 1;
            return message.substring(contentStart).trim();
        } catch (Exception e) {
            ServerLogger.logWarning("Could not strip metadata from message: " + message);
            return message;
        }
    }


    // Inner class
    private class BroadcastWorker extends SwingWorker<Void, String> {
        @Override
        protected Void doInBackground() {
            try {
                processPendingMessages();
            } finally {
                isProcessingBroadcast.set(false);
                if (!messageQueue.isEmpty()) {
                    broadcastMessage(messageQueue.peek());
                }
            }
            return null;
        }

        @Override
        protected void done() {
            try {
                get();
                ServerLogger.logInfo("BroadcastWorker completed successfully");
            } catch (InterruptedException e) {
                ServerLogger.logError("Broadcast interrupted", e);
                Thread.currentThread().interrupt();
            } catch (Exception e) {
                ServerLogger.logError("Error processing messages: " + e.getMessage(), e);
            }
        }

        // Private methods - Message processing
        private void processPendingMessages() {
            List<String> messageBatch = collectMessageBatch();
            broadcastMessageBatch(messageBatch);
        }

        private List<String> collectMessageBatch() {
            List<String> messageBatch = new ArrayList<>();
            String message;
            while ((message = messageQueue.poll()) != null) {
                messageBatch.add(message);
                ServerLogger.logInfo("Added to batch: " + message);
            }
            return messageBatch;
        }

        private void broadcastMessageBatch(List<String> messageBatch) {
            synchronized (DB_LOCK) {
                for (String msg : messageBatch) {
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
}

