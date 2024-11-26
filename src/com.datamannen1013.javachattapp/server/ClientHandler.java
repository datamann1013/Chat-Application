package com.datamannen1013.javachattapp.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.List;

public class ClientHandler implements Runnable {
    public String userName;
    private Socket clientSocket;
    private List<ClientHandler> clients;
    public PrintWriter out;
    private BufferedReader in;

    public ClientHandler(Socket socket, List<ClientHandler> clients, String message) throws IOException {
        this.clientSocket = socket;
        this.clients = clients;
        this.userName = message.replace("/join", "");
        this.out = new PrintWriter(clientSocket.getOutputStream(), true);
        this.in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        clients.add(this);

        // Send current online users
        String onlineUsersMessage = "/onlineusers " + getOnlineUsers();
        System.out.println(onlineUsersMessage);
        ChatServer.broadcastMessage(onlineUsersMessage);
        out = new PrintWriter(clientSocket.getOutputStream(), true);
    }

    private String getOnlineUsers() {
        StringBuilder onlineUsers = new StringBuilder();
        for (ClientHandler client : clients) {
            onlineUsers.append(client.getUserName()).append(",");
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
                // Broadcast message to all clients
                for (ClientHandler aClient : clients) {
                    aClient.out.println(inputLine);
                }
            }
        } catch (IOException e) {
            System.out.println("An error occurred: " + e.getMessage());
        } finally {
            try {
                in.close();
                out.close();
                clientSocket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void sendMessage(String message) {
            try {
                out.println(message);
            } catch (Exception e) {
                System.out.println("Error sending message: " + e.getMessage());
            }
    }
}
