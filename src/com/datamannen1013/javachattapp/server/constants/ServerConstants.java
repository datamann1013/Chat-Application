package com.datamannen1013.javachattapp.server.constants;

public class ServerConstants {

    // Constants for server address and port
    public static final int SERVER_PORT = 5000;

    // Command prefixes for handling specific message types
    public static final String ONLINE_USERS_MESSAGE_PREFIX = "/onlineusers ";
    public static final String JOIN_MESSAGE_PREFIX = "/join ";
    public static final String LEAVE_MESSAGE_SUFFIX = " has left the chat.";
    public static final String CLIENT_DISCONNECT_PREFIX = "/leave";

    // Database constants
    public static final String DATABASE_URL = "jdbc:sqlite:chat_messages.db";
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
                    "ORDER BY timestamp DESC LIMIT 50";
}
