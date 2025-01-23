import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import Header from "./Header";
import "../css/UserOglasi.css";
import axios from "axios";

const defaultProfilePic = "/defaultpfp.jpg";

const UserOglasi = () => {
    const [user, setUser] = useState(null); //inicijalizacija korisnika
    const [ads, setAds] = useState([]); //inicijalizacija oglasa
    const [, setUlaznice] = useState([]); //inicijalizacija karti

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
                if (error.response && error.response.status === 401) {
                    setUser(null);
                } else {
                    console.error("Error occurred: ", error);
                }
            });
    }, []);

    //dohvat korisnikovih ulaznica
    useEffect(() => {
        const fetchAds = axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/user/oglasi/${user?.email}`,
            { withCredentials: true }
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
    }, [user?.email]);

    return(
        <div className="user-page">
            <Header></Header>
            <div className="container-oglasa">
                <div id="oglasi">Svi moji oglasi </div>
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

export default UserOglasi; 