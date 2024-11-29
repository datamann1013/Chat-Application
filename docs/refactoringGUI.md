# Chat Application GUI Refactoring Documentation
_Last updated: 2024-01-18T10:15:00Z_

[Back to README](../README.MD)

## Introduction
This document describes the refactoring of the chat application, focusing on separating concerns and improving code organization. The main goal was to extract message handling logic from the ChatWindow class into a dedicated MessageHandler class.

## Class Structure

### ChatWindow
- Primary responsibility: GUI management and user interaction
- Manages window components and layout
- Handles user input and basic window operations
- Coordinates communication between UI and ChatClient

### MessageHandler
- Primary responsibility: Message processing and display
- Manages message formatting and styling
- Handles different message types (chat messages, online users updates)
- Controls the display of messages in the chat area

### ChatClient
- Primary responsibility: Network communication
- Manages connection to the server
- Handles message sending and receiving
- Provides callback mechanism for received messages

## Component Interaction Diagram
```
┌─────────────┐    messages     ┌─────────────┐
│             │ ───────────────►│             │
│ ChatWindow  │                 │MessageHandler│
│             │◄──────────────  │             │
└─────────────┘   updates UI    └─────────────┘
       ▲                              
       │                              
       │ network                      
       │ events                       
       ▼                              
┌─────────────┐                       
│ ChatClient  │                       
│             │                       
└─────────────┘                       
```

## Message Flow
1. User inputs message in ChatWindow
2. ChatWindow sends message via ChatClient
3. ChatClient receives response from server
4. ChatWindow delegates message to MessageHandler
5. MessageHandler processes and displays the message

## Style Management
- Moved from ChatWindow to MessageHandler
- Centralizes all styling logic
- Three distinct styles:
  - Timestamp style
  - Username style
  - Message style

## Benefits of New Structure
1. Improved separation of concerns
2. Better code organization
3. Easier maintenance and testing
4. Reduced coupling between components
5. Clearer responsibility boundaries