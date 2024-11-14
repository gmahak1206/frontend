import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarForm from './components/CarForm';
import CarList from './components/CarList';
import SignUp from './components/signup';
import Login from './components/login';

const App = () => {
  const [cars, setCars] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('token') || ''); // Get token from localStorage

  // Check if the user is logged in based on JWT token
  useEffect(() => {
    if (jwtToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [jwtToken]);

  // Fetch all cars when logged in
  useEffect(() => {
    if (jwtToken) {
      console.log(jwtToken);
      axios.get('http://localhost:5000/api/cars', {
        headers: { Authorization: `Bearer ${jwtToken}` }
      })
        .then(response => {
          setCars(response.data);
          localStorage.setItem("carData", JSON.stringify(response.data));
        })
        .catch(error => {
          console.error('Error fetching cars:', error);
        });
    }
  }, [jwtToken]);

  // Add car with JWT token in headers
  const addCar = (carData) => {
    if (!jwtToken) {
      alert('You need to log in first!');
      return;
    }
    console.log("entering form data", carData, jwtToken);
    const formData = new FormData();
    formData.append('title', carData.title);
    formData.append('description', carData.description);
    formData.append('car_type', carData.car_type);
    formData.append('car_company', carData.car_company);
    formData.append('car_dealer', carData.car_dealer);
    formData.append('image', carData.image);

    console.log(jwtToken);
    console.log(formData, "formdata initialized");

    axios.post('http://localhost:5000/api/cars/create', formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then(response => {
        console.log("response received", response.data);
        setCars([...cars, response.data]);
        setFormVisible(false);
      })
      .catch(error => {
        console.error('Error adding car:', error);
      });
  };

  // Toggle between Sign Up and Login forms
  const toggleSignUpLogin = () => {
    setShowSignUp(!showSignUp);
    setShowLogin(!showLogin);
  };

  // Handle successful login and store the token
  const handleLogin = (token) => {
    setJwtToken(token);
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    setJwtToken('');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <h1>Car Management App</h1>
      {!isLoggedIn ? (
        <>
          <button onClick={() => setShowSignUp(true)}>Sign Up</button>
          <button onClick={() => setShowLogin(true)}>Login</button>
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => setFormVisible(true)}>Add Car</button>
          <button onClick={() => setFormVisible(false)}>Show Cars</button>
        </>
      )}

      {showSignUp && !isLoggedIn && <SignUp onRegister={handleLogin} />}
      {showLogin && !isLoggedIn && <Login onLogin={handleLogin} />}

      {formVisible && isLoggedIn && <CarForm addCar={addCar} />}
      {!formVisible && isLoggedIn && cars.map((car, idx) => {
        return (
        <CarList title={car.title} index={idx} />
      )
      })
      }
    </div>
  );
};

export default App;
