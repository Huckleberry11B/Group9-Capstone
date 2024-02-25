/* TODO - add your code to create a functional React component that renders a registration form */

import React, { useState } from 'react';


const RegistrationForm = ({token, setToken}) => {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)


  
const handleSubmit = async (e)=> {
    e.preventDefault();



    try {
      const response = await fetch(//API URL HERE,{
         method: "POST",
         headers: {
          "Content-Type": "application/json"
         },
         body: JSON.stringify({
          email: email,
          password: password
         })
      })
      const result = await response.json();
       console.log(result)
       console.log(result.success)
       setToken(result.token)
  } catch (error){
      setError(error.message)
  }
    
  

  
}

  return (
    <div>
      <h2>Registration Form</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
