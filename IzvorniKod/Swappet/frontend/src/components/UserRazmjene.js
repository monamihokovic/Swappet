import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../css/UserRazmjene.css";
import axios from "axios";

function UserRazmjene({ profilePic }) {
    const navigate = useNavigate();

    const [trades, setTrades] = useState([]);
    const [user, setUser] = useState(null);
    const defaultProfilePic = "/defaultpfp.jpg";

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/user-info`, {
                withCredentials: true,
            })
            .then((response) => {
                setUser(response.data);
                //console.log("User email:", response.data.email);
            })
            .catch((error) => {
                console.error("Error occurred: ", error);
            });
    }, []);

    useEffect(() => {
        if (user) {
            axios
                .get(`${process.env.REACT_APP_BACKEND_URL}/user/trades/${user?.email}`, {
                    withCredentials: true,
                })
                .then((response) => {
                    setTrades(response.data);
                    console.log("Trades fetched:", response.data);
                })
                .catch((error) => {
                    console.error("Error occurred: ", error);
                });
        }
    }, [user]);

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
            .post(`${process.env.REACT_APP_BACKEND_URL}/ulaznica/razmjena`, requestBody, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                console.log("Trade approved:", response.data);
            })
            .catch((error) => {
                console.error("Error during check request:", error);
            });
        alert("Razmjena potvrđena!");
        navigate("/selection");
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
            .post(`${process.env.REACT_APP_BACKEND_URL}/ulaznica/razmjena`, requestBody, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                console.log("Trade rejected:", response.data);
            })
            .catch((error) => {
                console.error("Error during cross request:", error);
            });
        alert("Razmjena odbijena!");
        navigate("/selection");
    };

    return (
        <div className="transaction-page">
            <header className="header">
                <div className="profile">
                    <img
                        className="pfp"
                        src={user?.picture || defaultProfilePic}
                        alt="Profile"
                        onError={(e) => {
                            e.target.src = defaultProfilePic;
                        }}
                    />
                    <div
                        className="username"
                        onClick={() => navigate("/advertisements")}
                    >
                        {user ? user.name : "Loading..."}
                    </div>{" "}
                </div>
                <h1 className="logo">
                    S<span id="usklicnik">!</span>
                </h1>
            </header>
            <div className="cards-container">
                {trades.length === 0 ? (
                    <p className="no-trades">No trades available.</p>
                ) : (
                    trades.map((transaction) => (
                        <div key={transaction.selledId} className="card">
                            <p>
                                <strong>Seller Ad:</strong>{" "}
                                {transaction.sellerAdDescription}
                            </p>
                            <p>
                                <strong>Seller Trade:</strong>{" "}
                                {transaction.sellerTradeDescription}
                            </p>
                            <p>
                                <strong>Buyer Description:</strong>{" "}
                                {transaction.buyerDescription}
                            </p>
                            <p>
                                <strong>Quantity:</strong>{" "}
                                {transaction.quantity}
                            </p>
                            <div className="card-buttons">
                                <button
                                    className="checkmark-btn"
                                    onClick={() => {
                                        handleCheckmarkClick(
                                            transaction.sellerId,
                                            transaction.buyerId,
                                            transaction.quantity
                                        );
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                                <button
                                    className="cross-btn"
                                    onClick={() =>
                                        handleCrossClick(
                                            transaction.sellerId,
                                            transaction.buyerId,
                                            transaction.quantity
                                        )
                                    }
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default UserRazmjene;
