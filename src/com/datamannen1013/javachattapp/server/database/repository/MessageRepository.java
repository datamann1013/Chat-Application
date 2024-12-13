package com.datamannen1013.javachattapp.server.database.repository;

import com.datamannen1013.javachattapp.server.constants.ServerConstants;
import com.datamannen1013.javachattapp.server.database.DatabaseManager;
import com.datamannen1013.javachattapp.server.database.exceptions.MessagePersistenceException;
import com.datamannen1013.javachattapp.server.database.exceptions.MessageRetrievalException;
import com.datamannen1013.javachattapp.server.database.models.Message;
import com.datamannen1013.javachattapp.server.logger.ServerLogger;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MessageRepository {
    private static DatabaseManager databaseManager = null;

    public MessageRepository(DatabaseManager databaseManager) {
        this.databaseManager = databaseManager;
    }

    public static void saveMessage(String sender, String content) {
        try (Connection conn = databaseManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(ServerConstants.INSERT_MESSAGE)) {

            pstmt.setString(1, sender);
            pstmt.setString(2, content);
            pstmt.executeUpdate();

            ServerLogger.logInfo("Message saved successfully from: " + sender);
        } catch (SQLException e) {
            throw MessagePersistenceException.builder()
                    .errorCode(MessagePersistenceException.ErrorCode.SAVE_FAILED)
                    .message("Failed to save message from " + sender)
                    .cause(e)
                    .build();
        }
    }

    public static List<Message> getRecentMessages(int limit) throws SQLException {
        try (Connection conn = databaseManager.getConnection();
             PreparedStatement pstmt = prepareRecentMessagesQuery(conn, limit)) {

            return executeMessageQuery(pstmt);
        } catch (SQLException e) {
            MessageRetrievalException.QueryDetails queryDetails = new MessageRetrievalException.QueryDetails.Builder()
                    .queryType("RECENT_MESSAGES")
                    .limit(limit)
                    .executionTime(System.currentTimeMillis()) // Could be done in reference to start-time
                    .build();

            throw MessageRetrievalException.builder()
                    .errorCode(MessageRetrievalException.ErrorCode.QUERY_FAILED)
                    .message("Failed to retrieve recent messages")
                    .cause(e)
                    .queryDetails(queryDetails)
                    .build();
        }
    }

    private static PreparedStatement prepareRecentMessagesQuery(Connection conn, int limit)
            throws SQLException {
        PreparedStatement pstmt = conn.prepareStatement(ServerConstants.GET_RECENT_MESSAGES);
        pstmt.setInt(1, limit);
        return pstmt;
    }

    private static List<Message> executeMessageQuery(PreparedStatement pstmt) throws SQLException {
        List<Message> messages = new ArrayList<>();
        try (ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                messages.add(createMessageFromResultSet(rs));
            }
        }
        return messages;
    }

    private static Message createMessageFromResultSet(ResultSet rs) throws SQLException {
        return new Message(
                rs.getString("id"),
                rs.getString("username"),
                rs.getString("message"),
                rs.getTimestamp("timestamp")
        );
    }
}
