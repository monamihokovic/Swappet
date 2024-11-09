import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../css/createEvent.css";
import { FaSearch } from "react-icons/fa";

const defaultProfilePic="/defaultpfp.jpg"

const createEvent = ({userName, profilePic})=>{

return(
    <div className="create-event">
         <div className="header">
        <div className="profile">
          <img
            src={profilePic || defaultProfilePic}
            alt="Profile"
            className="pfp"
            onError={(e) => {
              e.target.src = defaultProfilePic;
            }}
          />
          <div className="username">{userName}</div>
        </div>

        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            id="pretraga"
            type="text"
            placeholder="Pretraži događaje..."
          />
        </div>

        <div className="logo">
          S<span id="usklicnik">!</span>
        </div>
      </div>

      <form className="eventCreator" action="/oglas" method="post">
            <h1 className="noviDog">Stvori novi događaj:</h1>
            <div className="container1">
                <div className="dogadaj">Događaj:</div>
                <input className="dogadajInput" type="text" placeholder="Unesi ime događaja" required></input>
                <div className="kategorija">Kategorija:</div>
                {["Koncerti", "Putovanja", "Predstave", "Tulumi", "Kino", "Sport", "Prijevoz", "Ostalo"].map(category =>(
                    <label className="kategorijaInput">
                        <input type="radio" name="type" value={category} required></input>
                        {category}
                    </label>
                ))}
                <div className="datum">Datum događaja:</div>
                <input className="datumInput" type="date" name="datum"></input>
                <div className="cijena"> Cijena:</div>
                <input className="cijenaInput" type="number" name="price" placeholder="Unesi cijenu karte" required></input>
                <input className="submit" type="submit" value="Kreiraj događaj!"></input>
            </div>
            <div className="container2">
                <div className="opis">Opis događaja:</div>
                <input  className="opisInput" type="text" name="opis" placeholder="Opiši događaj..."></input>
                <div className="adresa">Adresa događaja:</div>
                <input  className="adresaInput" type="text" name="adresa" placeholder="Unesi adresu" required></input>
                <input className="adresaInput" type="number" name="kucniBroj" placeholder="Unesi kućni broj" required></input>
                <input className="adresaInput" type="text" name="grad" placeholder="Unesi ime grada" required></input>
            </div>
            
      </form>
    </div>
);
};

export default createEvent;