import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/SelectionPage.css";
import { FaArrowRight } from "react-icons/fa";

const SelectionPage = ({ userName }) => {
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]); // Only stores IDs
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // React Router's navigate function

    // Define categories with names and IDs
    const categoryMap = [
        { name: "Koncerti", id: 1 },
        { name: "Izložbe", id: 2 },
        { name: "Predstave", id: 3 },
        { name: "Putovanja", id: 4 },
        { name: "Tulumi", id: 5 },
        { name: "Kino", id: 6 },
        { name: "Sport", id: 7 },
        { name: "Prijevoz", id: 8 },
        { name: "Ostalo", id: 9 },
    ];

    useEffect(() => {
        axios
            .get("http://localhost:8081/user-info", {
                withCredentials: true,
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error occurred: ", error);
            });
    }, []);

    const toggleCategory = (id) => {
        setSelectedCategoryIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const handleContinueClick = () => {
        if (selectedCategoryIds.length > 0) {
            console.log("Selected category IDs:", selectedCategoryIds);
            axios
                .post(
                    "http://localhost:8081/homepage/oglas",
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

    return (
        <div className="selection-page">
            <div className="naslov1">
                <div id="dobrodosli1">Dobrodošli na</div>
                <div id="swap1">
                    SWAP<span id="pet1">PET</span>, {user?.name || "gost"}
                    <span id="usklicnik1">!</span>
                </div>
            </div>

            <p className="odabir">
                Odaberite događaje koji vas najviše zanimaju.
            </p>

            <div className="category-buttons">
                {categoryMap.map((category) => (
                    <button
                        key={category.id}
                        className={`category-button ${
                            selectedCategoryIds.includes(category.id)
                                ? "selected"
                                : ""
                        }`}
                        onClick={() => toggleCategory(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <p className="warning-text">
                Najmanje jedna kategorija mora biti odabrana.
            </p>

            <div className="continue-button-container">
                <button
                    className="continue-button"
                    disabled={selectedCategoryIds.length === 0}
                    onClick={handleContinueClick}
                >
                    Nastavi <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default SelectionPage;
