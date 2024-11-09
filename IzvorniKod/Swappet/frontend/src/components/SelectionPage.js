import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SelectionPage.css"; 
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
      <div className="naslov1">
        <div id="dobrodosli1">Dobrodošli na</div>
        <div id="swap1">SWAP<span id="pet1">PET</span>, {userName}<span id="usklicnik1">!</span></div>
      </div>

      <p className="odabir">Odaberite događaje koji vas najviše zanimaju.</p>
      
      <div className="category-buttons">
        {["Koncerti", "Putovanja", "Predstave", "Tulumi", "Kino", "Sport", "Prijevoz", "Ostalo"].map(category =>(
          <button
          key={category}
          className={`category-button ${selectedCategories.includes(category) ? 'selected': ''}`}
          onClick={()=>toggleCategory(category)}
          >{category}</button>
        ))}
      </div>

      <p className="warning-text">Najmanje jedna kategorija mora biti odabrana.</p>
      
      <div className="continue-button-container">
        <button className="continue-button"
        disabled={selectedCategories.length===0}
        onClick={handleContinueClick}>
          Nastavi <FaArrowRight/>
        </button>
      </div>
    </div>
  );
};

export default SelectionPage;
