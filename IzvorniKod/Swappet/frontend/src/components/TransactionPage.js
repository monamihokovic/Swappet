import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../css/TransactionPage.css";
import axios from "axios";

function TransactionPage({ profilePic }) {
    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState(null);
    const defaultProfilePic = "/defaultpfp.jpg";

    useEffect(() => {
        axios
            .get("http://localhost:8081/user-info", { withCredentials: true })
            .then((response) => {
                setUser(response.data);
                console.log("User email:", response.data.email);
            })
            .catch((error) => {
                console.error("Error occurred: ", error);
            });
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/user/oglasi/user/trades/${user.email}`);
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
                // Dummy data in case of error
                setTransactions([
                    {
                        selledId: 1,
                        sellerAdDescription: "Koncert 1",
                        sellerTradeDescription: "Za Koncert 2",
                        buyerDescription: "Koncert 2",
                        quantity: 1,
                    },
                    {
                        selledId: 2,
                        sellerAdDescription: "Posjet tvojoj mami",
                        sellerTradeDescription: "Za Posjet tvom tati",
                        buyerDescription: "Posjet tvom tati",
                        quantity: 1,
                    },
                ]);
            }
        };

        fetchTransactions();
    }, [user]);

    const handleCheckmarkClick = (selledId) => {
        console.log("Checkmark clicked for selledId:", selledId);
        axios
            .post("http://localhost:8081/ulaznica/razmjena", null, {
                params: { idOglasSeller: selledId, value: 1 },
            })
            .catch((error) => {
                console.error("Error during check request:", error);
            });
    };

    const handleCrossClick = (selledId) => {
        console.log("Cross clicked for selledId:", selledId);
        axios
            .post("http://localhost:8081/ulaznica/razmjena", null, {
                params: { idOglasSeller: selledId, value: -1 },
            })
            .catch((error) => {
                console.error("Error during cross request:", error);
            });
    };

    return (
        <div className="transaction-page">
            <header className="header">
                <div className="profile">
                    <img
                        className="pfp"
                        src={profilePic || defaultProfilePic}
                        alt="Profile"
                    />
                    <span className="username">{user?.name || "Guest"}</span>
                </div>
                <h1 className="logo">
                    S<span id="usklicnik">!</span>
                </h1>
            </header>
            <div className="cards-container">
                {transactions.length === 0 ? (
                    <p className="no-transactions">No transactions available.</p>
                ) : (
                    transactions.map((transaction) => (
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
                                <strong>Quantity:</strong> {transaction.quantity}
                            </p>
                            <div className="card-buttons">
                                <button
                                    className="checkmark-btn"
                                    onClick={() =>
                                        handleCheckmarkClick(transaction.selledId)
                                    }
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                                <button
                                    className="cross-btn"
                                    onClick={() =>
                                        handleCrossClick(transaction.selledId)
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

export default TransactionPage;