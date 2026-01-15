# HR Pro Toolkit - Lucky Draw & Team Builder

A React-based toolkit designed for HR professionals and team leads to facilitate lucky draws and team building activities. Built with Vite, React, and Tailwind CSS.

## Features

- **Name List Input**: Easily input and manage participant names.
- **Lucky Draw**: Perform random draws from the participant list.
- **Team Builder**: Automatically generate teams from the participant list.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1.  Clone the repository (if applicable)
2.  Install dependencies:

    ```bash
    npm install
    ```

### Local Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) to view it in the browser.

### Building for Production

Build the app for production to the `dist` folder:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This project is configured to automatically deploy to **GitHub Pages** using GitHub Actions.

### Setup

1.  Push your code to a GitHub repository.
2.  Go to the repository **Settings** > **Pages**.
3.  Under **Build and deployment** > **Source**, select **GitHub Actions**.
4.  The configured workflow `.github/workflows/deploy.yml` will automatically build and deploy your site whenever you push to the `main` branch.

## Project Structure

- `src/components`: Reusable UI components (Navbar, LuckyDraw, TeamBuilder, etc.)
- `src/App.tsx`: Main application component and routing logic.
- `index.html`: Entry point HTML file.
- `vite.config.ts`: Vite configuration.

## Technologies

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
