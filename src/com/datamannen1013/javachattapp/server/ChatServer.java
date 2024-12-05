package com.datamannen1013.javachattapp.server;

import com.datamannen1013.javachattapp.server.constants.ServerConstants;
import com.datamannen1013.javachattapp.server.databases.DatabaseManager;

import java.io.*;
import java.net.*;
import java.text.SimpleDateFormat;
import java.util.*;

public class ChatServer {
    // Thread-safe set to keep track of all connected clients
    private static final Set<ClientHandler> clients = Collections.synchronizedSet(new HashSet<>());
    private static volatile boolean isRunning = true;
    private static ServerSocket serverSocket;
    static DatabaseManager dbManager;

    public static void main(String[] args) {
        try{
            dbManager = DatabaseManager.getInstance();
            ServerLogger.setupLogger();

            // Only load messages if we're using in-memory caching (disabled until further implementation)
            if (ServerConstants.USE_MESSAGE_CACHE) {
                List<DatabaseManager.Message> messageCache = dbManager.getRecentMessages(ServerConstants.MESSAGE_HISTORY_LIMIT);
                ServerLogger.logInfo("Loaded {} messages into cache" + messageCache.size());
            }
        } catch (Exception e) {
            ServerLogger.logError("Failed to initialize database: " + e.getMessage(), e);
            System.exit(1);
        }

        // Server initialization
        try {
            serverSocket = new ServerSocket(ServerConstants.SERVER_PORT);
            ServerLogger.logInfo("Chat server started on port " + ServerConstants.SERVER_PORT);

            while (isRunning) {
                Socket clientSocket = serverSocket.accept();

                // Create a BufferedReader to read text input from the client socket's input stream
                BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                ServerLogger.logInfo("Client connected: " + clientSocket);

                // Spawn a new thread for each client
                ClientHandler clientThread = new ClientHandler(clientSocket, clients, in.readLine());
                clients.add(clientThread);

                // Send recent messages to new client
                sendRecentMessagesToClient(clientThread);

                new Thread(clientThread).start();
            }
        } catch (IOException e) {
            ServerLogger.logError("Error in server: " + e.getMessage(), e);
        }

        try {
            serverSocket = new ServerSocket(ServerConstants.SERVER_PORT);
            ServerLogger.logInfo("Server started. Waiting for clients...");
            
            // Add shutdown hook
            Runtime.getRuntime().addShutdownHook(new Thread(ChatServer::shutdownServer, "ShutdownHook"));

            // Continuously accept new client connections
            while (isRunning) {
                Socket clientSocket = serverSocket.accept();

                // Create a BufferedReader to read text input from the client socket's input stream
                BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                ServerLogger.logInfo("Client connected: " + clientSocket);

                // Spawn a new thread for each client
                ClientHandler clientThread = new ClientHandler(clientSocket, clients, in.readLine());
                clients.add(clientThread); // Add client to the set
                new Thread(clientThread).start();
            }
        } catch (IOException e) {
            ServerLogger.logError("Error in server: " + e.getMessage(), e);
        }
    }
    
    private static void shutdownServer() {
        isRunning = false;
        ServerLogger.logInfo("Initiating server shutdown...");
        
        // Close all client connections
        synchronized (clients) {
            for (ClientHandler client : clients) {
                try {
                    client.disconnect();
                } catch (Exception e) {
                    ServerLogger.logError("Error disconnecting client: " + e.getMessage(), e);
                }
            }
            clients.clear();
        }

        ServerLogger.logInfo("All clients disconnected. Server shutdown complete.");
        ServerLogger.close();
        
        // Close server socket
        try { if (serverSocket != null) serverSocket.close(); }
        catch (IOException e) { ServerLogger.logError("Error closing server socket: " + e.getMessage(), e); }
    }
    // Method to send recent messages to a new client
    static void sendRecentMessagesToClient(ClientHandler client) {
        ServerLogger.logInfo("Starting to send history to client: " + client.getUserName());
        try {
            List<DatabaseManager.Message> recentMessages = dbManager.getRecentMessages(ServerConstants.MESSAGE_HISTORY_LIMIT);
            ServerLogger.logInfo("Retrieved " + recentMessages.size() + " messages from database");

            // Send a header to indicate history messages
            client.sendMessage("--- Chat History ---");

            // Send messages in chronological order (oldest first)
            Collections.reverse(recentMessages); // Reverse since we got them in DESC order
            for (DatabaseManager.Message msg : recentMessages) {
                String formattedTime = new SimpleDateFormat("HH:mm:ss").format(msg.timestamp());
                client.sendMessage("[" + formattedTime + "] " + msg.sender() + ": " +msg.content());
            }

            client.sendMessage("--- End of History ---");
            ServerLogger.logInfo("Finished sending history to client: " + client.getUserName());

        } catch (Exception e) {
            ServerLogger.logError("Error sending message history to client: " + e.getMessage(), e);
        }
    }
}
