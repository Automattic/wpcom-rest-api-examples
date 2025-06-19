<?php
require 'config.php';

// Check if user is already authenticated
if (isset($_SESSION['access_token'])) {
    header('Location: profile.php');
    exit;
}

$authUrl = "https://public-api.wordpress.com/oauth2/authorize?" .
    "client_id=" . WPCOM_CLIENT_ID . "&" .
    "redirect_uri=" . urlencode(WPCOM_REDIRECT_URI) . "&" .
    "response_type=code&" .
    "scope=auth";
?>

<!DOCTYPE html>
<html>

<head>
    <title>WordPress.com Connect Demo</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <h1>WordPress.com Connect Demo</h1>
    <p>This demo shows how to connect to WordPress.com using OAuth2.</p>
    <a href="<?= htmlspecialchars($authUrl) ?>"><img src="//s0.wp.com/i/wpcc-button.png" width="231" /></a>
</body>

</html>