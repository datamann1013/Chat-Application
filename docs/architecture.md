# Chat Application Architecture Documentation
_Last updated: 2024-01-18T10:15:00_

[Return to README](../README.MD)

## Table of Contents
1. [System Overview](#system-overview)
2. [Component Responsibilities](#component-responsibilities)
3. [Network Protocol](#network-protocol)
4. [Error Handling](#error-handling)
5. [Deployment Instructions](#deployment-instructions)
6. [System Requirements](#system-requirements)

## System Overview
This document outlines the architectural design of the Java Chat Application, detailing component interactions and responsibilities.

### High Level Architecture
The application follows a client-server architecture with a clear separation of concerns:

```
┌─────────────────┐         ┌─────────────────┐
│   Client Side   │◄───────►│   Server Side   │
└─────────────────┘   TCP   └─────────────────┘
```
## Component Responsibilities

### Server Components
1. ChatServer
   - Main server process
   - Manages client connections
   - Coordinates message broadcasting

2. ClientHandler
   - Handles individual client connections
   - Manages message routing
   - Maintains client state

### Client Components
1. ChatClient
   - Network communication layer
   - Message sending/receiving
   - Connection management

2. ChatWindow
   - Main GUI interface
   - User interaction handling
   - Message display

3. MessageHandler
   - Message formatting
   - Display management
   - State updates
The application uses a simple text-based protocol for communication:


## Network Protocol
```
┌──────────┐                  ┌──────────┐
│  Client  │                  │  Server  │
└────┬─────┘                  └────┬─────┘
     │     JOIN:<username>         │
     │─────────────────────────────>
     │                             │
     │ USERS:<user1,user2,user3>   │
     │<─────────────────────────────
     │                             │
     │  MSG:<username>:<message>   │
     │─────────────────────────────>
     │                             │
     │  MSG:<username>:<message>   │
     │<─────────────────────────────
     │                             │
     │    LEAVE:<username>         │
     │─────────────────────────────>
     │                             │
```

### Message Formats
- Join: `JOIN:<username>`
- Users List: `USERS:<comma-separated-usernames>`
- Chat Message: `MSG:<username>:<message>`
- Leave: `LEAVE:<username>`

## Error Handling
The application implements robust error handling to ensure stability:

1. Connection Errors:
   - Retry connection with exponential backoff
   - Display user-friendly error messages

2. Message Parsing Errors:
   - Log invalid messages
   - Ignore malformed messages to prevent crashes

3. Server Errors:
   - Implement proper error codes (e.g., 4xx for client errors, 5xx for server errors)
   - Provide detailed error messages in server logs

4. Client-side Validation:
   - Sanitize user inputs to prevent injection attacks
   - Implement length limits on messages and usernames

## Deployment Instructions
1. Build the application:
   ```
   ./gradlew build
   ```
2. Package the server:
   ```
   ./gradlew packageServer
   ```
3. Package the client:
   ```
   ./gradlew packageClient
   ```
4. Deploy the server:
   ```
   java -jar chat-server.jar
   ```
5. Distribute the client:
   ```
   java -jar chat-client.jar
   ```

## System Requirements
- Java Runtime Environment (JRE) 11 or higher
- Minimum 2GB RAM for server
- 100MB free disk space
- Network connectivity (TCP/IP)
