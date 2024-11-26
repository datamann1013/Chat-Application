package com.datamannen1013.javachattapp.server;

import java.io.*;
import java.net.*;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class ChatServer {
    // Thread-safe set to keep track of all connected clients
    private static final Set<ClientHandler> clients = Collections.synchronizedSet(new HashSet<>());

    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(5000)) {
            System.out.println("Server started. Waiting for clients...");

            // Continuously accept new client connections
            while (true) {
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

    // Broadcast a message to all connected clients
    public static void broadcastMessage(String message) {
        synchronized (clients) { // Synchronize to prevent concurrent modification
            for (ClientHandler client : clients) {
                client.sendMessage(message);
            }
        }
    }
}