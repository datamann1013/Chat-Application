package com.datamannen1013.javachattapp.client;

import com.datamannen1013.javachattapp.client.constants.ClientConstants;

import java.io.*;
import java.net.*;
import java.util.function.Consumer;

public class ChatClient {

    // Components for the ChatClient
    private Socket socket;
    private BufferedReader in;
    private PrintWriter out;
    private Consumer<String> onMessageReceived;

    // Constructor for initializing the ChatClient
    public ChatClient(String serverAddress, int serverPort, String userName, Consumer<String> onMessageReceived) {
        this.onMessageReceived = onMessageReceived; // Set the message handler
        try {
            // Create a socket connection to the specified server address and port
            this.socket = new Socket(serverAddress, serverPort);
            // Initialize input and output streams for communication
            this.in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            this.out = new PrintWriter(socket.getOutputStream(), true);
            // Send a join message to the server with the username
            out.println(ClientConstants.JOIN_MESSAGE_PREFIX + userName);
        } catch (IOException e) {
            // Handle any IO exceptions during connection setup
            handleError(e);
        }
    }

    // Method to send a message to the server
    public void sendMessage(String msg) {
        out.println(msg); // Send the message using the PrintWriter
    }

    // Method to start listening for incoming messages from the server
    public void startClient() {
        new Thread(() -> {
            try {
                String line;
                // Continuously read lines from the server
                while ((line = in.readLine()) != null) {
                    // Pass the received message to the callback function
                    onMessageReceived.accept(line);
                }
            } catch (IOException e) {
                // Handle any IO exceptions while reading messages
                handleError(e);
            } finally {
                // Ensure resources are closed when done
                closeResources();
            }
        }).start(); // Start the thread to listen for messages
    }

    // Method to handle errors during communication
    private void handleError(IOException e) {
        // Log the error (could be improved by notifying the user or attempting reconnection)
        e.printStackTrace();
    }

    // Method to close resources used for communication
    private void closeResources() {
        try {
            // Close the input stream if it's not null
            if (in != null) in.close();
            // Close the output stream if it's not null
            if (out != null) out.close();
            // Close the socket if it's not null
            if (socket != null) socket.close();
        } catch (IOException e) {
            // Log any exceptions that occur while closing resources
            e.printStackTrace();
        }
    }
}