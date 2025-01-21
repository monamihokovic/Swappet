import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AdminReported.css";
import axios from "axios";

const defaultProfilePic = "/defaultpfp.jpg";

const AdminReported = ({ profilePic }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [reportedAccounts] = useState([]);

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

    // useEffect(() => {
    //     const fetchReportedUsers = axios.get(
    //         `${process.env.REACT_APP_BACKEND_URL}/admin/guilty`
    //     )
    //         .then((reportedResponse) => {
    //             setReported(reportedResponse.data);
    //             console.log("Fetched reported users: ", reportedResponse);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching reported users: ", error);
    //         });
    // }, []);

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
                <h2 id="oglasi">Svi prijavljeni korisnici </h2>

                <div className="Useri">
                    {reportedAccounts.length === 0 ? (
                        <div className="no-events-message">
                            Nema prijavljenih korisnika.
                        </div>
                    ) : (
                        reportedAccounts.map((user) => (
                            <div className="Users">
                                {user.email}
                                <button
                                    onclick={() =>
                                        axios
                                            .get(
                                                `${process.env.REACT_APP_BACKEND_URL}/report`
                                            )
                                            .then(() => {
                                                console.log(
                                                    "Izjveštaj generiran"
                                                );
                                            })
                                            .catch((error) => {
                                                console.log("Error: " + error);
                                            })
                                    }
                                >
                                    Generiraj izvještaj
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
