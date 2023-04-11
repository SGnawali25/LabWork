import React, { Component, useEffect, useState } from "react";
const API_KEY = "f84afe15c95053a2bd6114d9f89a4f2a041215eba32f3f317d531c94bfe1c24a";

const CoinChart = ({ symbol, market }) => {
    const [histData, setHistData] = useState(null);


    useEffect(() => {
        const getCoinHist = async () => {
            const response = await fetch(
            `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&e=${market}&limit=30&api_key=` +
                API_KEY
            );
            const json = await response.json();
            setHistData(json.Data.Data);
        
        };
        getCoinHist().catch(console.error);
      }, []);

      return (
        <div>
          {histData ? (// rendering only if API call actually returned us data
            <div>
              
            </div>
          ) : null}
        </div>
      );
    
  };

export default CoinChart;
