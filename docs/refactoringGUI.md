# Chat Application GUI Refactoring Documentation
_Last updated: 2024-01-18T10:15:00_

[Return to README](../README.MD)

## Table of Contents
1. [Introduction](#introduction)
2. [Class Structure](#class-structure)
3. [Component Interaction Diagram](#component-interaction-diagram)
4. [Message Flow](#message-flow)
5. [Style Management](#style-management)
6. [Benefits of New Structure](#benefits-of-new-structure)
7. [Code Examples](#code-examples)
8. [Troubleshooting](#troubleshooting)
9. [Performance Considerations](#performance-considerations)
10. [Migration Guide](#migration-guide)

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

## Code Examples

### ChatWindow
```java
public class ChatWindow extends JFrame {
    private ChatClient chatClient;
    private final MessageHandler messageHandler;

    public ChatWindow(String username) {
        // ... initialization code ...
        this.chatClient = new ChatClient(username, this::onMessageReceived);
        this.messageHandler = new MessageHandler(chatArea);
    }

    private void onMessageReceived(String message) {
        SwingUtilities.invokeLater(() -> messageHandler.handleMessage(message));
    }

    private void sendMessage() {
        String message = inputField.getText();
        chatClient.sendMessage(message);
        inputField.setText("");
    }
}
```

### MessageHandler
```java
public class MessageHandler {
    private final JTextPane chatArea;

    public MessageHandler(JTextPane chatArea) {
        this.chatArea = chatArea;
    }

    public void handleMessage(String message) {
        // Parse message and apply appropriate style
        StyledDocument doc = chatArea.getStyledDocument();
        // ... styling logic ...
        try {
            doc.insertString(doc.getLength(), formattedMessage, style);
        } catch (BadLocationException e) {
            e.printStackTrace();
        }
    }
}
```

## Troubleshooting
1. Message not displaying:
   - Check if MessageHandler is properly initialized
   - Verify that the chatArea reference is correct
2. Styling issues:
   - Ensure all required styles are defined in MessageHandler
   - Check for any exceptions in the console related to styling
3. Performance issues:
   - Monitor memory usage, especially with large chat histories
   - Consider implementing chat history pagination

## Performance Considerations
1. Message Batching: For high-volume chats, consider batching messages before updating the UI
2. Lazy Loading: Implement lazy loading for chat history to improve initial load times
3. Efficient Styling: Use StyleContext for shared styles to reduce memory usage
4. Background Processing: Handle message formatting in a background thread to keep UI responsive

## Migration Guide
To migrate from the old structure to the new refactored structure:

1. Extract message handling logic from ChatWindow to MessageHandler
2. Update ChatWindow to use MessageHandler for displaying messages
3. Modify ChatClient to use callback for received messages
4. Update any direct chatArea manipulations to use MessageHandler methods
5. Refactor styling code to be centralized in MessageHandler
6. Update tests to reflect new structure and responsibilities
7. Review and update any plugins or extensions to work with new structure

Steps:
1. Create MessageHandler class
2. Move relevant methods and fields from ChatWindow to MessageHandler
3. Update ChatWindow constructor to initialize MessageHandler
4. Replace direct chatArea updates with MessageHandler method calls
5. Update ChatClient to accept a message callback
6. Refactor ChatWindow to implement the callback and delegate to MessageHandler
7. Run tests and fix any broken functionality
8. Update documentation to reflect new structure
