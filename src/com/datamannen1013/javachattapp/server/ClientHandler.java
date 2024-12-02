package com.datamannen1013.javachattapp.server;

import com.datamannen1013.javachattapp.client.constants.ClientConstants;
import com.datamannen1013.javachattapp.server.constants.ServerConstants;
import com.datamannen1013.javachattapp.server.databases.DatabaseManager;

import javax.swing.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.sql.Timestamp;
import java.util.List;
import java.util.Set;


public class ClientHandler implements Runnable {
    private final String userName;
    private final Socket clientSocket;
    private final Set<ClientHandler> clients;
    private final PrintWriter out;
    private final BufferedReader in;
    private final DatabaseManager dbManager;

    public ClientHandler(Socket socket, Set<ClientHandler> clients, String message) throws IOException {
        try {
            this.clientSocket = socket;
            this.clients = clients;
            String proposedUsername = message.replace(ServerConstants.JOIN_MESSAGE_PREFIX, "");
            this.userName = proposedUsername;
            this.dbManager = DatabaseManager.getInstance();
            
            // Validate username
            java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(ClientConstants.USERNAME_PATTERN);
            if (!pattern.matcher(proposedUsername).matches()) {
                throw new IllegalArgumentException("Invalid username format");
            }

            // Initialize streams
            this.out = new PrintWriter(clientSocket.getOutputStream(), true);
            this.in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

                synchronized (clients) {
                    clients.add(this);
                    // Send current online users
                    String onlineUsersMessage = ServerConstants.ONLINE_USERS_MESSAGE_PREFIX + getOnlineUsers();
                    System.out.println(onlineUsersMessage);
                    broadcastMessage(onlineUsersMessage);
                }
                // Send recent messages to new client
                ChatServer.sendRecentMessagesToClient(this);
                // Send welcome message
                sendMessage("Welcome " + userName + "!");

                // Notify others about new user
                broadcastMessage(userName + " is now online.");

                // Update online users list
                String onlineUsersMessage = ServerConstants.ONLINE_USERS_MESSAGE_PREFIX + getOnlineUsers();
                broadcastMessage(onlineUsersMessage);


        } catch (IllegalArgumentException e) {
            throw new IOException("Invalid username format: " + e.getMessage());
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
        if (!onlineUsers.isEmpty()) {
            onlineUsers.setLength(onlineUsers.length() - 1);
        }
        return onlineUsers.toString();
    }

    private String getUserName() {
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
            System.out.println("An error occurred: " + e.getMessage());
        } finally {
            disconnect();
        }
    }

    private boolean isSystemMessage(String message) {
        return message.startsWith(ServerConstants.ONLINE_USERS_MESSAGE_PREFIX) ||
                message.equals(ServerConstants.CHAT_HISTORY_START) ||
                message.equals(ServerConstants.CHAT_HISTORY_END) ||
                message.startsWith(ServerConstants.WELCOME_PREFIX) ||
                message.startsWith(ServerConstants.CLIENT_DISCONNECT_PREFIX);
    }


    private final java.util.concurrent.LinkedBlockingQueue<String> messageQueue = new java.util.concurrent.LinkedBlockingQueue<>();
    private static final int BATCH_SIZE = 10;
    private static final Object DB_LOCK = new Object();

    private void broadcastMessage(String message) {
        // Only queue non-system messages
        if (!isSystemMessage(message)) {
            messageQueue.offer(message);
            System.out.println("Message queued: " + message);
            System.out.println("Queue size: " + messageQueue.size());
            new BroadcastWorker().execute();
        } else {
            // For system messages, just broadcast without queueing
            synchronized (clients) {
                for (ClientHandler client : clients) {
                    client.sendMessage(message);
                }
            }
            dbManager.saveMessage(userName, message);
        }
    }

    private class BroadcastWorker extends SwingWorker<Void, String> {
        @Override
        protected Void doInBackground() throws Exception {
            System.out.println("BroadcastWorker started");
            processPendingMessages();
            System.out.println("BroadcastWorker finished");
            return null;
        }

        @Override
        protected void done() {
            try {
                get();
                System.out.println("BroadcastWorker done successfully");
            } catch (Exception e) {
                System.err.println("Error processing messages: " + e.getMessage());
            }
        }

        @Override
        protected void process(List<String> chunks) {
            // Handle intermediate results here
            // This method runs on EDT (Event Dispatch Thread)
            for (String message : chunks) {
                // Update UI or handle intermediate messages
            }
        }
    }


    private void processPendingMessages() {
        java.util.List<String> messageBatch = new java.util.ArrayList<>();
        int count = 0;

        System.out.println("Starting processPendingMessages");
        System.out.println("Current queue size: " + messageQueue.size());

        while (count < BATCH_SIZE && messageQueue.peek() != null) {
            String msg = messageQueue.poll();
            if (msg != null) {
                System.out.println("Added to batch: " + msg);
                messageBatch.add(msg);
                count++;
            }
        }

        System.out.println("Batch size: " + messageBatch.size());

        synchronized (DB_LOCK) {
            for (String msg : messageBatch) {
                System.out.println("Broadcasting message: " + msg);
                broadcastMessage(msg);
            }
        }
    }

    void sendMessage(String message) {
        try {
            out.println(message);
        } catch (Exception e) {
            System.out.println("Error sending message: " + e.getMessage());
        }
    }

    void disconnect() {
        final int TIMEOUT_MS = 1000;
        
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
                    
                    // Wait for messages to be sent
                    Thread.sleep(Math.min(100, TIMEOUT_MS));
                }
            }
            
            // Close resources
            in.close();
            out.close();
            clientSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
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
