import React from "react";

//const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8081";

const GoogleLoginButton = () => {
    const handleLoginRedirect = () => {
        // Redirecting to the backend authentication URL

        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`; // Redirect to backend to handle OAuth
    };

    return (
        <button onClick={handleLoginRedirect} className="google-login-btn">
            Login with Google
        </button>
    );
};

export default GoogleLoginButton;