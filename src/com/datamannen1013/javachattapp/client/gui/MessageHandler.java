package com.datamannen1013.javachattapp.client.gui;
import com.datamannen1013.javachattapp.client.constants.ClientConstants;

import javax.swing.*;
import javax.swing.text.*;
import java.awt.*;
import javax.swing.SwingWorker;
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
    private Style usernameStyle;
    private Style messageStyle;

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

        usernameStyle = messageArea.addStyle("UsernameStyle", null);
        StyleConstants.setBold(usernameStyle, true);
        StyleConstants.setForeground(usernameStyle, ClientConstants.USERNAME_COLOR);

        messageStyle = messageArea.addStyle("MessageStyle", null);
        StyleConstants.setForeground(messageStyle, ClientConstants.MESSAGE_COLOR);
    }

    public void handleMessage(String message) {
        new MessageProcessingWorker(message).execute();
    }

    private class MessageProcessingWorker extends SwingWorker<Void, String> {
        private final String message;

        public MessageProcessingWorker(String message) {
            this.message = message;
        }

        @Override
        protected Void doInBackground() throws Exception {
            processMessage(message);
            return null;
        }

        @Override
        protected void process(List<String> chunks) {
            for (String chunk : chunks) {
                try {
                    updateMessageArea(chunk);
                } catch (BadLocationException e) {
                    handleMessageError("Error updating message area", e);
                }
            }
        }

        @Override
        protected void done() {
            try {
                get(); // Check for exceptions
            } catch (InterruptedException | ExecutionException e) {
                handleMessageError("Error processing message", e);
            }
        }

        private void processMessage(String message) throws BadLocationException {
            // Skip processing for special messages
            if (message.equals(ClientConstants.CHAT_HISTORY_START) ||
                    message.equals(ClientConstants.CHAT_HISTORY_END) ||
                    message.startsWith(ClientConstants.WELCOME_PREFIX)) {
                // Handle special messages differently
                displaySystemMessage(message);
                return;
            }

            try {
                if (message.startsWith(ClientConstants.ONLINE_USERS_MESSAGE_PREFIX)) {
                    handleOnlineUsersMessage(message);
                } else {
                    // Use regex pattern matching for more robust message parsing
                    Pattern pattern = Pattern.compile(ClientConstants.REGEX);
                    Matcher matcher = pattern.matcher(message);
                    if (matcher.matches()) {
                        String timestamp = matcher.group(1);
                        String username = matcher.group(2);
                        String userMessage = matcher.group(3);

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
                }
            } catch (Exception e) {
                handleMessageError("Error processing message", e);
                e.printStackTrace(); // Print the stack trace for debugging
                ErrorHandler.showErrorMessage(MessageHandler.this, message);
            }
        }

        private void displaySystemMessage(String message) throws BadLocationException {
            // Display system messages in a different style
            // For example, in italic or different color
            updateMessageArea("[System] " + message + "\n");
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
    private void handleOnlineUsersMessage(String message) {
        // Extract the online users from the message
        String onlineUsers = message.substring(ClientConstants.ONLINE_USERS_MESSAGE_PREFIX.length());

        // Split the list of users into an array
        String[] users = onlineUsers.split(",");

        // Clear the current list of online users
        onlineUsersTextArea.setText("");

        // Add each user to the online users text area
        for (String user : users) {
            if (!user.isEmpty() && !user.equals("null")) {
                //if (users.length == 1) onlineUsersTextArea.append(user);
                if (!user.equals(currentUserName)) onlineUsersTextArea.append(user + "\n");
            }
        }
    }
}
