# Deployment Architecture

[Return to main page](../README.MD)

## Overview

The system is deployed using **Docker containers** orchestrated by **Kubernetes**. Initially, Kubernetes runs on an Ubuntu Server VM hosted on Proxmox. Future plans include moving Kubernetes directly onto Proxmox for improved resource utilization.

## Deployment Diagram
```mermaid
graph TD
    Developer -->|Push Code| GitRepo
    GitRepo -->|Triggers| AzureDevOps
    AzureDevOps -->|Runs Build & Tests| CI/CD
    CI/CD -->|Deploys to| KubernetesCluster
    KubernetesCluster -->|Manages| Frontend
    KubernetesCluster -->|Manages| Backend
    KubernetesCluster -->|Manages| Database
    KubernetesCluster -->|Manages| Storage
    KubernetesCluster -->|Hosted on| Proxmox

```
## Components
- **Frontend:** React application served via Nginx.
- **Backend:** ASP.NET Core API.
- **Database:** PostgreSQL running as a stateful set.
- **Storage:** CephFS for file storage.
- **CI/CD:** Azure DevOps Pipelines for automated builds, tests, and deployments.
- **Rollback Strategy:** Automated rollback configured in the pipeline on failure.