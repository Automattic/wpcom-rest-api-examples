// WordPress OAuth2 endpoints and local backend endpoint for token exchange
export const AUTH_URL = "https://public-api.wordpress.com/oauth2/authorize";
export const TOKEN_URL = "https://public-api.wordpress.com/oauth2/token";
export const TOKEN_VERIFY_URL = "https://public-api.wordpress.com/oauth2/token-info";

// WordPress profile endpoint
export const PROFILE_URL = "https://public-api.wordpress.com/rest/v1/me/";

// WordPress new post endpoint (function to allow dynamic siteId)
export const BLOG_NEW_POST_URL = (siteId) => `https://public-api.wordpress.com/rest/v1/sites/${siteId}/posts/new`;

export const CLIENT_ID = import.meta.env.VITE_WPCC_CLIENT_ID;
export const REDIRECT_URI = import.meta.env.VITE_WPCC_REDIRECT_URI;
export const BLOG_ID = import.meta.env.VITE_BLOG_ID;

export const OAUTH_PARAMS = {
  response_type: "token",
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  ...(BLOG_ID && { blog: BLOG_ID }),
};