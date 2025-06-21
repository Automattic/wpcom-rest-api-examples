# WordPress.com OAuth2 React Demo (Implicit Flow)

> **Note:** This demo specifically showcases the use of the **Implicit OAuth2 (client-side) flow** as described in the [WordPress.com OAuth2 documentation](https://developer.wordpress.com/docs/oauth2/#5-client-implicit-oauth). This means the access token is returned directly to the browser and is suitable for single-page applications (SPAs) where the client secret must not be exposed.

This project demonstrates how to implement WordPress.com OAuth2 authentication in a modern React app (with Vite) using the **implicit grant flow**. After logging in with WordPress.com, users can view their profile and publish a post to their connected WordPress.com blog.

## Features

- **WordPress.com OAuth2 Login (Implicit Flow):** Authenticate with your WordPress.com account using the client-side implicit grant flow.
- **Profile Display:** View your WordPress.com profile information after login.
- **Publish Post:** Create and publish a post to your WordPress.com blog from the app.
- **Modern Stack:** React (Vite) frontend and clean code structure.

## Prerequisites

- Node.js (v18+ recommended)
- A registered WordPress.com OAuth2 application ([instructions](https://developer.wordpress.com/docs/oauth2/))

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <this-repo-url>
   cd react-implicit-oauth-rest
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root of `react-implicit-oauth-rest` with the following variables:

   ```env
   VITE_WPCC_CLIENT_ID=your_wordpress_client_id
   VITE_WPCC_REDIRECT_URI=http://localhost:5173
   ```

   - `VITE_WPCC_CLIENT_ID` can be obtained by [creating an Application in WordPress.com](https://developer.wordpress.com/apps/new).
   - `VITE_WPCC_REDIRECT_URI` must be exactly the same as the redirect URL you used when creating [the Application at WordPress.com](https://developer.wordpress.com/apps/new) (by default `http://localhost:5173` for this demo).
   - **No client secret is needed for the implicit flow.**

4. **Start the app:**

   ```bash
   npm start
   ```

   This will launch the React frontend (on port 5173).

5. **Open your browser:**

   Visit [http://localhost:5173](http://localhost:5173) and click "Login with WordPress.com" to begin the OAuth2 implicit flow.

## Project Structure

- `src/` — React frontend code
- `config.js` — OAuth2 and API endpoint configuration

## Notes

- This demo uses the **implicit OAuth2 flow** ([see docs](https://developer.wordpress.com/docs/oauth2/#5-client-implicit-oauth)), which is suitable for client-side applications. The access token is returned in the URL fragment after authentication and is managed entirely in the browser.
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