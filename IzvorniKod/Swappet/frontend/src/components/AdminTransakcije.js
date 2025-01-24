import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminTransakcije.css";
import axios from "axios";
import Header from "./Header";

const AdminTransakcije = () => {
    const [, setUser] = useState(null); //inicijalizacija korisnika
    const [transactions, setTransactions] = useState([]); //inicijalizacija transakcija

    //inicijalizacija useNavigate (koristi se za redirectanje)
    useNavigate();

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

    //dohvati informacije o transakcijama
    useEffect(() => {
        const fetchTransactions = axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/admin/transakcije`
        );

        Promise.all([fetchTransactions])
            .then(([transactionsResponse]) => {
                setTransactions(transactionsResponse.data);
                console.log("Fetched transactions:", transactionsResponse.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    //uspješnost transakcije
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
            <Header></Header>
            <div className="container-transakcija">
                <div id="transakcije">Sve transakcije</div>
                <div className="transakcije">
                    {transactions.length === 0 ? (
                        <div className="no-events-message">
                            Nema transakcija.
                        </div>
                    ) : (
                        transactions.map((transaction) => (
                            <div
                                className="transakcija"
                                key={transaction.idTransakcija}
                            >
                                <div className="tip1">
                                    ID transakcije: {transaction.idTransakcija}
                                </div>
                                <div className="tip1">
                                    Uspjeh transakcije:{" "}
                                    {uspjesnostTransakcije(
                                        transaction.uspjesna
                                    )}
                                </div>
                                <div className="tip1">
                                    Početak transakcije: {transaction.dvPocetak}
                                </div>
                                <div className="tip1">
                                    ID ulaznice:{" "}
                                    {transaction.ulaznica.idUlaznica}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
export default AdminTransakcije;
