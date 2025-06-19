import { useState, useEffect } from "react";
import { BLOG_NEW_POST_URL } from "../../config";

const PublishPost = ({ accessToken, tokenInfo }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [postUrl, setPostUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    status: "draft",
  });

  useEffect(() => {
    console.log("useEffect", error);
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const doPublishPostRequest = () => {
    setError(null);
    setSuccess(null);
    setPostUrl(null);
    setLoading(true);
    const siteId = tokenInfo.blog_id;
    const url = BLOG_NEW_POST_URL(siteId);
    const body = {
      title: form.title,
      content: form.content,
      status: form.status,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
        setSuccess(`Post created! ID: ${data.ID}, Title: ${data.title}`);
        setPostUrl(data.URL);
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
        The token we get from the OAuth2 flow <code>/authorize</code>
        <br />
        allow us to perform operation on <strong>{tokenInfo.blog_url}</strong>
        <br />
        via requests to endpoints that require authentication.
        <br />
        For example, we can create a new post on the blog...
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
