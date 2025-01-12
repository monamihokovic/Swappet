import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "../css/AdminTransakcije.css";
import axios from "axios";

const defaultProfilePic = "/defaultpfp.jpg";

const AdminTransakcije = ({ profilePic }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    // Fetch user info
    useEffect(() => {
        axios
            .get("http://localhost:8081/user-info", {
                withCredentials: true,
            })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error occurred: ", error);
            });
    }, []);


    return (
        <div className="admin-page">
            <div className="header">
                <div className="profile">
                    <img
                        src={profilePic || defaultProfilePic}
                        alt="Profile"
                        className="pfp"
                        onError={(e) => {
                            e.target.src = defaultProfilePic;
                        }}
                    />
                    <div className="username" onClick={() => navigate("/advertisements")}>
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
                       
                        <div className="item">Transakcija 1</div>
                        <div className="item">Transakcija 2</div>
                        <div className="item">Transakcija 3</div>
                        <div className="item">Transakcija 4</div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminTransakcije;

