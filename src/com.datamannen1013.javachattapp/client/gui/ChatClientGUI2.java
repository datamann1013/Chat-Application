package com.datamannen1013.javachattapp.client.gui;

import com.datamannen1013.javachattapp.client.ChatClient;
import com.datamannen1013.javachattapp.client.constants.ClientConstants;

import javax.swing.*;
import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.function.Consumer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.swing.text.*;

// Main class for the chat client GUI
public class ChatClientGUI2 extends JFrame {


    // GUI components
    private final JTextPane messageArea;
    private final JTextField textField; // Input field for user messages
    private final JTextArea onlineUsersTextArea;
    private String name;
    private ChatClient client; // Chat client instance for handling communication

    // Styles for message components
    private Style timestampStyle;
    private Style usernameStyle;
    private Style messageStyle;

    // Constructor to set up the GUI
    public ChatClientGUI2() {
        super(ClientConstants.APPLICATION_NAME); // Set the title of the window
        setSize(ClientConstants.WINDOW_WIDTH, ClientConstants.WINDOW_HEIGHT); // Set the size of the window

        // Set up the message area for displaying chat messages
        messageArea = new JTextPane();
        messageArea.setEditable(false); // Make the message area non-editable
        messageArea.setBackground(ClientConstants.BACKGROUND_COLOR); // Set background color
        messageArea.setForeground(ClientConstants.TEXT_COLOR); // Set text color
        messageArea.setFont(ClientConstants.TEXT_FONT); // Set font
        JScrollPane scrollPane = new JScrollPane(messageArea); // Add scroll functionality
        add(scrollPane, BorderLayout.CENTER); // Add message area to the center of the window

        // Set up the text field for user input
        textField = new JTextField();
        textField.setFont(ClientConstants.TEXT_FONT); // Set font for the text field
        textField.setForeground(ClientConstants.TEXT_COLOR); // Set text color
        textField.setBackground(ClientConstants.BACKGROUND_COLOR); // Set background color
        textField.addActionListener(e -> { // Add an action listener to the text field to handle user input
            String userMessage = textField.getText().trim(); // Get the trimmed user message
            if (!userMessage.isEmpty()) { // Check if the message is not empty
                // Create a formatted message with timestamp and user name
                String message = "[" + new SimpleDateFormat(ClientConstants.TIMESTAMP_FORMAT).format(new Date()) + "] " + name + ": " + userMessage;
                client.sendMessage(message); // Send the message to the server
                textField.setText(""); // Clear the text field after sending the message
            } else {
                // Show a warning dialog if the message is empty
                JOptionPane.showMessageDialog(this, "Message cannot be empty.", "Invalid Input", JOptionPane.WARNING_MESSAGE);
            }
        });

        // Create a panel to display online users
        JPanel onlineUsersPanel = new JPanel();
        onlineUsersPanel.setLayout(new BorderLayout()); // Set layout for the panel
        onlineUsersPanel.setBorder(BorderFactory.createTitledBorder(ClientConstants.ONLINE_USERS_TITLE)); // Set border title


        // Create a text area to display online users
        onlineUsersTextArea = new JTextArea(ClientConstants.ONLINE_AREA_HEIGHT, ClientConstants.ONLINE_AREA_WIDTH); // Set size of the text area
        onlineUsersTextArea.setEditable(false); // Make it non-editable
        onlineUsersTextArea.setBackground(ClientConstants.BACKGROUND_COLOR); // Set background color
        onlineUsersTextArea.setForeground(ClientConstants.TEXT_COLOR); // Set text color
        onlineUsersTextArea.setFont(ClientConstants.TEXT_FONT); // Set font
        onlineUsersPanel.add(new JScrollPane(onlineUsersTextArea), BorderLayout.CENTER); // Add scroll functionality

        add(onlineUsersPanel, BorderLayout.EAST); // Add the online users panel to the right side of the window
        add(textField, BorderLayout.SOUTH); // Add the text field to the bottom of the window

        // Initialize the exit button
        JButton exitButton = new JButton("Exit"); // Create exit button
        exitButton.setFont(ClientConstants.BUTTON_FONT); // Set font for the button
        exitButton.setBackground(ClientConstants.BUTTON_COLOR); // Set background color
        exitButton.setForeground(Color.WHITE); // Set text color to white
        exitButton.addActionListener(e -> {
            // Confirmation dialog before exiting
            int confirm = JOptionPane.showConfirmDialog(this, "Are you sure you want to exit?", "Confirm Exit", JOptionPane.YES_NO_OPTION);
            if (confirm == JOptionPane.YES_OPTION) {
                String departureMessage = name + ClientConstants.LEAVE_MESSAGE_SUFFIX; // Departure message
                client.sendMessage(departureMessage); // Send departure message to the server
                // Delay to ensure the message is sent before exiting
                try {
                    Thread.sleep(1000); // Wait for 1 second to ensure message is sent
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
                dispose(); // Close the application window
            }
        });

        initializeStyles();

        // Add a WindowListener to handle the window close event
        addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                // Confirmation dialog before exiting
                int confirm = JOptionPane.showConfirmDialog(ChatClientGUI2.this, "Are you sure you want to exit?", "Confirm Exit", JOptionPane.YES_NO_OPTION);
                if (confirm == JOptionPane.YES_OPTION) {
                    String departureMessage = name + ClientConstants.LEAVE_MESSAGE_SUFFIX; // Departure message
                    client.sendMessage(departureMessage); // Send departure message to the server
                    // Delay to ensure the message is sent before exiting
                    try {
                        Thread.sleep(1000); // Wait for 1 second to ensure message is sent
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                    }
                    dispose(); // Close the application window
                }
            }
        });

        // Create a panel at the bottom of the window to hold the text field and exit button
        JPanel bottomPanel = new JPanel(new BorderLayout());
        bottomPanel.add(textField, BorderLayout.CENTER); // Add the text field to the center of the bottom panel
        bottomPanel.add(exitButton, BorderLayout.EAST); // Add the exit button to the right side of the bottom panel
        add(bottomPanel, BorderLayout.SOUTH); // Add the bottom panel to the south region of the main window

        // Prompt the user for their name using the promptForUserName method
        name = promptForUserName();
        if (!name.isEmpty()) { // Check if the user entered a valid name
            createClient(name, this::onMessageReceived); // Create the client connection
        } else { // Is handled in promptForUserName(); Could be removed
            // If the user didn't enter a valid name, close the application
            dispose();
        }
        // Set the window title to include the user's name
        this.setTitle(ClientConstants.APPLICATION_NAME);
        textField.requestFocusInWindow(); // Request focus for the text field
    }
    // Method to initialize styles
    private void initializeStyles() {
        StyledDocument doc = messageArea.getStyledDocument();

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

    // Method to prompt the user for their username
    private String promptForUserName() {
        String userName;
        do {
            // Prompt the user for their username using a dialog
            userName = JOptionPane.showInputDialog(this, "Enter your name:", "Name Entry", JOptionPane.PLAIN_MESSAGE);

            // Check if the entered username is null or empty
            if (userName == null || userName.trim().isEmpty()) {
                // Show an error message if the username is invalid
                JOptionPane.showMessageDialog(this, "Username cannot be empty.", "Invalid Username", JOptionPane.ERROR_MESSAGE);
            }
        } while (userName == null || userName.trim().isEmpty()); // Repeat until a valid username is entered

        return userName.trim(); // Return the valid username without leading/trailing whitespace
    }


    // Method to handle messages received from the server
    private void onMessageReceived(String message) {
        // Use SwingUtilities to ensure that UI updates are done on the Event Dispatch Thread
        SwingUtilities.invokeLater(() -> {
            System.out.println(ClientConstants.RECIEVED_MESSAGE + message); // Log the received message
            handleMessage(message); // Process the received message
        });
    }

    // Method to create the chat client and connect to the server
    private void createClient(String name, Consumer<String> onMessageReceived) {
        try {
            // Initialize the ChatClient instance with server details and message handler
            this.client = new ChatClient(ClientConstants.SERVER_ADDRESS, ClientConstants.SERVER_PORT, name, onMessageReceived);
            client.startClient(); // Start the client connection
            onlineUsersTextArea.append(name + "\n"); // Add the user's name to the online users text area
        } catch (Exception e) {
            // Show an error message if the connection fails
            JOptionPane.showMessageDialog(this, "Failed to connect to the server.", "Connection Error", JOptionPane.ERROR_MESSAGE);
            System.exit(1); // Exit the application if the connection fails
        }
    }

    // Method to handle incoming messages
    private void handleMessage(String message) {
        if (message.startsWith(ClientConstants.ONLINE_USERS_MESSAGE_PREFIX)) { // Check if the message is about online users
            handleOnlineUsersMessage(message); // Handle the online users message
        } else {
            // The expected format is: [HH:mm:ss] Username: Message
            // Use regex to match the components
            Pattern pattern = Pattern.compile(ClientConstants.REGEX);
            Matcher matcher = pattern.matcher(message);

            if (matcher.matches()) {
                String timestamp = matcher.group(1); // Extract timestamp
                String username = matcher.group(2);   // Extract username
                String userMessage = matcher.group(3); // Extract user message

                // Append styled timestamp
                try {
                    StyledDocument doc = messageArea.getStyledDocument();
                    doc.insertString(doc.getLength(), "[" + timestamp + "] ", timestampStyle);
                    doc.insertString(doc.getLength(), username + ": ", usernameStyle);
                    doc.insertString(doc.getLength(), userMessage + "\n", messageStyle);
                } catch (BadLocationException e) {
                    e.printStackTrace();
                }
            } else {
                // Handle the case where the message does not match the expected format
                System.err.println("Message format is incorrect: " + message);
            }
        }
    }

    // Method to handle messages that contain the list of online users
    private void handleOnlineUsersMessage(String message) {
        // Extract the online users from the message by removing the ONLINE_USERS_MESSAGE_PREFIX
        String onlineUsers = message.substring(ClientConstants.ONLINE_USERS_MESSAGE_PREFIX.length());

        // Split the list of users into an array using comma as the delimiter
        String[] users = onlineUsers.split(",");

        // Clear the current list of online users displayed in the text area
        onlineUsersTextArea.setText(""); // Clear the text area

        // Iterate through the array of users and add each one to the online users text area
        for (String user : users) {
            // Check if the user string is not empty and is not "null"
            if (!user.isEmpty() && !user.equals("null")) {
                // Append the user's name to the online users text area
                onlineUsersTextArea.append(user + "\n");
            }
        }
    }

    // Main method to launch the application
    public static void main(String[] args) {
        // Use SwingUtilities to ensure that the GUI is created on the Event Dispatch Thread (EDT)
        SwingUtilities.invokeLater(() -> {
            // Create an instance of ChatClientGUI and make it visible
            new ChatClientGUI().setVisible(true);
        });
    }
}