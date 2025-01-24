import React, { useState, useEffect } from "react";
import "../css/AdvertisementsPage.css";
import axios from "axios";
import Header from "./Header";
import Card from "./Card";

const AdvertisementsPage = () => {
    const [user, setUser] = useState(null); //inicijalizacija korisnika
    const [ads, setAds] = useState([]); //inicijalizacija oglasa
    const [ulaznice, setUlaznice] = useState([]); //inicijalizacija ulaznica
    const [price, setPrice] = useState(100); //inicijalizacija 'default' cijene na filtru
    const [selectedCategories, setSelectedCategories] = useState([]); //inicijalizacija odabranih kategorija
    const [searchTerm] = useState(""); //hmm nisam sto posto
    const [likedFilter, setLikedFilter] = useState(false); //za prikaz lajkanih oglasa
    const [dislikedFilter, setDislikedFilter] = useState(false); //za prikaz dislajkanih oglasa

    //dohvat informacija o korisniku
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

    //dohvat oglasa i karti
    useEffect(() => {
        const fetchAds = axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/homepage/advertisements`,
            {
                withCredentials: true,
            }
        );
        const fetchTickets = axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/ulaznica/all`,
            {
                withCredentials: true,
            }
        );

        Promise.all([fetchAds, fetchTickets])
            .then(([adsResponse, ticketsResponse]) => {
                setAds(adsResponse.data);
                setUlaznice(ticketsResponse.data);

                console.log("Fetchani oglasi: ", adsResponse.data);
                console.log("Fetchane karte: ", ticketsResponse.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    //rukovanje odabranim kategorijama
    const handleCategoryClick = (category) => {
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(category)) {
                return prevSelectedCategories.filter((cat) => cat !== category);
            } else {
                return [...prevSelectedCategories, category];
            }
        });
    };

    //filtriranje oglasa
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
            const associatedTickets = filteredTickets.filter(
                (ticket) => ticket.oglas.idOglas === ad.id
            );

            return { ...ad, tickets: associatedTickets };
        })
        .filter((adWithTickets) => adWithTickets.tickets.length > 0)
        .filter((ad) => {
            if (likedFilter && dislikedFilter) {
                return ad.liked === 1 || ad.liked === -1;
            } else if (likedFilter) {
                return ad.liked === 1;
            } else if (dislikedFilter) {
                return ad.liked === -1;
            } else {
                return ad.liked === 1 || ad.liked === 0;
            }
        });

    return (
        <div className="advertisements-page">
            <Header></Header>
            <div className="container">
                <div className="filter">
                    <div className="filter-name">Filter oglasa</div>
                    <div className="filter-kategorija">
                        <div className="lista">Kategorija</div>
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
                        <label htmlFor="price" className="price">
                            Cijena:{" "}
                        </label>
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
                        <span id="price-value">{price}€</span>
                    </div>
                    {user && (
                        <div className="liked-disliked">
                            <button
                                className={likedFilter ? "active" : ""}
                                onClick={() => setLikedFilter(!likedFilter)}
                            >
                                Liked
                            </button>
                            <button
                                className={dislikedFilter ? "active" : ""}
                                onClick={() =>
                                    setDislikedFilter(!dislikedFilter)
                                }
                            >
                                Disliked
                            </button>
                        </div>
                    )}
                </div>

                <div className="cards-container">
                    {filteredAdsWithTickets.length === 0 ? (
                        <div className="no-events-message">
                            {" "}
                            Nema još takvih oglasa... :({" "}
                        </div>
                    ) : (
                        filteredAdsWithTickets.map((adWithTickets) => (
                            <Card
                                key={adWithTickets.id}
                                ad={adWithTickets}
                                tickets={adWithTickets.tickets}
                            ></Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
export default AdvertisementsPage;
