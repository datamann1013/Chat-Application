package com.datamannen1013.javachattapp.server.database.exceptions;

public sealed class DatabaseException extends RuntimeException
        permits ConnectionException, InitializationException {
    public DatabaseException(String message, Throwable cause) {
        super(message, cause);
    }
}

