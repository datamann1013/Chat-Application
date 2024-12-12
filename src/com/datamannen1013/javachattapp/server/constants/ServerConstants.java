package com.datamannen1013.javachattapp.server.constants;

public class ServerConstants {

    private ServerConstants() {
        throw new IllegalStateException("Utility class");
    }

    //Username rules
    public static final String USERNAME_PATTERN = "^[a-zA-Z0-9_ -]{3,20}$";

    // Constants for server address and port
    public static final int SERVER_PORT = 5000;

    // Defines use of cache for faster mesage access
    public static final boolean USE_MESSAGE_CACHE = false;

    // Command prefixes for handling specific message types
    @SuppressWarnings("SpellCheckingInspection") //Correct spelling in this spesific case
    public static final String ONLINE_USERS_MESSAGE_PREFIX = "/onlineusers ";
    public static final String JOIN_MESSAGE_PREFIX = "/join ";
    public static final String LEAVE_MESSAGE_SUFFIX = " has left the chat.";
    public static final String CLIENT_DISCONNECT_PREFIX = "/leave ";
    public static final String CHAT_HISTORY_START = "--- Chat History ---";
    public static final String CHAT_HISTORY_END = "--- End of History ---";
    @SuppressWarnings("SpellCheckingInspection") //Correct spelling in this spesific case
    public static final String SERVER_SHUTDOWN_MESSAGE = "/serverclose";

    // Database constants
    public static final int MESSAGE_HISTORY_LIMIT = 50; // Number of recent messages to load
    public static final String DATABASE_URL = "jdbc:sqlite:chat.db";

    //Message database
    public static final String CREATE_MESSAGES_TABLE =
            "CREATE TABLE IF NOT EXISTS messages (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "username TEXT NOT NULL, " +
                    "message TEXT NOT NULL, " +
                    "timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)";
    public static final String INSERT_MESSAGE =
            "INSERT INTO messages (username, message) VALUES (?, ?)";
    public static final String GET_RECENT_MESSAGES =
            "SELECT username, message, timestamp FROM messages " +
                    "ORDER BY timestamp DESC LIMIT ?";

    // Users database
    public static final String CREATE_USERS_TABLE =
            "CREATE TABLE IF NOT EXISTS users (" +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "username TEXT NOT NULL UNIQUE, " +
                    "password_hash VARCHAR(255) NOT NULL, " +
                    "email TEXT NOT NULL UNIQUE)";
    @SuppressWarnings("unused") // Will be implemented
    public static final String INSERT_USER =
            "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
    @SuppressWarnings("unused") // Will be implemented
    public static final String GET_USER_BY_USERNAME =
            "SELECT * FROM users WHERE username = ?";


}
