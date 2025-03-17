# Secure Chat & File Sharing System

## Overview

This project is a **secure peer-to-peer chat and file-sharing service** featuring per-user storage quotas, robust encryption, and real-time communication. The application is built with a **.NET backend**, a **React frontend**, and uses **PostgreSQL** for data persistence. It is deployed in Docker containers orchestrated by **Kubernetes** running on an Ubuntu Server VM within a **Proxmox** cluster. User accounts are manually approved and each is assigned a single role that defines access permissions.

## Table of contents

1. [External documents](#1-external-documents)
2. [Key features](#2-key-features)
3. [Security overview](#3-security-overview)
4. [File handling](#4-file-handling)
5. [Future improvements](#5-future-improvements)

## 1. External documents

1. [Usecase diagrams](documentation/usecasediagrams.MD)
2. [Userstories](documentation/userstories.MD)
3. [Deplyment architecture](documentation/deplymentarc.MD)
4. [Enviroment setup](documentation/enviromentsetup.MD)
5. [CI/CD pipeline](documentation/cicdpipeline.MD)

## 2. Key Features

- **Secure File Sharing:**  
  Users can upload, store, and share files while abiding by their individual storage quotas.

- **End-to-End Encryption:**  
  Each file is encrypted with a unique key, and that key is further encrypted using a master key. Per-user encryption keys are securely stored in the database.

- **Custom Authentication & Role-Based Access:**  
  A custom-built authentication system using Argon2 for password hashing, with configurable complexity. All accounts require manual approval.

- **Real-Time Communication:**  
  Chat updates and notifications are delivered via WebSockets when the site is open.

- **Intelligent File Handling:**  
  The system dynamically decides between synchronous (request/response) or event-driven file transfers. Uploads are resumable only if the system detects a partial file after a connection loss; users can cancel uploads but cannot pause them.

- **Robust Deployment Strategy:**  
  Initial deployments are manual, with plans to automate through Azure DevOps Pipelines (including automated rollback on failures). Each component runs in its own container in Kubernetes.

## 3. Security Overview

- **Authentication:**  
  Custom authentication using .NET components and Argon2 hashing. Manual account approval and password recovery (handled manually, with plans for future automation).

- **Encryption:**  
  Files are encrypted at rest and in transit. Each file has its unique encryption key (encrypted with a master key). Additional security is applied for storing per-user encryption keys.

- **Access Control:**  
  Each user has one role, which defines their permissions. Superusers have override capabilities for administrative tasks, including decryption.

## 4. File Handling

- **Uploads/Downloads:**  
  The system supports both synchronous and event-driven transfers. Uploads are resumable only if a partial file is detected; cancellation is allowed.

- **Storage Quotas:**  
  Each user is allocated a fixed storage quota. When exceeded, uploads are blocked until space is freed. An interface will allow users to review and manage old files.

## 5. Future Improvements

- Automated password recovery system.
- Implementation of file versioning.
- Fully automated CI/CD deployment.
- Evaluation of running Kubernetes directly on Proxmox.
- Expansion of real-time features and notifications.