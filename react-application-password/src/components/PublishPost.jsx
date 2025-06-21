import { useState } from "react";

const PublishPost = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [postUrl, setPostUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [siteUrl, setSiteUrl] = useState("");
  const [username, setUsername] = useState("");
  const [applicationPassword, setApplicationPassword] = useState("");
  const [form, setForm] = useState({
    title: "",
    content: "",
    status: "draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const doPublishPostRequest = () => {
    setError(null);
    setSuccess(null);
    setPostUrl(null);
    setLoading(true);

    const url = `${siteUrl}/wp-json/wp/v2/posts`;
    const body = {
      title: form.title,
      content: form.content,
      status: form.status,
    };
    const auth = btoa(`${username}:${applicationPassword}`);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status} → ${data.message}`);
        }
        return data;
      })
      .then((data) => {
        setSuccess(`Post created! ID: ${data.id}, Title: ${data.title.rendered}`);
        setPostUrl(data.link);
        setForm({ title: "", content: "", status: "publish" });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="not-allowed-container">
      <p>
        Use an application password to create a new post on your site.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          doPublishPostRequest();
        }}
        style={{ marginBottom: 16 }}
      >
        <div>
          <label>
            Site URL:
            <input
              type="text"
              name="siteUrl"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              required
              style={{ width: "100%" }}
              placeholder="https://example.com"
            />
          </label>
        </div>
        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </label>
        </div>
        <div>
          <label>
            Application Password:
            <input
              type="password"
              name="applicationPassword"
              value={applicationPassword}
              onChange={(e) => setApplicationPassword(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </label>
        </div>
        <hr />
        <div>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              style={{ width: "100%" }}
            />
          </label>
        </div>
        <div>
          <label>
            Content:
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={5}
              style={{ width: "100%" }}
            />
          </label>
        </div>
        <div>
          <label>
            Status:
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="draft">Draft</option>
              <option value="publish">Publish</option>
              <option value="private">Private</option>
              <option value="pending">Pending</option>
              <option value="future">Future</option>
            </select>
          </label>
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: 8 }}>
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
      {success && (
        <p className="is-success">
          {success}
          {postUrl && (
            <>
              {" "}
              <a href={postUrl} target="_blank" rel="noopener noreferrer">
                View Post
              </a>
            </>
          )}
        </p>
      )}
      {error && <p className="is-error">{error}</p>}
    </div>
  );
};

export default PublishPost;
