import React from "react";
import { useWordPressAuth } from "./hooks/useWordPressAuth";
import LoginButton from "./components/LoginButton";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";
import Dashboard from "./components/Dashboard";
import "./styles/App.css";

function App() {
  const { accessToken, tokenInfo, profile, error, loading, handleLogin, handleLogout } =
    useWordPressAuth();

  return (
    <div style={{ padding: 32 }}>
      <h1>WordPress.com Connect Demo</h1>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {!profile && !loading && <LoginButton onClick={handleLogin} />}
      {(profile && accessToken) && (
        <>
          <button onClick={handleLogout} style={{ float: 'right', marginBottom: 16 }}>
            Logout
          </button>
          <Dashboard profile={profile} accessToken={accessToken} tokenInfo={tokenInfo} />
        </>
      )}
    </div>
  );
}

export default App;
