package com.datamannen1013.javachattapp.client;


import com.datamannen1013.javachattapp.client.gui.ChatWindow;

import javax.swing.*;

// Main class for the chat client GUI
public class ChatClientGUI {
    // Main method to launch the application
    public static void main(String[] args) {
        // Use SwingUtilities to ensure that the GUI is created on the Event Dispatch Thread (EDT)
        SwingUtilities.invokeLater(() -> {
            // Create an instance of ChatClientGUI and make it visible
            new ChatWindow().setVisible(true);
        });
    }
}
