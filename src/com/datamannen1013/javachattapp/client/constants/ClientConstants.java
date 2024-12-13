package com.datamannen1013.javachattapp.client.constants;

import java.awt.*;

public class ClientConstants {

    //Private constructor for maintainability
    private ClientConstants() {
        throw new IllegalStateException("Utility class");
    }

    // Constants for server address and port
    public static final String SERVER_ADDRESS = "127.0.0.1";
    public static final int SERVER_PORT = 5000;

    // Command prefixes for handling specific message types
    @SuppressWarnings("SpellCheckingInspection") //Correct spelling in this spesific case
    public static final String ONLINE_USERS_MESSAGE_PREFIX = "/onlineusers ";
    public static final String LEAVE_MESSAGE_SUFFIX = " has left the chat.";
    public static final String JOIN_MESSAGE_PREFIX = "/join ";
    public static final String WELCOME_MESSAGE_PREFIX = "Welcome";
    public static final String NEW_USER_SUFFIX = "is now online";
    public static final String CLIENT_DISCONNECT_PREFIX = "/leave ";
    @SuppressWarnings("SpellCheckingInspection") //Correct spelling in this spesific case
    public static final String SERVER_SHUTDOWN_MESSAGE = "/serverclose";
    public static final String SERVER_HISTORY_MESSAGE_PREFIX = "/history ";

    // Sizes for the GUI components
    public static final int WINDOW_WIDTH = 600;
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
    public static final Font BUTTON_FONT = new Font("Arial", Font.BOLD, 12); // Font for buttons

    // Dataformat for the timestamp
    public static final String TIMESTAMP_FORMAT = "HH:mm:ss";

    // Preset Application name values
    public static final String APPLICATION_NAME = "Chat Application";
    public static final String ONLINE_USERS_TITLE = "Online Users";
    public static final String USERNAME_TITLE = "Username";
    public static final String OTHER_USERS_TITLE = "Other Users";
    public static final String CHAT_AREA_TITLE = "Chat Messages";

    // REGEX check
    public static final String REGEX = "\\[(\\d{2}:\\d{2}:\\d{2})\\] ([^:]+): (.+)";

    //Username rules
    public static final String USERNAME_PATTERN = "^[a-zA-Z0-9_ -]{3,20}$";
    public static final String USERNAME_PATTERN_MESSAGE = "Username must be 3-20 characters long and can only contain letters, numbers, spaces, underscores, and hyphens.";

    //Message rules
    public static final String MESSAGE_PATTERN = "^[\\p{Print}\\s]{1,500}$";
    public static final String MESSAGE_PATTERN_MESSAGE = "Message must be 1-500 characters long and cannot contain control characters.";

    //Error messages
    public static final String CONNECTION_ERROR_MESSAGE = "Unable to connect to the server. Please check your network connection.";
    public static final String SERVER_TIMEOUT_MESSAGE = "Server is not responding. Connection attempt timed out.";
    public static final String NETWORK_ERROR_MESSAGE = "Network connection was lost. Please check your internet connection.";
    public static final String RECONNECTION_MESSAGE = "Attempting to reconnect to the server...";
    public static final String MESSAGE_SEND_ERROR_MESSAGE = "Failed to send message. Please try again.";
    public static final String INVALID_SERVER_RESPONSE_MESSAGE = "Received invalid response from server.";
    public static final String DISCONNECT_ERROR_MESSAGE = "Connection terminated unexpectedly.";

    // Messages to catch
    public static final String CHAT_HISTORY_START = "--- Chat History ---";
    public static final String CHAT_HISTORY_END = "--- End of History ---";


    public static final Color SYSTEM_MESSAGE_COLOR = Color.DARK_GRAY;
}
