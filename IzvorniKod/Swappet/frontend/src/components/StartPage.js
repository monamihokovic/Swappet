import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../css/StartPage.css";
import { FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa"; 
import GoogleLoginButton from "../components/GoogleLoginBtn"; 

const StartPage = ({ onLogin }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRedirect = () => {
    navigate("/selection"); // Redirect to /selection
  };

  return (
    <div className="start-page">
      <div className="overlay">
        <div className="header">
          <h1>
            Dobrodošli na{" "}
            <span className="logo">
              SWAP<span className="highlight">PET!</span>
            </span>
          </h1>
        </div>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Pretraži događaje..." />
        </div>
        <GoogleLoginButton onLogin={onLogin} />
        
        <button className="redirect-button" onClick={handleRedirect}>
          Idi na izbor kategorija <FaArrowRight />
        </button>
        
        <footer className="footer">
          {/* <a href="#about">O nama</a>
          <a href="#contact">Kontakt</a>
          <a href="#help">Pomoć</a> */}
          <a href="#fer">@ FER 2024/2025</a>
        </footer>
      </div>
    </div>
  );
};

export default StartPage;