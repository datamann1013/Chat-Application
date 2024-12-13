
![Chat App Logo](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.techieclues.com%2FImages%2Ftutorial%2Fjava%2Fjava-banner.png&f=1&nofb=1&ipt=e9bda4a8ba03ff5ff2ee2ab6f5406c94cb290a9ca45c2a57ce9263e9a6a68499&ipo=images)

# **Java Chat Application**
![Java](https://img.shields.io/badge/Java-20-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)



Welcome to my first Java Chat Application! This is a simple, real-time chat system built with Java, allowing multiple users to connect, send messages, and interact with one another through a server-client architecture.

---

## Table of content

- [Documentation](#documentation)
- [Other relevant documents](#other-relevant-documents)
- [Features](#features)
- [Getting started](#getting-started)
- [How to use](#how-to-use)
- [File structure](#file-structure)
- [Implementations done](#implementations-done) 
- [Known issues / Improvements to be made](#known-issues--improvements-to-be-made)

---

## Documentation

- [Database](documentation/database.md)
- [Serverlogger](documentation/serverlogger.md)

---

## Other relevant documents

- [Refactoring of GUI](docs/refactoringGUI.md)
- [Setup](docs/setup.md)

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

## File structure

``` Java

Chat-Application/
├── com.datamannen1013.javachattapp
│   ├── client/
│   │   ├── ChatClient.java
│   │   ├── ChatClientGUI.java
│   │   ├── ChatClientGUI2.java
│   │   ├── ClientMessageHandler.java
│   │   └── gui/
│   │       ├── MessageHandler.java
│   │       ├── ChatWindow.java
│   │       ├── LoginWindow.java
│   │       │   └── constants/
│   │       └── ClientConstants.java
│   │
│   └── server/
│       ├── ChatServer.java
│       ├── ClientHandler.java
│       ├── ServerMessageHandler.java
│       ├── constants/
│       │   └── ClientConstants.java
│       ├── database/
│       │   ├── DatabaseConfig.java
│       │   ├── DatabaseManager.java
│       │   ├── exceptions/
│       │   │   ├── ConnectionException.java
│       │   │   ├── DatabaseException.java
│       │   │   ├── InitializationException.java
│       │   │   ├── MessageException.java
│       │   │   ├── MessagePersistenceException.java
│       │   │   └── MessageRetrievalException.java
│       │   ├── models/
│       │   │   └── Message.java
│       │   └── repository/
│       │       └── MessageRepository.java
│       └── logger/
│           ├── CustomLogFormatter.java
│           ├── LoggerConfiguration.java
│           └── ServerLogger.java
│
└── README.md

```

---

## Implementations done

v 0.0.3

| Theme               | Action                                                                                                                                    |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| Thread Safety       | Ensure thread safety in the application, particularly for background tasks like sending messages using SwingWorker or similar constructs. |
| Logger              | Implemented a logger in the server to improve log reliability and usability                                                               |
| Long-term memory    | Implement a database to store messages                                                                                                    | 
| Users               | Implement users in a database                                                                                                             |
 
v 0.0.2

| Theme                 | Action                                                                                                          |
|-----------------------|-----------------------------------------------------------------------------------------------------------------|
| User Input Validation | Validate user inputs to prevent special characters and enforce length constraints for usernames and messages.   |
| Message Formatting    | Improve message formatting to include styles such as colors for timestamps, bold or italic text for names, etc. |
| Graceful Shutdown     | Implement a mechanism for graceful shutdown of the application to ensure all processes are completed properly.  |
| Error Handling UI     | Enhance error handling on the client By showing error messages to the user                                      |
| Code Optimisation     | Removed the /login tag from adding to the online list and let the server handle it alone through /onlineusers   |
| UI unification        | Have a text box similar to the Online Users                                                                     |
| Error Handling        | Improve error handling for server-client disconnections to ensure clients can recover gracefully.               |
| Error Handling        | Enhance error handling on the client side to manage unexpected issues more effectively.                         |
| UI alteration         | Added a box for just the users name, to make it obvious who's client it is                                      |

 v 0.0.1

| Theme                        | Action                                                                                                           |
|------------------------------|------------------------------------------------------------------------------------------------------------------|
| User Departure Notifications | The application notifies all users when someone leaves the chat (e.g., "[User] has left the chat.").             |
| Server-Client Architecture   | The application is structured using a server-client model, allowing multiple clients to connect.                 |
| Basic User Input Handling    | Users can enter their names and messages, with basic validation to ensure non-empty input.                       |
| User Confirmation on Exit    | Add a confirmation prompt for users when they attempt to leave the application.                                  |
| Scrollable Message Area      | The chat messages are displayed in a scrollable text area for easy navigation through conversation history.      |
| Real-time Messaging          | Users can send and receive messages in real-time across all connected clients.                                   |
| Message Timestamps           | Each message sent includes a timestamp for better tracking of conversations.                                     |
| User-Friendly GUI            | The application features a simple and intuitive graphical user interface built with Java Swing.                  |

## Known issues / Improvements to be made
| Theme                     | Action                                                                                         |
|---------------------------|------------------------------------------------------------------------------------------------|
| Application Customization | Allow users to customize their application experience (e.g., themes, fonts).                   |
| Multiple Chat Rooms       | Enable the creation and management of multiple chat rooms for users to join.                   |
| User Authentication       | Implement a secure system for user authentication, including username and password management. |
| Constant UI Updates       | Implement a system for constant updates to the UI to reflect real-time changes and messages.   |
| Private Messaging         | Develop a feature for private messaging between users.                                         |
| Code Optimization         | Review and optimize the code for better performance and maintainability.                       |
| Message security?         | Implement handshake to make sure client gets message                                           |
| Username mix-up           | Implement session id so that multiple users can have same or similar names                     |
| Log Management            | Implement archiving of logs (database?)                                                        |
| Log Management            | Implement regular log cleanup                                                                  |
| Log Management            | Implement a performance logging tracker                                                        |
| Log Management            | Implement Async logging                                                                        |
| Log management            | Implement Log compression                                                                      |
| Log security              | Make sure logs dont save sensitive data                                                        |
| Log security              | Implement log encryption?                                                                      |
| MessageCache              | Implement a rapid access directory instead of asking database every time                       |
| Encryption                | Implement encryption of passwords for login                                                    |
| Timezone                  | Implement timezones to make sure time works around the world                                   |
| Database                  | Improve Singleton pattern                                                                      |
| Logger                    | Implement logger for client side                                                               |
| Users                     | Implement usage of users                                                                       |



