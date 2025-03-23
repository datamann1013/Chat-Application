# Chat Application Frontend

This folder contains the frontend of our chat and file sharing service. The following overview explains the purpose of the main directories and files.

## Folder Structure

- **public/**  
  Contains static files such as `index.html`, icons, and other assets that are served directly.

- **src/**  
  Main source code folder:
    - **api/**: Contains API handlers that communicate with the .NET backend.
    - **assets/**: Holds images, fonts, and other static media.
    - **components/**: Reusable UI components for building the interface.
    - **features/**: Feature-specific modules (e.g., chat, authentication) grouped by functionality.
    - **hooks/**: Custom React hooks for shared logic.
    - **layouts/**: Layout components used as templates for pages.
    - **pages/**: Individual page components (e.g., Home, Login, Dashboard).
    - **store/**: Configuration and setup for Redux (if using Redux for state management).
    - **styles/**: Global styles including CSS, SCSS, or Tailwind configuration.
    - **utils/**: Utility functions and helpers used across the application.
    - **App.tsx**: The root component of the application.
    - **index.tsx**: The ReactDOM entry point.

- **.env**  
  File for defining environment variables specific to this frontend.

- **package.json**  
  Contains project dependencies, scripts, and metadata.

- **tsconfig.json**  
  TypeScript configuration settings for the project.

- **vite.config.ts**  
  Vite configuration for bundling and development server setup.

- **jest.config.ts**  
  Configuration file for Jest, used for testing the application.

## Usage

- **Development:**  
  Run the development server with:
  ```bash
  npm run dev
  ```
This starts the Vite dev server (usually on http://localhost:5173).

- Production Build:
Compile the project for production by running:

  ```bash 
  npm run build
  ```

- Testing: Execute tests using:

  ```bash
  npm run test
  ```
## Overview
This frontend is part of a larger project that also includes a .NET backend, documentation, and infrastructure configurations. The structure is organized to clearly separate concerns:

- Source Code is in `src/`. 
- Static Assets are in `public/`. 
- Configurations (for Vite, Jest, TypeScript, etc.) are in the root.

This setup facilitates easy maintenance, scalability, and collaboration as the project grows.