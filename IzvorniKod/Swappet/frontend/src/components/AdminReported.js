import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminReported.css";
import axios from "axios";
import Header from "./Header";

const AdminReported = () => {
    const [user, setUser] = useState(null); //inicijalizacija korisnika
    const [reportedAccounts, setReported] = useState([]); //inicijalizacija prijavljenih računa

    const navigate = useNavigate();

    //dohvati informacije o korisniku
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

    //dohvati reportane usere
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}/admin/guilty/${user?.email}`,
                {
                    withCredentials: true,
                }
            )
            .then((reportedResponse) => {
                setReported(reportedResponse.data);
                console.log("Fetched reported users: ", reportedResponse);
            })
            .catch((error) => {
                console.error("Error fetching reported users: ", error);
            });
    }, [user]);

    //rukovanje 'banom'
    const handleBan = (email, action) => {
        console.log("Mail korisnika: " + email);
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}/admin/ban/${user?.email}`,
                {
                    email: email,
                    ban: action,
                }
            )
            .then((response) => {
                console.log("Akcija je uspješna: ", response.data);
                alert("Akcija uspješna!");
                navigate(0);
            })
            .catch((error) => {
                console.log("Došlo je do pogreške:", error);
            });
    };

    return (
        <div className="admin-page">
            <Header></Header>
            <div className="container-korisnika">
                <div id="reported">Svi prijavljeni korisnici</div>
                <div className="useri">
                    {reportedAccounts.length === 0 ? (
                        <div className="no-events-message">
                            Nema prijavljenih korisnika.
                        </div>
                    ) : (
                        reportedAccounts.map((user) => (
                            <div className="korisnik">
                                <div id="email">Korisnik: {user}</div>
                                <button
                                    value={1}
                                    onClick={() => handleBan(user, 1)}
                                    className="ban-button"
                                >
                                    Oslobodi
                                </button>
                                <button
                                    value={0}
                                    onClick={() => handleBan(user, 0)}
                                    className="ban-button"
                                >
                                    Zabrani
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
export default AdminReported;
