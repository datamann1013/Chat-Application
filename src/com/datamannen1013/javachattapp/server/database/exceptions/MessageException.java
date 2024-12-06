package com.datamannen1013.javachattapp.server.database.exceptions;

public sealed class MessageException extends RuntimeException
        permits MessagePersistenceException, MessageRetrievalException {
    public MessageException(String message, Throwable cause) {
        super(message, cause);
    }
}