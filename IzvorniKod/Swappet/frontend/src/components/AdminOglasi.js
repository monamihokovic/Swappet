import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "../css/AdminOglasi.css";
import axios from "axios";

const defaultProfilePic = "/defaultpfp.jpg";

const AdminOglasi = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [ads, setAds] = useState([]);
    const [, setUlaznice] = useState([]);

    // Fetch user info
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

    useEffect(() => {
        const fetchAds = axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/admin/oglasi`
        );
        const fetchTickets = axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/ulaznica/all`
        );

        Promise.all([fetchAds, fetchTickets])
            .then(([adsResponse, ticketsResponse]) => {
                setAds(adsResponse.data);
                setUlaznice(ticketsResponse.data);
                console.log("Fetched tickets:", ticketsResponse.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);



    return (
        <div className="admin-page">
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
                    <div
                        className="username"
                        onClick={() => navigate("/advertisements")}
                    >
                        {user ? user.name : "Loading..."}
                    </div>
                </div>

                <div className="logo" onClick={() => navigate("/")}>
                    S<span id="usklicnik">!</span>
                </div>
            </div>

            <div className="container">
                <h2 id="oglasi">Svi oglasi</h2>

                <div className="oglasi">
                    {ads.length === 0 ? (
                        <div className="no-events-message">
                            Nema oglasa.
                        </div>
                    ) : (
                        ads.map((adWithTickets) => (
                            <Card
                                key={adWithTickets.id}
                                ad={adWithTickets}
                                tickets={adWithTickets.tickets}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminOglasi;