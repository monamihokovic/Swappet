import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCloudSun,
    faThermometerHalf,
    faWind,
    faTint,
    faPlus,
    faMinus,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Card.css";
import axios from "axios";

const typeMapping = {
    1: "Koncert",
    2: "Izložba",
    3: "Predstava",
    4: "Putovanja",
    5: "Tulumi",
    6: "Kino",
    7: "Sport",
    8: "Prijevoz",
    9: "Ostalo",
};

const Card = ({ ad, tickets }) => {
    const adType = typeMapping[ad.tipOglas];
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(1); // Counter state
    const [isTransactionProcessing, setIsTransactionProcessing] = useState(false); // State to track transaction

    const apiKey = "d0e4a536241b489889402925241412";
    const city = ad.address.split(",")[1]?.trim() || "Zagreb";
    const eventDate = ad.date.split("T")[0];
    const eventTime = ad.date.split("T")[1].split(":")[0];

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&dt=${eventDate}&hour=${eventTime}`
                );

                if (response.data && response.data.forecast) {
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

    // Increment and Decrement functions
    const increment = () => setCount((prev) => (prev < tickets.length ? prev + 1 : prev));
    const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));

    // Handle "Kupi" button click and send POST request
    const handlePurchase = async () => {
        setIsTransactionProcessing(true);

        const transactionData = {
            // placeholder data
        };

        try {
            const response = await axios.post("http://localhost:8081/ulaznica/kupnja", transactionData);
            console.log("Transaction successful:", response.data);
        } catch (error) {
            console.error("Error during transaction:", error);
        } finally {
            setIsTransactionProcessing(false);
        }
    };

    // Determine ticket type description
    const getTicketTypeDescription = (ticketType) => {
        switch (ticketType) {
            case 2:
                return "VIP";
            case 3:
                return "Druženje sa zvijezdom";
            default:
                return ticketType ? "Obična" : "Obična"; // Default for null or other numbers
        }
    };

    return (
        <div className="card">
            <div className="card-info">
                <div className="tip1">{ad.description}</div>
                <div className="adresa1">{ad.address}</div>
                <div className="datum1">{ad.date}</div>
                <div className="cijena1">{ad.price} €</div>
                <div className="tip1">Broj ulaznica: {tickets.length}</div>
                <div className="tip1">Korisnik: {ad.email}</div>
                <div className="tip1">
                    Vrsta karte: {getTicketTypeDescription(ad.ticketType)}
                </div>

                {/* Removed Tickets Section */}

                {/* Counter Section */}
                <div className="counter-section">
                    <button className="counter-btn" onClick={decrement}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="counter-value">{count}</span>
                    <button className="counter-btn" onClick={increment}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>

                {/* Buy Button */}
                <button className="buy-btn" onClick={handlePurchase} disabled={isTransactionProcessing}>
                    {isTransactionProcessing ? "Processing..." : "Kupi"}
                </button>
            </div>

            {/* Weather Section */}
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

