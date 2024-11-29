package com.datamannen1013.javachattapp.client.constants;

import java.awt.*;

public class ClientConstants {


    // Constants for server address and port
    public static final String SERVER_ADDRESS = "127.0.0.1";
    public static final int SERVER_PORT = 5000;

    // Command prefixes for handling specific message types
    public static final String ONLINE_USERS_MESSAGE_PREFIX = "/onlineusers ";
    public static final String JOIN_MESSAGE_PREFIX = "/join ";
    public static final String LEAVE_MESSAGE_SUFFIX = " has left the chat.";

    // Sizes for the GUI components
    public static final int WINDOW_WIDTH = 400;
    public static final int WINDOW_HEIGHT = 500;
    public static final int ONLINE_AREA_WIDTH = 10;
    public static final int ONLINE_AREA_HEIGHT = 10;

    // Color variables for the GUI components
    public static final Color BACKGROUND_COLOR = new Color(240, 240, 240); // Light gray background
    public static final Color TEXT_COLOR = Color.BLACK;
    public static final Color BUTTON_COLOR = new Color(75, 75, 75); // Darker gray for buttons

    public static final Color TIMESTAMP_COLOR = new Color(169, 169, 169) ; // Dark gray
    public static final Color USERNAME_COLOR = new Color(178, 176, 176); // Dim gray
    public static final Color MESSAGE_COLOR = Color.black; // Black for regular messages

    // Font variables for the GUI components
    public static final Font TEXT_FONT = new Font("Arial", Font.PLAIN, 14); // Font for text areas
    public static final Font BUTTON_FONT = new Font("Arial", Font.BOLD, 12); // Font for buttons;

    // Dataformat for the timestamp
    public static final String TIMESTAMP_FORMAT = "HH:mm:ss";

    // Preset Application name values
    public static final String APPLICATION_NAME = "Chat Application";
    public static final String ONLINE_USERS_TITLE = "Online Users";
    public static final String RECIEVED_MESSAGE = "Received message:";

    // REGEX check
    public static final String REGEX = "\\[(.*?)\\] (.*?): (.*)";

}
