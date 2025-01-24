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
    //faHandHolding,
    faEllipsisVertical,
    faThumbsUp,
    faThumbsDown,
    faFlag,
    faHeart,
    faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Card.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Card = ({ ad }) => {
    const [user, setUser] = useState(null); //inicijalizacja korisnika
    const [loading, setLoading] = useState(true); //za učitavanje (?)
    const [buyerAds, setBuyerAds] = useState(null); //oglasi kupca
    const [buyerAd, setBuyerAd] = useState(null); // odabrani oglasi kupca
    const [count, setCount] = useState(1); // broj karti koje korisnik kupuje
    const [isTransactionProcessing, setIsTransactionProcessing] =
        useState(false); //transakcija u izvođenju, neomogućuje kupovinu kupljenih karata
    const [availableTickets, setAvailableTickets] = useState(
        ad.numberOfTickets || 0
    ); //broj karata koje se mogu kupiti
    const [selectedOption, setSelectedOption] = useState("");

    //info za vrijeme
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = "2b1b4bd8fe954283ab3191954250301";
    const city = ad.address.split(",")[1]?.trim() || "Zagreb";
    const eventDate = ad.date.split("T")[0];
    const eventTime = ad.date.split("T")[1].split(":")[0];
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [, setSelectedAction] = useState("");

    const location = useLocation(); //za provjeru rute na kojoj se korisnik nalazi
    const isAdminOrUserOglasiPage =
        location.pathname.endsWith("/admin/oglasi") ||
        location.pathname.endsWith("/user/oglasi");

    //inicijalizacija useNavigate (koristi se za redirectanje)
    const navigate = useNavigate();

    //dohvat informacija o korisniku
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

    //dohvat informacija o vremenu
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&dt=${eventDate}&hour=${eventTime}`
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

    //kreiranje i slanje zahtjeva za razmjene
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

    //logika za biranje broja karata koje se želi kupiti/zamijeniti
    const increment = () => {
        if (ad.type === "1") {
            if (count < availableTickets) {
                setCount((prev) => prev + 1);
                console.log("Incremented count:", count + 1);
            }
        } else {
            if (
                buyerAd &&
                count < Math.min(availableTickets, buyerAd.aktivan)
            ) {
                setCount((prev) => prev + 1);
                console.log("Incremented count for trade:", count + 1);
            }
        }
    };

    const decrement = () => {
        if (count > 1) setCount((prev) => prev - 1);
    };

    //rukovanje kupnjom/zamjenom karata
    const handlePurchase = async () => {
        setIsTransactionProcessing(true);

        const startingIndex = ad.numberOfTickets - 1;
        const endingIndex = startingIndex - count + 1;

        const ticketIds = ad.tickets
            .slice(endingIndex, startingIndex + 1)
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
                setAvailableTickets((prev) => prev - count);
            } else {
                if (selectedOption) {
                    console.log("Trade Option Selected:", selectedOption);
                    console.log("Seller ad id:", ad.id);
                    console.log("Buyer ad id:", buyerAd.idOglas);

                    if (buyerAd) {
                        await axios.post(
                            `${process.env.REACT_APP_BACKEND_URL}/ulaznica/podnesi-razmjenu`,
                            {
                                sellerAd: ad.id,
                                buyerAd: buyerAd.idOglas,
                                count: count,
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

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    //provjerava je li oglas za razmjenu
    const getMatchingBuyerAds = () => {
        if (!buyerAds || !ad.tradeDescription) {
            return [];
        } else {
            return buyerAds;
        }
    };

    //opis tipa karte
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

    //logika za like/dislike oglasa i report
    const handleActionSelect = async (action) => {
        console.log(user.email, ad.id, action);
        setSelectedAction(action);
        try {
            if (action !== "2") {
                const url = `${process.env.REACT_APP_BACKEND_URL}/oglas/interact?email=${user.email}&idOglas=${ad.id}&action=${action}&blame=${user?.email}`;

                await axios.post(url, null, { withCredentials: true });

                alert("Oglas " + ad.description + " dis/likean!");
                navigate("/selection");
                setDropdownVisible(false);
            } else {
                const url = `${process.env.REACT_APP_BACKEND_URL}/homepage/dispute?tuzioEmail=${user.email}&tuzeniEmail=${ad.email}`;

                await axios.post(url, null, { withCredentials: true });

                alert("Korisnik prijavljen");
                setDropdownVisible(false);
            }
        } catch (error) {
            console.error("Error interacting with backend:", error);
        }
    };

    //logika za aktivaciju i deaktivaciju oglasa
    const isAdvertisementsRoute = location.pathname === "/advertisements";
    const isAdminOrUserRoute =
        location.pathname === "/user/oglasi" ||
        location.pathname === "/admin/oglasi";
    const isAdminRoute = location.pathname === "/admin/oglasi";
    const isUserRoute = location.pathname === "/user/oglasi";
    const handleActivation = async () => {
        const activation = ad.numberOfTickets >= 1 ? -1 : -10;
        const payload = { id: ad.id, activation: activation };

        try {
            if (isAdminRoute) {
                console.log(
                    "ID oglasa: ",
                    ad.id,
                    "| aktivacija: ",
                    activation,
                    "Broj karata: ",
                    ad.numberOfTickets
                );
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/admin/activation/${user?.email}`,
                    payload,
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
                    }
                );
                console.log(
                    "Aktivacija i deaktivacija uspješni.",
                    response.data
                );
                alert("Deaktivacija ili reaktivacija oglasa uspješna");
                navigate(0);
            } else if (isUserRoute) {
                console.log(
                    "ID oglasa: ",
                    ad.id,
                    "| aktivacija: ",
                    activation,
                    "Broj karata: ",
                    ad.numberOfTickets
                );
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/user/activation`,
                    payload,
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
                    }
                );
                console.log(
                    "Aktivacija i deaktivacija uspješni.",
                    response.data
                );
                alert("Deaktivacija ili reaktivacija oglasa uspješna");
                navigate(0);
            }
        } catch (error) {
            console.error(
                "Greška pri deaktivaciji ili reaktivaciji oglasa: ",
                error.response ? error.response.data : error.message
            );
        }
    };

    const zauvijekDeaktiviran = ad.numberOfTickets === -2;

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(e.target.value);
        setCount(1);
        const selectedAd = buyerAds.find(
            (buyerAd) => buyerAd.opis === selectedValue
        );
        setBuyerAd(selectedAd);
    };

    //provjera jesu li prijavljeni korisnik i korisnik koji prodaje karte isti
    // -> zbog ovog korisnik ne može kupiti/zamijeniti svoj oglas, niti ga lajkati/dislajkati/prijaviti
    const isTheSameUser = user?.email === ad.email;

    return (
        <div className="card">
            <div className="card-info">
                <div className="tip1">
                    {ad.liked === 1 ? (
                        <FontAwesomeIcon
                            icon={faHeart}
                            className="liked-icon"
                        />
                    ) : ad.liked === -1 ? (
                        <FontAwesomeIcon
                            icon={faHeartBroken}
                            className="disliked-icon"
                        />
                    ) : null}
                    {" " + ad.description}
                </div>
                <div className="tip2">{ad.address}</div>
                <div className="tip2">{ad.date}</div>
                <div className="tip2">
                    {ad.type === "1" ? `${ad.price} €` : ad.tradeDescription}
                </div>
                <div className="tip3">Broj ulaznica: {availableTickets}</div>
                <div className="tip3">Korisnik: {ad.email}</div>
                <div className="tip3">
                    Vrsta karte: {getTicketTypeDescription(ad.ticketType)}
                </div>

                {isAdminOrUserRoute && (
                    <button
                        className={
                            ad.numberOfTickets === 0 ||
                            ad.numberOfTickets === -2 ||
                            isAdvertisementsRoute
                                ? "activation hidden"
                                : "activation"
                        }
                        onClick={handleActivation}
                        disabled={zauvijekDeaktiviran}
                    >
                        {ad.numberOfTickets >= 1
                            ? "Deaktiviraj oglas"
                            : "Aktiviraj oglas"}
                    </button>
                )}

                {!isAdminOrUserOglasiPage && !isTheSameUser && user && (
                    <div className="tridot-dropdown">
                        <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            className="tridot-icon"
                            onClick={toggleDropdown}
                            title="Options"
                        />
                        {dropdownVisible && !isTheSameUser && user && (
                            <div className="dropdown-menu">
                                <button onClick={() => handleActionSelect("1")}>
                                    <FontAwesomeIcon
                                        icon={faThumbsUp}
                                        className="dropdown-icon"
                                    />{" "}
                                    Like
                                </button>
                                <button
                                    onClick={() => handleActionSelect("-1")}
                                >
                                    <FontAwesomeIcon
                                        icon={faThumbsDown}
                                        className="dropdown-icon"
                                    />{" "}
                                    Dislike
                                </button>
                                <button onClick={() => handleActionSelect("2")}>
                                    <FontAwesomeIcon
                                        icon={faFlag}
                                        className="dropdown-icon"
                                    />{" "}
                                    Report
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {!isAdminOrUserOglasiPage && !isTheSameUser && user && (
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
                )}

                {!isAdminOrUserOglasiPage &&
                    ad.type !== "1" &&
                    buyerAds &&
                    !isTheSameUser &&
                    user && (
                        <div className="exchange-dropdown">
                            <select
                                onChange={handleSelectChange}
                                value={selectedOption}
                            >
                                <option value="">
                                    Select matching tickets
                                </option>
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

                {!isAdminOrUserOglasiPage && !isTheSameUser && user && (
                    <button
                        className={`buy-btn ${
                            !isTransactionProcessing &&
                            (ad.type === "1" ||
                                (ad.type === "0" && selectedOption))
                                ? ""
                                : "disabled-btn"
                        }`}
                        onClick={handlePurchase}
                        disabled={
                            isTransactionProcessing ||
                            (ad.type === "0" && !selectedOption)
                        }
                    >
                        {ad.type === "1" ? "Kupi" : "Razmjeni"}
                    </button>
                )}
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
