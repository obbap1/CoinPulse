import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="container">
      <table className="coin-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Coin</th>
            <th>Price</th>
            <th>1h</th>
            <th>24h</th>
            <th>7d</th>
            <th>24h Volume</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr key={coin.id}>
              <td>{index + 1}</td>
              <td>
                {/* Check if the coin is in favorites */}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleFavorite(coin.id)}
                >
                  {favorites.includes(coin.id) ? (
                    <i className="fas fa-star"></i>
                  ) : (
                    <i className="far fa-star"></i>
                  )}
                </span>
              </td>
              <td>
                <img src={coin.image} alt="Coin" />
                <p>{coin.name}</p>
                <p>{coin.symbol}</p>
              </td>
              <td>{coin.current_price}</td>
              <td>{coin.price_change_percentage_1h}</td>
              <td>{coin.price_change_percentage_24h}</td>
              <td>{coin.price_change_percentage_7d}</td>
              <td>{coin.total_volume}</td>
              <td>{coin.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
