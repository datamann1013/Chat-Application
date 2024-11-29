package com.datamannen1013.javachattapp.client.gui;
import com.datamannen1013.javachattapp.client.constants.ClientConstants;

import javax.swing.*;
import javax.swing.text.*;
import java.awt.*;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

/**
 * Handles message formatting and display in the chat window
 */
public class MessageHandler {
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
        if (message.startsWith(ClientConstants.ONLINE_USERS_MESSAGE_PREFIX)) {
            handleOnlineUsersMessage(message);
        } else {
            Pattern pattern = Pattern.compile(ClientConstants.REGEX);
            Matcher matcher = pattern.matcher(message);

            if (matcher.matches()) {
                String timestamp = matcher.group(1);
                String username = matcher.group(2);
                String userMessage = matcher.group(3);

                try {
                    StyledDocument doc = messageArea.getStyledDocument();
                    doc.insertString(doc.getLength(), "[" + timestamp + "] ", timestampStyle);
                    doc.insertString(doc.getLength(), username + ": ", usernameStyle);
                    doc.insertString(doc.getLength(), userMessage + "\n", messageStyle);
                } catch (BadLocationException e) {
                    e.printStackTrace();
                }
            } else {
                System.err.println("Message format is incorrect: " + message);
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
                if (!user.equals(currentUserName)) onlineUsersTextArea.append(user + "\n");
            }
        }
    }
}
