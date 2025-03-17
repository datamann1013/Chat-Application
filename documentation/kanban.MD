# **Kanban Board**

[Return to main page](../README.MD)

## **Legend**
- 🕒 **To Do** – Not started yet
- 🔄 **In Progress** – Currently being worked on
- 🧪 **Testing** – Undergoing verification
- ✅ **Done** – Completed successfully
- 🔥 **High Priority** – Critical to project success
- ⚡ **Medium Priority** – Important but not urgent
- 🌀 **Low Priority** – Nice-to-have, but not critical

---

## **📌 Backlog (Planned Work)**
| **Task**                                | **Description**                                                                                                 | **Priority**  |  
|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------|---------------|
| **Research .NET Cryptographic Library** | Find best practices for secure encryption of user files and evaluate security risks.                            | 🔥 High       |  
| **Design Database Schema**              | Define tables, relationships, and indexing strategies. Ensure per-user encryption keys are stored securely.     | 🔥 High       |  
| **Implement Argon2 Password Hashing**   | Secure user authentication with configurable complexity for a superuser.                                        | 🔥 High       |  
| **Define Storage Quota Logic**          | Implement per-user storage limits and automatic enforcement. Develop UI to notify users when space is exceeded. | 🔥 High       |  
| **Initial UI Wireframing**              | Sketch frontend layout, component positioning, and UX for chat and file management.                             | ⚡ Medium      |  
| **Implement File Upload Service**       | Secure, resumable file uploads with encryption. Implement automatic connection recovery.                        | 🔥 High       |  
| **Implement WebSockets for Chat**       | Real-time updates when the site is open. Ensure messages sync properly between clients.                         | 🔥 High       |  
| **Research Kubernetes on Proxmox**      | Evaluate running Kubernetes directly on Proxmox instead of within a VM for better performance.                  | ⚡ Medium      |  
| **Account Recovery Flow**               | Define how manual account recovery by a superuser will work. Add as future improvement.                         | 🌀 Low        |  

---

## **🚀 In Progress**
| **Task**                              | **Description**                                                                                                    | **Priority** |  
|---------------------------------------|--------------------------------------------------------------------------------------------------------------------|--------------|
| **Set Up CI/CD Pipeline**             | Automate testing and deployments via Azure DevOps. Implement rollback on failure.                                  | 🔥 High      |  
| **Implement Manual Account Approval** | Admin must approve new users before they can log in.                                                               | 🔥 High      |  
| **Develop File Cleanup UI**           | Display last-used and old files for user management. Ensure quota-based enforcement.                               | ⚡ Medium     |  
| **Implement File Encryption System**  | Encrypt files per-user using a master key and per-file keys. Ensure superuser can override when necessary.         | 🔥 High      |  
| **Containerization Strategy**         | Run backend, database, and frontend in separate containers on the same VM. Consider orchestration with Kubernetes. | 🔥 High      |  

---

## **🛠️ Testing (Verification Phase)**
| **Task**                               | **Description**                                                                 | **Priority** |  
|----------------------------------------|---------------------------------------------------------------------------------|--------------|
| **Unit Tests for Backend API**         | Ensure all backend endpoints function correctly.                                | 🔥 High      |  
| **Integration Tests for File Uploads** | Validate that files are securely stored, encrypted, and retrievable.            | 🔥 High      |  
| **Security Testing for Encryption**    | Ensure proper encryption and decryption processes, prevent unauthorized access. | 🔥 High      |  
| **WebSocket Stability Tests**          | Verify real-time chat updates work under different network conditions.          | ⚡ Medium     |  

---

## **✅ Done (Completed Work)**
| **Task**                        | **Description**                                              | **Priority** |  
|---------------------------------|--------------------------------------------------------------|--------------|
| **Set Up Proxmox Cluster**      | High-availability Proxmox setup with CephFS configured.      | 🔥 High      |  
| **Deploy Ubuntu Server VM**     | Base environment ready for Kubernetes deployment.            | ⚡ Medium     |  
| **Basic Network Configuration** | Set up networking for secure communication between services. | 🔥 High      |  
