# User Stories

[Return to main page](../README.MD)

## User Authentication
- **As a user,** I want to register and log in using my custom account so that I can securely access the system.
  - *Acceptance Criteria:*  
    - The system must hash passwords using Argon2.
    - Accounts must be manually approved by a superuser.
    - Users receive a JWT upon successful login.

- **As a superuser,** I want to manually approve user accounts so that only authorized users gain access.
  - *Acceptance Criteria:*  
    - A dashboard displays pending accounts.
    - Superusers can approve or reject accounts.

## File Management
- **As a user,** I want to upload files so that I can store and share them.
  - *Acceptance Criteria:*  
    - Users can select and upload files.
    - The system encrypts files before storage.
    - Uploads fail if the user’s storage quota is exceeded.

- **As a user,** I want to download files so that I can access my data locally.
  - *Acceptance Criteria:*  
    - Files are decrypted upon download.
    - The correct file is retrieved from storage.

## File Sharing
- **As a user,** I want to share files with specific users so that I can control access.
  - *Acceptance Criteria:*  
    - Users can set sharing permissions (view/download).
    - Shared files trigger notifications to recipients.

- **As a user,** I want to revoke file access so that I can control file distribution.
  - *Acceptance Criteria:*  
    - Users can remove access permissions.
    - Affected users can no longer view/download the file.

## Chat Functionality
- **As a user,** I want to send and receive chat messages in real time so that I can communicate efficiently.
  - *Acceptance Criteria:*  
    - Messages are sent via WebSockets.
    - Chat history is stored and retrievable.

- **As a user,** I want to send images stored in the system via chat so that I can share visual content securely.
  - *Acceptance Criteria:*  
    - Only internally stored images can be sent.
    - The system rejects external image URLs.

## Security
- **As a user,** I want my files to be encrypted so that my data is protected from unauthorized access.
  - *Acceptance Criteria:*  
    - Files are encrypted using unique keys.
    - Encryption keys are themselves encrypted with a master key.
    - Superusers can decrypt files if necessary.

- **As a user,** I want my chat messages to be encrypted so that they remain confidential.
  - *Acceptance Criteria:*  
    - Messages are encrypted end-to-end.
    - Only intended recipients can decrypt messages.

## Real-Time Updates
- **As a user,** I want to receive real-time updates in my chat so that I am always aware of new messages.
  - *Acceptance Criteria:*  
    - New messages appear instantly without manual refresh.
    - WebSocket connections are maintained while the site is active.

## User Management
- **As a superuser,** I want to view, deactivate, and reactivate user accounts so that I can manage system access.
  - *Acceptance Criteria:*  
    - A user management dashboard displays all accounts.
    - Superusers can change the status of any account.

## Notifications
- **As a user,** I want to receive notifications for new file shares and chat messages so that I stay informed.
  - *Acceptance Criteria:*  
    - Notifications are triggered by sharing events and incoming messages.
    - Users can view notification details and navigate to the related content.

## Search Functionality
- **As a user,** I want to search for files and messages so that I can quickly find specific content.
  - *Acceptance Criteria:*  
    - A search bar returns relevant files and chat messages.
    - Results include file names, dates, and message snippets.

## User Preferences
- **As a user,** I want to customize my notification settings and profile information so that the system meets my needs.
  - *Acceptance Criteria:*  
    - Users can update their profile details.
    - Notification preferences can be toggled on or off.

