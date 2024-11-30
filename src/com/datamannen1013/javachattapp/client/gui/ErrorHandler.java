package com.datamannen1013.javachattapp.client.gui;

import javax.swing.JOptionPane;
import javax.swing.JFrame;


public class ErrorHandler {

    public static void showError(JFrame parent, String message) {
        JOptionPane.showMessageDialog(
            parent,
            message,
            "Error",
            JOptionPane.ERROR_MESSAGE
        );
    }

    public static void showWarning(JFrame parent, String message) {
        JOptionPane.showMessageDialog(
            parent,
            message,
            "Warning",
            JOptionPane.WARNING_MESSAGE
        );
    }

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
