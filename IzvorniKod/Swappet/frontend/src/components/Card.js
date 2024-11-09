import React, { useState } from "react";
import "../css/Card.css";

const Card = ({ ad }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, ad.availableTickets));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="card">
      <img src={ad.image} alt={ad.name} className="card-image" />
      <div className="card-info">
        <h2>{ad.name}</h2>
        <p className="tip1">{ad.type}</p>
        <p className="adresa1">Adresa: {ad.address}</p>
        <p className="datum1">Datum: {ad.date}</p>
        <p className="cijena1">Cijena: €${ad.price}</p>
      </div>
    </div>
  );
};

export default Card;
