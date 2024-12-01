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
    public Connection getConnection() throws SQLException {
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
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Save message to database
    public void saveMessage(String sender, String content) {
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(ServerConstants.INSERT_MESSAGE)) {

            pstmt.setString(1, sender);
            pstmt.setString(2, content);
            pstmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }
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
                    messages.add(message);
                }
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
    public static class Message {
        private final String sender;
        private final String content;
        private final Timestamp timestamp;

        public Message(String sender, String content, Timestamp timestamp) {
            this.sender = sender;
            this.content = content;
            this.timestamp = timestamp;
        }

        // Getters
        public String getSender() {
            return sender;
        }

        public String getContent() {
            return content;
        }

        public Timestamp getTimestamp() {
            return timestamp;
        }
    }
}
