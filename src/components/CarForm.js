import React, { useState } from 'react';

const CarForm = ({ addCar }) => {
  const [carData, setCarData] = useState({
    title: '', 
    description: '', 
    car_type: '', 
    car_company: '', 
    car_dealer: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCarData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (carData.image) {
      addCar(carData);
      setCarData({
        title: '', 
        description: '', 
        car_type: '', 
        car_company: '', 
        car_dealer: '',
        image: null
      });  // Reset form
    } else {
      alert('Please upload an image.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="car-form">
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={carData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={carData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Car_type:
        <input
          type="text"
          name="car_type"
          value={carData.car_type}
          onChange={handleChange}
        />
      </label>
      <label>
        Car Company:
        <input
          type="text"
          name="car_company"
          value={carData.car_company}
          onChange={handleChange}
        />
      </label>
      <label>
        Car Dealer:
        <input
          type="text"
          name="car_dealer"
          value={carData.car_dealer}
          onChange={handleChange}
        />
      </label>
      <label>
        Upload Car Image:
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
        />
      </label>
      <button type="submit">Add Car</button>
    </form>
  );
};

export default CarForm;
