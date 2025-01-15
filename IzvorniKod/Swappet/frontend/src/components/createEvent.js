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
        transactionType: "1", // Default to "purchase"
        tradeDescription: "",
    });

    const [seats, setSeats] = useState([]); // Array to store rows and seats

    const navigate = useNavigate();

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

    useEffect(() => {
        axios
            .get("http://localhost:8081/user-info", { withCredentials: true })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error occurred: ", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleCategoryChange = (e) => {
        setEventDetails((prevDetails) => ({
            ...prevDetails,
            category: categoryMapping[e.target.value],
        }));
    };

    const handleTransactionTypeChange = (e) => {
        const type = e.target.value;
        setEventDetails((prevDetails) => ({
            ...prevDetails,
            transactionType: type,
            price: type === "1" ? prevDetails.price : "",
            tradeDescription: type === "0" ? prevDetails.tradeDescription : "",
        }));
    };


    const handleNumberOfTicketsChange = (e) => {
        const numberOfTickets = e.target.value;
        setEventDetails((prevDetails) => ({
            ...prevDetails,
            numberOfTickets: numberOfTickets,
        }));

        // Update seats based on the number of tickets
        const newSeats = Array.from({ length: numberOfTickets }, (_, index) => ({
            row: "",
            seat: "",
        }));
        setSeats(newSeats);
    };

    const handleSeatChange = (index, field, value) => {
        const updatedSeats = [...seats];
        updatedSeats[index][field] = value;
        setSeats(updatedSeats);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let date = eventDetails.date;
        let time = eventDetails.time;
        if (date) {
            date = time ? `${date}T${time}` : `${date}T12:00:00`;
        }

        const eventData = {
            description: eventDetails.description,
            categoryId: eventDetails.category,
            price: eventDetails.transactionType === "1" ? eventDetails.price : null,
            numberOfTickets: eventDetails.numberOfTickets,
            street: eventDetails.street,
            houseNumber: eventDetails.houseNumber,
            city: eventDetails.city,
            date: date,
            ticketType: eventDetails.ticketType,
            transactionType: eventDetails.transactionType,
            tradeDescription: eventDetails.transactionType === "0" ? eventDetails.tradeDescription : "", // Include tradeDescription for "exchange"
            email: user?.email,
            red: seats[0].row, // First row
            broj: seats[0].seat, // First seat number
        };

        console.log("Event data being submitted:", eventData);

        axios
            .post("http://localhost:8081/oglas/add", eventData, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                console.log("Event created successfully:", response.data);
                navigate("/advertisements");
            })
            .catch((error) => {
                console.error(
                    "Error creating event:",
                    error.response ? error.response.data : error.message
                );
            });
    };

    return (
        <div className="create-event">
            <div className="header">
                <div className="profile">
                    <img
                        src={user?.picture || defaultProfilePic}
                        alt="Profile"
                        className="pfp"
                        onError={(e) => {
                            e.target.src = defaultProfilePic;
                        }}
                    />
                    <div className="username">
                        {user ? user.name : "Loading..."}
                    </div>
                </div>
                <div className="logo">S<span id="usklicnik">!</span></div>
            </div>

            <form className="eventCreator" onSubmit={handleSubmit}>
                <h1 className="noviDog">Stvori novi događaj:</h1>
                <div className="container1">
                    <div className="kategorija">Kategorija:</div>
                    {Object.keys(categoryMapping).map((category) => (
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
                    <div className="datum">Vrsta transakcije:</div>
                    <div className="vrstaDogadjaja">
                        <label>
                            <input
                                type="radio"
                                name="transactionType"
                                value="1"
                                checked={eventDetails.transactionType === "1"}
                                onChange={handleTransactionTypeChange}
                                required
                            />
                            Kupnja
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="transactionType"
                                value="0"
                                checked={eventDetails.transactionType === "0"}
                                onChange={handleTransactionTypeChange}
                                required
                            />
                            Razmjena
                        </label>
                    </div>

                    {eventDetails.transactionType === "1" && (
                        <>
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
                        </>
                    )}
                    {eventDetails.transactionType === "0" && (
                        <>
                            <div className="razmjena">Opis razmjene:</div>
                            <input
                                className="razmjenaInput"
                                type="text"
                                name="tradeDescription"
                                value={eventDetails.tradeDescription}
                                onChange={handleInputChange}
                                placeholder="Opiši uvjete razmjene"
                                required
                            />
                        </>
                    )}
                    <div className="kolicina">Količina ulaznica za prodaju:</div>
                    <input
                        className="kolicinaInput"
                        type="number"
                        name="numberOfTickets"
                        value={eventDetails.numberOfTickets}
                        onChange={handleNumberOfTicketsChange}
                        placeholder="Unesi količinu ulaznica"
                        required
                    />
                    {eventDetails.numberOfTickets > 0 && (
                        <table className="seatsTable">
                            <thead>
                                <tr>
                                    <th>Red</th>
                                    <th>Sjedalo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {seats.map((seat, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="number"
                                                value={seat.row}
                                                onChange={(e) =>
                                                    handleSeatChange(index, "row", e.target.value)
                                                }
                                                placeholder="Unesi red"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={seat.seat}
                                                onChange={(e) =>
                                                    handleSeatChange(index, "seat", e.target.value)
                                                }
                                                placeholder="Unesi broj sjedala"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

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
                <div className="container2">
                    <div className="opis">Opis događaja:</div>
                    <input
                        className="opisInput"
                        type="text"
                        name="description"
                        value={eventDetails.description}
                        onChange={handleInputChange}
                        placeholder="Opiši događaj..."
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
                </div>
                <input className="submit" type="submit" value="Kreiraj događaj!" />
            </form>
        </div>
    );
};

export default CreateEvent;
