import React, { useEffect } from 'react';

const GoogleLoginButton = ({ onLogin }) => {
  const google = window.google;

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    onLogin(response.credential); // Call the parent component's login handler
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "404309616776-t5m6tkc6akvv1ov8ai90ftbn6jl5bcjb.apps.googleusercontent.com",
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