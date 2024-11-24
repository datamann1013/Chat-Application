package com.datamannen1013.javachattapp.client;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

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
        JTextArea onlineUsersTextArea = new JTextArea(10, 10);
        onlineUsersTextArea.setEditable(false);
        onlineUsersTextArea.setBackground(backgroundColor);
        onlineUsersTextArea.setForeground(textColor);
        onlineUsersTextArea.setFont(textFont);
        onlineUsersPanel.add(new JScrollPane(onlineUsersTextArea), BorderLayout.CENTER);

        // Add the online users panel to the right side of the window
        add(onlineUsersPanel, BorderLayout.EAST);

        textField.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String message = textField.getText();
                if (!message.isEmpty()) {
                    String formattedMessage = "[" + new SimpleDateFormat("HH:mm:ss").format(new Date()) + "] " + name + ": " + message;
                    client.sendMessage(formattedMessage);
                    textField.setText("");
                }
            }
        });
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

        // Initialize and start the ChatClient
        try {
            this.client = new ChatClient("127.0.0.1", 5000, name, this::onMessageReceived);
            client.startClient();
        } catch (IOException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(this, "Error connecting to the server", "Connection error",
                    JOptionPane.ERROR_MESSAGE);
            System.exit(1);
        }
        // Prompt for user name
        name = JOptionPane.showInputDialog(this, "Enter your name:", "Name Entry", JOptionPane.PLAIN_MESSAGE);
        this.setTitle("Chat Application - " + name); // Set window title to include user name
        try {
            this.client = new ChatClient("127.0.0.1", 5000, name, this::onMessageReceived);
            client.startClient();
        } catch (IOException e) {
            JOptionPane.showMessageDialog(this, "Error connecting to the server", "Connection error",
                    JOptionPane.ERROR_MESSAGE);
            System.exit(1);
        }

        // Modify actionPerformed to include the user name and time stamp
        textField.addActionListener(e -> {
            String message = "[" + new SimpleDateFormat("HH:mm:ss").format(new Date()) + "] " + name + ": " + textField.getText();
            client.sendMessage(message);
            textField.setText("");
        });
    }

    private void onMessageReceived(String message) {
        final JTextArea onlineUsersTextArea = ChatClientGUI.this.onlineUsersTextArea;
        String textToAppend = "";
        if (message.startsWith("User joined: ")) {
            // Handle user join message
            String userName = message.substring(13);
            textToAppend = userName + "\n";
        } else if (message.startsWith("User left: ")) {
            // Handle user leave message
            String userName = message.substring(11);
            textToAppend = onlineUsersTextArea.getText().replace(userName + "\n", "");
        } else {
            textToAppend = message + "\n";
        }
        String finalTextToAppend = textToAppend;
        SwingUtilities.invokeLater(() -> {
            onlineUsersTextArea.setText(finalTextToAppend);
        });
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new ChatClientGUI().setVisible(true);
        });
    }
}