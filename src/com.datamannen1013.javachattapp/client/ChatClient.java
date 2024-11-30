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
    private volatile boolean isRunning = false;
    private final Object lock = new Object();

    // Constructor for initializing the ChatClient
    private static final int CONNECTION_TIMEOUT = 5000; // 5 seconds timeout
    private Consumer<String> errorHandler;

    public ChatClient(String serverAddress, int serverPort, String userName, 
                     Consumer<String> onMessageReceived, Consumer<String> errorHandler) {
        this.onMessageReceived = onMessageReceived; // Set the message handler
        this.errorHandler = errorHandler; // Set the error handler
        try {
            // Create a socket with timeout
            this.socket = new Socket();
            socket.connect(new InetSocketAddress(serverAddress, serverPort), CONNECTION_TIMEOUT);

            this.in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            this.out = new PrintWriter(socket.getOutputStream(), true);
            // Send a join message to the server with the username

            out.println(ClientConstants.JOIN_MESSAGE_PREFIX + userName);
        } catch (SocketTimeoutException e) {
            handleError(new IOException(ClientConstants.SERVER_TIMEOUT_MESSAGE, e));
            // Handle connection failures
            handleError(e);
        } catch (IOException e) {
            // Handle connection failures
            handleError(e);
        }
    }

    // Method to send a message to the server
    public void sendMessage(String msg) {
        out.println(msg); // Send the message using the PrintWriter
    }

    // Method to start listening for incoming messages from the server
    public void startClient() {
        isRunning = true;
        Thread listenerThread = new Thread(() -> {
            try {
                String line;
                // Continuously read lines from the server
                while (isRunning && (line = in.readLine()) != null) {
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
        }, "ChatClientListener");
        listenerThread.setDaemon(true);
        listenerThread.start();
    }

    // Method to handle errors during communication
    private void handleError(IOException e) {
        String errorMessage;
        if (e instanceof SocketTimeoutException) {
            errorMessage = ClientConstants.SERVER_TIMEOUT_MESSAGE;
        } else if (e instanceof ConnectException) {
            errorMessage = ClientConstants.CONNECTION_ERROR_MESSAGE;
        } else if (e instanceof SocketException) {
            errorMessage = ClientConstants.NETWORK_ERROR_MESSAGE;
        } else {
            errorMessage = "Error: " + e.getMessage();
        }

        // Log the error
        e.printStackTrace();
        // Notify through error handler
        if (errorHandler != null) errorHandler.accept(errorMessage);
    }

    // Method to close resources used for communication
    private void closeResources() {
        synchronized (lock) {
            if (!isRunning) return; // Already closed
            isRunning = false;
            
            try {
                // Send disconnect message if possible
                if (out != null && !socket.isClosed()) {
                    out.println("DISCONNECT");
                    out.flush();
                }
                
                // Close resources
                if (in != null) in.close();
                if (out != null) out.close();
                if (socket != null) socket.close();
            } catch (IOException e) {
                System.err.println("Error during resource cleanup: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }
}
