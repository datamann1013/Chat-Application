# Environment Setup

[Return to main page](../README.MD)

## Development Environment

1. **Install Node.js**:  
   Required for running the React application.

2. **Install .NET SDK**:  
   Required for building and running the ASP.NET Core backend.

3. **Install PostgreSQL**:  
   For the SQL database.

4. **Install Docker**:  
   For containerizing the application components.

5. **Install Kubernetes Tools**:  
   Tools such as kubectl to manage Kubernetes clusters.

6. **Clone the Repository**:  
   `git clone <repository-url>`

7. **Frontend Setup**:
   - Navigate to the frontend directory: `cd frontend`
   - Install dependencies: `npm install`
   - Start the development server: `npm start`

8. **Backend Setup**:
   - Navigate to the backend directory: `cd backend`
   - Restore NuGet packages: `dotnet restore`
   - Build the application: `dotnet build`
   - Start the application: `dotnet run`

9. **Database Setup**:
   - Create the database: Use PostgreSQL commands or tools to create a new database (e.g., `CREATE DATABASE file_sharing_system;`).
   - Run SQL scripts to create tables based on the provided schema.

## Testing Environment

1. **Install Testing Tools**:
   - For frontend: Jest, React Testing Library.
   - For backend: xUnit, Moq (or similar).

2. **Run Tests**:
   - Frontend: `npm test`
   - Backend: `dotnet test`

## Production Environment

1. **Build and Containerize**:
   - Build Docker images for frontend, backend, and any other services.
2. **Deploy to Kubernetes**:
   - Use provided Kubernetes manifests or Helm charts.
3. **Configure Domain and HTTPS**:
   - Set up a reverse proxy (e.g., Nginx) for SSL termination.
4. **Monitor and Scale**:
   - Use monitoring tools (e.g., Prometheus, Grafana) to monitor system performance.