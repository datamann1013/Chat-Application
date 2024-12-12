package com.datamannen1013.javachattapp.server;

import com.datamannen1013.javachattapp.server.constants.ServerConstants;

public class ServerMessageHandler {

    private ServerMessageHandler() {
        throw new IllegalStateException("Utility class");
    }

    public static boolean isSystemMessage(String message) {
        return message.startsWith(ServerConstants.ONLINE_USERS_MESSAGE_PREFIX) ||
                message.equals(ServerConstants.CHAT_HISTORY_START) ||
                message.equals(ServerConstants.CHAT_HISTORY_END) ||
                message.startsWith(ServerConstants.CLIENT_DISCONNECT_PREFIX);
    }
}
