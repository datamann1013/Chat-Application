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



## Project Color Palette

### Color Scheme Overview

The color palette for this project was selected to create a modern, visually appealing, and user-friendly design. The colors are meant to balance aesthetics with readability and provide a calming experience for the user.

#### **Background Color**
- **Hex:** #d3dcef
- **Description:** A soft **light blue-lavender** hue that provides a calm and minimalistic atmosphere without overwhelming the user. It’s light enough to maintain a fresh, clean interface, yet warm enough to avoid the starkness of pure white.

#### **Header Color**
- **Hex:** #b0b9d8
- **Description:** A **muted blue** slightly darker than the background. It provides subtle contrast, making the header distinct without being jarring.

#### **Card and Text Color**
- **Card Background:**
  - **Hex:** #ffffff
  - **Description:** Clean white background for cards to help content stand out.
- **Text Color:**
  - **Hex:** #333333
  - **Description:** A dark gray that is easier on the eyes than pure black, offering a comfortable reading experience.

### Color Palette Preview

Here’s a simple visual representation of the color palette used in this project:

| Color Name    | Hex       | Example     |
|---------------|-----------|-------------|
| Background    | #d3dcef   | ![#d3dcef](https://via.placeholder.com/50/d3dcef/ffffff?text=+) |
| Header        | #b0b9d8   | ![#b0b9d8](https://via.placeholder.com/50/b0b9d8/ffffff?text=+) |
| Card Background| #ffffff   | ![#ffffff](https://via.placeholder.com/50/ffffff/333333?text=+) |
| Text Color    | #333333   | ![#333333](https://via.placeholder.com/50/333333/ffffff?text=+) |

#### Explanation
- The **light blue-lavender background** is easy on the eyes, promoting focus while avoiding any overwhelming effects.
- The **muted blue header** brings attention to important content while maintaining a harmonious, soft color scheme.
- The **white card background** contrasts nicely with the text and creates a clean, modern design.
- The **dark gray text color** ensures readability across various lighting conditions, providing a softer alternative to pure black.

### Live Preview Example

You can also view this color combination live in your browser by using the following HTML and CSS code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Color Combo Preview</title>
    <style>
        body {
            background-color: #d3dcef; /* Light blue-lavender background */
            color: #2a2a2a; /* Dark text for readability */
            font-family: Arial, sans-serif;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        .header {
            background-color: #b0b9d8; /* Muted blue header */
            width: 100%;
            text-align: center;
            padding: 20px;
            font-size: 24px;
            font-weight: bold;
            border-bottom: 2px solid #a0a9c8;
        }

        .card {
            background-color: #ffffff; /* White card background */
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            width: 300px;
            border: 1px solid #d0d7e4;
        }

        .card h2 {
            margin-bottom: 10px;
            color: #333;
        }

        .card p {
            font-size: 1em;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="header">Color Combo Preview</div>
    <div class="card">
        <h2>Card Title</h2>
        <p>This is a simple preview of the color scheme used in the project. The background color is a soft light blue-lavender, while the header has a muted blue color to add contrast. The cards are white to maintain a minimalist design, with dark text for easy readability.</p>
    </div>
</body>
</html>
