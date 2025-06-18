
# Project Guidelines for Junie

## Project Overview
This is a Secure Chat & File Sharing System with the following key components:
- **Frontend**: React-based application with TypeScript
- **Backend**: .NET Core API
- **Database**: PostgreSQL
- **Deployment**: Docker containers orchestrated by Kubernetes

## Project Structure
- **Chat-application-frontend/**
    - React/TypeScript application
    - Uses Jest for testing
    - Component-based architecture in `src/components/`
    - Pages in `src/pages/`
    - API integration in `src/api/`

- **Chat-application-backend/**
    - .NET Core API
    - Follows repository pattern with:
        - Controllers
        - Services
        - Repositories
        - Models
        - Interfaces
    - Uses xUnit for testing

- **documentation/**
    - Contains detailed documentation on various aspects of the project
    - Database schema, deployment architecture, testing strategy, etc.

- **infrastructure/**
    - Anything relevant to the infrastructure of the project, such as Dockerfiles, Kubernetes manifests, etc.
  
## Development Guidelines

### Frontend Development
1. **Component Structure**:
    - Use TypeScript (React) for all components
    - Follow the existing component patterns (see `src/components/`)
    - Modal components should extend from AbstractModal or BaseModal

2. **Testing**:
    - Write Jest tests for all components
    - Test files should be named `*.test.tsx` and placed alongside the component
    - Use React Testing Library for component testing

3. **Styling**:
    - CSS files should be placed alongside their components
    - Follow the existing naming conventions

### Backend Development
1. **Architecture**:
    - Follow the repository pattern
    - Use interfaces for dependency injection
    - Place business logic in Services, data access in Repositories

2. **Security**:
    - Implement proper authentication using the custom auth system
    - Use Argon2 for password hashing
    - Ensure proper encryption for files and messages
    - Validate user permissions based on roles

3. **Testing**:
    - Write xUnit tests for all controllers and services
    - Use Moq for mocking dependencies

### Database
1. **Schema**:
    - Follow the schema defined in `documentation/database.MD`
    - Key entities: User, File, Message, ChatRoom, ChatRoomMember
    - Ensure proper foreign key relationships

2. **Data Access**:
    - Use repository pattern for database access
    - Implement proper transaction handling

## Testing Requirements
1. **Run Tests Before Submitting Changes**:
    - Frontend: `npm test` in the frontend directory
    - Backend: `dotnet test` in the backend directory

2. **Test Coverage**:
    - Aim for high test coverage for critical components
    - Unit tests for components, services, and controllers
    - Integration tests for key workflows

## Building the Project
1. **Frontend**:
    - Run `npm install` to install dependencies
    - Run `npm run build` to create a production build

2. **Backend**:
    - Run `dotnet restore` to restore packages
    - Run `dotnet build` to build the project

## Code Style Guidelines
1. **General**:
    - Use consistent indentation (spaces, not tabs)
    - Follow naming conventions for each language
    - Add comments for complex logic

2. **TypeScript/React**:
    - Use functional components with hooks
    - Use TypeScript interfaces for props and state
    - Follow React best practices

3. **.NET**:
    - Follow C# naming conventions (PascalCase for public members)
    - Use async/await for asynchronous operations
    - Implement proper exception handling

## Security Considerations
1. **Authentication**:
    - Implement proper JWT token validation
    - Secure storage of sensitive information

2. **File Handling**:
    - Implement proper encryption/decryption
    - Enforce storage quotas
    - Validate file types and sizes

3. **Communication**:
    - Secure WebSocket connections
    - Encrypt messages in transit and at rest

## Deployment
 - The application is deployed using Docker and Kubernetes. 
 - Refer to the deployment architecture documentation for details.
 - Files regarding the deployment process can be found in the `infrastructure/` directory, or made in the `infrastructure/` directory if not already present.

## Additional Resources
Refer to the documentation directory for detailed information on:
- User stories and use cases
- Database schema
- Testing strategy
- Deployment architecture
- CI/CD pipeline

- If you need clarification on any of these points or require more detailed instructions, please create a new issue or consult with the project maintainers.
- Regularly update this file as the project evolves to keep it relevant for future interactions.

