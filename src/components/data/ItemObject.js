import React, { useEffect } from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faFlag } from '@fortawesome/free-solid-svg-icons'
import CategoryStringConverter from './components/CategoryStringConverter';

const ItemObject = (props) => {
  const [highlighted, setHighlighted] = useState(Boolean(props.item.highlighted));
  const [removed, setRemoved] = useState(Boolean(props.item.removed));
  const [ending_time, setEnding] = useState('')
  const ending_soon = Boolean(props.item.ending_soon)

  const handleHighlight = () => {
    setHighlighted(!highlighted);
    axios.patch('http://127.0.0.1:8000/highlight_auction/'+ props.item.id)
      .then( response => {
        console.log(response.data);
      })
      .catch(error => console.log(error));
  }
  const handleClick = () => {
    window.open(props.item.item_url, "_blank");
  };
  const handleRemove = () => {
    if (!highlighted) {
      setRemoved(!removed);
      axios.patch('http://127.0.0.1:8000/show_hide_auction/' + props.item.id)
        .then( response => {
          console.log(response.data);
        })
        .catch(error => console.log(error));
      };    
  };



  useEffect(() => {
    const datetime = new Date(props.item.end_date);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };
    const formatter = new Intl.DateTimeFormat('sv-SE', options);
    const formattedDateTime = formatter.format(datetime);
    setEnding(formattedDateTime)
  },[]);

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);

  function handleContextMenu(event) {
    event.preventDefault();
    setMenuVisible(!menuVisible);
  }

  function handleMenuClick() {
    setMenuVisible(false);
    // Handle menu item click here
  }

  return (
    <Card {...props} 
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        className={removed
          ? 'card text-white bg-secondary mb-3'
          : highlighted
              ? 'card text-white bg-primary mb-3'
              : ending_soon
                  ? 'card text-white bg-danger mb-3'
                  : 'card text-white bg-info mb-3'
          }
        >
      <Card.Img 
        variant="top" 
        src={props.item.image_url} 
        alt="Not found"
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
        />

      <Card.Body>
        { highlighted ? <FontAwesomeIcon icon={faHeart} size="lg" color="red" /> : <FontAwesomeIcon icon={faFlag} size="lg" color="yellow" /> }
        { menuVisible ? 
        <><Card.Title>{props.item.description.slice(0,13)}</Card.Title>
        <Card.Text>{props.item.description}</Card.Text>
        <Card.Text>{props.item.price}</Card.Text> </>: null }
        
        <Button 
            className="text-capitalize bg-warning"
            onClick={(e) => {
              e.stopPropagation();
              handleHighlight(); }}> 
              { highlighted ? 'Släpp' : 'Spara' }
        </Button>
        
        <Button 
            className="text-capitalize bg-danger"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}>
              { removed ? 'Återställ' : 'Ta Bort' }
        </Button>

        <Card.Text>{props.item.search_term} in &nbsp;
          <CategoryStringConverter number={props.item.auction_category} />
        </Card.Text>
      </Card.Body>
      <Card.Footer>{ending_time}</Card.Footer>
    </Card>
  );
};

export default ItemObject;