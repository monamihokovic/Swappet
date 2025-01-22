import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/StartPage.css";
import { FaArrowRight } from "react-icons/fa";
import GoogleLoginButton from "../components/GoogleLoginBtn";

const StartPage = ({ onLogin }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleRedirect = () => {
        navigate("/selection"); // Redirect to /selection
    };

    return (
        <div className="start-page">
            <div className="naslov">
                <div id="dobrodosli">Dobrodošli na</div>
                <div id="swap">
                    SWAP<span id="pet">PET</span>
                    <span id="usklicnik">!</span>
                </div>
            </div>

            {/* <div className="search-bar">
        <FaSearch className="search-icon"/>
        <input id="pretraga" type="text" placeholder="Pretraži događaje..."></input>
      </div> */}

            <GoogleLoginButton className="google-login-btn" onLogin={onLogin} />

            <button className="redirect-button" onClick={handleRedirect}>
                <div id="kategorije">Idi na izbor kategorija</div>
                <FaArrowRight className="FaArrowRight" />
            </button>

            <footer className="footer">
                <a href="#about">O nama</a>
                <a href="#contact">Kontakt</a>
                <a href="#help">Pomoć</a>
                <a href="#fer">@FER 2024/2025</a>
            </footer>
        </div>
    );
};

export default StartPage;
