# Chat Application Setup Guide
_Last updated: 2024-01-18_

[Return to README](../README.MD)

## Table of Contents
1. [Installation](#installation)
2. [Development Environment Setup](#development-environment-setup)
3. [Dependencies](#dependencies)
4. [Configuration](#configuration)
5. [Build and Run Instructions](#build-and-run-instructions)

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/your-repo/chat-application.git
   cd chat-application
   ```
2. Ensure you have Java Development Kit (JDK) 11 or higher installed.
3. Install Gradle if not already available on your system.

## Development Environment Setup
1. IDE Setup:
   - IntelliJ IDEA (recommended):
     - Open the project folder
     - Select "Open as Gradle Project"
   - Eclipse:
     - Import as "Existing Gradle Project"
2. Configure project SDK to JDK 11 or higher in your IDE settings.

## Dependencies
The project uses Gradle for dependency management. Key dependencies include:
- Java Swing for GUI (built-in)
- JUnit 5.7.0 for testing
- Log4j 2.14.1 for logging

To add or update dependencies, edit the `build.gradle` file.

## Configuration
1. Server Configuration:
   - Edit `src/main/resources/server.properties`:
     ```
     port=8080
     max_clients=100
     ```
2. Client Configuration:
   - Edit `src/main/resources/client.properties`:
     ```
     server_address=localhost
     server_port=8080
     ```

## Build and Run Instructions
1. Build the project:
   ```
   ./gradlew build
   ```
2. Run the server:
   ```
   ./gradlew runServer
   ```
3. Run the client:
   ```
   ./gradlew runClient
   ```
4. For development, you can run the application directly from your IDE by executing the main methods in `ServerMain` and `ClientMain` classes.

For any issues during setup, please refer to the troubleshooting section in the README or open an issue on the project's GitHub page.
