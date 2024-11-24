package com.datamannen1013.javachattapp.client;

import com.datamannen1013.javachattapp.server.ClientHandler;

import java.io.*;
import java.net.*;
import java.util.function.Consumer;
import java.util.List;

public class ChatClient {
    private Socket clientSocket;
    private List<ClientHandler> clients;
    private Socket socket;
    private BufferedReader in;
    private PrintWriter out;
    private Consumer<String> onMessageReceived;
    private String userName;

    String serverAddress = "127.0.0.1";
    int serverPort = 5000;



    public ChatClient(Socket clientSocket, List<ClientHandler> clients, String serverAddress, int serverPort, String userName, Consumer<String> onMessageReceived) throws IOException {
        this.clientSocket = clientSocket;
        this.clients = clients;
        this.socket = new Socket(serverAddress, serverPort);
        this.in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        this.out = new PrintWriter(socket.getOutputStream(), true);
        this.onMessageReceived = onMessageReceived;
        this.userName = userName;
    }

    public ChatClient(String serverAddress, int serverPort, String userName, Consumer<String> onMessageReceived) {
        this.serverAddress = serverAddress;
        this.serverPort = serverPort;
        this.userName = userName;
        this.onMessageReceived = onMessageReceived;
        try {
            this.socket = new Socket(serverAddress, serverPort);
            this.in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            this.out = new PrintWriter(socket.getOutputStream(), true);
            out.println("/join " + userName);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void sendMessage(String msg) {
        out.println(msg);
    }

    public void startClient() {
        new Thread(() -> {
            try {
                String line;
                while ((line = in.readLine()) != null) {
                    onMessageReceived.accept(line);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }).start();
    }
    public void userJoined(String userName) {
        for (ClientHandler client : clients) {
            client.out.println("User joined: " + userName);
            client.out.println("Online users: " + getOnlineUsers());
        }
    }

    public void userLeft(String userName) {
        for (ClientHandler client : clients) {
            client.out.println("User left: " + userName);
            client.out.println("Online users: " + getOnlineUsers());
        }
    }

    private String getOnlineUsers() {
        StringBuilder onlineUsers = new StringBuilder();
        for (ClientHandler client : clients) {
            onlineUsers.append(client.userName).append(",");
        }
        return onlineUsers.toString();
    }
    public void ClientHandler(Socket clientSocket, List<ClientHandler> clients) throws IOException {
        this.clientSocket = clientSocket;
        this.clients = clients;
        this.in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        this.out = new PrintWriter(clientSocket.getOutputStream(), true);
        this.userName = in.readLine();
    }

}