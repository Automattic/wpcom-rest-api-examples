<?php
// Configuration

// TODO: Replace these with the values shown on your app's Manage Settings page
// Visit: https://developer.wordpress.com/apps/
define('WPCOM_CLIENT_ID', '1');
define('WPCOM_CLIENT_SECRET', 'your_client_secret');
define('WPCOM_REDIRECT_URI', 'http://localhost:8000/callback.php');
define('BASE_URL', 'http://localhost:8000');

// You do not need to change these settings
define('REQUEST_TOKEN_URL', 'https://public-api.wordpress.com/oauth2/token');
define('AUTHORIZE_URL', 'https://public-api.wordpress.com/oauth2/authorize');


// Start session
session_start();
