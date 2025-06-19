function Profile({ profile, accessToken, tokenInfo }) {
  const { token_type, blog_id, blog_url, scope } = tokenInfo;
  console.log(profile);

  return (
    <div>
      <h2>Welcome, {profile.display_name}!</h2>
      <img src={profile.avatar_URL} alt="avatar" />
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Username:</strong> {profile.username}
      </p>
      <p>
        <strong>Profile:</strong>{" "}
        <a href={profile.profile_URL} target="_blank" rel="noreferrer">
          {profile.profile_URL}
        </a>
      </p>
      <p>
        <strong>Access Token:</strong> {accessToken}
      </p>
      <p>
        <strong>Token Type:</strong> {token_type}
      </p>
      <p>
        <strong>Blog ID:</strong> {blog_id}
      </p>
      <p>
        <strong>Blog URL:</strong>{" "}
        <a href={blog_url} target="_blank" rel="noreferrer">
          {blog_url}
        </a>
      </p>
      <p>
        <strong>Scope:</strong> {scope}
      </p>
    </div>
  );
}

export default Profile; 