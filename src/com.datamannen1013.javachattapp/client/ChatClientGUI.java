package com.datamannen1013.javachattapp.client;

import javax.swing.*;
import java.awt.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.function.Consumer;

// Main class for the chat client GUI
public class ChatClientGUI extends JFrame {

    // Constants for server address and port
    private static final String SERVER_ADDRESS = "127.0.0.1";
    private static final int SERVER_PORT = 5000;

    // Command prefixes for handling specific message types
    private static final String ONLINE_USERS_MESSAGE_PREFIX = "/onlineusers ";

    // GUI components
    private final JTextArea messageArea;
    private final JTextField textField; // Input field for user messages
    private final JTextArea onlineUsersTextArea;
    private final JButton exitButton;
    private String name;
    private ChatClient client; // Chat client instance for handling communication

    // Constructor to set up the GUI
    public ChatClientGUI() {
        super("Chat Application"); // Set the title of the window
        setSize(400, 500); // Set the size of the window
        setDefaultCloseOperation(EXIT_ON_CLOSE); // Close application on window close


        // Styling variables for the GUI components
        Color backgroundColor = new Color(240, 240, 240); // Light gray background
        Color buttonColor = new Color(75, 75, 75); // Darker gray for buttons
        Color textColor = new Color(50, 50, 50); // Almost black for text
        Font textFont = new Font("Arial", Font.PLAIN, 14); // Font for text areas
        Font buttonFont = new Font("Arial", Font.BOLD, 12); // Font for buttons

        // Set up the message area for displaying chat messages
        messageArea = new JTextArea();
        messageArea.setEditable(false); // Make the message area non-editable
        messageArea.setBackground(backgroundColor); // Set background color
        messageArea.setForeground(textColor); // Set text color
        messageArea.setFont(textFont); // Set font
        JScrollPane scrollPane = new JScrollPane(messageArea); // Add scroll functionality
        add(scrollPane, BorderLayout.CENTER); // Add message area to the center of the window

        // Set up the text field for user input
        textField = new JTextField();
        textField.setFont(textFont); // Set font for the text field
        textField.setForeground(textColor); // Set text color
        textField.setBackground(backgroundColor); // Set background color
        textField.addActionListener(e -> { // Add an action listener to the text field to handle user input
            String userMessage = textField.getText().trim(); // Get the trimmed user message
            if (!userMessage.isEmpty()) { // Check if the message is not empty
                // Create a formatted message with timestamp and user name
                String message = "[" + new SimpleDateFormat("HH:mm:ss").format(new Date()) + "] " + name + ": " + userMessage;
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
        onlineUsersPanel.setBorder(BorderFactory.createTitledBorder("Online Users")); // Set border title


        // Create a text area to display online users
        onlineUsersTextArea = new JTextArea(10, 10); // Set size of the text area
        onlineUsersTextArea.setEditable(false); // Make it non-editable
        onlineUsersTextArea.setBackground(backgroundColor); // Set background color
        onlineUsersTextArea.setForeground(textColor); // Set text color
        onlineUsersTextArea.setFont(textFont); // Set font
        onlineUsersPanel.add(new JScrollPane(onlineUsersTextArea), BorderLayout.CENTER); // Add scroll functionality

        add(onlineUsersPanel, BorderLayout.EAST); // Add the online users panel to the right side of the window
        add(textField, BorderLayout.SOUTH); // Add the text field to the bottom of the window

        // Initialize the exit button
        exitButton = new JButton("Exit"); // Create exit button
        exitButton.setFont(buttonFont); // Set font for the button
        exitButton.setBackground(buttonColor); // Set background color
        exitButton.setForeground(Color.WHITE); // Set text color to white
        exitButton.addActionListener(e -> {
            // Action to perform when the exit button is clicked
            String departureMessage = name + " has left the chat."; // Departure message
            client.sendMessage(departureMessage); // Send departure message to the server
            // Delay to ensure the message is sent before exiting
            try {
                Thread.sleep(1000); // Wait for 1 second to ensure message is sent
            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt();
            }
            dispose(); // Close the application window
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
        this.setTitle(name + "'s chattin application");
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
            System.out.println("Received message: " + message); // Log the received message
            handleMessage(message); // Process the received message
        });
    }

    // Method to create the chat client and connect to the server
    private void createClient(String name, Consumer<String> onMessageReceived) {
        try {
            // Initialize the ChatClient instance with server details and message handler
            this.client = new ChatClient(ChatClientGUI.SERVER_ADDRESS, ChatClientGUI.SERVER_PORT, name, onMessageReceived);
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
        if (message.startsWith(ONLINE_USERS_MESSAGE_PREFIX)) { // Check if the message is about online users
            handleOnlineUsersMessage(message); // Handle the online users message
        } else {
            messageArea.append(message + "\n"); // Append the message to the message area
        }
    }

    // Method to handle messages that contain the list of online users
    private void handleOnlineUsersMessage(String message) {
        // Extract the online users from the message by removing the ONLINE_USERS_MESSAGE_PREFIX
        String onlineUsers = message.substring(ONLINE_USERS_MESSAGE_PREFIX.length());

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