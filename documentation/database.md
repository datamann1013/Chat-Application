# Database Exception Handling Documentation

[Return to README](../README.MD)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Usage](#usage)
- [Best Practices](#best-practices)

## Overview
A comprehensive exception handling system for database operations in Java applications. Provides hierarchical error handling, detailed logging, and structured error tracking for both message persistence and retrieval operations.

## Features
- 🔍 Detailed error tracking and categorization
- 🔄 Built-in retry capability assessment
- 📝 Comprehensive error logging
- 🎯 Specific error codes for different scenarios
- 📊 Query details monitoring
- ⚡ Performance tracking

## Architecture

### Exception Hierarchy

``` 
RuntimeException
    ↓
MessageException ←→ DatabaseException
   ↓         ↓
   ↓        MessagePersistenceException ConnectionException
MessageRetrievalException InitializationException

```

### Core Components

#### 1. Base Exceptions
Base exception classes providing fundamental error handling:
```java
public sealed class DatabaseException extends RuntimeException
        permits ConnectionException, InitializationException {
    public DatabaseException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

### 2. Message Exceptions
#### Specialized exceptions for message operations:
```java
public sealed class MessageException extends RuntimeException
permits MessagePersistenceException, MessageRetrievalException {
public MessageException(String message, Throwable cause) {
super(message, cause);
}
}
```
### 3. Error Codes
#### Structured error categorization:
```java
public enum ErrorCode {
QUERY_FAILED("RET_001", "Failed to execute message query", true),
SAVE_FAILED("MSG_001", "Failed to save message", true),
CONNECTION_ERROR("RET_004", "Database connection error", true)
}
```

## Usage
### Basic Exception Handling
``` java
try {
    // Database operation
    messageRepository.save(message);
} catch (MessagePersistenceException e) {
    if (e.isRetryable()) {
        // Implement retry logic
    }
    logger.error("Error details: {}", e.getErrorDetails());
}
```
### Creating Detailed Exceptions
``` java
throw MessageRetrievalException.builder()
    .errorCode(ErrorCode.QUERY_FAILED)
    .message("Failed to retrieve messages")
    .cause(e)
    .queryDetails(new QueryDetails.Builder()
        .queryType("RECENT_MESSAGES")
        .limit(10)
        .build())
    .build();

```
### Exception Structure
``` 
Exception Package
├── DatabaseException.java
├── MessageException.java
├── MessagePersistenceException.java
├── MessageRetrievalException.java
├── ConnectionException.java
└── InitializationException.java

```

## Best Practices
### 1. Error Code Usage

```
    QUERY_FAILED: Database query execution failures
    SAVE_FAILED: Message persistence issues
    CONNECTION_ERROR: Database connectivity problems
    TIMEOUT_ERROR: Query execution timeouts
```

### 2. Exception Handling
- Check retryable status before retrying
- Log comprehensive error details
- Include relevant context in messages
- Implement appropriate retry strategies

### 3. Performance Considerations
- Track query execution times
- Monitor retry attempts
- Log performance metrics
- Implement timeout handling