package com.datamannen1013.javachattapp.client.gui;

import com.datamannen1013.javachattapp.client.constants.ClientConstants;

import javax.swing.*;
import java.awt.*;

public class LoginWindow extends JDialog {
    private String name;

    public LoginWindow(JFrame parent) {
        super(parent, ClientConstants.APPLICATION_NAME, true);
        name = JOptionPane.showInputDialog(
                parent,
                "Enter your name:",
                ClientConstants.APPLICATION_NAME,
                JOptionPane.PLAIN_MESSAGE
        );

        if (name == null || name.trim().isEmpty()) {
            System.exit(0);
        }
        name = name.trim();
    }

    public String getName() {
        return name;
    }
}