
![Chat App Logo](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.techieclues.com%2FImages%2Ftutorial%2Fjava%2Fjava-banner.png&f=1&nofb=1&ipt=e9bda4a8ba03ff5ff2ee2ab6f5406c94cb290a9ca45c2a57ce9263e9a6a68499&ipo=images)

# **Java Chat Application**
![Java](https://img.shields.io/badge/Java-11-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)



Welcome to my first Java Chat Application! This is a simple, real-time chat system built with Java, allowing multiple users to connect, send messages, and interact with one another through a server-client architecture.

---
## Table of content

- [Features](#features)
- [Getting started](#getting-started)
- [How to use](#how-to-use)
- [Known issues / Improvements to be made](#known-issues--improvements-to-be-made)

---

## Features
- 📡 Real-time message broadcasting to all connected clients.
- 🖥️ User-friendly GUI built with Java Swing.
- 🕒 Message timestamps for better conversation tracking.
- 👋 User departure notifications (e.g., "[User] has left the chat.").
- 📱 Simple and intuitive interface.

---

## Getting Started


### Prerequisites
- To run this application, ensure you have:
- Java Development Kit (JDK) 8 or higher installed.
- Basic understanding of command-line tools for starting the server and client.

### Installation
1. Clone the Repository
   ```bash
   git clone https://github.com/datamann1013/javaChatApp
   cd java-chat-application

---

## How to use

### Starting the application

- Run the server first. The server listens on port 5000 by default.
- Then start one or more client instances to connect to the server.

### Joining the chat

- Enter your name in the prompt when starting the client application.
- Begin typing messages in the text field and press Enter to send.

### Exiting the chat

- Click the Exit button to leave the chat. A message will notify others that you have left.

---

## Known issues / Improvements to be made


- The server does not currently handle user authentication.
- If the server disconnects, the clients may not recover gracefully.
- Messages are broadcast to all users without private messaging support.

- Implement private messaging.
- Add user authentication (e.g., username and password).
- Enable multiple chat rooms.
- Improve error handling for server-client disconnections.
- Improve error handling for client side
- Thread safety (background threads for sending messages, ex. SwingWorker)
- Constant UI updates
- User innput validation (Special characters ot length constraints)
- User confirmation to leave the application
- Improve mesasge formatting (Colors for timestamps or names, bold, italian etc.)
- Graceful shutdown
- Application customisation for the user

- Optimisation of code

