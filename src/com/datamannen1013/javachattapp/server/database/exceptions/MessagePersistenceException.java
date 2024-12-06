package com.datamannen1013.javachattapp.server.database.exceptions;

import com.datamannen1013.javachattapp.server.logger.ServerLogger;

/**
 * Exception thrown when message persistence operations fail.
 * This includes saving, updating, or deleting messages in the database.
 */
public final class MessagePersistenceException extends MessageException {

    /**
     * Error codes for specific message persistence failures
     */
    public enum ErrorCode {
        SAVE_FAILED("MSG_001", "Failed to save message"),
        UPDATE_FAILED("MSG_002", "Failed to update message"),
        DELETE_FAILED("MSG_003", "Failed to delete message"),
        INVALID_MESSAGE("MSG_004", "Invalid message format"),
        DATABASE_ERROR("MSG_005", "Database operation failed"),
        CONSTRAINT_VIOLATION("MSG_006", "Message violates database constraints");

        private final String code;
        private final String defaultMessage;

        ErrorCode(String code, String defaultMessage) {
            this.code = code;
            this.defaultMessage = defaultMessage;
        }

        public String getCode() {
            return code;
        }

        public String getDefaultMessage() {
            return defaultMessage;
        }
    }

    private final ErrorCode errorCode;
    private final String messageId;

    /**
     * Constructs a new MessagePersistenceException with error code and details
     *
     * @param errorCode The specific error code for this exception
     * @param message Detailed error message
     * @param cause The underlying cause of the exception
     * @param messageId The ID of the message that caused the error (if applicable)
     */
    public MessagePersistenceException(ErrorCode errorCode, String message, Throwable cause, String messageId) {
        super(formatMessage(errorCode, message), cause);
        this.errorCode = errorCode;
        this.messageId = messageId;
        logException();
    }

    /**
     * Constructs a new MessagePersistenceException with error code
     *
     * @param errorCode The specific error code for this exception
     * @param message Detailed error message
     * @param cause The underlying cause of the exception
     */
    public MessagePersistenceException(ErrorCode errorCode, String message, Throwable cause) {
        this(errorCode, message, cause, null);
    }

    /**
     * Constructs a new MessagePersistenceException with just an error code
     *
     * @param errorCode The specific error code for this exception
     * @param cause The underlying cause of the exception
     */
    public MessagePersistenceException(ErrorCode errorCode, Throwable cause) {
        this(errorCode, errorCode.getDefaultMessage(), cause);
    }

    /**
     * Formats the error message with the error code and details
     *
     * @param errorCode The error code to include in the message
     * @param message The detailed error message
     * @return Formatted error message
     */
    private static String formatMessage(ErrorCode errorCode, String message) {
        return String.format("[%s] %s", errorCode.getCode(), message);
    }

    /**
     * Logs the exception details using the ServerLogger
     */
    private void logException() {
        String logMessage = String.format(
                "Message persistence error occurred - Code: %s, Message ID: %s, Details: %s",
                errorCode.getCode(),
                messageId != null ? messageId : "N/A",
                getMessage()
        );
        ServerLogger.logError(logMessage, this);
    }

    /**
     * Gets the error code associated with this exception
     *
     * @return The error code
     */
    public ErrorCode getErrorCode() {
        return errorCode;
    }

    /**
     * Gets the ID of the message that caused the error (if applicable)
     *
     * @return The message ID, or null if not applicable
     */
    public String getMessageId() {
        return messageId;
    }

    /**
     * Creates a builder for the exception
     *
     * @return A new ExceptionBuilder instance
     */
    public static ExceptionBuilder builder() {
        return new ExceptionBuilder();
    }

    /**
     * Builder class for creating MessagePersistenceException instances
     */
    public static class ExceptionBuilder {
        private ErrorCode errorCode;
        private String message;
        private Throwable cause;
        private String messageId;

        public ExceptionBuilder errorCode(ErrorCode errorCode) {
            this.errorCode = errorCode;
            return this;
        }

        public ExceptionBuilder message(String message) {
            this.message = message;
            return this;
        }

        public ExceptionBuilder cause(Throwable cause) {
            this.cause = cause;
            return this;
        }

        public ExceptionBuilder messageId(String messageId) {
            this.messageId = messageId;
            return this;
        }

        public MessagePersistenceException build() {
            if (errorCode == null) {
                throw new IllegalStateException("ErrorCode must be specified");
            }

            String finalMessage = message != null ? message : errorCode.getDefaultMessage();
            return new MessagePersistenceException(errorCode, finalMessage, cause, messageId);
        }
    }
}