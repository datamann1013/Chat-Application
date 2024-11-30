package com.datamannen1013.javachattapp.client.gui;

import javax.swing.JOptionPane;
import javax.swing.JFrame;

/**
 * Centralized error handling utility class for the chat application
 */
public class ErrorHandler {
    /**
     * Shows an error message dialog
     * @param parent The parent frame
     * @param message The error message to display
     */
    public static void showError(JFrame parent, String message) {
        JOptionPane.showMessageDialog(
            parent,
            message,
            "Error",
            JOptionPane.ERROR_MESSAGE
        );
    }

    /**
     * Shows a warning message dialog
     * @param parent The parent frame
     * @param message The warning message to display
     */
    public static void showWarning(JFrame parent, String message) {
        JOptionPane.showMessageDialog(
            parent,
            message,
            "Warning",
            JOptionPane.WARNING_MESSAGE
        );
    }

    /**
     * Shows a connection error dialog with retry option
     * @param parent The parent frame
     * @param message The error message to display
     * @param retryAction The action to execute if retry is selected
     * @return true if retry was selected, false otherwise
     */
    public static boolean showConnectionError(JFrame parent, String message, Runnable retryAction) {
        int choice = JOptionPane.showConfirmDialog(parent, message + "\nWould you like to retry?",
            "Connection Error", JOptionPane.YES_NO_OPTION, JOptionPane.ERROR_MESSAGE);
        return choice == JOptionPane.YES_OPTION;
    }
    public static void showErrorMessage(MessageHandler parent, String message) {
        JOptionPane.showMessageDialog(parent,
                message,
                "Error",
                JOptionPane.ERROR_MESSAGE);
    }
}
