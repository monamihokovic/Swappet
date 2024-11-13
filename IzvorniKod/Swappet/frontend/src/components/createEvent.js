import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/createEvent.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const defaultProfilePic = "/defaultpfp.jpg";

const CreateEvent = ({ userName, profilePic }) => {
    const [user, setUser] = useState(null);
    const [eventDetails, setEventDetails] = useState({
        name: "",
        category: "",
        date: "",
        price: "",
        description: "",
        street: "",
        houseNumber: "",
        city: "",
    });

    const navigate = useNavigate();

    // Category mapping from name to categoryId
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

    // Fetch user info
    useEffect(() => {
        axios
            .get("https://swappet.onrender.com/user-info", {
                withCredentials: true,
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error occurred: ", error);
            });
    }, []); // Ensure the effect only runs once when the component is mounted

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
            category: categoryMapping[e.target.value], // Map category name to ID
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add default time if date is provided in yyyy-MM-dd format
        let date = eventDetails.date;
        if (date && !date.includes("T")) {
            date = `${date}T00:00:00`; // Append default time
        }

        // Prepare event data
        const eventData = {
            description: eventDetails.description,
            categoryId: eventDetails.category,
            price: eventDetails.price,
            street: eventDetails.street,
            houseNumber: eventDetails.houseNumber,
            city: eventDetails.city,
            date: date,
            email: user?.email, // Include user email
        };

        // Send event data to backend
        axios
            .post("https://swappet.onrender.com/oglas", eventData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json", // Ensure correct content type
                },
            })
            .then((response) => {
                console.log("Event created successfully:", response.data);
                navigate("/selection"); // Redirect after successful event creation
            })
            .catch((error) => {
                // Log detailed error response
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
                        src={profilePic || defaultProfilePic}
                        alt="Profile"
                        className="pfp"
                        onError={(e) => {
                            e.target.src = defaultProfilePic;
                        }}
                    />
                    {/* Add conditional rendering to avoid errors */}
                    <div className="username">
                        {user ? user.name : "Loading..."}
                    </div>
                </div>

                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        id="pretraga"
                        type="text"
                        placeholder="Pretraži događaje..."
                    />
                </div>

                <div className="logo">
                    S<span id="usklicnik">!</span>
                </div>
            </div>

            <form className="eventCreator" onSubmit={handleSubmit}>
                <h1 className="noviDog">Stvori novi događaj:</h1>
                <div className="container1">
                    {/* <div className="dogadaj">Događaj:</div>
          <input
            className="dogadajInput"
            type="text"
            placeholder="Unesi ime događaja"
            name="name"
            value={eventDetails.name}
            onChange={handleInputChange}
            required
          /> */}
                    <div className="kategorija">Kategorija:</div>
                    {[
                        "Koncerti",
                        "Izložbe",
                        "Predstave",
                        "Putovanja",
                        "Tulumi",
                        "Kino",
                        "Sport",
                        "Prijevoz",
                        "Ostalo",
                    ].map((category) => (
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
            </form>
        </div>
    );
};

export default CreateEvent;
