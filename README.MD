
![Chat App Logo](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.techieclues.com%2FImages%2Ftutorial%2Fjava%2Fjava-banner.png&f=1&nofb=1&ipt=e9bda4a8ba03ff5ff2ee2ab6f5406c94cb290a9ca45c2a57ce9263e9a6a68499&ipo=images)

# **Java Chat Application**
![Java](https://img.shields.io/badge/Java-20-blue)
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
## Implementations done

v 0.0.2

| Theme                      | Action                                                                                                                |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------|
| Message Formatting         | Improve message formatting to include styles such as colors for timestamps, bold or italic text for names, etc.       |

 v 0.0.1

| Theme                        | Action                                                                                                            |
|------------------------------|-------------------------------------------------------------------------------------------------------------------|
| Real-time Messaging          | Users can send and receive messages in real-time across all connected clients.                                    |
| User -Friendly GUI           | The application features a simple and intuitive graphical user interface built with Java Swing.                   |
| Message Timestamps           | Each message sent includes a timestamp for better tracking of conversations.                                      |
| User Departure Notifications | The application notifies all users when someone leaves the chat (e.g., "[User ] has left the chat.").             |
| Basic User Input Handling    | Users can enter their names and messages, with basic validation to ensure non-empty input.                        |
| Server-Client Architecture   | The application is structured using a server-client model, allowing multiple clients to connect.                  |
| Scrollable Message Area      | The chat messages are displayed in a scrollable text area for easy navigation through conversation history.       |
| User Confirmation on Exit    | Add a confirmation prompt for users when they attempt to leave the application.                                   |

## Known issues / Improvements to be made
| Theme                     | Action                                                                                                                                    |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| Application Customization | Allow users to customize their application experience (e.g., themes, fonts).                                                              |
| User Input Validation     | Validate user inputs to prevent special characters and enforce length constraints for usernames and messages.                             |
| Multiple Chat Rooms       | Enable the creation and management of multiple chat rooms for users to join.                                                              |
| User Authentication       | Implement a secure system for user authentication, including username and password management.                                            |
| Constant UI Updates       | Implement a system for constant updates to the UI to reflect real-time changes and messages.                                              |
| Private Messaging         | Develop a feature for private messaging between users.                                                                                    |
| Graceful Shutdown         | Implement a mechanism for graceful shutdown of the application to ensure all processes are completed properly.                            |
| Code Optimization         | Review and optimize the code for better performance and maintainability.                                                                  |
| Error Handling            | Improve error handling for server-client disconnections to ensure clients can recover gracefully.                                         |
| Error Handling            | Enhance error handling on the client side to manage unexpected issues more effectively.                                                   |
| Thread Safety             | Ensure thread safety in the application, particularly for background tasks like sending messages using SwingWorker or similar constructs. |
