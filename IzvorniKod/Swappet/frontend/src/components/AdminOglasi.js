import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card"; 
import "../css/AdminOglasi.css";
import axios from "axios";
import Header from "./Header";

const defaultProfilePic = "/defaultpfp.jpg";

const AdminOglasi=()=>{
    const [user, setUser] = useState(null); //inicijalizacija korisnika
    const [ads, setAds] = useState([]); //inicijalizacija oglasa
    const [ulaznice, setUlaznice] = useState([]); //inicijalizacija karti


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

    //dohvati ulaznice
    useEffect(() => {
        const fetchAds = axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/admin/oglasi/${user?.email}`
        );
        const fetchTickets = axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/ulaznica/all`
        );

        Promise.all([fetchAds, fetchTickets])
            .then(([adsResponse, ticketsResponse]) => {
                setAds(adsResponse.data);
                setUlaznice(ticketsResponse.data);
                console.log("Fetched tickets:", ticketsResponse.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [user]); 


    return(
        <div className="admin-page">
            <Header></Header>
            <div className="container-oglasa">
                <div id="oglasi">Svi oglasi: </div>
                <div className="oglasi">
                {ads.length === 0 ? (
                        <div className="no-events-message">
                            Nema oglasa.
                        </div>
                    ) : (
                        ads.map((adWithTickets) => (
                            <Card
                                key={adWithTickets.id}
                                ad={adWithTickets}
                                tickets={adWithTickets.tickets}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
export default AdminOglasi;