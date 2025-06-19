import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AUTH_URL, PROFILE_URL, EXCHANGE_TOKEN_URL } from "../../config";

// Client ID and Redirect URI from environment variables
const CLIENT_ID = import.meta.env.VITE_WPCC_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_WPCC_REDIRECT_URI;

// Helper function to generate a random state string for OAuth2
function generateState() {
  return Math.random().toString(36).substring(2);
}

// Custom React hook to handle WordPress authentication
export function useWordPressAuth() {
  // State variables for user profile, error messages, loading status, auth code, and access token
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);
  
  // Ref to track if a profile request is in-flight
  const fetchingProfile = useRef(false);

  // Effect: On mount, check URL for OAuth2 code and state, validate state, and set code if valid
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const storedState = localStorage.getItem("wpcc_state");
    if (code && state) {
      if (state === storedState && !loading) {
        setCode(code);
      }
    }
    
  }, []);

  // Effect: On mount, check localStorage for a saved access token and set it if found
  useEffect(() => {
    const storedToken = localStorage.getItem("wpcc_access_token");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  // Effect: When accessToken changes, fetch the user's WordPress profile
  useEffect(() => {
    if (!accessToken || profile || fetchingProfile.current) return;

    fetchingProfile.current = true;
    setLoading(true);

    axios
      .get(PROFILE_URL, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Authentication failed.");
        setLoading(false);
      })
      .finally(() => {
        fetchingProfile.current = false;
      });
  }, [accessToken, profile]);

  // Effect: When code is set, exchange it for an access token via the backend
  useEffect(() => {
    if (!code || accessToken) return;
    setLoading(true);
    axios
      .post(EXCHANGE_TOKEN_URL, {
        code,
        redirect_uri: REDIRECT_URI,
      })
      .then((res) => {
        const { access_token, token_type, blog_id, blog_url, scope } = res.data;
        setAccessToken(access_token);
        setTokenInfo({ token_type, blog_id, blog_url, scope });
        localStorage.setItem("wpcc_access_token", access_token);
        setLoading(false);
      })
      
  }, [code]);

  // Function to initiate the WordPress OAuth2 login flow - redirecting to the WordPress OAuth2 login page
  const handleLogin = () => {
    const state = generateState();
    localStorage.setItem("wpcc_state", state);
    const params = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      state,
    });
    window.location = `${AUTH_URL}?${params.toString()}`;
  };

  // Function to log out: clear token from localStorage and reset state
  const handleLogout = () => {
    localStorage.removeItem("wpcc_access_token");
    setAccessToken(null);
    setProfile(null);
    setTokenInfo(null);
    setCode(null);
  };

  // Return the authentication state, login, and logout handlers to the component
  return { accessToken, tokenInfo, profile, error, loading, handleLogin, handleLogout };
} 