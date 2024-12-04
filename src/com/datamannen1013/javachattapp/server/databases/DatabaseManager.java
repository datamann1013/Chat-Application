package com.datamannen1013.javachattapp.server.databases;

import com.datamannen1013.javachattapp.server.constants.ServerConstants;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseManager {
    private static DatabaseManager instance;
    private static final String DB_URL = ServerConstants.DATABASE_URL;

    // Private constructor for singleton pattern
    private DatabaseManager() {
        // Load the SQLite driver
        try {
            Class.forName("org.sqlite.JDBC");
            initializeDatabase();
        } catch (ClassNotFoundException e) {
            System.err.println("SQLite JDBC driver not found: " + e.getMessage());
            throw new RuntimeException("SQLite JDBC driver not found", e);
        }
    }

    // Singleton instance getter
    public static synchronized DatabaseManager getInstance() {
        if (instance == null) {
            instance = new DatabaseManager();
        }
        return instance;
    }

    // Get database connection
    public static Connection getConnection() throws SQLException {
        try {
            return DriverManager.getConnection(DB_URL);
        } catch (SQLException e) {
            System.err.println("Failed to connect to database: " + e.getMessage());
            throw e;
        }
    }

    // Initialize database and create tables
    private void initializeDatabase() {
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {
                stmt.execute(ServerConstants.CREATE_MESSAGES_TABLE);
                stmt.execute(ServerConstants.CREATE_USERS_TABLE);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Save message to database
    @SuppressWarnings("SpellCheckingInspection") //Intdended spelling mistake
    public static void saveMessage(String sender, String content) {
        try (Connection conn = getConnection();
            PreparedStatement pstmt = conn.prepareStatement(ServerConstants.INSERT_MESSAGE)){
            System.out.println("Saving message: " + sender + ": " + content);


                pstmt.setString(1, sender);
                pstmt.setString(2, content);
                pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    //Extracts message from transmission
    public static String extractMessageContent(String fullContent) {
        // Find the position after the colon and space
        int colonPosition = fullContent.indexOf(": ");
        if (colonPosition != -1) {
            // Return everything after the ": "
            return fullContent.substring(colonPosition + 2);
        }
        return fullContent; // Return original if format doesn't match
    }

    // Get recent messages
    public List<Message> getRecentMessages(int limit) {
        List<Message> messages = new ArrayList<>();

        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(ServerConstants.GET_RECENT_MESSAGES)) {

            pstmt.setInt(1, limit);
            try (ResultSet rs = pstmt.executeQuery()){
                while (rs.next()) {
                    Message message = new Message(
                            rs.getString("username"),
                            rs.getString("message"),
                            rs.getTimestamp("timestamp")
                    );
                    messages.add(message);/*static void sendRecentMessagesToClient(ClientHandler client) {
        System.out.println("Starting to send history to client: " + client.getUserName());
        try {
            List<DatabaseManager.Message> recentMessages = dbManager.getRecentMessages(ServerConstants.MESSAGE_HISTORY_LIMIT);
            System.out.println("Retrieved " + recentMessages.size() + " messages from database");

            // Send a header to indicate history messages
            client.sendMessage("--- Chat History ---");

            // Send messages in chronological order (oldest first)
            Collections.reverse(recentMessages); // Reverse since we got them in DESC order
            for (DatabaseManager.Message msg : recentMessages) {
                String formattedTime = new SimpleDateFormat("HH:mm:ss").format(msg.timestamp());
                client.sendMessage(msg.sender() + " [" + formattedTime + "] " + msg.content());
            }

            client.sendMessage("--- End of History ---");
            System.out.println("Finished sending history to client: " + client.getUserName());

        } catch (Exception e) {
            System.err.println("Error sending message history to client: " + e.getMessage());
        }
    }*/
                }
                System.out.println("Array" + messages);
            } catch (SQLException e) {
                System.err.println("Error retrieving messages: " + e.getMessage());
                e.printStackTrace();
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return messages;
    }

    // Message data class
        public record Message(String sender, String content, Timestamp timestamp) {
    }
}
