// WordPress OAuth2 endpoints and local backend endpoint for token exchange
export const AUTH_URL = "https://public-api.wordpress.com/oauth2/authorize";
export const TOKEN_URL = "https://public-api.wordpress.com/oauth2/token";
export const TOKEN_VERIFY_URL = "https://public-api.wordpress.com/oauth2/token-info";

// WordPress profile endpoint
export const PROFILE_URL = "https://public-api.wordpress.com/rest/v1/me/";

// Local backend endpoint for token exchange
export const EXCHANGE_TOKEN_URL = "http://localhost:4000/api/exchange-token";

// WordPress new post endpoint (function to allow dynamic siteId)
export const BLOG_NEW_POST_URL = (siteId) => `https://public-api.wordpress.com/rest/v1/sites/${siteId}/posts/new`;