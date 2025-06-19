# WordPress.com Connect Demo in PHP (No External Dependencies)

This project demonstrates how to connect to WordPress.com using OAuth2 in pure PHP, **without any external dependencies**. It uses PHP's built-in cURL functions for HTTP requests and handles the OAuth2 flow manually. The demo allows users to authenticate with their WordPress.com account and view their profile information.

## Features

- **No Composer or external libraries required**
- **Manual OAuth2 flow** using PHP sessions and cURL
- **Simple, self-contained codebase**
- **Basic error handling**

## Project Structure

- `config.php` — Configuration constants and session start
- `index.php` — Home page with "Connect with WordPress.com" button
- `callback.php` — Handles OAuth2 callback and token exchange
- `profile.php` — Displays authenticated user's WordPress.com profile
- `logout.php` — Logs out the user and clears the session

## Setup Instructions

1. **Create a WordPress.com Application**
   - Go to [WordPress.com Developer Apps](https://developer.wordpress.com/apps/)
   - Create a new app and set the **Redirect URI** to:
     ```
     http://localhost:8000/callback.php
     ```
   - Note your **Client ID** and **Client Secret**

2. **Configure the Application**
   - Open `config.php`
   - Replace the placeholders with your actual credentials:
     ```php
     define('WPCOM_CLIENT_ID', 'your_client_id');
     define('WPCOM_CLIENT_SECRET', 'your_client_secret');
     define('WPCOM_REDIRECT_URI', 'http://localhost:8000/callback.php');
     ```

3. **Start the PHP Development Server**
   ```sh
   php -S localhost:8000
   ```

4. **Open the Demo in Your Browser**
   - Visit [http://localhost:8000](http://localhost:8000)
   - Click "Connect with WordPress.com" and follow the authentication flow

## How It Works

1. **index.php** — Presents a login button that redirects to WordPress.com for OAuth2 authentication.
2. **callback.php** — Handles the redirect from WordPress.com, exchanges the authorization code for an access token, and stores it in the session.
3. **profile.php** — Uses the access token to fetch and display the user's profile information from the WordPress.com REST API.
4. **logout.php** — Clears the session and logs the user out.

## Security Notes

- **SSL Verification:** For demonstration, SSL verification is disabled in cURL requests. **In production, always enable SSL verification** by setting `CURLOPT_SSL_VERIFYPEER` to `true`.
- **Credential Storage:** Do not store sensitive credentials directly in code for production. Use environment variables or a secure secrets manager.
- **Error Handling:** This demo uses basic error handling. For production, implement more robust error and exception handling.
- **CSRF Protection:** The OAuth2 flow should include CSRF protection (e.g., using a `state` parameter) in production.

## License

This project is provided for educational purposes and does not include a license. Please adapt and secure it for your own use. 