package com.datamannen1013.javachattapp.server;

import com.datamannen1013.javachattapp.server.constants.ServerConstants;

import java.io.*;
import java.net.*;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class ChatServer {
    // Thread-safe set to keep track of all connected clients
    private static final Set<ClientHandler> clients = Collections.synchronizedSet(new HashSet<>());
    private static volatile boolean isRunning = true;
    private static ServerSocket serverSocket;

    public static void main(String[] args) {
        try {
            serverSocket = new ServerSocket(ServerConstants.SERVER_PORT);
            System.out.println("Server started. Waiting for clients...");
            
            // Add shutdown hook
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                shutdownServer();
            }, "ShutdownHook"));

            // Continuously accept new client connections
            while (isRunning) {
                Socket clientSocket = serverSocket.accept();

                // Create a BufferedReader to read text input from the client socket's input stream
                BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                System.out.println("Client connected: " + clientSocket);

                // Spawn a new thread for each client
                ClientHandler clientThread = new ClientHandler(clientSocket, clients, in.readLine());
                clients.add(clientThread); // Add client to the set
                new Thread(clientThread).start();
            }
        } catch (IOException e) {
            System.err.println("Error in server: " + e.getMessage());
        }
    }
    
    private static void shutdownServer() {
        isRunning = false;
        System.out.println("Initiating server shutdown...");
        
        // Close all client connections
        synchronized (clients) {
            for (ClientHandler client : clients) {
                try {
                    client.disconnect();
                } catch (Exception e) {
                    System.err.println("Error disconnecting client: " + e.getMessage());
                }
            }
            clients.clear();
        }
        
        // Close server socket
        try { if (serverSocket != null) serverSocket.close(); }
        catch (IOException e) { System.err.println("Error closing server socket: " + e.getMessage()); }
    }

    // Broadcast a message to all connected clients
    public static void broadcastMessage(String message) {
        synchronized (clients) { // Synchronize to prevent concurrent modification
            for (ClientHandler client : clients) {
                client.sendMessage(message);
            }
        }
    }
}
