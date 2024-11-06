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
        <p>Type: {ad.type}</p>
        <p>Location: {ad.place}</p>
        <p>Address: {ad.address} {ad.houseNumber}</p>
        <p>Date: {ad.date}</p>
        <p>Available Tickets: {ad.availableTickets}</p>
        <p>Price: ${ad.price}</p>
        <div className="quantity-controls">
          <button onClick={decrementQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={incrementQuantity}>+</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
