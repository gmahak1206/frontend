import React, { useState } from 'react';
import CarDetail from './carDetails';
import CarForm from './CarForm';

const CarList = ({ title ,index }) => {
  const [toggleButton, setToggleButton] = useState(false);
  const [EditToggleButton, setEditToggleButton] = useState(false);
  return (
    <div className="car-list">
        <ul>
            <li>
              <h3>Title: {title} </h3>
              <button onClick={() => setToggleButton(!toggleButton)} >View Details</button>
              <div>
                { toggleButton && < CarDetail id={index}/> }
              </div>
              <button onClick={() => setEditToggleButton(!EditToggleButton)} >Edit Information</button>
              <div>
                { EditToggleButton && < CarForm id={index}/> }
              </div>
            </li>
        </ul>
    </div>
  );
};

export default CarList;
