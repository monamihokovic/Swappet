import React, { useState } from "react";
import Header from "./Header";
import Card from "./Card";
import "../css/AdvertisementsPage.css";

const AdvertisementsPage = ({ userName }) => {
  const [ads, setAds] = useState([
    {
      id: 1,
      image: "https://shorturl.at/8BYrD",
      name: "Rock Concert",
      type: "Koncert",
      place: "Arena Zagreb",
      address: "Ulica bb",
      houseNumber: "12",
      date: "15.05.2024",
      availableTickets: 50,
      price: 100,
    },
    {
        id: 2,
        image: "https://shorturl.at/IHpx2",
        name: "Jazz Concert",
        type: "Koncert",
        place: "Avenue Mall",
        address: "Ulica bb",
        houseNumber: "2",
        date: "15.10.2024",
        availableTickets: 25,
        price: 75,
      },
      {
        id: 3,
        image: "https://shorturl.at/a0Oti",
        name: "Dinamo-Hajduk",
        type: "Sport",
        place: "Stadion Zagreb",
        address: "Ulica bb",
        houseNumber: "9",
        date: "22.05.2024",
        availableTickets: 100,
        price: 40,
      },
      {
        id: 4,
        image: "https://shorturl.at/16hqH",
        name: "Špancirfest",
        type: "Tulum",
        place: "Varaždin",
        address: "Ulica bb",
        houseNumber: "25",
        date: "15.05.2025",
        availableTickets: 200,
        price: 20,
      },
      {
          id: 5,
          image: "https://shorturl.at/9hnjj",
          name: "Split-Zagreb vlak",
          type: "Prijevoz",
          place: "Split",
          address: "Ulica bb",
          houseNumber: "99",
          date: "15.05.2024",
          availableTickets: 1,
          price: 20,
        },
        {
          id: 6,
          image: "https://tinyurl.com/78jcye97",
          name: "Pulp Fiction",
          type: "Kino",
          place: "Branimir Mingle Mall",
          address: "Ulica bb",
          houseNumber: "1",
          date: "22.11.2024",
          availableTickets: 4,
          price: 5,
        }, {/* ... */} ]);

  return (
    <div className="advertisements-page">
      <Header userName={userName} />
      <div className="cards-container">
        {ads.map((ad) => (
          <Card key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
};

export default AdvertisementsPage;
