package com.datamannen1013.javachattapp.server.constants;

public class ServerConstants {

    // Constants for server address and port
    public static final int SERVER_PORT = 5000;

    // Command prefixes for handling specific message types
    public static final String ONLINE_USERS_MESSAGE_PREFIX = "/onlineusers ";
    public static final String JOIN_MESSAGE_PREFIX = "/join ";
    public static final String LEAVE_MESSAGE_SUFFIX = " has left the chat.";
    public static final String CLIENT_DISCONNECT_PREFIX = "/leave";
}
