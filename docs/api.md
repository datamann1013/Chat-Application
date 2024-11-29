# Chat Application API Documentation
_Last updated: 2024-01-18_

[Return to README](../README.MD)

## Table of Contents
1. [Introduction](#introduction)
2. [Network Messages](#network-messages)
3. [Message Formats](#message-formats)
4. [Example Requests/Responses](#example-requests-responses)
5. [Error Codes and Handling](#error-codes-and-handling)

## Introduction
This document describes the network protocol used by the Chat Application for client-server communication. All messages are text-based and use a simple prefix system for message type identification.

## Network Messages

1. JOIN - Client joins the chat
2. USERS - Server sends list of online users
3. MSG - Chat message
4. LEAVE - Client leaves the chat
5. ERROR - Server reports an error

## Message Formats

### JOIN
- Direction: Client to Server
- Format: `JOIN:<username>`
- Example: `JOIN:Alice`

### USERS
- Direction: Server to Client
- Format: `USERS:<comma-separated-usernames>`
- Example: `USERS:Alice,Bob,Charlie`

### MSG
- Direction: Bidirectional
- Format: `MSG:<username>:<message>`
- Example: `MSG:Alice:Hello, everyone!`

### LEAVE
- Direction: Client to Server
- Format: `LEAVE:<username>`
- Example: `LEAVE:Alice`

### ERROR
- Direction: Server to Client
- Format: `ERROR:<error_code>:<error_message>`
- Example: `ERROR:404:User not found`

## Example Requests/Responses

1. Client Joins:
   - Request: `JOIN:Alice`
   - Response: `USERS:Alice,Bob,Charlie`

2. Sending a Message:
   - Request: `MSG:Alice:Hello, everyone!`
   - Response (broadcast to all): `MSG:Alice:Hello, everyone!`

3. Client Leaves:
   - Request: `LEAVE:Alice`
   - Response (broadcast to all): `USERS:Bob,Charlie`

## Error Codes and Handling

- 400: Bad Request
  - Malformed message
  - Invalid username

- 401: Unauthorized
  - Attempt to send message before joining

- 403: Forbidden
  - Attempt to use reserved username

- 404: Not Found
  - Referenced user not in chat

- 409: Conflict
  - Username already in use

- 500: Internal Server Error
  - Unexpected server error

Clients should display appropriate error messages to users and may attempt to reconnect or rejoin in case of network-related errors.
