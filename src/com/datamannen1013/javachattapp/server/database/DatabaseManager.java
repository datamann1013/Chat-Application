package com.datamannen1013.javachattapp.server.database;

import com.datamannen1013.javachattapp.server.constants.ServerConstants;
import com.datamannen1013.javachattapp.server.database.exceptions.ConnectionException;
import com.datamannen1013.javachattapp.server.database.exceptions.InitializationException;
import com.datamannen1013.javachattapp.server.database.repository.MessageRepository;

import java.sql.*;

/**
 * Manages database connections and initialization.
 * Implements singleton pattern for database connection management.
 */
public class DatabaseManager {
    private static DatabaseManager instance;
    private final MessageRepository messageRepository;

    private DatabaseManager() {
        initializeDatabaseDriver();
        initializeDatabase();
        this.messageRepository = new MessageRepository(this);
    }

    public static synchronized DatabaseManager getInstance() {
        if (instance == null) {
            instance = new DatabaseManager();
        }
        return instance;
    }

    private void initializeDatabaseDriver() {
        try {
            Class.forName(DatabaseConfig.getJdbcDriver());
        } catch (ClassNotFoundException e) {
            throw new InitializationException("Failed to load JDBC driver", e);
        }
    }

    public Connection getConnection() {
        try {
            return DriverManager.getConnection(DatabaseConfig.getDbUrl());
        } catch (SQLException e) {
            throw new ConnectionException("Failed to establish database connection", e);
        }
    }

    private void initializeDatabase() {
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {
            createDatabaseSchema(stmt);
        } catch (SQLException e) {
            throw new InitializationException("Failed to initialize database", e);
        }
    }

    private void createDatabaseSchema(Statement stmt) throws SQLException {
        stmt.execute(ServerConstants.CREATE_MESSAGES_TABLE);
        stmt.execute(ServerConstants.CREATE_USERS_TABLE);
    }

    public MessageRepository getMessageRepository() {
        return messageRepository;
    }

    /**
     * Utility method to extract message content from full transmission
     */
    public static String extractMessageContent(String fullContent) {
        int colonPosition = fullContent.indexOf(": ");
        return colonPosition != -1 ?
                fullContent.substring(colonPosition + 2) :
                fullContent;
    }
}