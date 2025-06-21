<?php
require 'config.php';

if (!isset($_SESSION['access_token'])) {
    header('Location: index.php');
    exit;
}

$access_token = $_SESSION['access_token'];
$headers = [
    'Authorization: Bearer ' . $access_token
];

echo $_SESSION['access_token'];

// Get user info from WordPress.com API
$apiUrl = 'https://public-api.wordpress.com/rest/v1.1/me';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For testing only
$response = curl_exec($ch);
curl_close($ch);
$user = json_decode($response, true);

if (isset($user['error'])) {
    die('Error fetching user data: ' . $user['message']);
}

// Handle post creation
$postMessage = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['site_id'], $_POST['post_title'], $_POST['post_content'])) {
    $site_id = $_POST['site_id'];
    $post_title = $_POST['post_title'];
    $post_content = $_POST['post_content'];

    $postUrl = "https://public-api.wordpress.com/rest/v1.1/sites/{$site_id}/posts/new";
    $postFields = http_build_query([
        'title' => $post_title,
        'content' => $post_content,
        'status' => 'draft'
    ]);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $postUrl);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For testing only
    $postResponse = curl_exec($ch);
    curl_close($ch);
    $postResult = json_decode($postResponse, true);

    if (isset($postResult['ID'])) {
        $postMessage = '<div class="success-msg">Post published successfully! <a href="' . htmlspecialchars($postResult['URL']) . '" target="_blank">View Post</a></div>';
    } else {
        $errorMsg = isset($postResult['message']) ? $postResult['message'] : 'Unknown error.';
        $postMessage = '<div class="error-msg">Error publishing post: ' . htmlspecialchars($errorMsg) . '</div>';
    }
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>Your WordPress.com Profile</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <h1>Your WordPress.com Profile</h1>

    <div class="profile">
        <?php if (isset($user['avatar_URL'])): ?>
            <img src="<?= htmlspecialchars($user['avatar_URL']) ?>" class="avatar" width="80" height="80">
        <?php endif; ?>

        <h2><?= htmlspecialchars($user['display_name']) ?></h2>
        <p>Username: <?= htmlspecialchars($user['username']) ?></p>
        <p>Email: <?= htmlspecialchars($user['email']) ?></p>
        <p>Primary Blog: <?= htmlspecialchars($user['primary_blog_url'] ?? 'N/A') ?></p>
        <p>Selected Blog: <mark><a href="<?php echo htmlspecialchars($_SESSION['blog_url']); ?>" target="_blank"><?php echo htmlspecialchars($_SESSION['blog_url']); ?></a></mark></p>
        <div style="clear: both;"></div>

        <a href="logout.php" class="logout-btn">Logout</a>
    </div>

    <!-- New Post Form -->
    <div class="new-post-form" style="margin-top:30px;">
        <h2>Add a New Post</h2>
        <?php if ($postMessage) echo $postMessage; ?>
        <form method="post" style="margin-top:15px;">
            <p>Publish to: <a href="<?php echo htmlspecialchars($_SESSION['blog_url']); ?>" target="_blank"><?php echo htmlspecialchars($_SESSION['blog_url']); ?></a></p>
            <input type="hidden" name="site_id" value="<?php echo htmlspecialchars($_SESSION['blog_id']); ?>">
            <label for="post_title">Title:</label><br>
            <input type="text" name="post_title" id="post_title" required style="width:100%;padding:8px;margin-bottom:10px;"><br>
            <label for="post_content">Content:</label><br>
            <textarea name="post_content" id="post_content" rows="6" required style="width:100%;padding:8px;margin-bottom:10px;"></textarea><br>
            <button type="submit" class="login-btn">Publish Post</button>
        </form>
    </div>
</body>

</html>