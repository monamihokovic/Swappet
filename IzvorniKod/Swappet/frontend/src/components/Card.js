import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCloudSun,
    faThermometerHalf,
    faWind,
    faTint,
    faPlus,
    faMinus,
    faShoppingCart,
    faHandHolding,
    faEllipsisVertical,
    faThumbsUp,
    faThumbsDown,
    faFlag,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Card.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from 'react-router-dom';

const Card = ({ ad, tickets }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    console.log("Seller ad:", ad);
    const [buyerAds, setBuyerAds] = useState(null); // All buyer ads fetched from his email
    const [weatherData, setWeatherData] = useState(null); // Weather data
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(1); // How much is buyer buying
    const [tradeCount, setTradeCount] = useState(1); // How much buyer is giving away
    const [isTransactionProcessing, setIsTransactionProcessing] =
        useState(false); // Processing transaction, prevents buying sold
    const [availableTickets, setAvailableTickets] = useState(
        ad.numberOfTickets || 0
    ); // Avaible tickets after purchase
    const [selectedOption, setSelectedOption] = useState(""); // Track the descrpition of the selected ad
    const [buyerAd, setBuyerAd] = useState(null); // Which ad is selected
    const apiKey = "2b1b4bd8fe954283ab3191954250301";
    const city = ad.address.split(",")[1]?.trim() || "Zagreb";
    const eventDate = ad.date.split("T")[0];
    const eventTime = ad.date.split("T")[1].split(":")[0];
    const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
    const [selectedAction, setSelectedAction] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/user-info`, {
                withCredentials: true,
            })
            .then((response) => {
                setUser(response.data);
                console.log("User data:", response.data.email);
            })
            .catch((error) => {
                console.error("Error occurred: ", error);
            });
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&dt=${eventDate}&hour=${eventTime}`
                );

                if (response.data?.forecast) {
                    const weatherForTime =
                        response.data.forecast.forecastday[0].hour.find(
                            (hour) =>
                                hour.time.split(" ")[1] === `${eventTime}:00`
                        );
                    setWeatherData(weatherForTime || null);
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setWeatherData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [ad.date, eventDate, eventTime, city]);

    useEffect(() => {
        if (ad.type === "0" && user) {
            const fetchBuyerAds = async () => {
                try {
                    // Kreiranje tijela zahtjeva sa user.email
                    const payload = {
                        mail: user.email,
                    };

                    // Slanje POST zahtjeva sa payload podacima
                    const response = await axios.post(
                        `${process.env.REACT_APP_BACKEND_URL}/ulaznica/razmjene`,
                        payload,
                        { withCredentials: true }
                    );

                    // Ispisivanje podataka u konzolu
                    console.log("Ulaznice za razmjenu:", response.data);

                    // Postavljanje podataka u state
                    setBuyerAds(response.data);
                } catch (error) {
                    console.error("Error fetching buyer ads:", error);
                }
            };

            fetchBuyerAds();
        }
    }, [ad.type, user]);

    const increment = () => {
        if (count < availableTickets) setCount((prev) => prev + 1);
    };

    const incrementTrade = () => {
        if (tradeCount < buyerAd.aktivan) setTradeCount((prev) => prev + 1);
    };

    const decrement = () => {
        if (count > 1) setCount((prev) => prev - 1);
    };

    const decrementTrade = () => {
        if (tradeCount > 1) setTradeCount((prev) => prev - 1);
    };

    const handlePurchase = async () => {
        setIsTransactionProcessing(true);

        // Calculate the starting and ending indices for the tickets to purchase
        const startingIndex = ad.numberOfTickets - 1;
        const endingIndex = startingIndex - count + 1;

        // Slice the tickets array to get the selected tickets
        const ticketIds = ad.tickets
            .slice(endingIndex, startingIndex + 1) // Slice from endingIndex to startingIndex (inclusive)
            .map((ticket) => ticket.idUlaznica);
        console.log("Selected Ticket IDs for Purchase:", ticketIds);

        try {
            if (ad.type === "1") {
                await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/ulaznica/kupnja`,
                    { buyerEmail: user.email, ticketIds },
                    { withCredentials: true }
                );
                console.log("Purchase submitted successfully");
                alert("Ulaznice kupljene!");
                // Update the state to reflect purchased tickets
                setAvailableTickets((prev) => prev - count);
            } else {
                // Handle trade when ad.type is "0"
                if (selectedOption) {
                    console.log("Trade Option Selected:", selectedOption);
                    console.log("Seller ad id:", ad.id);
                    console.log("Buyer ad id:", buyerAd.idOglas);
                    console.log("Buyer count:", tradeCount);

                    if (buyerAd) {
                        await axios.post(
                            `${process.env.REACT_APP_BACKEND_URL}/ulaznica/podnesi-razmjenu`,
                            {
                                sellerAd: ad.id,
                                buyerAd: buyerAd.idOglas,
                                count: tradeCount,
                            },
                            { withCredentials: true }
                        );
                        console.log("Exchange submitted successfully");
                        alert("Ulaznice kupljene!");
                    } else {
                        console.log("Buyer ad not found for selected option");
                    }
                } else {
                    console.log("Please select an option for trade.");
                }
            }
        } catch (error) {
            console.error("Error occurred during the transaction:", error);
        } finally {
            setIsTransactionProcessing(false);
            navigate("/selection");
        }
    };

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(e.target.value);
        const selectedAd = buyerAds.find(
            (buyerAd) => buyerAd.opis === selectedValue
        );
        setBuyerAd(selectedAd);
        if (selectedAd) {
            console.log("Buyer ad:", selectedAd);
            setTradeCount(1); // Reset trade count to 1 after selection
        }
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleActionSelect = (action) => {
        setSelectedAction(action);
        setDropdownVisible(false); // Close dropdown after selection
    };

    const getMatchingBuyerAds = () => {
        if (!buyerAds || !ad.tradeDescription) return [];

        // Split the seller's trade description into words
        const sellerWords = ad.tradeDescription
            .split(/\s+/)
            .map((word) => word.toLowerCase());

        // Filter buyer ads based on common words in their 'opis' and seller's 'tradeDescription'
        return buyerAds.filter((buyerAd) => {
            const buyerWords = buyerAd.opis
                .split(/\s+/)
                .map((word) => word.toLowerCase());
            return buyerWords.some((word) => sellerWords.includes(word)); // Check for common words
        });
    };

    const getTicketTypeDescription = (ticketType) => {
        switch (ticketType) {
            case 2:
                return "VIP";
            case 3:
                return "Druženje sa zvijezdom";
            default:
                return "Obična";
        }
    };

    const isSameUser = user?.email === ad.email;

    
    const location = useLocation();
    const isAdvertisementsRoute = location.pathname === '/advertisements';
    const isAdminOrUserRoute = (location.pathname==='/user/oglasi' || location.pathname==='/admin/oglasi');
    const isAdminRoute = location.pathname==='/admin/oglasi';
    const isUserRoute = location.pathname==='/user/oglasi';
    const handleActivation = async () => {
        const activation = (ad.numberOfTickets >= 1 ? -1 : -10);
        const payload = { id: ad.id, activation: activation};
    
        try {
            if (isAdminRoute) {
                console.log("ID oglasa: ", ad.id, "| aktivacija: ", activation, "Broj karata: ", ad.numberOfTickets);
                const response = await axios.post(
                    "http://localhost:8081/admin/activation",
                    payload,
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
                    }
                );
                console.log("Aktivacija i deaktivacija uspješni.", response.data);
                alert("Deaktivacija ili reaktivacija oglasa uspješna");
            } else if (isUserRoute) {
                console.log("ID oglasa: ", ad.id, "| aktivacija: ", activation, "Broj karata: ", ad.numberOfTickets);
                const response = await axios.post(
                    "http://localhost:8081/user/activation",
                    payload,
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
                    }
                );
                console.log("Aktivacija i deaktivacija uspješni.", response.data);
                alert("Deaktivacija ili reaktivacija oglasa uspješna");
            }
        } catch (error) {
            console.error(
                "Greška pri deaktivaciji ili reaktivaciji oglasa: ",
                error.response ? error.response.data : error.message
            );
        }
    };

    const zauvijekDeaktiviran = ad.numberOfTickets===-2
    

    return (
        <div className="card">
            <div className="card-info">
                <div className="tip1">{ad.description}</div>
                <div className="adresa1">{ad.address}</div>
                <div className="datum1">{ad.date}</div>
                <div className="cijena1">
                    {ad.type === "1" ? `${ad.price} €` : ad.tradeDescription}
                </div>
                <div className="tip1">Broj ulaznica: {availableTickets}</div>
                <div className="tip1">Korisnik: {ad.email}</div>
                <div className="tip1">
                    Vrsta karte: {getTicketTypeDescription(ad.ticketType)}
                </div>
                {isAdminOrUserRoute && (
                    <button className={ad.numberOfTickets==-2 || isAdvertisementsRoute ? "activation hidden" : "activation"} 
                    onClick={handleActivation}
                    disabled={zauvijekDeaktiviran}>
                        {ad.numberOfTickets>=1 ? "Deaktiviraj oglas" : "Aktiviraj oglas"}
                        
                    </button>
                )}

                {/* Tridot Dropdown */}
                <div className="tridot-dropdown">
                    <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="tridot-icon"
                        onClick={toggleDropdown}
                        title="Options"
                    />
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <button onClick={() => handleActionSelect("like")}>
                                <FontAwesomeIcon
                                    icon={faThumbsUp}
                                    className="dropdown-icon"
                                />{" "}
                                Like
                            </button>
                            <button
                                onClick={() => handleActionSelect("dislike")}
                            >
                                <FontAwesomeIcon
                                    icon={faThumbsDown}
                                    className="dropdown-icon"
                                />{" "}
                                Dislike
                            </button>
                            <button
                                onClick={() => handleActionSelect("report")}
                            >
                                <FontAwesomeIcon
                                    icon={faFlag}
                                    className="dropdown-icon"
                                />{" "}
                                Report
                            </button>
                        </div>
                    )}
                </div>
                {selectedAction && (
                    <div className="selected-action">
                        <span>Action selected: {selectedAction}</span>
                    </div>
                )}

                <div className="counter-section">
                    <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="counter-icon"
                        title="Buy"
                    />
                    <button
                        className="counter-btn"
                        onClick={decrement}
                        disabled={isTransactionProcessing}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="counter-value">{count}</span>
                    <button
                        className="counter-btn"
                        onClick={increment}
                        disabled={isTransactionProcessing}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>

                {/* Exchange Dropdown Always Visible */}
                {ad.type !== "1" && buyerAds && (
                    <div className="exchange-dropdown">
                        <select
                            onChange={handleSelectChange}
                            value={selectedOption}
                        >
                            <option value="">Select matching tickets</option>
                            {getMatchingBuyerAds().map((buyerAd) => (
                                <option
                                    key={buyerAd.idOglas}
                                    value={buyerAd.opis}
                                >
                                    {buyerAd.opis}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Trade Counter Controls When Option is Selected */}
                {selectedOption && (
                    <div className="counter-section">
                        <FontAwesomeIcon
                            icon={faHandHolding}
                            className="counter-icon"
                            title="Offer"
                        />
                        <button
                            className="counter-btn"
                            onClick={decrementTrade}
                            disabled={isTransactionProcessing}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="counter-value">{tradeCount}</span>
                        <button
                            className="counter-btn"
                            onClick={incrementTrade}
                            disabled={isTransactionProcessing}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <span className="selected-option-text">
                            {selectedOption}
                        </span>
                    </div>
                )}

                <button
                    className={`buy-btn ${
                        !isTransactionProcessing &&
                        !isSameUser && isAdminOrUserRoute && (ad.type === "1" ||
                            (ad.type === "0" && selectedOption))
                            ? ""
                            : "disabled-btn"
                    }`}
                    onClick={handlePurchase}
                    disabled={
                        isTransactionProcessing || isSameUser ||
                        (ad.type === "0" && !selectedOption)
                    }
                >
                    {ad.type === "1" ? "Kupi" : "Razmjeni"}
                </button>
            </div>

            {loading ? (
                <div className="weather-info">Loading weather...</div>
            ) : weatherData ? (
                <div className="weather-info">
                    <div className="weather-item">
                        <FontAwesomeIcon icon={faCloudSun} />
                        <span>Weather: {weatherData.condition.text}</span>
                    </div>
                    <div className="weather-item">
                        <FontAwesomeIcon icon={faThermometerHalf} />
                        <span>Temperature: {weatherData.temp_c}°C</span>
                    </div>
                    <div className="weather-item">
                        <FontAwesomeIcon icon={faWind} />
                        <span>Wind: {weatherData.wind_kph} kph</span>
                    </div>
                    <div className="weather-item">
                        <FontAwesomeIcon icon={faTint} />
                        <span>Humidity: {weatherData.humidity}%</span>
                    </div>
                </div>
            ) : (
                <div className="weather-info">Weather data not available</div>
            )}
        </div>
    );
};

export default Card;