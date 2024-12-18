import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "../css/AdvertisementsPage.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const defaultProfilePic = "/defaultpfp.jpg";

const AdvertisementsPage = ({ profilePic }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [ads, setAds] = useState([]); // List of advertisements
    const [ulaznice, setUlaznice] = useState([]); // List of tickets
    const [price, setPrice] = useState(50);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Fetch user information
    useEffect(() => {
        axios
            .get("http://localhost:8081/user-info", {
                withCredentials: true,
            })
            .then((response) => setUser(response.data))
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setUser(null);
                } else {
                    console.error("Error occurred: ", error);
                }
            });
    }, []);

    // Fetch advertisements and tickets
    useEffect(() => {
        const fetchAds = axios.get("http://localhost:8081/homepage/advertisements");
        const fetchTickets = axios.get("http://localhost:8081/ulaznica/all");

        // Fetch both ads and tickets simultaneously
        Promise.all([fetchAds, fetchTickets])
            .then(([adsResponse, ticketsResponse]) => {
                setAds(adsResponse.data); // List of OglasDTO
                setUlaznice(ticketsResponse.data); // List of Ulaznice

                // Log the fetched tickets data
                console.log("Fetched tickets:", ticketsResponse.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

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

    // Filter tickets based on price, category, and ad type
    const filteredTickets = ulaznice
        .filter((ticket) => {
            console.log("Selected Categories:", selectedCategories);
            console.log("Ticket:", ticket.oglas.tipOglas);
            console.log(selectedCategories.includes(ticket.oglas.tipOglas));

            // Price filter for tickets
            const priceFilter = ticket.cijena <= price;
            // Category filter for tickets
            const categoryFilter =
                selectedCategories.length === 0 ||
                selectedCategories.includes(ticket.oglas.tipOglas);

            // Return true if all filters pass
            return priceFilter && categoryFilter;
        });

    // Now connect filtered tickets with corresponding ads based on idOglas
    const filteredAdsWithTickets = ads
        .map((ad) => {
            // Find matching tickets for the current ad
            const associatedTickets = filteredTickets.filter(
                (ticket) => ticket.oglas.idOglas === ad.id // Match tickets with ad by idOglas
            );
            return { ...ad, tickets: associatedTickets }; // Combine ad with its tickets
        })
        .filter((adWithTickets) => adWithTickets.tickets.length > 0); // Only include ads with tickets

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
                    className={user ? "createEvent" : "createEvent hidden"}
                    onClick={() => navigate("/createEvent")}
                    disabled={!user}
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
                    {filteredAdsWithTickets.length === 0 ? (
                        <div className="no-events-message">
                            Nema još takvih događaja... :(
                        </div>
                    ) : (
                        filteredAdsWithTickets.map((adWithTickets) => (
                            <Card
                                key={adWithTickets.id}
                                ad={adWithTickets}
                                tickets={adWithTickets.tickets}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdvertisementsPage;
