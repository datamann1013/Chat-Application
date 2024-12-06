package com.datamannen1013.javachattapp.server.database.exceptions;

public final class ConnectionException extends DatabaseException {
    public ConnectionException(String message, Throwable cause) {
        super(message, cause);
    }
}
