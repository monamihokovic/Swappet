import React from "react";
import { FaSearch } from "react-icons/fa";
import "../css/Header.css"; 

const Header = ({ userName, onSearch }) => {
  return (
    <div className="header-container">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Pretraži događaje..."
          onChange={(e) => onSearch(e.target.value)} 
        />
      </div>
      {userName ? (
        <div className="user-profile">
          <span className="user-greeting">Dobrodošli, {userName}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
