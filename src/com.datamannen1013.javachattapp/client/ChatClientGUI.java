package com.datamannen1013.javachattapp.client;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.function.Consumer;

public class ChatClientGUI extends JFrame {
    private JTextArea messageArea;
    private JTextField textField;
    private ChatClient client;
    private JButton exitButton;
    private String name;
    private JTextArea onlineUsersTextArea;

    public ChatClientGUI() {
        super("Chat Application");
        setSize(400, 500);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        String serverAddress = "127.0.0.1";
        int serverPort = 5000;
        String userName = name;
        Consumer<String> onMessageReceived = this::onMessageReceived;

        // Styling variables
        Color backgroundColor = new Color(240, 240, 240); // Light gray background
        Color buttonColor = new Color(75, 75, 75); // Darker gray for buttons
        Color textColor = new Color(50, 50, 50); // Almost black for text
        Font textFont = new Font("Arial", Font.PLAIN, 14);
        Font buttonFont = new Font("Arial", Font.BOLD, 12);

        // Apply styles to the message area
        messageArea = new JTextArea();
        messageArea.setEditable(false);
        messageArea.setBackground(backgroundColor);
        messageArea.setForeground(textColor);
        messageArea.setFont(textFont);
        JScrollPane scrollPane = new JScrollPane(messageArea);
        add(scrollPane, BorderLayout.CENTER);

        textField = new JTextField();
        textField.setFont(textFont);
        textField.setForeground(textColor);
        textField.setBackground(backgroundColor);

        // Create a panel to display online users
        JPanel onlineUsersPanel = new JPanel();
        onlineUsersPanel.setLayout(new BorderLayout());
        onlineUsersPanel.setBorder(BorderFactory.createTitledBorder("Online Users"));

        // Create a text area to display online users
        onlineUsersTextArea = new JTextArea(10, 10);
        onlineUsersTextArea.setEditable(false);
        onlineUsersTextArea.setBackground(backgroundColor);
        onlineUsersTextArea.setForeground(textColor);
        onlineUsersTextArea.setFont(textFont);
        onlineUsersPanel.add(new JScrollPane(onlineUsersTextArea), BorderLayout.CENTER);

        // Add the online users panel to the right side of the window
        add(onlineUsersPanel, BorderLayout.EAST);


        add(textField, BorderLayout.SOUTH);

        // Initialize the exit button
        exitButton = new JButton("Exit");
        exitButton.setFont(buttonFont);
        exitButton.setBackground(buttonColor);
        exitButton.setForeground(Color.WHITE);
        exitButton.addActionListener(e -> {// Send a departure message to the server
            String departureMessage = name + " has left the chat.";
            client.sendMessage(departureMessage);

            // Delay to ensure the message is sent before exiting
            try {
                Thread.sleep(1000); // Wait for 1 second to ensure message is sent
            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt();
            }

            // Exit the application
            System.exit(0);}); // Exit the application
        JPanel bottomPanel = new JPanel(new BorderLayout());
        bottomPanel.add(textField, BorderLayout.CENTER);
        bottomPanel.add(exitButton, BorderLayout.EAST);
        add(bottomPanel, BorderLayout.SOUTH);


        // Prompt for user name
        name = JOptionPane.showInputDialog(this, "Enter your name:", "Name Entry", JOptionPane.PLAIN_MESSAGE);
        if (name != null && !name.isEmpty()) {
            createClient("127.0.0.1", 5000, name, this::onMessageReceived);
        }
        this.setTitle("Chat Application - " + name); // Set window title to include user name
        this.client = new ChatClient(serverAddress, serverPort, userName, onMessageReceived);
        client.startClient();

        // Modify actionPerformed to include the user name and time stamp
        textField.addActionListener(e -> {
            String message = "[" + new SimpleDateFormat("HH:mm:ss").format(new Date()) + "] " + name + ": " + textField.getText();
            client.sendMessage(message);
            textField.setText("");
        });
    }

    private void onMessageReceived(String message) {
        SwingUtilities.invokeLater(() -> {
            if (message.startsWith("User joined: ")) {
                // Handle user join message
                String userName = message.substring(13);
                onlineUsersTextArea.append(userName + "\n");
                client.userJoined(userName);
            } else if (message.startsWith("User left: ")) {
                // Handle user leave message
                String userName = message.substring(11);
                onlineUsersTextArea.setText(onlineUsersTextArea.getText().replace(userName + "\n", ""));
                client.userLeft(userName);
            } else if (message.startsWith("Online users: ")) {
                // Handle online users message
                String onlineUsers = message.substring(13);
                String[] users = onlineUsers.split(",");
                StringBuilder sb = new StringBuilder();
                for (String user : users) {
                    sb.append(user).append("\n");
                }
                onlineUsersTextArea.setText(sb.toString());
            } else {
                messageArea.append(message + "\n");
            }
        });
    }

    private void createClient(String serverAddress, int serverPort, String name, Consumer<String> onMessageReceived) {
        this.client = new ChatClient(serverAddress, serverPort, name, onMessageReceived);
        client.startClient();
        onlineUsersTextArea.append(name + "\n");
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new ChatClientGUI().setVisible(true);
        });
    }
}