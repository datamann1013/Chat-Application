package com.datamannen1013.javachattapp.client.gui;

import com.datamannen1013.javachattapp.client.constants.ClientConstants;

import javax.swing.*;
import java.awt.*;

public class LoginWindow<SendMessageWorker> extends JDialog {
    private String name;

    public LoginWindow(SendMessageWorker parent) {
        super((Frame) parent, ClientConstants.APPLICATION_NAME, true);

        java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(ClientConstants.USERNAME_PATTERN);
        boolean isValidInput = false;
        while (!isValidInput) {
            name = JOptionPane.showInputDialog(
                    (Component) parent,
                    "Enter your name:",
                    ClientConstants.APPLICATION_NAME,
                    JOptionPane.PLAIN_MESSAGE
            );

            if (pattern.matcher(name).matches()) {
                isValidInput = true;
            } else {
                JOptionPane.showMessageDialog(
                        (Component) parent,
                    ClientConstants.USERNAME_PATTERN_MESSAGE,
                    "Invalid Username",
                    JOptionPane.ERROR_MESSAGE);
            }
        }
        System.out.println("Client: " + name);

    }
    // Add this getter method
    public String getName() {
        return name;
    }
}
