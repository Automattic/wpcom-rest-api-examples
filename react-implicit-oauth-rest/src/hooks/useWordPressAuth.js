import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AUTH_URL, PROFILE_URL, EXCHANGE_TOKEN_URL, OAUTH_PARAMS, REDIRECT_URI } from "../../config";

console.log(OAUTH_PARAMS);
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
  const [accessToken, setAccessToken] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);
  
  // Ref to track if a profile request is in-flight
  const fetchingProfile = useRef(false);

  // Effect: On mount, check URL for OAuth2 code and state, validate state, and set code if valid
  useEffect(() => {
    
    if (window.location.hash && window.location.hash.startsWith("#")) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const access_token = hashParams.get("access_token");
      const expires_in = hashParams.get("expires_in");
      const token_type = hashParams.get("token_type");
      const site_id = hashParams.get("site_id");
      const scope = hashParams.get("scope");
      if (access_token) {
        setAccessToken(access_token);
        setTokenInfo({
          token_type,
          site_id,
          scope,
          expires_in,
        });
        localStorage.setItem("wpcc_access_token", access_token);
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


  // Function to initiate the WordPress OAuth2 login flow - redirecting to the WordPress OAuth2 login page
  const handleLogin = () => {
    const params = new URLSearchParams(OAUTH_PARAMS);
    const state = generateState();
    localStorage.setItem("wpcc_state", state);
    window.location = `${AUTH_URL}?${params.toString()}`;
  };

  // Function to log out: clear token from localStorage and reset state
  const handleLogout = () => {
    localStorage.removeItem("wpcc_access_token");
    setAccessToken(null);
    setProfile(null);
    setTokenInfo(null);
  };

  // Return the authentication state, login, and logout handlers to the component
  return { accessToken, tokenInfo, profile, error, loading, handleLogin, handleLogout };
} 