import React, { useState, useEffect } from "react";
import "../css/UserTransakcije.css";
import axios from "axios";
import Header from "./Header";

const UserTransakcije = () => {
    const [user, setUser] = useState(null); //inicijalizacija korisnika
    const [, setTransactions] = useState([]); //inicijalizacija korisnikovih transakcija

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

    //dohvat korisnikovih transakcija
    useEffect(() => {
        const fetchTransactions = axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/user/transaction/${user?.email}`,
            { withCredentials: true }
        );

        Promise.all([fetchTransactions])
            .then(([transactionsResponse]) => {
                setTransactions(transactionsResponse.data);
                console.log("Fetched transactions:", transactionsResponse.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [user?.email]);

    //uspješnost transakciej
    // const uspjesnostTransakcije = (uspjesna) => {
    //     switch (uspjesna) {
    //         case 0:
    //             return "Čeka odluku";
    //         case 1:
    //             return "Uspješna";
    //         case -1:
    //             return "Neuspješna";
    //         default:
    //             return uspjesna ? "Nije definirano" : "Nije definirano";
    //     }
    // };

    return (
        <div className="user-page">
            <Header></Header>
            <div className="container-transakcija">
                <div id="transakcije">Sve moje transakcije</div>
                <div className="transakcije">
                    {/*{transactions.length === 0 ? (
                        <div className="no-events-message">
                            Nema transakcija. 
                        </div>
                    ) : (
                        transactions.map((transaction) => (
                            <div
                                className="transakcija"
                                key={transaction.idTransakcija}
                            >
                                <div className="transaction-info"><strong>ID transakcije:</strong> {transaction.idTransakcija}</div>
                                <div className="transaction-info"><strong>Uspjeh transakcije:</strong {uspjesnostTransakcije(transaction.uspjesna)}</div>
                                <div className="transaction-info"><strong>Početak transakcije:</strong> {transaction.dvPocetak}</div>
                                <div className="transaction-info"><strong>ID ulaznice:</strong> {transaction.ulaznica.idUlaznica}</div>
                            </div>
                        ))  
                    )}*/}
                    <div className="transakcija">
                        <div className="transaction-info">
                            <strong>ID transakcije:</strong> 213
                        </div>
                        <div className="transaction-info">
                            <strong>Uspjeh transakcije:</strong> uspjesna
                        </div>
                        <div className="transaction-info">
                            <strong>Početak transakcije:</strong> 23933
                        </div>
                        <div className="transaction-info">
                            <strong>ID ulaznice:</strong> 23498
                        </div>
                    </div>
                    <div className="transakcija">
                        <div className="transaction-info">
                            <strong>ID transakcije:</strong> 213
                        </div>
                        <div className="transaction-info">
                            <strong>Uspjeh transakcije:</strong> uspjesna
                        </div>
                        <div className="transaction-info">
                            <strong>Početak transakcije:</strong> 23933
                        </div>
                        <div className="transaction-info">
                            <strong>ID ulaznice:</strong> 23498
                        </div>
                    </div>
                    <div className="transakcija">
                        <div className="transaction-info">
                            <strong>ID transakcije:</strong> 213
                        </div>
                        <div className="transaction-info">
                            <strong>Uspjeh transakcije:</strong> uspjesna
                        </div>
                        <div className="transaction-info">
                            <strong>Početak transakcije:</strong> 23933
                        </div>
                        <div className="transaction-info">
                            <strong>ID ulaznice:</strong> 23498
                        </div>
                    </div>
                    <div className="transakcija">
                        <div className="transaction-info">
                            <strong>ID transakcije:</strong> 213
                        </div>
                        <div className="transaction-info">
                            <strong>Uspjeh transakcije:</strong> uspjesna
                        </div>
                        <div className="transaction-info">
                            <strong>Početak transakcije:</strong> 23933
                        </div>
                        <div className="transaction-info">
                            <strong>ID ulaznice:</strong> 23498
                        </div>
                    </div>
                    <div className="transakcija">
                        <div className="transaction-info">
                            <strong>ID transakcije:</strong> 213
                        </div>
                        <div className="transaction-info">
                            <strong>Uspjeh transakcije:</strong> uspjesna
                        </div>
                        <div className="transaction-info">
                            <strong>Početak transakcije:</strong> 23933
                        </div>
                        <div className="transaction-info">
                            <strong>ID ulaznice:</strong> 23498
                        </div>
                    </div>
                    <div className="transakcija">
                        <div className="transaction-info">
                            <strong>ID transakcije:</strong> 213
                        </div>
                        <div className="transaction-info">
                            <strong>Uspjeh transakcije:</strong> uspjesna
                        </div>
                        <div className="transaction-info">
                            <strong>Početak transakcije:</strong> 23933
                        </div>
                        <div className="transaction-info">
                            <strong>ID ulaznice:</strong> 23498
                        </div>
                    </div>
                    <div className="transakcija">
                        <div className="transaction-info">
                            <strong>ID transakcije:</strong> 213
                        </div>
                        <div className="transaction-info">
                            <strong>Uspjeh transakcije:</strong> uspjesna
                        </div>
                        <div className="transaction-info">
                            <strong>Početak transakcije:</strong> 23933
                        </div>
                        <div className="transaction-info">
                            <strong>ID ulaznice:</strong> 23498
                        </div>
                    </div>
                    <div className="transakcija">
                        <div className="transaction-info">
                            <strong>ID transakcije:</strong> 213
                        </div>
                        <div className="transaction-info">
                            <strong>Uspjeh transakcije:</strong> uspjesna
                        </div>
                        <div className="transaction-info">
                            <strong>Početak transakcije:</strong> 23933
                        </div>
                        <div className="transaction-info">
                            <strong>ID ulaznice:</strong> 23498
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserTransakcije;
