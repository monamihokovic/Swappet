import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/Header.css";
import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa";

const defaultProfilePic = "/defaultpfp.jpg";

const Header = () => {
    const [user, setUser] = useState(null); //inicijalizacija korisnika
    const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false); // admin menu zatvoren
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // user menu zatvoren
    const [admins, setAdmins] = useState([]); //inicijalizacija admina

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
                if (error.response && error.response.status === 401) {
                    setUser(null);
                } else {
                    console.error("Error occurred: ", error);
                }
            });
    }, [user]);

    //funkcije za otvaranje i zatvaranje user i admin menu
    const toggleAdminMenu = () => setIsAdminMenuOpen(!isAdminMenuOpen);
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    //provjerava na kojoj se ruti nalazi korisnik
    const location = useLocation();
    const isCreateEvent = location.pathname === "/createEvent";

    //dohvati listu admina
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/admin/`, {
                withCredentials: true,
            })
            .then((response) => {
                setAdmins(response.data);
                console.log("Admini: ", response.data);
            })
            .catch((error) => {
                console.log("Error: " + error);
            });
    }, []);

    return (
        <div className="header">
            <div
                className="profile"
                onClick={() => navigate("/advertisements")}
            >
                <img
                    className="profile-picture"
                    alt="Profile"
                    src={user?.picture || defaultProfilePic}
                    onError={(e) => {
                        e.target.src = defaultProfilePic;
                    }}
                />
                <div className="username">{user ? user.name : "gost"}</div>
            </div>

            <button
                className={
                    user && !isCreateEvent
                        ? "create-event"
                        : "create-event hidden"
                }
                onClick={() => navigate("/createEvent")}
                disabled={!user}
            >
                Dodaj događaj
            </button>

            <button
                className={user ? "user" : "user hidden"}
                onClick={toggleUserMenu}
            >
                User usluge
            </button>

            {isUserMenuOpen && (
                <div className="user-menu">
                    <button
                        className="user-option"
                        onClick={() => navigate(`/user/oglasi`)}
                    >
                        Pregledaj svoje oglase
                    </button>
                    <button
                        className="user-option"
                        onClick={() => navigate(`/user/transactions`)}
                    >
                        Pregledaj svoje transakcije
                    </button>
                    <button
                        className="user-option"
                        onClick={() => navigate(`/user/trades`)}
                    >
                        Pregledaj svoje razmjene
                    </button>
                </div>
            )}

            {user && admins.includes(user?.email) && (
                <button className="admin" onClick={toggleAdminMenu}>
                    Admin usluge
                </button>
            )}

            {isAdminMenuOpen && (
                <div className="admin-menu">
                    <button
                        className="admin-option"
                        onClick={() => navigate(`/admin/oglasi`)}
                    >
                        Pregledaj sve oglase
                    </button>
                    <button
                        className="admin-option"
                        onClick={() => navigate(`/admin/transakcije`)}
                    >
                        Pregledaj sve transakcije
                    </button>
                    <button
                        className="admin-option"
                        onClick={() => navigate(`/admin/guilty`)}
                    >
                        Pregledaj prijavljene korisnike
                    </button>
                    <button
                        className="admin-option"
                        onClick={() =>
                            axios
                                .post(
                                    `${process.env.REACT_APP_BACKEND_URL}/admin/report`,
                                    null,
                                    { responseType: "blob" }
                                )
                                .then((response) => {
                                    const blob = new Blob([response.data], {
                                        type: "application/pdf",
                                    });
                                    const url =
                                        window.URL.createObjectURL(blob);
                                    const link = document.createElement("a");
                                    link.href = url;
                                    link.download = "report.pdf";
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                    console.log("Izvještaj generiran");
                                })
                                .catch((error) => {
                                    console.error("Error: " + error);
                                })
                        }
                    >
                        Generiraj izvještaj
                    </button>
                </div>
            )}

            <button
                className="back-to-selection"
                onClick={() => navigate("/selection")}
            >
                Natrag na selection
            </button>
            {user && (
                <div
                    className={user ? "logout" : "logout hidden"}
                    onClick={() => {
                        if (user) {
                            window.location.href = `${process.env.REACT_APP_BACKEND_URL}/logout`;
                        }
                    }}
                    disabled={!user}
                >
                    <FaSignOutAlt className="logout-icon" alt="Odjavi se" />
                </div>
            )}

            <div className="logo" onClick={() => navigate("/")}>
                S<span id="usklicnik">!</span>
            </div>
        </div>
    );
};

export default Header;
