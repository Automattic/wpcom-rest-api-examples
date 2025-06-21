# WordPress.com Application Password React Demo

This project demonstrates how to use **WordPress.com Application Passwords** to authenticate with the WordPress REST API and publish a post to a connected WordPress.com blog.

This project demonstrates how to implement WordPress.com Application Password authentication in a modern React app (with Vite). Users can input their site URL, username, and a generated application password to publish a post to their WordPress.com blog.

## Features

- **WordPress.com Application Password Authentication:** Authenticate with your WordPress site using Application Passwords.
- **Publish Post:** Create and publish a post to your WordPress.com blog from the app.
- **Modern Stack:** React (Vite) frontend and clean code structure.

## Prerequisites

- Node.js (v18+ recommended)
- A WordPress.com account and a site.
- A generated Application Password. You can create one by navigating to your WordPress.com profile's security settings.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <this-repo-url>
   cd react-application-password
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the app:**

   ```bash
   npm start
   ```

   This will launch the React frontend (on port 5173).

4. **Open your browser:**

   Visit [http://localhost:5173](http://localhost:5173), fill in your site URL, username, and application password, and publish a post.

## Project Structure

- `src/` — React frontend code
- `src/components/PublishPost.jsx` — The main component for handling authentication and publishing.

## Notes

- This demo uses **Application Passwords**, which are a secure way to grant applications access to your account without sharing your main password.
- For production, consider using a more robust state management solution and error handling.

---

This demo is for educational purposes and is not production-hardened. Contributions and suggestions are welcome!

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

Vite uses port `5173` by default, and this is controlled by Vite's configuration or environment variables, not by your React code.