# WordPress.com REST API Example Projects

This repository includes several example projects that demonstrate how to use OAuth to request explicit user permissions and perform authenticated operations on their behalf via token-secured endpoints, using a variety of popular languages and frameworks.

It also include examples of interacting with REST API endopints using Application Passwords.

## Overview

Each example shows how to authenticate with WordPress.com, obtain an access token, and make authenticated requests to the WordPress.com REST API. These are intended as starting points for your own integrations.

## Getting Started

1. **Log in to [WordPress.com](https://wordpress.com)**
2. **Create a new WPCC application:**  
   Go to [developer.wordpress.com/apps/](https://developer.wordpress.com/apps/) and register your app. You can update these settings at any time.
3. **Configure your example:**  
   Update the relevant config file in your chosen example with your:
   - Client ID
   - Client Secret
   - Login URL
   - Redirect URL
4. **Run the example:**  
   - Follow the instructions of each example's README
5. **Log in and test authentication!**

## Example Projects

| Directory                                                 | Language   | Framework         | Description                                                                                                                                                                                  | Author                               |
|-----------------------------------------------------------|------------|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------|
| [php-oauth-rest](php-oauth-rest/)                         | PHP        | N/A               | Auth via wp.com, display user info and post publication                                                                                                                                      | [Automattic](https://automattic.com) |
| [php-oauth-wpcom-connect](php-oauth-wpcom-connect/)       | PHP        | N/A               | Auth via wp.com and display user info                                                                                                                                                        | [Automattic](https://automattic.com) |
| [node-wpcom-oauth](node-wpcom-oauth/)                     | JavaScript | Node.js (Express) | Auth via wp.com, token display, user info and post publication - nice showcase if each step of iAuth workflow                                                                                | [Automattic](https://automattic.com) |
| [react-express-oauth-rest](react-express-oauth-rest/)     | JavaScript | React + Express   | Auth via wp.com, token display, and example REST API usage - use of client secret                                                                                                            | [Automattic](https://automattic.com) |
| [react-implicit-oauth-rest](react-implicit-oauth-rest/)   | JavaScript | React (SPA)       | Implicit flow auth via wp.com, token display, and example REST API usage - no use of client secret  ([implicit oAuth](https://developer.wordpress.com/docs/oauth2/#5-client-implicit-oauth)) | [Automattic](https://automattic.com) |
| [react-application-password](react-application-password/) | JavaScript | React (SPA)       | Application Password to authenticate endpoints                                                                                                                                               | [Automattic](https://automattic.com) |

## Contributing

If you implement a demo for a framework not listed here, we'd love to include it! Please submit a pull request.

## Resources

- [WordPress.com Developer Docs](https://developer.wordpress.com/docs/wpcc/)
- [WordPress.com REST API Reference](https://developer.wordpress.com/docs/api/)