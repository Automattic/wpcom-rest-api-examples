<?php
require 'config.php';

// Clear all session data
session_unset();
session_destroy();

// Redirect to home page
header('Location: index.php');
exit;
