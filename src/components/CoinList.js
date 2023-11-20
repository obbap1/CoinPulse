import React, { useState, useEffect } from "react";
import axios from "axios";
import Icon from "@mdi/react";
import { mdiStar, mdiStarOutline, mdiMenuUp, mdiMenuDown } from "@mdi/js";
import "../index.css";
import data from "../data";

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        // );
        setCoins(data);
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
            <th>#</th>
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
              <td>
                {/* Check if the coin is in favorites */}
                <span
                  style={{ cursor: "pointer", float: "left" }}
                  onClick={() => toggleFavorite(coin.id)}
                >
                  {favorites.includes(coin.id) ? (
                    <Icon path={mdiStar} size={1} />
                  ) : (
                    <Icon path={mdiStarOutline} size={1} />
                  )}
                </span>
                <span style={{ float: "right" }}>{index + 1}</span>
              </td>
              <td class="flatten">
                <img src={coin.image} alt="Coin" />
                <p>
                  <strong>{coin.name}</strong>
                </p>
                <p>{(coin.symbol || "").toUpperCase()}</p>
              </td>
              <td>
                <strong>
                  $
                  {(coin.current_price || 0).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </td>
              <td>
              <span
                  style={{ cursor: "pointer", float: "left" }}
                >
                  {(coin.market_cap_change_percentage_24h || 0) > 0  ? (
                    <Icon path={mdiMenuUp} color="green" size={1} />
                  ) : (
                    <Icon path={mdiMenuDown} color="red" size={1} />
                  )}
                </span>
                <span style={{ float: "right", color: (coin.market_cap_change_percentage_24h || 0) > 0  ? "green": "red" }}>
                {((coin.market_cap_change_percentage_24h || 0) * -1).toFixed(1)}% 
                </span>
              </td>
              {/* there is no data for 1h and 7d */}
              <td><span
                  style={{ cursor: "pointer", float: "left" }}
                >
                  {(coin.price_change_percentage_24h || 0) > 0  ? (
                    <Icon path={mdiMenuUp} color="green" size={1} />
                  ) : (
                    <Icon path={mdiMenuDown} color="red" size={1} />
                  )}
                </span>
                <span style={{ float: "right", color: (coin.price_change_percentage_24h || 0) > 0  ? "green": "red" }}>
                {((coin.price_change_percentage_24h || 0) * -1).toFixed(1)}% 
                </span></td>
              <td>
              <span
                  style={{ cursor: "pointer", float: "left" }}
                >
                  {(coin.market_cap_change_percentage_24h || 0) > 0  ? (
                    <Icon path={mdiMenuUp} color="green" size={1} />
                  ) : (
                    <Icon path={mdiMenuDown} color="red" size={1} />
                  )}
                </span>
                <span style={{ float: "right", color: (coin.market_cap_change_percentage_24h || 0) > 0  ? "green": "red" }}>
                {((coin.market_cap_change_percentage_24h || 0) * -1).toFixed(1)}% 
                </span>
              </td>
              {/* there is no data for 1h and 7d */}
              <td>
                <strong>
                  $
                  {(coin.total_volume || 0).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </td>
              <td>
                <strong>
                  $
                  {(coin.market_cap || 0).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinList;
