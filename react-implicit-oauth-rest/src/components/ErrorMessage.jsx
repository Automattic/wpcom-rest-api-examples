import React from "react";

function ErrorMessage({ error }) {
  if (!error) return null;
  return <p style={{ color: "red" }}>{error}</p>;
}

export default ErrorMessage; 