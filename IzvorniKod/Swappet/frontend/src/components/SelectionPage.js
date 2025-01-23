import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/SelectionPage.css";
import { FaArrowRight } from "react-icons/fa";

const SelectionPage = () => {
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]); //inicijalizacija odabranih kategorija
    const [user, setUser] = useState(null); //inicijalizacija korisnika
    
    //inicijalizacija useNavigate (koristi se za redirectanje)
    const navigate = useNavigate();

    //dohvat informacija o korisniku
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/user-info`, {withCredentials: true})
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error occured: ", error);
            })
    }, []);

    //kategorije
    const categoryMap = [
        {name: "Koncerti", id: 1},
        {name: "Izložbe", id: 2},
        {name: "Predstave", id: 3},
        {name: "Putovanja", id: 4},
        {name: "Tulumi", id: 5},
        {name: "Kino", id: 6},
        {name: "Sport", id: 7},
        {name: "Prijevoz", id: 8},
        {name: "Ostalo", id: 9}
    ];

    const toggleCategory = (id) => {
        setSelectedCategoryIds((prev)=>
            	prev.includes(id) ?
                    prev.filter((item) => item !== id) :
                    [...prev, id]
        );
    };

    //pošalji info na backend
    const handleContinueClick = () => {
        if (selectedCategoryIds.length > 0) {
            console.log("Selected category IDs:", selectedCategoryIds);
            axios
                .post(
                    `${process.env.REACT_APP_BACKEND_URL}/homepage/oglas/${user?.email}`,
                    selectedCategoryIds,
                    {
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    console.log("Post response:", response.data);
                    // Redirect to advertisements page after successful post
                    navigate("/advertisements"); // This will redirect to /advertisements
                })
                .catch((error) => {
                    console.error("Error occurred: ", error);
                });
        } else {
            console.log("No categories selected");
        }
    };

    return(
        <div className="selection-page">
            <div className="naslov">
                <div id="dobrodosli">Dobrodošli na</div>
                <div id="swap">SWAP<span id="pet">PET</span>, {user?.name || "gost"}<span id="usklicnik">!</span></div>
            </div>

            <div className="odabir">
                Odaberite događaje koji vas najviše zanimaju!
            </div>

            <div className="category-buttons">
                {categoryMap.map((category) => (
                    <button
                        key={category.id}
                        className={`category-button ${selectedCategoryIds.includes(category.id) ? "selected" : ""}`}
                        onClick={() => toggleCategory(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <div className="warning-text">
                Najmanje jedna kategorija mora biti odabrana.
            </div>

            <div className="continue-button-container">
                <button
                    className="continue-button"
                    disabled={selectedCategoryIds.length===0}
                    onClick={handleContinueClick}
                >
                    Nastavi <FaArrowRight/>    
                </button>
            </div>
        </div>
    );
}

export default SelectionPage;