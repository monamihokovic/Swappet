import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CreateEvent.css";
import axios from "axios";
import Header from "./Header";

const defaultProfilePic = "/defaultpfp.jpg"; 

const CreateEvent = ({username, profilePic}) =>{
    const [user, setUser] = useState(null); //inicijalizacija korisnika
    const [eventDetails, setEventDetails] = useState({ //inicijalizacija podatakaq o događaju
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
        transactionType: "1", 
        tradeDescription: "",
    });
    const [seats, setSeats] = useState([]); //inicijalizacija reda i broja sjedala

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
            })
            .catch((error) => {
                console.error("Error occurred: ", error);
            });
    }, []);

    //logike za izmjenu podataka
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

        const newSeats = Array.from(
            { length: numberOfTickets },
            (_, index) => ({
                row: "",
                seat: "",
            })
        );
        setSeats(newSeats);
    };

    const handleSeatChange = (index, field, value) => {
        const updatedSeats = [...seats];
        updatedSeats[index][field] = value;
        setSeats(updatedSeats);
    };

    //predaja oglasa backendu
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
            price:
                eventDetails.transactionType === "1"
                    ? eventDetails.price
                    : null,
            numberOfTickets: eventDetails.numberOfTickets,
            street: eventDetails.street,
            houseNumber: eventDetails.houseNumber,
            city: eventDetails.city,
            date: date,
            ticketType: eventDetails.ticketType,
            transactionType: eventDetails.transactionType,
            tradeDescription:
                eventDetails.transactionType === "0"
                    ? eventDetails.tradeDescription
                    : "", 
            email: user?.email,
            red: seats[0].row, 
            broj: seats[0].seat,
        };

        console.log("Event data being submitted:", eventData);

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/oglas/add`, eventData, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
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

    //kategorije
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

    


    return(
        <div className="create-event-page">
            <Header></Header>

            <form className="event-creator" onSubmit={handleSubmit}>
                <div className="novi-dogadaj">Stvori novi događaj: </div>
                <div className="container1">

                    <div className="info">Kategorija:</div>
                    {Object.keys(categoryMapping).map((category) => (
                        <label className="kategorija-input" key={category}>
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

                    <div className="info">Datum događaja:</div>
                    <input
                        className="input"
                        type="date"
                        name="date"
                        value={eventDetails.date}
                        onChange={handleInputChange}
                        required
                    />

                    <div className="info">Vrijeme događaja:</div>
                    <input
                        className="input"
                        type="time"
                        name="time"
                        value={eventDetails.time}
                        onChange={handleInputChange}
                        required
                    />    

                    <div className="info">Vrsta transakcije:</div>
                    <div className="opis-input">
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
                            <div className="info">Cijena:</div>
                            <input
                                className="input"
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
                            <div className="info">Opis razmjene:</div>
                            <input
                                className="input"
                                type="text"
                                name="tradeDescription"
                                value={eventDetails.tradeDescription}
                                onChange={handleInputChange}
                                placeholder="Opiši uvjete razmjene"
                                required
                            />
                        </>
                    )} 

                    <div className="info">
                        Količina ulaznica za prodaju:
                    </div>
                    <input
                        className="input"
                        type="number"
                        name="numberOfTickets"
                        value={eventDetails.numberOfTickets}
                        onChange={handleNumberOfTicketsChange}
                        placeholder="Unesi količinu ulaznica"
                        required
                    />

                    {eventDetails.numberOfTickets > 0 && (
                        <table className="info">
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
                                                    handleSeatChange(
                                                        index,
                                                        "row",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Unesi red"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={seat.seat}
                                                onChange={(e) =>
                                                    handleSeatChange(
                                                        index,
                                                        "seat",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Unesi broj sjedala"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}  
                </div>

                <div className="container2">
                    <div className="info">Tip ulaznice:</div>
                    <select
                        className="input"
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

                    <div className="info">Opis događaja:</div>
                    <input
                        className="input"
                        type="text"
                        name="description"
                        value={eventDetails.description}
                        onChange={handleInputChange}
                        placeholder="Opiši događaj..."
                    />    

                    <div className="info">Ulica događaja:</div>
                    <input
                        className="input"
                        type="text"
                        name="street"
                        value={eventDetails.street}
                        onChange={handleInputChange}
                        placeholder="Unesi ulicu"
                        required
                    />

                    <div className="info">Kućni broj:</div>
                    <input
                        className="input"
                        type="number"
                        name="houseNumber"
                        value={eventDetails.houseNumber}
                        onChange={handleInputChange}
                        placeholder="Unesi kućni broj"
                        required
                    />

                    <div className="info">Grad:</div>
                    <input
                        className="input"
                        type="text"
                        name="city"
                        value={eventDetails.city}
                        onChange={handleInputChange}
                        placeholder="Unesi ime grada"
                        required
                    />
                    <input
                    className="submit"
                    type="submit"
                    value="Kreiraj događaj!"
                />
                </div>
                
            </form>
        </div>
    );
};
export default CreateEvent;