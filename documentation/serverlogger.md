# ServerLogger Documentation

[Return to README](../README.MD)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Usage](#usage)
- [Best Practices](#best-practices)

## Overview
ServerLogger is a lightweight, thread-safe logging solution designed for Java server applications. It provides structured file-based logging with timestamp organization and multiple logging levels.

## Features
- ✨ Automatic log file creation and management
- 🔄 Thread-safe logging operations
- 📝 Customizable log formatting
- 🎯 Multiple logging levels (INFO, WARNING, SEVERE)
- 📁 Organized log file structure
- ⚡ High-performance logging

## Architecture

### Component Structure

```
Application Layer
        ↓
ServerLogger (Main Interface)
        ↓
LoggerConfiguration ←→ CustomLogFormatter
        ↓
FileHandler System
```

### Core Components

#### 1. ServerLogger
Main facade providing logging methods:
```java
ServerLogger.logInfo("Message");
ServerLogger.logWarning("Warning");
ServerLogger.logError("Error", exception);
```
### 2. LoggerConfiguration
- Handles setup and configuration:
- Log directory management
- File handler configuration
- Formatter setup

### 3. CustomLogFormatter
   Formats log entries:

``` java
[2024-01-20 14:30:45] [INFO] Application started
[2024-01-20 14:30:46] [WARNING] Resource warning
[2024-01-20 14:30:47] [SEVERE] Critical error
```
## Usage
### Basic Usage
``` java
// Initialize logger
ServerLogger.setupLogger();

// Log messages
ServerLogger.logInfo("Application started");
ServerLogger.logWarning("Resource running low");
ServerLogger.logError("Database error", exception);

// Cleanup
ServerLogger.close();
```

### Log File Structure

```
logs/
├── server_log_2024-01-20_14-30-00.txt
├── server_log_2024-01-20_15-45-00.txt
└── server_log_2024-01-20_16-15-00.txt
```

## Best Practices
### 1. Log Level Usage
- INFO : Regular operational events
- WARNING : Unexpected but recoverable situations
- SEVERE : Critical issues needing immediate attention

### 2. Message Formatting
- Include relevant context
- Be specific but concise
- Add correlation IDs where applicable

### 3. Performance Optimization
- Use lazy logging for expensive operations
- Configure appropriate buffer sizes
- Implement log rotation