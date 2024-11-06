import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import './App.css';
import StartPage from './components/StartPage';
import SelectionPage from './components/SelectionPage';
import AdvertisementsPage from './components/AdvertisementsPage';


function App() {
  const [userToken, setUserToken] = useState(null); // Manage user token
  const [userName, setUserName] = useState("gost"); // State to hold username

  const handleLogin = (token) => {
    setUserToken(token); // Store the token in the state
    const decoded = jwtDecode(token); // Call the jwtDecode function 
    setUserName(decoded.name || decoded.email || ""); // Extract username or email
    console.log("User logged in with token:", token);
  };
  

  const LoginRedirect = () => {
    const navigate = useNavigate(); // Initialize navigate

    const onLogin = (token) => {
      handleLogin(token); // Call handleLogin to manage the token
      navigate('/selection'); // Use navigate to redirect to SelectionPage
    };

    return <StartPage onLogin={onLogin} />;
  };

  return (
    <Router>
       <Routes>
        <Route path="/" element={<LoginRedirect />} />
        <Route path="/selection" element={<SelectionPage userName={userName} />} />
        <Route path="/advertisements" element={<AdvertisementsPage userName={userName} />} /> 
      </Routes>
    </Router>
  );
}

export default App;
