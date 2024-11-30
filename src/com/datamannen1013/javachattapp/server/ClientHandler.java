package com.datamannen1013.javachattapp.server;

import com.datamannen1013.javachattapp.client.constants.ClientConstants;
import com.datamannen1013.javachattapp.server.constants.ServerConstants;
import com.datamannen1013.javachattapp.server.databases.DatabaseManager;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.sql.Timestamp;
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
                broadcastMessage(inputLine);
            }
        } catch (IOException e) {
            System.out.println("An error occurred: " + e.getMessage());
        } finally {
            disconnect();
        }
    }

    private void broadcastMessage(String message) {
        // Save message to database
        try {
            dbManager.saveMessage(userName, message);
        } catch (Exception e) {
            System.err.println("Error saving message to database: " + e.getMessage());
        }

        // Broadcast to all clients
        synchronized (clients) {
            for (ClientHandler aClient : clients) {
                aClient.sendMessage(message);
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
                    broadcastMessage(disconnectMsg);
                    
                    clients.remove(this);
                    String onlineUsersMessage = ServerConstants.ONLINE_USERS_MESSAGE_PREFIX + getOnlineUsers();
                    broadcastMessage(onlineUsersMessage);
                    
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
    
    private boolean isConnectionActive() {
        return clientSocket != null && !clientSocket.isClosed() 
            && in != null && out != null;
    }
}
