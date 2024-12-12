package com.datamannen1013.javachattapp.client;


import com.datamannen1013.javachattapp.client.gui.ChatWindow;

import javax.swing.*;

// Main class for the chat client GUI
public class ChatClientGUI {
    // Main method to launch the application
    private static ChatWindow instance;
    private static int instanceCount = 0;
    private static boolean isInitializing = false;

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            System.out.println("Attempting to create/access window...");
            System.out.println("Current instance: " + (instance == null ? "null" : "exists"));
            System.out.println("Is instance displayable: " +
                    (instance != null ? instance.isDisplayable() : "N/A"));

            // Prevent recursive initialization
            if (isInitializing) {
                System.out.println("Already initializing, skipping...");
                return;
            }

            if (instance == null || !instance.isDisplayable()) {
                isInitializing = true;
                instanceCount++;
                System.out.println("Creating new instance #" + instanceCount);
                try {
                    instance = ChatWindow.getInstance();
                    instance.setVisible(true);
                } finally {
                    isInitializing = false;
                }
            } else {
                System.out.println("Bringing existing instance to front");
                instance.toFront();
            }
        });
    }
}
