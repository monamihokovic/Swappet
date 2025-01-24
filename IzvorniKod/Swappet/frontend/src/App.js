import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import StartPage from "./components/StartPage";
import SelectionPage from "./components/SelectionPage";
import AdvertisementsPage from "./components/AdvertisementsPage";
import CreateEvent from "./components/CreateEvent";
import AdminOglasi from "./components/AdminOglasi";
import AdminTransakcije from "./components/AdminTransakcije";
import UserTransakcije from "./components/UserTransakcije";
import UserOglasi from "./components/UserOglasi";
import UserRazmjene from "./components/UserRazmjene";
import AdminReported from "./components/AdminReported";


function App() {
    const [, setUserToken] = useState(null); //Upravljanje user token-om
    const [userName, setUserName] = useState("gost"); //UserName korisnika - prvo postavljen na 'gost'
    const defaultProfilePic = "/defaultpfp.jpg";

    const handleLogin = async (token) => {
        setUserToken(token); // Store the token in the state
        const decoded = jwtDecode(token); // Call the jwtDecode function
        setUserName(decoded.email || ""); // Extract username or email
        console.log(sessionStorage.getItem("userEmail"));
        console.log("User logged in with token:", token);

        try {
            const response = await fetch(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
        } catch (error) {
            console.error("Error fetching profile picture:", error);
        }
    };

    const LoginRedirect = () => {
        const navigate = useNavigate(); // Initialize navigate

        const onLogin = (token) => {
            handleLogin(token); // Call handleLogin to manage the token
            navigate("/selection"); // Use navigate to redirect to SelectionPage
        };

        return <StartPage onLogin={onLogin} />;
    };

    

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginRedirect />} />
                <Route
                    path="/selection"
                    element={<SelectionPage userName={userName} />}
                />
                <Route
                    path="/advertisements"
                    element={
                        <AdvertisementsPage
                            userName={userName}
                        />
                    }
                />
                <Route
                    path="/createEvent"
                    element={
                        <CreateEvent
                            userName={userName}
                        />
                    }
                />
                <Route
                    path="/admin/oglasi"
                    element={
                        <AdminOglasi
                            userName={userName}
                        />
                    }
                />
                <Route
                    path="/admin/transakcije"
                    element={
                        <AdminTransakcije
                            userName={userName}
                        />
                    }
                />
                <Route
                    path="/user/transactions" 
                    element={<UserTransakcije />} 
                 />
                <Route 
                    path="/user/oglasi/"
                    element={<UserOglasi />} 
                />
                <Route
                    path="/user/trades"
                    element={
                    <UserRazmjene/>}
                />
                <Route
                    path="/admin/reported"
                    element={
                    <AdminReported />}
                />
                <Route
                    path="/admin/guilty"
                    element={
                    <AdminReported />}
                />
            </Routes>
        </Router>
    );
}

export default App;