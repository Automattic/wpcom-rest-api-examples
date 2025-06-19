# WordPress.com OAuth2 React + Express Demo

This project demonstrates how to implement WordPress.com OAuth2 authentication in a modern React app (with Vite) and a minimal Express backend. After logging in with WordPress.com, users can view their profile and publish a post to their connected WordPress.com blog.

## Features

- **WordPress.com OAuth2 Login:** Authenticate with your WordPress.com account.
- **Profile Display:** View your WordPress.com profile information after login.
- **Publish Post:** Create and publish a post to your WordPress.com blog from the app.
- **Modern Stack:** React (Vite) frontend, Express backend, and clean code structure.

## Prerequisites

- Node.js (v18+ recommended)
- A registered WordPress.com OAuth2 application ([instructions](https://developer.wordpress.com/docs/oauth2/))

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <this-repo-url>
   cd react-express-oauth-rest
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root of `react-express-oauth-rest` with the following variables:

   ```env
   VITE_WPCC_CLIENT_ID=your_wordpress_client_id
   VITE_WPCC_CLIENT_SECRET=your_wordpress_client_secret
   VITE_WPCC_REDIRECT_URI=http://localhost:5173
   ```

   - `VITE_WPCC_CLIENT_ID` and `VITE_WPCC_CLIENT_SECRET` can be obtained by [creating an Application in WordPress.com](https://developer.wordpress.com/apps/new).
   - `VITE_WPCC_REDIRECT_URI` must be exactly the same as the redirect URL you used when creating [the Application at WordPress.com](https://developer.wordpress.com/apps/new) (by default `http://localhost:5173` for this demo).

4. **Start the app:**

   ```bash
   npm start
   ```

   This will launch both the Express backend (on port 4000) and the React frontend (on port 5173).

5. **Open your browser:**

   Visit [http://localhost:5173](http://localhost:5173) and click "Login with WordPress.com" to begin the OAuth2 flow.

## Project Structure

- `src/` — React frontend code
- `server.js` — Express backend for token exchange
- `config.js` — OAuth2 and API endpoint configuration

## Notes

- The backend is required to securely exchange the OAuth2 code for an access token (client secret is never exposed to the browser).
- You can publish posts to the connected blog after authenticating.
- For production, update the redirect URIs and consider HTTPS.

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