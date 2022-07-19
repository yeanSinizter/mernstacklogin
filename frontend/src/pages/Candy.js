import React, { useState } from 'react';
import "../App.css"



export default function Candy() {
    const [fruit, setFruit] = useState();
    return (
      <div>
        <select id="fruits" className='candy' value={fruit} 
                onChange={(e) => setFruit(e.target.value)}>
          <option value="Apple">Apple</option>
          <option value="Pear">Pear</option>
          <option value="Pineapple">Pineapple</option>
        </select>
        <h1>Selected Fruit: {fruit}</h1>
      </div>
    );
  }

 