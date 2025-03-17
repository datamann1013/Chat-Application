# Comprehensive Test Plan

[Return to main page](../README.MD)

## Overview

This document outlines the test strategy for the system, including unit tests, integration tests, system tests, security tests, and performance tests. It follows a Test-Driven Development (TDD) approach.

## Unit Tests

### Frontend Unit Tests
- **LoginComponent**
  - Test that the login button renders.
  - Test that clicking login calls the authentication function.
  - Test error message display on failed login.
- **FileUploadComponent**
  - Test file input rendering.
  - Test file selection triggers the upload function.
  - Test display of upload progress and error messages.
- **ChatComponent**
  - Test that chat messages render.
  - Test sending a message triggers the API call.
  - Test that incoming messages update in real time.
- **ProfileComponent**
  - Test that profile information displays correctly.
  - Test update functionality and error handling.
- **NotificationComponent**
  - Test that notifications render and update.

### Backend Unit Tests
- **AuthenticationController**
  - Test `Login()` method: Validate Argon2 hashing and JWT token generation.
  - Test `Logout()` method.
  - Test `ApproveAccount()` functionality.
- **FileController**
  - Test `UploadFile()`: Ensure file encryption and metadata storage.
  - Test `DownloadFile()`: Verify correct decryption and file retrieval.
  - Test storage quota enforcement.
- **ChatController**
  - Test `CreateChat()`: Verify new chat creation.
  - Test `SendMessage()`: Validate message storage and WebSocket notification.
  - Test `GetMessages()` to retrieve chat history.
- **UserController**
  - Test `GetUserProfile()`: Retrieve correct user data.
  - Test `UpdateUserProfile()` and error scenarios.
- **EncryptionService**
  - Test `EncryptFile()`: Verify that file data is encrypted.
  - Test `DecryptFile()`: Confirm decrypted data matches original.
  - Test key storage and retrieval.
- **TokenService**
  - Test token generation and validation.
- **AccessControlService**
  - Test permission checks for various user roles.

### Database (SQL) Tests
- **Schema Validation**
  - Verify that tables (USERS, FILES, CHATS, MESSAGES, CHAT_PARTICIPANTS) exist.
  - Test foreign key relationships and indexes.
- **Data Integrity**
  - Insert and retrieve sample user, file, and chat records.
  - Validate encryption key storage.

## Integration Tests

- **Authentication Flow**
  - Simulate full registration → manual approval → login flow.
  - Verify JWT token issuance and access to protected endpoints.
- **File Upload/Download Workflow**
  - Upload a file, verify encryption, storage, and metadata creation.
  - Download the file and confirm proper decryption.
- **Chat Functionality**
  - Create a chat session, send messages, and verify real-time updates.
- **User Management**
  - Simulate admin actions: account approval, role changes, deactivation.

## System Tests

- **End-to-End User Scenario**
  - Simulate a complete user journey: registration, approval, login, file upload, file sharing, and chat messaging.
- **Error Handling**
  - Test file upload when storage quota is exceeded.
  - Test invalid token usage and ensure access is denied.

## Security Tests

- **Penetration Testing**
  - Attempt to bypass authentication and retrieve unencrypted data.
- **Encryption Verification**
  - Ensure files remain encrypted during transit and at rest.
- **Access Control**
  - Test that unauthorized users cannot access restricted functions.

## Performance Tests

- **Load Testing**
  - Simulate multiple concurrent file uploads and downloads.
  - Test real-time chat performance under heavy user load.
- **Stress Testing**
  - Evaluate system behavior when nearing or exceeding storage quotas.
  - Measure response times for API calls under high load.

## Automated Testing Plan

- **Tooling:**  
  - Frontend: Jest and React Testing Library.  
  - Backend: xUnit and Moq.
- **CI/CD Integration:**  
  - Tests are automatically executed via Azure DevOps Pipelines on every commit.
- **Rollback Strategy:**  
  - If tests fail during deployment, an automated rollback is triggered.