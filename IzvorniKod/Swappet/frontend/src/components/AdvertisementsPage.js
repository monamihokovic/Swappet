import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "../css/AdvertisementsPage.css";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

const defaultProfilePic = "/defaultpfp.jpg";

const AdvertisementsPage = ({ profilePic }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [ads, setAds] = useState([]); // List of advertisements
    const [ulaznice, setUlaznice] = useState([]); // List of tickets
    const [price, setPrice] = useState(50);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Search term state
    const [likedFilter, setLikedFilter] = useState(false);
    const [dislikedFilter, setDislikedFilter] = useState(false);

    // Fetch user information
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/user-info`, {
                withCredentials: true,
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setUser(null);
                } else {
                    console.error("Error occurred: ", error);
                }
            });
    }, [user]);

    // Fetch advertisements and tickets
    useEffect(() => {
        const fetchAds = axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/homepage/advertisements`
        );
        const fetchTickets = axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/ulaznica/all`
        );

        // Fetch both ads and tickets simultaneously
        Promise.all([fetchAds, fetchTickets])
            .then(([adsResponse, ticketsResponse]) => {
                setAds(adsResponse.data); // List of OglasDTO
                setUlaznice(ticketsResponse.data); // List of Ulaznice

                // Log the fetched tickets data
                console.log("Fetched ads:", adsResponse.data);
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

    // Filter tickets based on price, category, ad type, and search term
    const filteredTickets = ulaznice.filter((ticket) => {
        const ad = ads.find((ad) => ad.id === ticket.oglas.idOglas);
        const eventType = ad ? ad.eventType : null;

        const priceFilter = ticket.cijena <= price;
        const categoryFilter =
            selectedCategories.length === 0 ||
            (eventType !== null && selectedCategories.includes(eventType));
        const searchFilter =
            searchTerm.trim() === "" ||
            (ad &&
                ad.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()));

        return priceFilter && categoryFilter && searchFilter;
    });

    const filteredAdsWithTickets = ads
        .map((ad) => {
            // Filter associated tickets for each ad
            const associatedTickets = filteredTickets.filter(
                (ticket) => ticket.oglas.idOglas === ad.id
            );

            return { ...ad, tickets: associatedTickets };
        })
        .filter((adWithTickets) => adWithTickets.tickets.length > 0) // Ensure there are tickets associated with the ad
        .filter((ad) => {
            if (likedFilter && dislikedFilter) {
                // If both filters are active, show ads with liked (1) or disliked (-1)
                return ad.liked === 1 || ad.liked === -1;
            } else if (likedFilter) {
                // If only liked filter is active, show ads with liked (1)
                return ad.liked === 1;
            } else if (dislikedFilter) {
                // If only disliked filter is active, show ads with disliked (-1)
                return ad.liked === -1;
            } else {
                // If no filter is active, show ads with liked (1) or no reaction (0)
                return ad.liked === 1 || ad.liked === 0;
            }
        });

    const toggleAdminMenu = () => setIsAdminMenuOpen(!isAdminMenuOpen);
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    return (
        <div className="advertisements-page">
            <div className="header">
                <div className="profile">
                    {/* Provjera postoji li user prije pristupa picture */}
                    <img
                        src={user?.picture || defaultProfilePic}
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <button
                    className={user ? "createEvent" : "createEvent hidden"}
                    onClick={() => navigate("/createEvent")}
                    disabled={!user}
                >
                    Dodaj događaj
                </button>

                <button
                    className={user ? "user" : "user hidden"}
                    onClick={toggleUserMenu}
                >
                    User usluge
                </button>

                {user && user.email === "majcik.b@gmail.com" && (
                    <button
                        className="admin"
                        onClick={toggleAdminMenu} // Toggle admin menu
                    >
                        Admin usluge
                    </button>
                )}

                {isUserMenuOpen && (
                    <div className="user-menu">
                        <button
                            className="user-option"
                            onClick={() => navigate(`/user/oglasi`)}
                        >
                            Pregledaj svoje oglase
                        </button>
                        <button
                            className="user-option"
                            onClick={() => navigate(`/user/transactions`)}
                        >
                            Pregledaj svoje transakcije
                        </button>
                        <button
                            className="user-option"
                            onClick={() => navigate(`/user/trades`)}
                        >
                            Pregledaj svoje razmjene
                        </button>
                    </div>
                )}

                {isAdminMenuOpen && (
                    <div className="admin-menu">
                        <button
                            className="admin-option"
                            onClick={() => navigate("/admin/oglasi")}
                        >
                            Pregledaj oglase
                        </button>
                        <button
                            className="admin-option"
                            onClick={() => navigate("/admin/transakcije")}
                        >
                            Pregledaj transakcije
                        </button>
                        <button
                            className="admin-option"
                            onClick={() => navigate("/admin/guilty")}
                        >
                            Pregledaj prijavljene korisnike
                        </button>

                        <button
                            className="admin-option"
                            onClick={() =>
                                axios
                                    .post(
                                        `${process.env.REACT_APP_BACKEND_URL}/admin/report`,
                                        null,
                                        {
                                            responseType: "blob", // Important: Ensure the response is treated as a binary Blob
                                        }
                                    )
                                    .then((response) => {
                                        // Create a Blob object from the response data
                                        const blob = new Blob([response.data], {
                                            type: "application/pdf",
                                        });

                                        // Create a URL for the Blob
                                        const url =
                                            window.URL.createObjectURL(blob);

                                        // Create a temporary <a> element to trigger the download
                                        const link =
                                            document.createElement("a");
                                        link.href = url;
                                        link.download = "report.pdf"; // Set the file name for download
                                        document.body.appendChild(link);
                                        link.click(); // Trigger the download
                                        document.body.removeChild(link); // Clean up the DOM

                                        console.log("Izvještaj generiran");
                                    })
                                    .catch((error) => {
                                        console.error("Error: " + error);
                                    })
                            }
                        >
                            Generiraj izvještaj
                        </button>
                    </div>
                )}

                <div className="liked-disliked-buttons">
                    <button
                        className={likedFilter ? "active" : ""}
                        onClick={() => setLikedFilter(!likedFilter)}
                    >
                        Liked
                    </button>
                    <button
                        className={dislikedFilter ? "active" : ""}
                        onClick={() => setDislikedFilter(!dislikedFilter)}
                    >
                        Disliked
                    </button>
                </div>

                <button
                    className={user ? "logout" : "logout hidden"}
                    onClick={() => {
                        if (user) {
                            window.location.href = `${process.env.REACT_APP_BACKEND_URL}/logout`;
                        }
                    }}
                    disabled={!user}
                >
                    <FaSignOutAlt className="logout-icon" />
                </button>

                <div className="logo" onClick={() => navigate("/")}>
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
                    <button
                        className="back-to-selection"
                        onClick={() => navigate("/selection")}
                    >
                        Natrag na selection
                    </button>
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
