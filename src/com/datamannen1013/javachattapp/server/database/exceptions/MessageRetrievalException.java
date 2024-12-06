package com.datamannen1013.javachattapp.server.database.exceptions;


import com.datamannen1013.javachattapp.server.logger.ServerLogger;

/**
 * Exception thrown when message retrieval operations fail.
 * This includes reading messages from the database and related query operations.
 */
public final class MessageRetrievalException extends MessageException {

    /**
     * Error codes for specific message retrieval failures
     */
    public enum ErrorCode {
        QUERY_FAILED("RET_001", "Failed to execute message query"),
        NO_RESULTS("RET_002", "No messages found"),
        INVALID_QUERY("RET_003", "Invalid query parameters"),
        CONNECTION_ERROR("RET_004", "Database connection error during retrieval"),
        MAPPING_ERROR("RET_005", "Error mapping database result to message"),
        PAGINATION_ERROR("RET_006", "Error during message pagination"),
        TIMEOUT_ERROR("RET_007", "Query timeout exceeded"),
        RESULT_SET_ERROR("RET_008", "Error processing result set");

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
    private final QueryDetails queryDetails;

    /**
     * Contains details about the query that caused the exception
     */
    public static class QueryDetails {
        private final String queryType;
        private final int limit;
        private final String filterCriteria;
        private final long executionTime;

        private QueryDetails(Builder builder) {
            this.queryType = builder.queryType;
            this.limit = builder.limit;
            this.filterCriteria = builder.filterCriteria;
            this.executionTime = builder.executionTime;
        }

        public static class Builder {
            private String queryType;
            private int limit;
            private String filterCriteria;
            private long executionTime;

            public Builder queryType(String queryType) {
                this.queryType = queryType;
                return this;
            }

            public Builder limit(int limit) {
                this.limit = limit;
                return this;
            }

            public Builder filterCriteria(String filterCriteria) {
                this.filterCriteria = filterCriteria;
                return this;
            }

            public Builder executionTime(long executionTime) {
                this.executionTime = executionTime;
                return this;
            }

            public QueryDetails build() {
                return new QueryDetails(this);
            }
        }

        @Override
        public String toString() {
            return String.format("QueryDetails{type=%s, limit=%d, criteria=%s, executionTime=%dms}",
                    queryType, limit, filterCriteria, executionTime);
        }
    }

    /**
     * Constructs a new MessageRetrievalException with full details
     */
    public MessageRetrievalException(ErrorCode errorCode, String message,
                                     Throwable cause, QueryDetails queryDetails) {
        super(formatMessage(errorCode, message), cause);
        this.errorCode = errorCode;
        this.queryDetails = queryDetails;
        logException();
    }

    /**
     * Constructs a new MessageRetrievalException without query details
     */
    public MessageRetrievalException(ErrorCode errorCode, String message, Throwable cause) {
        this(errorCode, message, cause, null);
    }

    /**
     * Constructs a new MessageRetrievalException with just an error code
     */
    public MessageRetrievalException(ErrorCode errorCode, Throwable cause) {
        this(errorCode, errorCode.getDefaultMessage(), cause);
    }

    /**
     * Formats the error message with the error code and details
     */
    private static String formatMessage(ErrorCode errorCode, String message) {
        return String.format("[%s] %s", errorCode.getCode(), message);
    }

    /**
     * Logs the exception details using the ServerLogger
     */
    private void logException() {
        StringBuilder logMessage = new StringBuilder()
                .append("Message retrieval error occurred - ")
                .append("Code: ").append(errorCode.getCode())
                .append(", Details: ").append(getMessage());

        if (queryDetails != null) {
            logMessage.append(", Query: ").append(queryDetails);
        }

        ServerLogger.logError(logMessage.toString(), this);
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public QueryDetails getQueryDetails() {
        return queryDetails;
    }

    /**
     * Creates a builder for the exception
     */
    public static ExceptionBuilder builder() {
        return new ExceptionBuilder();
    }

    /**
     * Builder class for creating MessageRetrievalException instances
     */
    public static class ExceptionBuilder {
        private ErrorCode errorCode;
        private String message;
        private Throwable cause;
        private QueryDetails queryDetails;

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

        public ExceptionBuilder queryDetails(QueryDetails queryDetails) {
            this.queryDetails = queryDetails;
            return this;
        }

        public MessageRetrievalException build() {
            if (errorCode == null) {
                throw new IllegalStateException("ErrorCode must be specified");
            }

            String finalMessage = message != null ? message : errorCode.getDefaultMessage();
            return new MessageRetrievalException(errorCode, finalMessage, cause, queryDetails);
        }
    }
}
