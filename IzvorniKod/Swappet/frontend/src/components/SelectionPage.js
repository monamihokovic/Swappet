import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SelectionPage.css"; 
import Header from "../components/Header"; 
import { FaArrowRight } from "react-icons/fa"; 

const SelectionPage = ({ userName }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => 
      prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category]
    );
  };

  const handleContinueClick = () => {
    if (selectedCategories.length > 0) {
      navigate("/advertisements"); 
    }
  };

  return (
    <div className="selection-page">
      <Header userName={userName} /> 
      <div className="overlay">
        <div className="header">
          <h1>
            Dobrodošli na{" "}
            <span className="logo">
              SWAP<span className="highlight">PET, {userName}</span>
            </span>
          </h1>
        </div>
        <p className="subheader">Odaberite događaje koji vas najviše zanimaju.</p>
        <div className="category-buttons">
          {["Koncert", "Putovanja", "Predstave", "Tulumi", "Kino", "Sport", "Prijevoz", "Ostalo"].map(category => (
            <button
              key={category}
              className={`category-button ${selectedCategories.includes(category) ? 'selected' : ''}`}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <p className="warning-text">Najmanje jedna kategorija mora biti izabrana.</p>
        <div className="continue-button-container">
          <button className="continue-button"
              disabled={selectedCategories.length === 0} 
              onClick={handleContinueClick}
>
            Nastavi <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;
