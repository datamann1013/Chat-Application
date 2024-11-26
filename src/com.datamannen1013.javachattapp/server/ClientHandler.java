package com.datamannen1013.javachattapp.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.List;
import java.util.Set;
import java.util.Collections;

public class ClientHandler implements Runnable {
    private String userName;
    private Socket clientSocket;
    private Set<ClientHandler> clients;
    private PrintWriter out;
    private BufferedReader in;

    public ClientHandler(Socket socket, Set<ClientHandler> clients, String message) throws IOException {
        this.clientSocket = socket;
        this.clients = clients;
        this.userName = message.replace("/join", "").trim();
        this.out = new PrintWriter(clientSocket.getOutputStream(), true);
        this.in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        synchronized (clients) {
            clients.add(this);
            // Send current online users
            String onlineUsersMessage = "/onlineusers " + getOnlineUsers();
            System.out.println(onlineUsersMessage);
            broadcastMessage(onlineUsersMessage);
        }
    }

    private String getOnlineUsers() {
        StringBuilder onlineUsers = new StringBuilder();
        synchronized (clients) {
            for (ClientHandler client : clients) {
                onlineUsers.append(client.getUserName()).append(",");
            }
        }
        // Remove trailing comma if exists
        if (onlineUsers.length() > 0) {
            onlineUsers.setLength(onlineUsers.length() - 1);
        }
        return onlineUsers.toString();
    }

    private String getUserName() {
        return this.userName;
    }

    public void run() {
        try {
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                if (inputLine.endsWith(" has left the chat.")) {
                    // Handle client disconnection
                    disconnect();
                }
                broadcastMessage(inputLine);
            }
        } catch (IOException e) {
            System.out.println("An error occurred: " + e.getMessage());
        } finally {
            disconnect();
        }
    }

    private void broadcastMessage(String message) {
        synchronized (clients) {
            for (ClientHandler aClient : clients) {
                aClient.sendMessage(message);
            }
        }
    }

    void sendMessage(String message) {
        try {
            out.println(message);
        } catch (Exception e) {
            System.out.println("Error sending message: " + e.getMessage());
        }
    }

    private void disconnect() {
        try {
            synchronized (clients) {
                clients.remove(this);
                String onlineUsersMessage = "/onlineusers " + getOnlineUsers();
                broadcastMessage(onlineUsersMessage);
            }
            in.close();
            out.close();
            clientSocket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}