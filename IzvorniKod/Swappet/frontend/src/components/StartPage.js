import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/StartPage.css";
import { FaArrowRight } from "react-icons/fa";
import GoogleLoginButton from "../components/GoogleLoginBtn";

const StartPage = ({onLogin}) => {

    //inicijalizacija useNavigate (koristi se za redirectanje)
    const navigate = useNavigate();
    

    //redirect na '/selection'
    const handleRedirect = () => {navigate("/selection");} 


    return (
        <div className="start-page">
            <div className="naslov">
                <div id="dobrodosli">Dobrodošli na</div>
                <div id="swap" onClick={() => navigate(0)}>SWAP<span id="pet">PET</span><span id="usklicnik">!</span></div>
            </div>

            <GoogleLoginButton className="google-login-btn" onLogin={onLogin} />

            <button className="redirect-btn" onClick={handleRedirect}>
                <div id="redirect-kategorije">Idi na izbor kategorija</div>
                <FaArrowRight className="FaArrowRight"/>
            </button>

            <footer className="footer">
                <a href="#about">O nama</a>
                <a href="#contact">Kontakt</a>
                <a href="#help">Pomoć</a>
                <a href="https://www.fer.unizg.hr/">@FER</a>
            </footer>
        </div>

    );
};

export default StartPage;