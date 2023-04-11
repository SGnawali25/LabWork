import "./App.css";
import React, { useEffect, useState } from "react";
import CoinInfo from "./Components/CoinInfo";
const API_KEY = "f84afe15c95053a2bd6114d9f89a4f2a041215eba32f3f317d531c94bfe1c24a";

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // declare the async data fetching function
    const fetchAllCoinData = async () => {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + API_KEY
      );
      const json = await response.json();
      setList(getBlockchainCoins(json.Data));
    };

    // calls functions and handles error
    fetchAllCoinData().catch(console.error);
  }, []);

  const getBlockchainCoins = (listCoins) => {
    var blockchainCoins = {};
    for (const [coinName, info] of Object.entries(listCoins)) {
      if (info.PlatformType == "blockchain") {
        blockchainCoins[coinName] = info;
      }
    } 
    return blockchainCoins;
  }

  const searchItems = (searchValue) => {
    event.preventDefault();
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list).filter((item) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list));
    }
  };
  
  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      
      <ul>
        {searchInput.length > 0 && filteredResults
          ? filteredResults.map((coin, index) =>
                <CoinInfo
                  image={list[coin].ImageUrl}
                  name={list[coin].FullName}
                  symbol={list[coin].Symbol}
                  key={index}
                />
            )
          : list &&
            Object.entries(list).map(([coin], index) =>
                <CoinInfo
                  image={list[coin].ImageUrl}
                  name={list[coin].FullName}
                  symbol={list[coin].Symbol}
                  key={index}
                />
            )}
      </ul>
    </div>
  );
}

export default App;