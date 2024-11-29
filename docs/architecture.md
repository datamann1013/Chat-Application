# Chat Application Architecture Documentation
_Last updated: 2024-01-18T10:15:00Z_

[Back to README](../README.MD)

## System Overview
This document outlines the architectural design of the Java Chat Application, detailing component interactions and responsibilities.

### High Level Architecture
The application follows a client-server architecture with clear separation of concerns:

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

## Network Protocol
```
┌──────────┐                  ┌──────────┐
│  Client  │                  │  Server  │
└────┬─────┘                  └────┬─────┘
     │        JOIN_PREFIX          │
     │─────────────────────────────>
     │                             │
     │     ONLINE_USERS_LIST       │
     │<─────────────────────────────
     │                             │
     │        CHAT_MESSAGE         │
     │─────────────────────────────>
     │                             │
     │        BROADCAST            │
     │<─────────────────────────────
     │                             │
     │        LEAVE_SUFFIX         │
     │─────────────────────────────>
     │                             │
```

