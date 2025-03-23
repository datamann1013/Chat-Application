# Use Case Diagrams

[Return to main page](../README.MD)

## User Authentication Use Case
```mermaid
graph TD
    User -->|Enters credentials| AuthSystem[Custom Authentication System]
    AuthSystem -->|Validates| DB[(PostgreSQL)]
    AuthSystem -->|Generates| Token[JWT Token]
    Token --> User
```

## File Management Use Case
```mermaid
graph TD
User -->|Selects file| FileSystem[File Upload Component]
FileSystem -->|Uploads & Encrypts| EncryptionService[Encryption Service]
EncryptionService -->|Stores metadata| DB[(PostgreSQL)]
FileSystem -->|Saves file| Storage[CephFS Storage]
```

## File Sharing Use Case
```mermaid
graph TD
    User -->|Selects file to share| FileSystem
    FileSystem -->|Sets permissions| SharingService[File Sharing Service]
    SharingService -->|Notifies recipient| Notification[Notification System]
```

## Chat Functionality Use Case
```mermaid
graph TD
    User -->|Initiates chat| ChatService[Chat Controller]
    ChatService -->|Sends message| WebSocket[Real-Time WebSocket Service]
    WebSocket -->|Delivers message| Recipient[Other User]
```

## Security Use Case
```mermaid
graph TD
    User -->|Uploads file| EncryptionService
    EncryptionService -->|Encrypts file with unique key| FileEncryption[File Encryption]
    FileEncryption -->|Encrypts key with master key| KeyEncryption[Master Key Encryption]
```

## Real-Time Updates Use Case
```mermaid
graph TD
    User -->|Receives updates| WebSocket
    WebSocket -->|Real-time notifications| User
```

## User Management Use Case
```mermaid
graph TD
    Superuser -->|Views user list| AdminPanel[Admin Dashboard]
    AdminPanel -->|Approves/Rejects accounts| AuthSystem
```

## Notification Use Case

```mermaid
graph TD
    User -->|Receives notification| Notification
    Notification -->|Opens file/chat| User
```

## Search Functionality Use Case
```mermaid
graph TD
    User -->|Searches for files/messages| SearchService[Search Component]
    SearchService -->|Returns results| User
```

## User Preferences Use Case
```mermaid
graph TD
    User -->|Customizes settings| Preferences[Preferences Component]
    Preferences -->|Saves to DB| DB[(PostgreSQL)]
```