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
    console.log("Ad details:", ad); // Log the contents of the ad object

    const adType = typeMapping[ad.tipOglas];
    const [user, setUser] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(1); // Counter state for selected tickets
    const [isTransactionProcessing, setIsTransactionProcessing] = useState(false); // State to track transaction
    const [availableTickets, setAvailableTickets] = useState(tickets.length); // Track available tickets
    const [purchasedTicketCount, setPurchasedTicketCount] = useState(0); // Track how many tickets have been purchased

    const apiKey = "2b1b4bd8fe954283ab3191954250301";
    const city = ad.address.split(",")[1]?.trim() || "Zagreb";
    const eventDate = ad.date.split("T")[0];
    const eventTime = ad.date.split("T")[1].split(":")[0];

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
    }, []); // Ensure the effect only runs once when the component is mounted

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
    const increment = () => {
        if (count < availableTickets) {
            setCount(prev => prev + 1);
        }
    };

    const decrement = () => {
        if (count > 1) {
            setCount(prev => prev - 1);
        }
    };

    // Handle "Kupi" button click and send POST request
    const handlePurchase = async () => {
        setIsTransactionProcessing(true);

        // Determine the starting index for ticket selection
        const startingIndex = purchasedTicketCount;

        // Select the ticket IDs starting from the current purchased ticket count
        const ticketIds = ad.tickets.slice(startingIndex, startingIndex + count).map(ticket => ticket.idUlaznica);
        console.log("Selected Ticket IDs:", ticketIds);

        // Collect the necessary data for the transaction
        const transactionData = {
            buyerEmail: user.email,  // Use the email from session storage
            ticketIds: ticketIds, // Assuming tickets is an array of ticket objects
        };

        try {
            const response = await axios.post("http://localhost:8081/ulaznica/kupnja", transactionData, {
                withCredentials: true,
            });
            console.log("Transaction successful:", response.data);

            // Update purchased ticket count and available tickets
            const newPurchasedTicketCount = purchasedTicketCount + count;
            setPurchasedTicketCount(newPurchasedTicketCount);
            setAvailableTickets(availableTickets - count);

            // Update transaction state to disable button
            setIsTransactionProcessing(false);
        } catch (error) {
            console.error("Error during transaction:", error);
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
                <div className="tip1">Broj ulaznica: {availableTickets}</div>
                <div className="tip1">Korisnik: {ad.email}</div>
                <div className="tip1">
                    Vrsta karte: {getTicketTypeDescription(ad.ticketType)}
                </div>

                {/* Counter Section */}
                <div className="counter-section">
                    <button className="counter-btn" onClick={decrement} disabled={isTransactionProcessing}>
                        <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="counter-value">{count}</span>
                    <button className="counter-btn" onClick={increment} disabled={isTransactionProcessing}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>

                {/* Buy Button */}
                <button
                    className={`buy-btn ${availableTickets === 0 ? 'disabled-btn' : ''}`}
                    onClick={handlePurchase}
                    disabled={isTransactionProcessing || availableTickets === 0}
                >
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
