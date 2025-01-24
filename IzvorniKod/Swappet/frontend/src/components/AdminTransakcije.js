import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminTransakcije.css";
import axios from "axios";
const defaultProfilePic = "/defaultpfp.jpg";

const AdminTransakcije = ({ profilePic }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);

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
        const fetchTransactions = axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/admin/transakcije/${user?.email}`
        );

        Promise.all([fetchTransactions])
            .then(([transactionsResponse]) => {
                setTransactions(transactionsResponse.data);
                console.log("Fetched transactions:", transactionsResponse.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [user]);

    const uspjesnostTransakcije = (uspjesna) => {
        switch (uspjesna) {
            case 0:
                return "Čeka odluku";
            case 1:
                return "Uspješna";
            case -1:
                return "Neuspješna";
            default:
                return uspjesna ? "Nije definirano" : "Nije definirano";
        }
    };

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
                <div className="container2">
                    <h2 id="transakcije">Sve transakcije</h2>
                    <div className="transakcije">
                        {transactions.map((transaction) => (
                            <div
                                className="item"
                                key={transaction.idtransakcija}
                            >
                                <div>
                                    ID transakcije: {transaction.idTransakcija}
                                </div>
                                <div>
                                    Uspjeh transakcije:{" "}
                                    {uspjesnostTransakcije(
                                        transaction.uspjesna
                                    )}
                                </div>
                                <div>
                                    Početak transakcije: {transaction.dvPocetak}
                                </div>
                                <div>
                                    ID ulaznice:{" "}
                                    {transaction.ulaznica.idUlaznica}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTransakcije;
