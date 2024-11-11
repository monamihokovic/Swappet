import React from "react";

const typeMapping = {
  1: "Koncert",
  2: "Izložba",
  3: "Predstava",
  4: "Putovanja",
  5: "Tulumi",
  6: "Kino",
  7: "Sport",
  8: "Prijevoz",
  9: "Ostalo"
};

const Card = ({ ad }) => {
  const adType = typeMapping[ad.type];

  return (
    <div className="card">
      <div className="card-info">
        <div className="tip1">{adType}</div>
        <div className="opis">{ad.description}</div>
        <div className="adresa1">{ad.address}</div>
        <div className="datum1">{ad.date}</div>
        <div className="cijena1">{ad.price} €</div>
      </div>
    </div>
  );
};

export default Card;


