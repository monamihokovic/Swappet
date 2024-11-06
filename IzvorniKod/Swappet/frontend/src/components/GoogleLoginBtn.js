import React, { useEffect } from 'react';

const GoogleLoginButton = ({ onLogin }) => {
  const google = window.google;

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    onLogin(response.credential); // Call the parent component's login handler
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "387623106615-s3rlc47mtqq4bccgf57t443v9jl8dk7o.apps.googleusercontent.com", // Replace with your client ID
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("sign-in-div"),
      { theme: "outline", size: "large" }  
    );
  }, [google]); // Add google to the dependencies

  return (
    <div id="sign-in-div" className="google-sign-in-button"></div>
  );
};

export default GoogleLoginButton;
