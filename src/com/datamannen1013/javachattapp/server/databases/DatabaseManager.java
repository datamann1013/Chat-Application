package com.datamannen1013.javachattapp.server.databases;

import com.datamannen1013.javachattapp.server.logger.ServerLogger;
import com.datamannen1013.javachattapp.server.constants.ServerConstants;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class DatabaseManager {
    private static DatabaseManager instance;
    private static final String DB_URL = ServerConstants.DATABASE_URL;

    // Private constructor for singleton pattern
    private DatabaseManager() throws ClassNotFoundException {
        // Load the SQLite driver
        try {
            Class.forName("org.sqlite.JDBC");
            initializeDatabase();
        } catch (ClassNotFoundException e) {
            ServerLogger.logError("SQLite JDBC driver not found: " + e.getMessage(), e);
            throw new ClassNotFoundException("SQLite JDBC driver not found", e);
        }
    }

    // Singleton instance getter
    public static synchronized DatabaseManager getInstance() throws ClassNotFoundException {
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
            ServerLogger.logError("Failed to connect to database: " + e.getMessage(), e);
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
            ServerLogger.logError("Error initializing database: " + e.getMessage(), e);
        }
    }

    // Save message to database
    @SuppressWarnings("SpellCheckingInspection") //Intdended spelling mistake
    public static void saveMessage(String sender, String content) {
        try (Connection conn = getConnection();
            PreparedStatement pstmt = conn.prepareStatement(ServerConstants.INSERT_MESSAGE)){
            ServerLogger.logInfo("Saving message: " + sender + ": " + content);


                pstmt.setString(1, sender);
                pstmt.setString(2, content);
                pstmt.executeUpdate();
        } catch (SQLException e) {
            ServerLogger.logError("Error saving message: " + e.getMessage(), e);
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
    @SuppressWarnings("SpellCheckingInspection") //Intended spellingmistake
    public List<Message> getRecentMessages(int limit) {
        List<Message> messages = new ArrayList<>();

        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(ServerConstants.GET_RECENT_MESSAGES)) {

            pstmt.setInt(1, limit);
            stringBuilder(pstmt, messages);

        } catch (SQLException e) {
            ServerLogger.logError("Error retrieving messages: " + e.getMessage(), e);
        }

        return messages;
    }

    @SuppressWarnings("SpellCheckingInspection") //Intended spellingmistake
    public void stringBuilder(PreparedStatement pstmt, List<Message> messages){
        try (ResultSet rs = pstmt.executeQuery()){
            while (rs.next()) {
                Message message = new Message(
                        rs.getString("username"),
                        rs.getString("message"),
                        rs.getTimestamp("timestamp")
                );
                messages.add(message);
            }
            ServerLogger.logInfo("Array" + messages);
        } catch (SQLException e) {
            ServerLogger.logError("Error retrieving messages: " + e.getMessage(), e);
        }
    }
    // Message data class
        public record Message(String sender, String content, Timestamp timestamp) {
    }
}
