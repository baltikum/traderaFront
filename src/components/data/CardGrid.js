import React from 'react';
import { useState,useEffect } from 'react';
import ItemObject from './ItemObject';
import axios from 'axios';

function CardGrid({items, itemsPerRow}){

  const [auctions, setAuctions] = useState([]);
  

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/get_auctions')
      .then( response => {

        const highlightedItems = response.data.auctions.filter((obj) => obj.highlighted === true);
        const nonHighlightedItems = response.data.auctions.filter((obj) => obj.highlighted !== true);
        const sortedAuctions = [...highlightedItems, ...nonHighlightedItems];
        setAuctions(sortedAuctions);
        console.log(response.data);
      })
      .catch(error => console.log(error));
  }, []);




return(
  <div>
  <div className="d-flex flex-wrap justify-content-around">
      {auctions.map(item => (
        <ItemObject
          key={item.id}
          item={item}
        />
      ))}
    </div>
    </div>
)};

export default CardGrid;
