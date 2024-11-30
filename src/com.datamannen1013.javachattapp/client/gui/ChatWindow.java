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
import javax.swing.BoxLayout;

// Main class for the chat client GUI
public class ChatWindow extends JFrame {

    private final JTextField textField; // Input field for user messages
    private final JTextArea onlineUsersTextArea;
    private String name;
    private ChatClient client; // Chat client instance for handling communication

    private final MessageHandler messageHandler;

    // Constructor to set up the GUI
    public ChatWindow() {
        super(ClientConstants.APPLICATION_NAME); // Set the title of the window
        setSize(ClientConstants.WINDOW_WIDTH, ClientConstants.WINDOW_HEIGHT); // Set the size of the window

        // Set up the message area for displaying chat messages
        // Create a panel for chat area with border
        JPanel chatPanel = new JPanel();
        chatPanel.setLayout(new BorderLayout()); // Set layout for the panel
        chatPanel.setBorder(BorderFactory.createTitledBorder(ClientConstants.CHAT_AREA_TITLE)); // Set border title

        // GUI components
        JTextPane messageArea = new JTextPane();
        messageArea.setEditable(false); // Make the message area non-editable
        messageArea.setBackground(ClientConstants.BACKGROUND_COLOR); // Set background color
        messageArea.setForeground(ClientConstants.TEXT_COLOR); // Set text color
        messageArea.setFont(ClientConstants.TEXT_FONT); // Set font
        JScrollPane scrollPane = new JScrollPane(messageArea); // Add scroll functionality
        chatPanel.add(scrollPane, BorderLayout.CENTER); // Add scroll pane to chat panel
        add(chatPanel, BorderLayout.CENTER); // Add chat panel to the center of the window

        // Set up the text field for user input
        textField = new JTextField();
        textField.setFont(ClientConstants.TEXT_FONT); // Set font for the text field
        textField.setForeground(ClientConstants.TEXT_COLOR); // Set text color
        textField.setBackground(ClientConstants.BACKGROUND_COLOR); // Set background color
        textField.addActionListener(e -> { // Add an action listener to the text field to handle user input
            String userMessage = textField.getText().trim(); // Get the trimmed user message
            if (!userMessage.isEmpty()) { // Check if the message is not empty
                // Validate message against pattern
                java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(ClientConstants.MESSAGE_PATTERN);
                if (pattern.matcher(userMessage).matches()) {
                    // Create a formatted message with timestamp and user name
                    String message = "[" + new SimpleDateFormat(ClientConstants.TIMESTAMP_FORMAT).format(new Date()) + "] " + name + ": " + userMessage;
                    client.sendMessage(message); // Send the message to the server
                    textField.setText(""); // Clear the text field after sending the message
                } else {
                    // Show error dialog for invalid message format
                    JOptionPane.showMessageDialog(this, ClientConstants.MESSAGE_PATTERN_MESSAGE, "Invalid Message", JOptionPane.ERROR_MESSAGE);
                }
            } else {
                // Show a warning dialog if the message is empty
                JOptionPane.showMessageDialog(this, "Message cannot be empty.", "Invalid Input", JOptionPane.WARNING_MESSAGE);
            }
        });

        // Create a panel to display online users
        JPanel onlineUsersPanel = new JPanel();
        onlineUsersPanel.setLayout(new BorderLayout()); // Set layout for the panel
        onlineUsersPanel.setBorder(BorderFactory.createTitledBorder(ClientConstants.ONLINE_USERS_TITLE));

        // Create main panel for user lists with BoxLayout
        JPanel userListsPanel = new JPanel();
        userListsPanel.setLayout(new BoxLayout(userListsPanel, BoxLayout.Y_AXIS));

        // Username section
        JLabel usernameLabel = new JLabel(ClientConstants.USERNAME_TITLE);
        usernameLabel.setFont(ClientConstants.TEXT_FONT);
        usernameLabel.setForeground(ClientConstants.TEXT_COLOR);

        JTextField usernameTextArea = new JTextField(ClientConstants.ONLINE_AREA_WIDTH);
        usernameTextArea.setPreferredSize(new Dimension(usernameTextArea.getPreferredSize().width, 25));
        usernameTextArea.setMinimumSize(new Dimension(usernameTextArea.getMinimumSize().width, 25));
        usernameTextArea.setMaximumSize(new Dimension(Short.MAX_VALUE, 25));
        usernameTextArea.setEditable(false);
        usernameTextArea.setBackground(ClientConstants.BACKGROUND_COLOR);
        usernameTextArea.setForeground(ClientConstants.TEXT_COLOR);
        usernameTextArea.setFont(ClientConstants.TEXT_FONT);

        // Other users section
        JLabel otherUsersLabel = new JLabel(ClientConstants.OTHER_USERS_TITLE);
        otherUsersLabel.setFont(ClientConstants.TEXT_FONT);
        otherUsersLabel.setForeground(ClientConstants.TEXT_COLOR);

        onlineUsersTextArea = new JTextArea(ClientConstants.ONLINE_AREA_HEIGHT, ClientConstants.ONLINE_AREA_WIDTH);
        onlineUsersTextArea.setEditable(false);
        onlineUsersTextArea.setBackground(ClientConstants.BACKGROUND_COLOR);
        onlineUsersTextArea.setForeground(ClientConstants.TEXT_COLOR);
        onlineUsersTextArea.setFont(ClientConstants.TEXT_FONT);

        // Add components to user lists panel
        userListsPanel.add(usernameLabel);
        userListsPanel.add(usernameTextArea);
        userListsPanel.add(Box.createVerticalStrut(10));
        userListsPanel.add(otherUsersLabel);
        userListsPanel.add(new JScrollPane(onlineUsersTextArea));
        onlineUsersPanel.add(userListsPanel, BorderLayout.CENTER);

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
            if (confirm == JOptionPane.YES_OPTION) performGracefulShutdown();
        });

        // Add a WindowListener to handle the window close event
        addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                // Confirmation dialog before exiting
                int confirm = JOptionPane.showConfirmDialog(ChatWindow.this, "Are you sure you want to exit?", "Confirm Exit", JOptionPane.YES_NO_OPTION);
                if (confirm == JOptionPane.YES_OPTION) performGracefulShutdown();
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
            usernameTextArea.setText(name);
            createClient(name, this::onMessageReceived); // Create the client connection
        } else { // Is handled in promptForUserName(); Could be removed
            // If the user didn't enter a valid name, close the application
            dispose();
        }
        // Set the window title to include the user's name
        this.setTitle(ClientConstants.APPLICATION_NAME);
        textField.requestFocusInWindow(); // Request focus for the text field

        // Initialize message handler
        messageHandler = new MessageHandler(messageArea, onlineUsersTextArea, name);
    }

    private boolean performGracefulShutdown() {
        final Object shutdownLock = new Object();
        final boolean[] shutdownComplete = {false};
        final int MAX_RETRIES = 3;
        final int SHUTDOWN_TIMEOUT = 5000; // 5 seconds

        Thread shutdownThread = new Thread(() -> {
            int retries = 0;
            try {
                while (retries < MAX_RETRIES) {
                    try {
                        String departureMessage = name + ClientConstants.LEAVE_MESSAGE_SUFFIX;
                        client.sendMessage(departureMessage);
                        Thread.sleep(500); // Short delay for message to be sent

                        synchronized (shutdownLock) {
                            shutdownComplete[0] = true;
                            shutdownLock.notify();
                        }
                        break;
                    } catch (Exception e) {
                        retries++;
                        System.err.println("Shutdown attempt " + retries + " failed: " + e.getMessage());
                        if (retries < MAX_RETRIES) Thread.sleep(1000);
                    }
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.err.println("Shutdown interrupted: " + e.getMessage());
            }
        }, "ShutdownThread");

        shutdownThread.start();

        // Wait for shutdown with timeout
        try {
            synchronized (shutdownLock) {
                shutdownLock.wait(SHUTDOWN_TIMEOUT);
            }
        } catch (InterruptedException e) {
            System.err.println("Shutdown wait interrupted: " + e.getMessage());
        }
        if (!shutdownComplete[0]) dispose();
        return shutdownComplete[0];
    }

    // Method to prompt the user for their username
    private String promptForUserName() {
        LoginWindow loginWindow = new LoginWindow(this);
        this.name = loginWindow.getName();

        return name.trim(); // Return the valid username without leading/trailing whitespace
    }


    // Method to handle messages received from the server
    private void onMessageReceived(String message) {
        // Use SwingUtilities to ensure that UI updates are done on the Event Dispatch Thread
        SwingUtilities.invokeLater(() -> {
            try {
                if (message == null || message.trim().isEmpty()) {
                    ErrorHandler.showError(this, "Received empty or invalid message from server");
                    return;
                }
                messageHandler.handleMessage(message); // Process the received message using MessageHandler
            } catch (Exception e) {
                ErrorHandler.showError(this, "Error processing message: " + e.getMessage());
            }
        });
    }

    // Method to create the chat client and connect to the server
    private void createClient(String name, Consumer<String> onMessageReceived) {
        JLabel statusLabel = new JLabel("Connecting...");
        statusLabel.setForeground(Color.ORANGE);
        add(statusLabel, BorderLayout.NORTH);

        Consumer<String> errorHandler = error -> {
            SwingUtilities.invokeLater(() -> handleClientError(error, name, statusLabel));
        };

        try {
            // Initialize the ChatClient instance with server details and message handler
            this.client = new ChatClient(ClientConstants.SERVER_ADDRESS,
                    ClientConstants.SERVER_PORT,
                    name,
                    onMessageReceived,
                    errorHandler);
            client.startClient(); // Start the client connection
            statusLabel.setText("Connected");
            statusLabel.setForeground(Color.GREEN);
            onlineUsersTextArea.append(name + "\n");
        } catch (Exception e) {
            handleClientError(e.getMessage(), name, statusLabel);
        }
    }

    private void handleClientError(String error, String name, JLabel statusLabel) {
        statusLabel.setText("Connection Status: Error");
        statusLabel.setForeground(Color.RED);

        boolean retry = ErrorHandler.showConnectionError(this, error, () -> {
            statusLabel.setText("Connection Status: Reconnecting...");
            statusLabel.setForeground(Color.ORANGE);
            createClient(name, messageHandler::handleMessage);
        });
        if (retry) {
            statusLabel.setText("Connection Status: Reconnecting...");
            createClient(name, messageHandler::handleMessage);
        }
    }
}
