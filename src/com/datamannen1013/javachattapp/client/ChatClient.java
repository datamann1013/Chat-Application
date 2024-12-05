package com.datamannen1013.javachattapp.client;

import com.datamannen1013.javachattapp.client.constants.ClientConstants;

import javax.swing.*;
import java.io.*;
import java.net.*;
import java.util.function.Consumer;

public class ChatClient {

    // Components for the ChatClient
    private Socket socket;
    private BufferedReader in;
    private PrintWriter out;
    private final Consumer<String> onMessageReceived;
    private volatile boolean isRunning = false;
    private final Object lock = new Object();

    // Constructor for initializing the ChatClient
    private static final int CONNECTION_TIMEOUT = 5000; // 5 seconds timeout
    private final Consumer<String> errorHandler;

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
    public boolean sendMessage(String msg) {
        MessageSenderWorker worker = new MessageSenderWorker(msg);
        worker.execute();
        try {
            return worker.get();
        } catch (Exception e) {
            handleError(new IOException(ClientConstants.MESSAGE_SEND_ERROR_MESSAGE, e));
            return false;
        }
    }

    private class MessageSenderWorker extends SwingWorker<Boolean, Void> {
        private final String message;

        public MessageSenderWorker(String message) {
            this.message = message;
        }

        @Override
        @SuppressWarnings({"SynchronizeOnNonFinalField"}) // Suppressing warning as socket synchronization is intended behavior
        protected Boolean doInBackground() throws Exception {
            synchronized (socket) {
                if (socket != null && !socket.isClosed() && out != null) {
                    out.println(message);
                    if (out.checkError()) {
                        throw new IOException(ClientConstants.MESSAGE_SEND_ERROR_MESSAGE);
                    }
                    return true;
                }
            }
            return false;
        }

        @Override
        protected void done() {
            try {
                get();
            } catch (Exception e) {
                handleError(new IOException(ClientConstants.MESSAGE_SEND_ERROR_MESSAGE, e));
            }
        }
    }
    public void startClient() {
        isRunning = true;
        Thread listenerThread = new Thread(() -> {
            String line;
            try {
                while (isRunning && (line = in.readLine()) != null) {
                    synchronized (this) {
                        if (!isValidMessage(line)) {
                            SwingUtilities.invokeLater(() -> 
                                errorHandler.accept(ClientConstants.INVALID_SERVER_RESPONSE_MESSAGE));
                            continue;
                        }
                        final String message = line;
                        SwingUtilities.invokeLater(() -> onMessageReceived.accept(message));
                    }
                }
            } catch (IOException e) {
                synchronized (this) {
                    closeResources();
                }
                handleError(e);
            } finally {
                // Ensure resources are closed when done
                closeResources();
            }
        }, "ChatClientListener");
        listenerThread.setDaemon(true);
        listenerThread.start();
    }

    private boolean isValidMessage(String message) {
        return message != null && !message.trim().isEmpty();
        // Add more message validation logic here
    }

    private static final int MAX_RECONNECTION_ATTEMPTS = 5;
    private static final int INITIAL_BACKOFF_MS = 1000;
    
    private void attemptReconnection() {
        int attempts = 0;
        while (attempts < MAX_RECONNECTION_ATTEMPTS && isRunning) {
            try {
                errorHandler.accept(ClientConstants.RECONNECTION_MESSAGE);
                Thread.sleep( INITIAL_BACKOFF_MS * (1L << attempts));
                
                socket = new Socket();
                socket.connect(new InetSocketAddress(ClientConstants.SERVER_ADDRESS, ClientConstants.SERVER_PORT), CONNECTION_TIMEOUT);
                in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                out = new PrintWriter(socket.getOutputStream(), true);
                
                startClient();
                break;
            } catch (Exception e) {
                attempts++;
                if (attempts >= MAX_RECONNECTION_ATTEMPTS) {
                    errorHandler.accept("Maximum reconnection attempts reached. Please restart the application.");
                }
            }
        }
    }
    // Method to handle errors during communication
    private void handleError(IOException e) {
        String errorMessage;
        boolean isConnectionError = false;

        if (e instanceof SocketTimeoutException) {
            errorMessage = ClientConstants.SERVER_TIMEOUT_MESSAGE;
            isConnectionError = true;
        } else if (e instanceof ConnectException) {
            errorMessage = ClientConstants.CONNECTION_ERROR_MESSAGE;
            isConnectionError = true;
        } else if (e instanceof SocketException) {
            errorMessage = ClientConstants.NETWORK_ERROR_MESSAGE;
            isConnectionError = true;
        } else if (e.getMessage().contains("Connection reset")) {
            errorMessage = ClientConstants.DISCONNECT_ERROR_MESSAGE;
            isConnectionError = true;
        } else if (e.getMessage().contains("Write failed")) {
            errorMessage = ClientConstants.MESSAGE_SEND_ERROR_MESSAGE;
        } else {
            errorMessage = "Error: " + e.getMessage();
        }
        e.printStackTrace();
        if (errorHandler != null) errorHandler.accept(errorMessage);        
        if (isConnectionError) attemptReconnection();
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
