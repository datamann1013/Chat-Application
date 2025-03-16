# Chatting & File Sharing Service

## Overview
This project is a peer-to-peer file sharing and chat service built with .NET for the backend and React for the frontend. 
It enables users to upload, store, and share encrypted files while maintaining real-time chat functionality.

## Features

- User Authentication & Roles 
  - Custom authentication system using .NET components
  - Password hashing with Argon2 
  - Manual account approval by a superuser 
  - Single-role system (each account has exactly one role)
- File Storage & Encryption 
  - Each file is encrypted with a per-file encryption key, which is encrypted using a master key 
  - Per-user encryption keys stored securely in the database (with extra security measures)
  - Files are encrypted both in transit and at rest 
  - Superuser access to all files
- Uploads & Downloads
  - System decides synchronous vs. event-driven based on system load and network conditions 
  - Superuser can manually override upload handling 
  - Uploads are resumable only if the system detects the file after a connection loss (no manual pausing, only canceling)
- Storage Quota & Management 
  - Users have a fixed storage quota, which must be manually assigned 
  - Users cannot exceed quota; they will be prompted to free space 
  - Interface for viewing last-used and old files to assist with cleanup
- Real-Time Features 
  - WebSockets for real-time chat updates when the site is open 
  - Future improvement: real-time file event notifications

## Deployment & CI/CD

- Deployment Strategy 
  - Ubuntu Server VM with Kubernetes 
  - Alternative: Running Kubernetes directly on Proxmox (future improvement)
  - Each service (backend, database, frontend) runs in its own container 
  - Containers will be inside the VM, but running directly on Proxmox remains an option
- CI/CD Pipeline 
  - Azure DevOps Pipelines (integrates well with .NET)
  - Automated testing & builds before deployment 
  - Automated rollback in case of deployment failure

## Future Improvements

- File Versioning: Add versioning support for stored files 
- Account Recovery: Implement a recovery process (currently, superuser handles this manually)
- Real-Time Notifications: Notify users of file events dynamically 
- More Advanced Storage Management: Automated suggestions for clearing up space 
- Potential Migration to Proxmox-based Kubernetes: Evaluate if running Kubernetes directly on Proxmox is beneficial

## Security Considerations

- Extra security for per-user encryption keys in the database 
- Argon2 password hashing with configurable complexity settings (adjustable by the superuser)
- All data encrypted in transit and at rest 
- Superuser retains decryption capability for all files

## Questions & Next Steps

- Should system resource-based upload handling be fine-tuned based on file size, CPU load, or another factor? 
- What additional security measures should be added for per-user encryption keys? 
- Do we need manual admin notifications when users reach their storage limits?