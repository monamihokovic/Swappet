import React, { useState } from "react";
import Card from "./Card";
import "../css/AdvertisementsPage.css";
import { FaSearch } from "react-icons/fa";

const defaultProfilePic = "/defaultpfp.jpg";

const AdvertisementsPage = ({ userName, profilePic }) => {
  const [price, setPrice] = useState(50);
  const [selectedCategories, setSelectedCategories] = useState([]); // Array for multiple selected categories
  const [ads, setAds] = useState([
    {
      id: 1,
      image: "https://shorturl.at/8BYrD",
      name: "Rock Concert",
      type: "Koncerti",
      address: "Arena Zagreb, Ulica bb 12",
      date: "15.05.2024",
      availableTickets: 50,
      price: 100,
    },
    {
      id: 2,
      image: "https://shorturl.at/IHpx2",
      name: "Jazz Concert",
      type: "Koncerti",
      address:'Avenue Mall, Ulica bb 2',
      date: "15.10.2024",
      availableTickets: 25,
      price: 75,
    },
    {
      id: 3,
      image: "https://shorturl.at/a0Oti",
      name: "Dinamo-Hajduk",
      type: "Sport",
      address:"Stadion Zagreb, Ulica bb 9",
      date: "22.05.2024",
      availableTickets: 100,
      price: 40,
    },
    {
      id: 4,
      image: "https://shorturl.at/16hqH",
      name: "Špancirfest",
      type: "Tulumi",
      address:"Varaždin, Ulica bb, 25",
      date: "15.05.2025",
      availableTickets: 200,
      price: 20,
    },
    {
      id: 5,
      image: "https://shorturl.at/9hnjj",
      name: "Split-Zagreb vlak",
      type: "Prijevoz",
      address:"Split, Ulica bb 99",
      date: "15.05.2024",
      availableTickets: 1,
      price: 20,
    },
    {
      id: 6,
      image: "https://tinyurl.com/78jcye97",
      name: "Pulp Fiction",
      type: "Kino",
      address: "Branimir Mingle Mall, Ulica bb 1",
      date: "22.11.2024",
      availableTickets: 4,
      price: 5,
    },
  ]);

  // Handle category click to toggle selection of categories
  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        // If category is already selected, remove it
        return prevSelectedCategories.filter((cat) => cat !== category);
      } else {
        // If category is not selected, add it
        return [...prevSelectedCategories, category];
      }
    });
  };

  // Filter ads by price and selected categories
  const filteredAds = ads.filter((ad) => {
    const priceFilter = ad.price <= price;
    const categoryFilter =
      selectedCategories.length === 0 || selectedCategories.includes(ad.type);
    return priceFilter && categoryFilter;
  });

  return (
    <div className="advertisements-page">
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
          <div className="username">{userName}</div>
        </div>

        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            id="pretraga"
            type="text"
            placeholder="Pretraži događaje..."
          />
        </div>

        <div className="logo">
          S<span id="usklicnik">!</span>
        </div>
      </div>

      <div className="container">

      <div className="filter">
        <div className="imeFiltra">Filter događaja</div>

        <div className="Vrsta">
          <div className="lista">Vrsta</div>
          {["Koncerti", "Putovanja", "Predstave", "Tulumi", "Kino", "Sport", "Prijevoz", "Ostalo"].map((category) => (
            <li
              key={category}
              className={selectedCategories.includes(category) ? "selected" : ""}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </div>

        <div className="price-range">
          <label htmlFor="price">Cijena:</label>
          <input
            type="range"
            id="price"
            name="price"
            min="0"
            max="999"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="1"
          />
          <span id="price-value">{price}</span>
        </div>
      </div>

      {/* Display filtered ads */}
      <div className="cards-container">
        {filteredAds.length === 0 ? (
          <div className="no-events-message">
            Nema još takvih događaja...
          </div>
        ) : (
          filteredAds.map((ad) => <Card key={ad.id} ad={ad} />)
        )}
      </div>
      </div>
    </div>
  );
};

export default AdvertisementsPage;
