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

| Color Name      | Hex     | Example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
|-----------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Background      | #d3dcef | <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAhNJREFUSEuVVsl1QyEMhP67i69OC3EJykMLjDZs5xJ/QAuj0Yj5eL5o7D/7Oc8S7NGcY9AYskvr55i6VhiMMYnP05his8yX/frQUOpFfYpXPc0uJyZIU3xKeHWkqUze1ACcpXyspNlGg9pPS5jdgV/2Hb4hYrrnTrByjLeOQTzqGfGqFl0MA4PRDSk6BN0elEGwFlhjCVqbXUuzjemVpOgRzDuHJ3dXUF9gktTxTRIRBKMWmM2f5x8hKQ0p79rfXoi94p8M3uFzLa8Fs4T5v1j0JXYZHvcbGOj9+jKQUoFU1RhYC+b8SvFHZSZVIzg9pA9YLF621SwY2yZb04ERrIjv0nBOM+fwbMVIEU/R0H0Wfap8sWIGXdUEb3z+oFQFAYlWMBBBp6NRS/qGbDkoqJq+oOzK1UXvG9FpyghMVu2JfrF9Jekk1GU3FiOKJ0II85myVXbBE49IhWePukmDUHCsa7Q7Es9gtG2cgw1KVsXTKPJukqjUQIm/wUPPpoamYTN7I8xnoo4q50sq+LMFBy93ZYQO/H1JwUdzb1k+4nXGqV/zCULtURpqvvWIC2j4rjqNZcPHvZou5C1fMxlDXcEnFZanrrifRfrE6rhsk+W8BuXkfPy+bLT6e0TCWydYBeD7lCvO5qyhDvdiWn313NpdVb46hIsixlkne+mvqNE/4g4HuxmJZb1wpUcmJ5RWIHbc+wdy+T1o5lbiNAAAAABJRU5ErkJggg==">                                                                     |
| Header          | #b0b9d8 | <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAkdJREFUSEudVkt2AzEIs3P/w2TZ3CQ9TEMfXwsbJk2z6czUxgIk4Xl/PGn4j59mvP3jgTdrkDlIn2iO16Bxm/aF9Ag5FM6aNAZN2CkvNGYCaHsWYo6kCz1eeoKFU05lEIJKI5GhwVSPIuC6lZhvOQDqCRo/Mo1PXpd14n4eNiAlylu2xXt8LCrnJhjuX0/6pK00XmOOmyK0INJC7U9ULl4RGCTf88crqvDPCm47qywZGGclbY2Sr438+TXGuBmvMJlMlQYmVBoqWEI5WBkyCFJvED0404+LcSG1Jam8jpnIXyQUi+SkZp1npGCnJgAmJg6rFMB+AuoGsMQGQboQ5v3xLQ37y++oMXEr1UKSeK3zFOp36fhfBLxF3YWENoNLsapd851bkz1OTS/yjFcTzqn/uiSpvd7ifqnyoPoh6MpqflgksNGN+IzVpG8cNhVj6d+HUL4sEfhzAm3/b6kTWV0ogGNIi90U7eDWFz802iwiHG2XpEkDovHBM8B1SK2T8FD80YixGfOKYSa8uSjaDscRR9BJ0jkSNChVD3wqlugEoKktcwGliYJrxY7AP6oZHZNkU30QWr5v4I9AdqrcC+Zga8ElaXmzN3dn8xK3masWVv5XV8ZaLKMuj/hKxe/sSy8LeB+0Yriueibm/2BhHIhOFHeHQstFNTMH7S5SATwvWquNOjL8QCNy1bpjbDVRQUhVRS8vrOUGIHZHxzROJKFOhL1JexHAqEmu5z4/U1Pk5gL3wCgotLFBG/dH8Frlp111WhYo0X4BhLBGKMHkPxQAAAAASUVORK5CYII="> |
| Card Background | #ffffff | <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAcFJREFUSEudVltiwCAIq/e/s2wKKI+gbv3pQwsxkGgjIvrWNR7bfp1P928jQmt7Hgekr6VYIbS8KoCYeQy3TkRoIAFzOOXFfGOQJuN4RmtTjGDMfuJn+hp1GkstrzoHfd9YGvh3MyJPxTxeweSJb7OYPmbbJQ5QKmQnVpQyy+xKf6Es0c3zBeAdXKa/Zp1z7TbIBJLAOZROGG29E63eQTlnJWU1B0xw6KEK2mvaLvGXRtRHe/v42l4XASPd2EDx98HbUPa8o74EAR1Ap8Q/suXBKJQhg3e72W4nljBu0AdXtp32SGYUa2jYSNZJZ6vkUtUAUNQO7VrdyLRDKolahqY5sAfKaXmZi9oM1mvSkaOKLxJfmg3qXkp3nu4zQgZT+7l/EGS8JVYzneUFJiPnDPAmx+c9K0OqxHMMaRjCRv2i4Cj5e+e7qKfpduIEiOyFhclhLn6Pl5NNcO8u4UxxOD9EmwEnELGQ6lBwBJ9oeqPZemcWyXPQ6FjFPjl3Dnjoke8yChlH58EwEQd/7aC48YlPWsNLR1tfssXgf1KWWpo57Ak2bfXcMYg19Xrtf39YsNW/9cvlUA9aJXrcnlLU9xfsD8ZFHs/hP4KZAAAAAElFTkSuQmCC">                                                                                                                                                                                     |
| Text Color      | #333333 | <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAUCAYAAAD/Rn+7AAAAAXNSR0IArs4c6QAAAkVJREFUSEuNVlEWwyAI0yvV+5/NPUlAQOzan22dCoQk2McYc7bWemtNP1vxTFnVWu9rJZ7qXd4a18y2jpEjZkdQPWudbQnsTPozxloanluiVbAVpDPSbFO+22cqSkqcU4p8A8Mn0xeCHjvgxOJyRWullOmSkoDcIet5gp7K/6Q4V0zCji1xwBJqJsgUQ1kh1UAABANuRg9NYAId/HNSQiiifX6FEX9ago5YJIkDOiGZuXdykU3mvv9cdZnqHu3kGA+wfxNJUSmCdhJ+4aWIkyIUE4BFCDDUP4r1fm8s4cKNYEpiK3u2rjLyqlvcA6nIH6AmaVhyu83RKWKwo36oCTTyIsnZ51oPtQeVMkGqlIKlgJJNfPIMdkISPCkQbaDMHJtu/AIIRPMQXy611DRAjAlWZFPPqVGQ6iQbzy/W7Ew9j4EzUi1pGPWlt68u4EWeDdkL6NLdGPIeKdnMZWGymcDNPAKTtWS/NEd2eiZZilbN6IO3Oq7vbTqgxWY9OlicYKrErtPfBSxm8bc0AZyzESKp6GLeKj/TRMlY5ZA+QdiMPtqffcLNsTRBHfymWN5yvBeGG9B2y2TaJ1kltib4VVXqP6udmKucInoRcBzcSQJt/P4qPXp1RLCQHPFdUperlMpvYsypD9rYSwgaEQ6lnyO/csONoF4k30zfXVJNnelmQ31I4rhpcc4rR3kLMiQdoPpVVS2Q+MtCMT6C+GxqcAZbm29el+6AeX85PxID+jOe1ay/zIBo90XAt86L4NUji/b/aVj7AZLlcv4roOKOAAAAAElFTkSuQmCC">     |

#### Explanation
- The **light blue-lavender background** is easy on the eyes, promoting focus while avoiding any overwhelming effects.
- The **muted blue header** brings attention to important content while maintaining a harmonious, soft color scheme.
- The **white card background** contrasts nicely with the text and creates a clean, modern design.
- The **dark gray text color** ensures readability across various lighting conditions, providing a softer alternative to pure black.