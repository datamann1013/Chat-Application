package com.datamannen1013.javachattapp.client.gui;

import com.datamannen1013.javachattapp.client.constants.ClientConstants;

import javax.swing.*;

public class LoginWindow extends JDialog {
    private String name;

    public LoginWindow(JFrame parent) {
        super(parent, ClientConstants.APPLICATION_NAME, true);

        java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(ClientConstants.USERNAME_PATTERN);
        boolean isValidInput = false;
        while (!isValidInput) {
            name = JOptionPane.showInputDialog(
                    parent,
                    "Enter your name:",
                    ClientConstants.APPLICATION_NAME,
                    JOptionPane.PLAIN_MESSAGE
            );

            if (name == null) {
                System.exit(0);
            }

            if (pattern.matcher(name).matches()) {
                isValidInput = true;
            } else {
                JOptionPane.showMessageDialog(
                    parent,
                    ClientConstants.USERNAME_PATTERN_MESSAGE,
                    "Invalid Username",
                    JOptionPane.ERROR_MESSAGE);
            }
        }

    }
    // Add this getter method
    public String getName() {
        return name;
    }
}
