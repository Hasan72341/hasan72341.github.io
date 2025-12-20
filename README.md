# Modern 3D Portfolio

This is a modular, high-performance portfolio website built with React, Vite, Three.js, and Tailwind CSS. It features:

*   **3D Earth Experience:** A scroll-driven 3D earth animation using `react-three-fiber` and `gsap`.
*   **Particle Network:** An interactive background particle effect.
*   **Custom Cursor:** A smooth custom cursor that interacts with clickable elements.
*   **Smooth Scroll:** Integrated `Lenis` for buttery smooth scrolling.
*   **Modern Styling:** Tailwind CSS v4 with a custom color palette and typography.

## Prerequisites

*   Node.js (v18+ recommended)

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install --legacy-peer-deps
    ```
    *Note: `--legacy-peer-deps` is required due to some peer dependency conflicts with React 19.*

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

3.  **Build for Production:**
    ```bash
    npm run build
    ```

## Project Structure

*   `src/components/canvas`: 3D scenes and components.
*   `src/components/sections`: Content sections (Hero, Skills, Projects, Contact).
*   `src/constants`: Content data (`data.js`).
*   `public/planet`: 3D model assets.
*   `public/fonts`: Font assets.

## Customization

*   **Content:** Edit `src/constants/data.js` to update text, projects, and skills.
*   **Theme:** Colors and fonts are defined in `src/index.css` (Tailwind v4 theme).