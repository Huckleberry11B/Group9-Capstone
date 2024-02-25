import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigate, useParams } from 'react-router-dom';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';


const LoginSignup = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { action } = useParams();

  const handleAction = async (e) => {
    e.preventDefault();
    setError(""); 
    
    try {
      const apiUrl = action === "register" ? //API URL HERE
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid Email or Password. Please try again.');
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setToken(data.token);
      navigate('/home');
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again.');
    }
  };

  const title = action === "login" ? "Login" : "Signup";

  return (
    <form onSubmit={handleAction} className='container'>
      <div className='header'>
        <div className="text">{title}</div>
        <div className="underline"></div>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      <button className="submit">{title}</button>
    </form>
  );
};

export default LoginSignup;
