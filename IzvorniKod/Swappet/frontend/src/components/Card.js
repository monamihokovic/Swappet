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
} from "@fortawesome/free-solid-svg-icons";
import "../css/Card.css";
import axios from "axios";

const Card = ({ ad, tickets }) => {
    const [user, setUser] = useState(null);
    console.log("Seller ad:", ad);
    const [buyerAds, setBuyerAds] = useState(null); // All buyer ads fetched from his email
    const [weatherData, setWeatherData] = useState(null); // Weather data
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(1); // How much is buyer buying
    const [tradeCount, setTradeCount] = useState(1); // How much buyer is giving away
    const [isTransactionProcessing, setIsTransactionProcessing] = useState(false); // Processing transaction, prevents buying sold tickets
    const [availableTickets, setAvailableTickets] = useState(ad.numberOfTickets); // Avaible tickets after purchase
    const [purchasedTicketCount, setPurchasedTicketCount] = useState(0); // Purchased ticket amount
    const [selectedOption, setSelectedOption] = useState(''); // Track the descrpition of the selected ad
    const [buyerAd, setBuyerAd] = useState(null); // Which ad is selected
    const apiKey = "2b1b4bd8fe954283ab3191954250301";
    const city = ad.address.split(",")[1]?.trim() || "Zagreb";
    const eventDate = ad.date.split("T")[0];
    const eventTime = ad.date.split("T")[1].split(":")[0];

    useEffect(() => {
        axios
            .get("http://localhost:8081/user-info", { withCredentials: true })
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
                    const weatherForTime = response.data.forecast.forecastday[0].hour.find(
                        (hour) => hour.time.split(" ")[1] === `${eventTime}:00`
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
                    const response = await axios.get(
                        `http://localhost:8081/user/oglasi/${user.email}`,
                        { withCredentials: true }
                    );
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
        if (tradeCount < buyerAd.numberOfTickets) setTradeCount((prev) => prev + 1);
    };

    const decrement = () => {
        if (count > 1) setCount((prev) => prev - 1);
    };

    const decrementTrade = () => {
        if (tradeCount > 1) setTradeCount((prev) => prev - 1);
    };

    const handlePurchase = async () => {
        setIsTransactionProcessing(true);

        const startingIndex = purchasedTicketCount;
        const ticketIds = ad.tickets.slice(startingIndex, startingIndex + count).map((ticket) => ticket.idUlaznica);
        console.log("Ticket Purchase");

        try {
            if (ad.type === "1") {
                await axios.post(
                    "http://localhost:8081/ulaznica/kupnja",
                    { buyerEmail: user.email, ticketIds },
                    { withCredentials: true }
                );

                setPurchasedTicketCount((prev) => prev + count);
                setAvailableTickets((prev) => prev - count);
            } else {
                // Handle trade when ad.type is "0"
                if (selectedOption) {
                    console.log("Trade Option Selected:", selectedOption);

                    if (buyerAd) {
                        await axios.post(
                            `http://localhost:8081/ulaznica/podnesi-razmjenu?idOglasBuyer=${buyerAd.id}&idOglasSeller=${ad.id}`,
                            { withCredentials: true }
                        );
                        console.log("Exchange submitted successfully");
                    } else {
                        console.log("Buyer ad not found for selected option");
                    }
                }
                else {
                    console.log("Please select an option for trade.");
                }
            }
        } catch (error) {
            console.error("Error occurred:", error);
        } finally {
            setIsTransactionProcessing(false);
        }
    };


    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(e.target.value);
        const selectedAd = buyerAds.find((buyerAd) => buyerAd.description === selectedValue);
        setBuyerAd(selectedAd);
        if (selectedAd) {
            console.log("Buyer ad:", selectedAd);
            setTradeCount(1); // Reset trade count to 1 after selection
        }
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
                <div className="tip1">Vrsta karte: {getTicketTypeDescription(ad.ticketType)}</div>

                <div className="counter-section">
                    <FontAwesomeIcon icon={faShoppingCart} className="counter-icon" title="Buy" />
                    <button className="counter-btn" onClick={decrement} disabled={isTransactionProcessing}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="counter-value">{count}</span>
                    <button className="counter-btn" onClick={increment} disabled={isTransactionProcessing}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>

                {/* Exchange Dropdown Always Visible */}
                {ad.type !== "1" && buyerAds && (
                    <div className="exchange-dropdown">
                        <select onChange={handleSelectChange} value={selectedOption}>
                            <option value="">Select matching tickets</option>
                            {buyerAds.map((buyerAd) => (
                                <option key={buyerAd.id} value={buyerAd.description}>
                                    {buyerAd.description}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Trade Counter Controls When Option is Selected */}
                {selectedOption && (
                    <div className="counter-section">
                        <FontAwesomeIcon icon={faHandHolding} className="counter-icon" title="Offer" />
                        <button className="counter-btn" onClick={decrementTrade} disabled={isTransactionProcessing}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="counter-value">{tradeCount}</span>
                        <button className="counter-btn" onClick={incrementTrade} disabled={isTransactionProcessing}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <span className="selected-option-text">{selectedOption}</span>
                    </div>
                )}

                <button
                    className={`buy-btn ${selectedOption || ad.type === "1"  && !isSameUser? "" : "disabled-btn"}`}
                    onClick={handlePurchase}
                    disabled={isTransactionProcessing || (ad.type === "0" && !selectedOption) || isSameUser}
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
