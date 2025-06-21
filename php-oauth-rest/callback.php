<?php
require 'config.php';

if (!isset($_GET['code'])) {
    die('Error: No authorization code received.');
}

// Exchange authorization code for access token
$tokenUrl = REQUEST_TOKEN_URL;
$postData = [
    'client_id' => WPCOM_CLIENT_ID,
    'client_secret' => WPCOM_CLIENT_SECRET,
    'grant_type' => 'authorization_code',
    'code' => $_GET['code'],
    'redirect_uri' => WPCOM_REDIRECT_URI
];

// Make POST request to get access token
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $tokenUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For testing only
$response = curl_exec($ch);
curl_close($ch);

$tokenData = json_decode($response, true);

if (isset($tokenData['access_token'])) {
    $_SESSION['access_token'] = $tokenData['access_token'];
    if (isset($tokenData['blog_id'])) {
        $_SESSION['blog_id'] = $tokenData['blog_id'];
    }
    if (isset($tokenData['blog_url'])) {
        $_SESSION['blog_url'] = $tokenData['blog_url'];
    }
    header('Location: profile.php');
    exit;
} else {
    die('Error getting access token: ' . print_r($tokenData, true));
}
