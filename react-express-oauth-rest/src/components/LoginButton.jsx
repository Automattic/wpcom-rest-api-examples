import React from "react";

function LoginButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <img
        src="https://s0.wp.com/i/wpcc-button.png"
        alt="Connect with WordPress.com"
        width={231}
      />
    </button>
  );
}

export default LoginButton; 