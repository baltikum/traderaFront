import React, { useEffect } from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
//import { Button } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faFlag } from '@fortawesome/free-solid-svg-icons'
import CategoryStringConverter from './components/CategoryStringConverter';

const ItemObject = (props) => {
  const fetchBiddingData = () => {
    axios.get('http://127.0.0.1:8000/get_bidding/'+ props.item.id)
      .then( response => {
        console.log(response.data);
      })
      .catch(error => console.log(error));
  };
  
  const [bidding, setBidding] = useState(Boolean(props.item.bidding_on));
  const [bid,setBid] = useState(props.bidding_on ? fetchBiddingData() : 0);
  const [highlighted, setHighlighted] = useState(Boolean(props.item.highlighted));
  const [removed, setRemoved] = useState(Boolean(props.item.removed));
  const [ending_time, setEnding] = useState('')
  const ending_soon = Boolean(props.item.ending_soon)
  const ended = Boolean(props.item.ended)

  const handleHighlight = () => {
    setHighlighted(!highlighted);
    axios.patch('http://127.0.0.1:8000/highlight_auction/'+ props.item.id)
      .then( response => {
        console.log(response.data);
      })
      .catch(error => console.log(error));
  };
  const removeBid = () => {
    setBidding(false);

    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    axios.delete('http://127.0.0.1:8000/delete_bid/'+ props.item.id )
    .then( response => {
      console.log(response.data);
    })
    .catch(error => console.log(error));
    
    axios.patch('http://127.0.0.1:8000/bidding_on_auction/'+ props.item.id + '/False')
    .then( response => {
      console.log(response.data);
    })
    .catch(error => console.log(error));
  };
  const handleBid = () => {
    setBidding(true);
    const data = {
      auction_id: props.item.id,
      highest_bid: bid,
      ends: props.item.end_date
    };
    console.log(data)

    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    axios.post('http://127.0.0.1:8000/insert_bid/'+ props.item.id, data)
      .then( response => {
        console.log(response.data);
      })
      .catch(error => console.log(error));
    axios.patch('http://127.0.0.1:8000/bidding_on_auction/'+ props.item.id + '/True')
      .then( response => {
        console.log(response.data);
      })
      .catch(error => console.log(error));
  };
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

  function handleContextMenu(event) {
    event.preventDefault();
    setMenuVisible(!menuVisible);
  };

  

  return (
    <Card {...props} 
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        className={removed ? 'card text-white bg-secondary mb-3'
          : bidding ? 'card text-white bg-warning mb-3'
          : ending_soon ? 'card text-white bg-danger mb-3'
          : highlighted ? 'card text-white bg-primary mb-3'
          : ended ? 'card text-white bg-dark mb-3'
          : 'card text-white bg-info mb-3' }
       
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
      { menuVisible ? 
      
      
      <>
        <Form>
          <Form.Group className="mb-3" 
                      controlId="formBid" 
                      >
            <Form.Label>Max bud</Form.Label>
            <Form.Control type="number"  
                          placeholder="Enter bid" 
                          onClick={(e) => {e.stopPropagation();}}
                          onChange={(e) => setBid(e.target.value)}/>

          </Form.Group>
          
          { bidding
              ? <Button variant="danger" 
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeBid();
                        }}>   
                  Radera Bud
                </Button>
              : <Button variant="warning" 
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleBid();
                        }}>   
                  Buda
                </Button> }
        </Form>

      </>


        : <>
        <Card.Body>
          { highlighted ? <FontAwesomeIcon icon={faHeart} size="lg" color="red" /> : <FontAwesomeIcon icon={faFlag} size="lg" color="yellow" /> }
          
          <Card.Title>{props.item.description.slice(0,13)}</Card.Title>
          <Card.Text>{props.item.description}</Card.Text>
          <Card.Text>{props.item.price}</Card.Text> 
          
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
      </> }



      
    </Card>
  );
};

export default ItemObject;