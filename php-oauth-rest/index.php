<?php
require 'config.php';

// Check if user is already authenticated
if (isset($_SESSION['access_token'])) {
    header('Location: profile.php');
    exit;
}

$authUrl = AUTHORIZE_URL . "?" .
    "client_id=" . WPCOM_CLIENT_ID . "&" .
    "redirect_uri=" . urlencode(WPCOM_REDIRECT_URI) . "&" .
    "response_type=code&";
?>

<!DOCTYPE html>
<html>

<head>
    <title>WordPress.com REST API Connect Demo</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <h1>WordPress.com REST API Connect Demo</h1>
    <p>This demo shows how to connect to WordPress.com using OAuth2 and the REST API.</p>
    <a href="<?= htmlspecialchars($authUrl) ?>"><img src="//s0.wp.com/i/wpcc-button.png" width="231" /></a>
</body>

</html>