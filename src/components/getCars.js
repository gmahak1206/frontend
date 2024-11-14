import React, { useState , useEffect } from 'react';
import axios from 'axios';
import CarList from './components/CarList';
import CarForm from './components/CarForm';

const getCars = () => {
  const [cars, setCars] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    // Fetch the list of cars from the backend when the component loads
    axios.get('http://localhost:5000/cars/', formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })  // Make sure the endpoint is correct
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the cars:', error);
      });
  }, []);

const addCar = (car) => {
    if (cars.length >= 10) {
      alert("You cannot add more than 10 cars.");
      return;
    }
  
    // Create a FormData object to send the image as well
    const formData = new FormData();
    formData.append('make', car.make);
    formData.append('model', car.model);
    formData.append('year', car.year);
    formData.append('color', car.color);
    formData.append('image', car.image);
    formData.append('user', )  // Append image to the FormData
  
    axios.post('http://localhost:5000/cars/create', formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then(response => {
        setCars([...cars, response.data]);
        setFormVisible(false);
      })
      .catch(error => {
        console.error('There was an error adding the car:', error);
      });
  };
  

  return (
    <div className="app">
      <h1>Car Management App</h1>
      <button onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? 'Cancel' : 'Add New Car'}
      </button>

      {formVisible && <CarForm addCar={addCar} />}
      
      <CarList cars={cars} />
    </div>
  );
};

export default getCars;
