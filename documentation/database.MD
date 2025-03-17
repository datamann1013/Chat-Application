# Database Documentation

[Return to main page](../README.MD)

## Schema Overview

```mermaid
erDiagram
    User {
        int id
        string username
        string password_hash
        string role
        int storage_quota
    }
    File {
        int id
        string filename
        int owner_id
        string encryption_key
        datetime uploaded_at
    }
    Message {
        int id
        int sender_id
        int receiver_id
        string message_content
        datetime sent_at
    }
    User ||--o{ File : owns
    User ||--o{ Message : sends
```

## Tables
### Users
- `id` (Primary Key)
- `username` (Unique)
- `password_hash`
- `role` (One role per user)
- `storage_quota` (Per-user storage limit)

### Files
- `id` (Primary Key)
- `filename`
- `owner_id` (Foreign Key -> Users)
- `encryption_key` (Per-file encryption)
- `uploaded_at` (Timestamp)

### Messages
- `id` (Primary Key)
- `sender_id` (Foreign Key -> Users)
- `receiver_id` (Foreign Key -> Users)
- `message_content`
- `sent_at` (Timestamp)
