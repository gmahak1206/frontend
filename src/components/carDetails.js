import React from 'react';

const CarDetail = ({ id }) => {
    const carData = JSON.parse(localStorage.getItem("carData"));
    const car = carData[id];

    return (
        <div className="car-list">
            <ul>
                <li>
                <h3>Title: {car.title} </h3>
                <p>Car Description: {car.description}</p>
                <p>Car Type: {car.car_type}</p>
                <p>Car Company: {car.car_company}</p>
                <p>Car Dealer: {car.car_dealer}</p>
                <img src={car.images[0]} height="400" width="600" />
                </li>
            </ul>
        </div>
    );
};

export default CarDetail;
