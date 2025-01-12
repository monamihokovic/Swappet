import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/createEvent.css";
import axios from "axios";

const defaultProfilePic = "/defaultpfp.jpg";

const CreateEvent = ({ userName, profilePic }) => {
    const [user, setUser] = useState(null);
    const [eventDetails, setEventDetails] = useState({
        name: "",
        category: "",
        date: "",
        time: "",
        price: "",
        description: "",
        street: "",
        houseNumber: "",
        city: "",
        numberOfTickets: "",
        ticketType: "",
        type: "", // tip transakcije
        red: -1,
        broj: -1
    });

    const [isSeatSelectionDisabled, setSeatSelectionDisabled] = useState(true);

    const navigate = useNavigate();

    // Mapa kategorija
    const categoryMapping = {
        Koncerti: 1,
        Izložbe: 2,
        Predstave: 3,
        Putovanja: 4,
        Tulumi: 5,
        Kino: 6,
        Sport: 7,
        Prijevoz: 8,
        Ostalo: 9,
    };

    // Dohvati korisničke informacije
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventDetails((prevDetails) => {
            const updatedDetails = { ...prevDetails, [name]: value };

            // Provjera promjene za "numberOfTickets"
            if (name === "numberOfTickets") {
                if (value === "1") {
                    setSeatSelectionDisabled(false);
                    updatedDetails.red = 0;
                    updatedDetails.broj = 0;
                } else {
                    setSeatSelectionDisabled(true);
                    updatedDetails.red = -1;
                    updatedDetails.broj = -1;
                }
            }

            return updatedDetails;
        });
    };

    const handleCategoryChange = (e) => {
        setEventDetails((prevDetails) => ({
            ...prevDetails,
            category: categoryMapping[e.target.value],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Priprema datuma
        let date = eventDetails.date;
        let time = eventDetails.time;
        if (date) {
            if (time) {
                date = `${date}T${time}`;
            } else {
                date = `${date}T12:00:00`;
            }
        }

        // Priprema podataka
        const eventData = {
            description: eventDetails.description,
            categoryId: eventDetails.category,
            price: eventDetails.price,
            street: eventDetails.street,
            houseNumber: eventDetails.houseNumber,
            city: eventDetails.city,
            date: date,
            email: user?.email,
            numberOfTickets: eventDetails.numberOfTickets,
            ticketType: eventDetails.ticketType,
            type: eventDetails.type,
            red: eventDetails.red,
            broj: eventDetails.broj,
        };

        // Slanje podataka na backend
        axios
            .post("http://localhost:8081/oglas", eventData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("Event created successfully:", response.data);
                navigate("/selection");
            })
            .catch((error) => {
                console.error(
                    "Error creating event:",
                    error.response ? error.response.data : error.message
                );
            });
    };
    const isSingleTicket = eventDetails.numberOfTickets === "1";

    return (
        <div className="create-event">
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
                    <div className="username" onClick={() => navigate("/advertisements")}>
                        {user ? user.name : "Loading..."}
                        
                    </div>
                </div>

                <div className="logo" onClick={() => navigate("/")}>
                    S<span id="usklicnik">!</span>
                </div>
            </div>

            <form className="eventCreator" onSubmit={handleSubmit}>
                <h1 className="noviDog">Stvori novi događaj:</h1>
                <div className="container1">
                    <div className="kategorija">Kategorija:</div>
                    {["Koncerti", "Izložbe", "Predstave", "Putovanja", "Tulumi", "Kino", "Sport", "Prijevoz", "Ostalo"]
                        .map((category) => (
                            <label className="kategorijaInput" key={category}>
                                <input
                                    type="radio"
                                    name="category"
                                    value={category}
                                    onChange={handleCategoryChange}
                                    required
                                />
                                {category}
                            </label>
                    ))}
                    <div className="datum">Datum događaja:</div>
                    <input
                        className="datumInput"
                        type="date"
                        name="date"
                        value={eventDetails.date}
                        onChange={handleInputChange}
                        required
                    />
                    <div className="datum">Vrijeme događaja:</div>
                    <input
                        className="datumInput"
                        type="time"
                        name="time"
                        value={eventDetails.time}
                        onChange={handleInputChange}
                        required
                    />
                    <div className="cijena">Cijena:</div>
                    <input
                        className="cijenaInput"
                        type="number"
                        name="price"
                        value={eventDetails.price}
                        onChange={handleInputChange}
                        placeholder="Unesi cijenu karte"
                        required
                    />
                    <div className={`red ${isSingleTicket ? "" : "hidden"}`}>Red:</div>
                    <input
                        className={`redInput ${isSingleTicket ? "" : "hidden"}`}
                        type="number"
                        name="red"
                        value={eventDetails.red}
                        onChange={handleInputChange}
                        disabled={isSeatSelectionDisabled}
                    />
                    <div className={`broj ${isSingleTicket ? "" : "hidden"}`}>Broj:</div>
                    <input
                        className={`brojInput ${isSingleTicket ? "" : "hidden"}`}
                        type="number"
                        name="broj"
                        value={eventDetails.broj}
                        onChange={handleInputChange}
                        disabled={isSeatSelectionDisabled}
                    />
                    <div className="tipTransakcije">Tip transakcije:</div>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="1"
                            onChange={handleInputChange}
                            required
                            className="tipTransakcijeInput"
                        />
                        Prodaja
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="2"
                            onChange={handleInputChange}
                            required
                            className="tipTransakcijeInput"
                        />
                        Zamjena
                    </label>
                    <input
                        className="submit"
                        type="submit"
                        value="Kreiraj događaj!"
                    />
                </div>
                <div className="container2">
                    <div className="opis">Opis događaja:</div>
                    <input
                        className="opisInput"
                        type="text"
                        name="description"
                        value={eventDetails.description}
                        onChange={handleInputChange}
                        placeholder="Opiši događaj sa što više detalja!"
                    />
                    <div className="adresa">Ulica događaja:</div>
                    <input
                        className="adresaInput"
                        type="text"
                        name="street"
                        value={eventDetails.street}
                        onChange={handleInputChange}
                        placeholder="Unesi ulicu"
                        required
                    />
                    <div className="adresa">Kućni broj:</div>
                    <input
                        className="adresaInput"
                        type="number"
                        name="houseNumber"
                        value={eventDetails.houseNumber}
                        onChange={handleInputChange}
                        placeholder="Unesi kućni broj"
                        required
                    />
                    <div className="adresa">Grad:</div>
                    <input
                        className="adresaInput"
                        type="text"
                        name="city"
                        value={eventDetails.city}
                        onChange={handleInputChange}
                        placeholder="Unesi ime grada"
                        required
                    />
                    <div className="kolicina">Količina ulaznica:</div>
                    <input
                        className="kolicinaInput"
                        type="number"
                        name="numberOfTickets"
                        value={eventDetails.numberOfTickets}
                        onChange={handleInputChange}
                        placeholder="Unesi količinu ulaznica"
                        required
                    />
                    <div className="tipUlaznice">Tip ulaznice:</div>
                    <select
                        className="ticketType"
                        name="ticketType"
                        value={eventDetails.ticketType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Odaberi tip ulaznice</option>
                        <option value="1">Obična</option>
                        <option value="2">VIP</option>
                        <option value="3">Druženje sa zvijezdom</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;



