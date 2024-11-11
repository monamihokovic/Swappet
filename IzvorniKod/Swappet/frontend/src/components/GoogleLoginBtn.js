import React from 'react';
import '../css/GoogleLoginBtn.css';

const GoogleLoginButton = () => {
  const handleLoginRedirect = () => {
    // Redirecting to the backend authentication URL
    window.location.href = "http://localhost:8081/login"; // Redirect to backend to handle OAuth
  };

  return (
    <button onClick={handleLoginRedirect} className="google-login-btn">
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
