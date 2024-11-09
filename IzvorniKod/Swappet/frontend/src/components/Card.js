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
        <p className="tip">{ad.type}</p>
        <p className="adresa">Address: {ad.address}</p>
        <p className="datum">Date: {ad.date}</p>
        <p className="ulaznice">Available Tickets: {ad.availableTickets}</p>
        <p className="cijena">Price: ${ad.price}</p>
        <div className="quantity-controls">
          <button onClick={decrementQuantity} className="gumb">-</button>
          <span>{quantity}</span>
          <button onClick={incrementQuantity} className="gumb">+</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
