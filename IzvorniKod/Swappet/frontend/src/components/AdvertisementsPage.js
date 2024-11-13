import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "../css/AdvertisementsPage.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const defaultProfilePic = "/defaultpfp.jpg";

const AdvertisementsPage = ({ profilePic }) => {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate("/createEvent");
    };

    const [user, setUser] = useState(null);
    const [ads, setAds] = useState([]);
    const [categories] = useState([1, 2, 3]);
    const [price, setPrice] = useState(50);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Fetch user information
    useEffect(() => {
        const backendUrl =
            process.env.REACT_APP_BACKEND_URL || "http://localhost:8081";
        axios
            .get(`${backendUrl}/user-info`, { withCredentials: true })
            .then((response) => setUser(response.data))
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setUser(null);
                } else {
                    console.error("Error occurred: ", error);
                }
            });
    }, []);

    // Fetch advertisements from the backend
    useEffect(() => {
        const backendUrl =
            process.env.REACT_APP_BACKEND_URL || "http://localhost:8081";
        axios
            .get(`${backendUrl}/homepage/advertisements`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setAds(response.data); // Assuming the response is the List<OglasDTO>
            })
            .catch((error) => {
                console.error("Error fetching ads:", error);
            });
    }, [categories]);

    // Handle category selection
    const handleCategoryClick = (category) => {
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(category)) {
                return prevSelectedCategories.filter((cat) => cat !== category);
            } else {
                return [...prevSelectedCategories, category];
            }
        });
    };

    // Filter ads based on price and selected categories
    const filteredAds = ads.filter((ad) => {
        const priceFilter = ad.price <= price;
        const categoryFilter =
            selectedCategories.length === 0 ||
            selectedCategories.includes(ad.type);
        return priceFilter && categoryFilter;
    });

    return (
        <div className="advertisements-page">
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
                    <div className="username">{user ? user.name : "gost"}</div>
                </div>

                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        id="pretraga"
                        type="text"
                        placeholder="Pretraži događaje..."
                    />
                </div>

                <button
                    className={user ? "createEvent" : "createEvent hidden"} // Conditionally hide the button when not logged in
                    onClick={handleCreate}
                    disabled={!user} // Disable the button when user is not logged in
                >
                    Dodaj događaj
                </button>

                <div className="logo">
                    S<span id="usklicnik">!</span>
                </div>
            </div>

            <div className="container">
                <div className="filter">
                    <div className="imeFiltra">Filter događaja</div>

                    <div className="Vrsta">
                        <div className="lista">Vrsta</div>
                        {[
                            "Koncert",
                            "Izložba",
                            "Predstava",
                            "Putovanja",
                            "Tulumi",
                            "Kino",
                            "Sport",
                            "Prijevoz",
                            "Ostalo",
                        ].map((category, index) => (
                            <li
                                key={category}
                                className={
                                    selectedCategories.includes(index + 1)
                                        ? "selected"
                                        : ""
                                }
                                onClick={() => handleCategoryClick(index + 1)}
                            >
                                {category}
                            </li>
                        ))}
                    </div>

                    <div className="price-range">
                        <label htmlFor="price">Cijena:</label>
                        <input
                            type="range"
                            id="price"
                            name="price"
                            min="0"
                            max="999"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            step="1"
                        />
                        <span id="price-value">{price}</span>
                    </div>
                </div>

                <div className="cards-container">
                    {filteredAds.length === 0 ? (
                        <div className="no-events-message">
                            Nema još takvih događaja... :(
                        </div>
                    ) : (
                        filteredAds.map((ad) => <Card key={ad.id} ad={ad} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdvertisementsPage;
