import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../css/UserRazmjene.css";
import axios from "axios";
import Header from "./Header";

function UserRazmjene() {
    const [trades, setTrades] = useState([]); //inicijalizacija razmjena
    const [user, setUser] = useState(null); //inicijalizacija korisnika

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

    //dohvat razmjena
    useEffect(() => {
        if (user) {
            axios
                .get(
                    `${process.env.REACT_APP_BACKEND_URL}/user/trades/${user?.email}`,
                    {
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    setTrades(response.data);
                    console.log("Trades fetched:", response.data);
                })
                .catch((error) => {
                    console.error("Error occurred: ", error);
                });
        }
    }, [user]);

    //logike za razmjene
    const handleCheckmarkClick = (selledId, buyerId, quantity) => {
        console.log("Checkmark clicked for selledId:", selledId);
        const requestBody = {
            sellerId: selledId,
            buyerId: buyerId,
            amount: quantity,
            decision: 1,
        };
        console.log("Request body:", requestBody);
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}/ulaznica/razmjena`,
                requestBody,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            )
            .then((response) => {
                console.log("Trade approved:", response.data);
            })
            .catch((error) => {
                console.error("Error during check request:", error);
            });
        navigate("/advertisements");
    };

    const handleCrossClick = (selledId, buyerId, quantity) => {
        console.log("Cross clicked for selledId:", selledId);
        const requestBody = {
            sellerId: selledId,
            buyerId: buyerId,
            amount: quantity,
            decision: -1,
        };
        console.log("Request body:", requestBody);
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}/ulaznica/razmjena`,
                requestBody,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            )
            .then((response) => {
                console.log("Trade rejected:", response.data);
            })
            .catch((error) => {
                console.error("Error during cross request:", error);
            });
        navigate("/advertisements");
    };

    return (
        <div className="user-page">
            <Header></Header>
            <div className="container-razmjena">
                <div id="razmjene">Sve moje razmjene</div>
                <div className="razmjene">
                    {trades.length === 0 ? (
                        <div className="no-events-message">Nema razmjena.</div>
                    ) : (
                        trades.map((trade) => (
                            <div key={trade.sellerId} className="razmjena">
                                <div>
                                    <strong>Oglas prodavača:</strong>{" "}
                                    {trade.sellerAdDescription}
                                </div>
                                <div>
                                    <strong>Zamjena prodavača:</strong>{" "}
                                    {trade.sellerTradeDescription}
                                </div>
                                <div>
                                    <strong>Zamjena kupca:</strong>{" "}
                                    {trade.buyerDescription}
                                </div>
                                <div>
                                    <strong>Broj karata:</strong>{" "}
                                    {trade.quantity}
                                </div>
                                <div className="trade-btns">
                                    <button
                                        className="checkmark-btn"
                                        onClick={() => {
                                            handleCheckmarkClick(
                                                trade.sellerId,
                                                trade.buyerId,
                                                trade.quantity
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                    <button
                                        className="cross-btn"
                                        onClick={() => {
                                            handleCrossClick(
                                                trade.sellerId,
                                                trade.buyerId,
                                                trade.quantity
                                            );
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserRazmjene;
