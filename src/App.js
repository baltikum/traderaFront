import React from 'react';
import CardGrid from './components/data/CardGrid';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';



function App() {


  const data = [ 
    { id:1,title:"Titel",description:"Beskrivning",isSelected:false, isHighlighted: false},
    { id:2,title:"Titel",description:"Beskrivning",isSelected:false, isHighlighted: false},
    { id:3,title:"Titel",description:"Beskrivning",isSelected:false, isHighlighted: false},
    { id:4,title:"Titel",description:"Beskrivning",isSelected:false, isHighlighted: false},
    { id:5,title:"Titel",description:"Beskrivning",isSelected:false, isHighlighted: true},
    { id:6,title:"Titel",description:"Beskrivning",isSelected:false, isHighlighted: false}];

  return (
    <div className="App">
      <CardGrid 
        items={data} 
        itemsPerRow={5} />

    </div>
  );
}

export default App;
