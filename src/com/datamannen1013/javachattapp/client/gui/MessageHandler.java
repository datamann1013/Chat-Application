package com.datamannen1013.javachattapp.client.gui;
import com.datamannen1013.javachattapp.client.constants.ClientConstants;

import javax.swing.*;
import javax.swing.text.*;
import java.awt.*;
import javax.swing.SwingWorker;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import java.util.List;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

/**
 * Handles message formatting and display in the chat window
 */
public class MessageHandler extends Component {
    private final JTextPane messageArea;
    private final String currentUserName;
    private final JTextArea onlineUsersTextArea;
    private Style timestampStyle;
    private Style messageStyle;
    private boolean isProcessingHistory = false;
    private final Set<String> processedMessages = new HashSet<>(); // To prevent duplicates

    public MessageHandler(JTextPane messageArea, JTextArea onlineUsersTextArea, String currentUserName) {
        this.messageArea = messageArea;
        this.onlineUsersTextArea = onlineUsersTextArea;
        this.currentUserName = currentUserName;
        initializeStyles();
    }

    private void initializeStyles() {
        // Create styles for timestamp, username, and message
        timestampStyle = messageArea.addStyle("TimestampStyle", null);
        StyleConstants.setBold(timestampStyle, true);
        StyleConstants.setForeground(timestampStyle, ClientConstants.TIMESTAMP_COLOR);

        Style usernameStyle = messageArea.addStyle("UsernameStyle", null);
        StyleConstants.setBold(usernameStyle, true);
        StyleConstants.setForeground(usernameStyle, ClientConstants.USERNAME_COLOR);

        messageStyle = messageArea.addStyle("MessageStyle", null);
        StyleConstants.setForeground(messageStyle, ClientConstants.MESSAGE_COLOR);
    }

    public void handleMessage(String message) throws BadLocationException {
            // Prevent duplicate processing
            if (processedMessages.contains(message)) {
                return;
            }
            processedMessages.add(message);

            // Handle system messages
            if (isSystemMessage(message)) {
                handleSystemMessage(message);
                return;
            }

            // Start/End history markers
            if (message.equals(ClientConstants.CHAT_HISTORY_START)) {
                isProcessingHistory = true;
                displaySystemMessage(message);
                return;
            } else if (message.equals(ClientConstants.CHAT_HISTORY_END)) {
                isProcessingHistory = false;
                displaySystemMessage(message);
                return;
            }

            // Regular messages
            new MessageProcessingWorker(message).execute();
        }

        private void handleSystemMessage(String message) {
            SwingUtilities.invokeLater(() -> {
                try {
                    if (message.startsWith(ClientConstants.ONLINE_USERS_MESSAGE_PREFIX) ||
                            message.startsWith("/onlineusers")) {
                        handleOnlineUsersMessage(message);
                    } else {
                        displaySystemMessage(message);
                    }
                } catch (BadLocationException e) {
                    System.err.println("Error displaying system message: " + e.getMessage());
                }
            });
        }

        private boolean isSystemMessage(String message) {
            return message.startsWith(ClientConstants.ONLINE_USERS_MESSAGE_PREFIX) ||
                    message.startsWith(ClientConstants.WELCOME_PREFIX) ||
                    message.startsWith("/onlineusers");  // Add this specific check
        }

    private void displaySystemMessage(String message) throws BadLocationException {
        // Display system messages in a different style
        // For example, in italic or different color
        updateMessageArea("[System] " + message + "\n");
    }

    private void updateMessageArea(String formattedMessage) throws BadLocationException {
        // Don't try to split the message if it's a system message
        if (formattedMessage.startsWith("[System]")) {
            StyledDocument doc = messageArea.getStyledDocument();
            Style systemStyle = messageArea.addStyle("System Style", null);
            StyleConstants.setForeground(systemStyle, ClientConstants.SYSTEM_MESSAGE_COLOR);
            StyleConstants.setItalic(systemStyle, true);
            doc.insertString(doc.getLength(), formattedMessage + "\n", systemStyle);
            return;
        }

        // Handle regular messages
        StyledDocument doc = messageArea.getStyledDocument();
        String[] parts = formattedMessage.split(":", 2); // Split only on first colon
        if (parts.length == 2) {
            doc.insertString(doc.getLength(), parts[0] + ": ", timestampStyle);
            doc.insertString(doc.getLength(), parts[1] + "\n", messageStyle);
        } else {
            // If no colon found, just display the whole message
            doc.insertString(doc.getLength(), formattedMessage + "\n", messageStyle);
        }
    }

    private class MessageProcessingWorker extends SwingWorker<Void, String> {
        private final String message;

        public MessageProcessingWorker(String message) {
            this.message = message;
        }

        @Override
        protected Void doInBackground() throws Exception {
            try {
                processMessage(message);
            } catch (Exception e) {
                System.err.println("Error processing message: " + e.getMessage());
            }
            return null;
        }

        @Override
        protected void process(List<String> chunks) {
            System.out.println("process - Chunks size: " + chunks.size());
            for (String chunk : chunks) {
                try {
                    updateMessageArea(chunk);
                    System.out.println("Message processed and updated: " + chunk);
                } catch (BadLocationException e) {
                    handleMessageError("Error updating message area", e);
                }
            }
        }

        @Override
        protected void done() {
            try {
                get(); // Check for exceptions
                System.out.println("Message processing completed successfully");
            } catch (InterruptedException | ExecutionException e) {
                handleMessageError("Error processing message", e);
            }
        }

        private void processMessage(String message) throws BadLocationException {
            // Skip if it's a system message (double-check)
            if (isSystemMessage(message)) {
                return;
            }

            try {
                // Use regex pattern matching for more robust message parsing
                Pattern pattern = Pattern.compile(ClientConstants.REGEX);
                Matcher matcher = pattern.matcher(message);
                if (matcher.matches()) {
                    String timestamp = matcher.group(1);
                    String username = matcher.group(2);
                    String userMessage = matcher.group(3);

                    System.out.println("REGEX pattern being used: " + ClientConstants.REGEX);
                    System.out.println("Regex matched - Timestamp: " + timestamp +
                            ", Username: " + username +
                            ", Message: " + userMessage);


                    // Format and display the message
                    StyledDocument doc = messageArea.getStyledDocument();

                    // Timestamp style
                    Style timeStyle = messageArea.addStyle("Time Style", null);
                    StyleConstants.setForeground(timeStyle, ClientConstants.TIMESTAMP_COLOR);
                    doc.insertString(doc.getLength(), "[" + timestamp + "] ", timeStyle);

                    // Username style
                    Style nameStyle = messageArea.addStyle("Name Style", null);
                    StyleConstants.setForeground(nameStyle, ClientConstants.USERNAME_COLOR);
                    doc.insertString(doc.getLength(), "[" + username + "] ", nameStyle);

                    // Message style
                    Style msgStyle = messageArea.addStyle("Message Style", null);
                    StyleConstants.setForeground(msgStyle, ClientConstants.MESSAGE_COLOR);
                    doc.insertString(doc.getLength(), userMessage + "\n", msgStyle);

                    // Auto-scroll to bottom
                    messageArea.setCaretPosition(doc.getLength());


                    publish(formatMessage(timestamp, username, userMessage));
                } else {
                    handleMessageError("Invalid message format", null);
                    ErrorHandler.showErrorMessage(MessageHandler.this, message);
                    System.err.println("Message format is incorrect: " + message);
                }
            } catch (BadLocationException e) {
                System.err.println("Error displaying message: " + e.getMessage());
            }
        }

        private void displaySystemMessage(String message) {
            SwingUtilities.invokeLater(() -> {
                try {
                    StyledDocument doc = messageArea.getStyledDocument();
                    Style systemStyle = messageArea.addStyle("System Style", null);
                    StyleConstants.setForeground(systemStyle, ClientConstants.SYSTEM_MESSAGE_COLOR);
                    StyleConstants.setItalic(systemStyle, true);
                    doc.insertString(doc.getLength(), message + "\n", systemStyle);
                    messageArea.setCaretPosition(doc.getLength());
                } catch (BadLocationException e) {
                    System.err.println("Error displaying system message: " + e.getMessage());
                }
            });
        }

        private String formatMessage(String timestamp, String username, String userMessage) {
            return String.format("[%s] %s: %s\n", timestamp, username, userMessage);
        }

        private void updateMessageArea(String formattedMessage) throws BadLocationException {
            StyledDocument doc = messageArea.getStyledDocument();
            String[] parts = formattedMessage.split(":");
            doc.insertString(doc.getLength(), parts[0] + ":", timestampStyle);
            doc.insertString(doc.getLength(), parts[1], messageStyle);
        }
    }

    private void handleMessageError(String errorMessage, Exception e) {
        System.err.println(errorMessage + (e != null ? ": " + e.getMessage() : ""));
        SwingUtilities.invokeLater(() -> {
            ErrorHandler.showError((JFrame) SwingUtilities.getWindowAncestor(messageArea), 
                errorMessage + (e != null ? ": " + e.getMessage() : ""));
        });

        // Extract the online users from the message
        String onlineUsers = errorMessage.substring(ClientConstants.ONLINE_USERS_MESSAGE_PREFIX.length());

        // Split the list of users into an array
        String[] users = onlineUsers.split(",");

        // Clear the current list of online users
        onlineUsersTextArea.setText("");

        // Add each user to the online users text area
        for (String user : users) {
            if (!user.isEmpty() && !user.equals("null")) {
                if (!user.equals(currentUserName)) onlineUsersTextArea.append(user + "\n");
            }
        }
    }
    private void handleOnlineUsersMessage(String message) throws BadLocationException {
        // Extract and display online users
        String users = message.replace(ClientConstants.ONLINE_USERS_MESSAGE_PREFIX, "")
                .replace("/onlineusers ", "");
        StyledDocument doc = messageArea.getStyledDocument();
        Style systemStyle = messageArea.addStyle("System Style", null);
        StyleConstants.setForeground(systemStyle, ClientConstants.SYSTEM_MESSAGE_COLOR);
        doc.insertString(doc.getLength(), "Online users: " + users + "\n", systemStyle);
        messageArea.setCaretPosition(doc.getLength());
    }
}