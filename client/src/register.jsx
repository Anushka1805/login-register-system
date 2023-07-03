import React, { useState } from 'react';
import axios from 'axios';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/register', {
        name,
        email,
        password
      });

      console.log(response.data.message);
      setName("");
      setEmail("");
      setPassword("");

      // Perform further actions, such as showing a success message or redirecting the user
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div style = {{marginLeft:"40%", marginTop:"12%"}}>
      <h2 style = {{fontFamily:"Jost"}}>Register</h2>
      <form onSubmit={handleRegister}>
        <div >
          <label style = {{fontFamily:"Jost"}}>Name:</label>
          
          <input class="input-group-text" type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label style = {{fontFamily:"Jost"}}>Email:</label>
          <input class= "input-group-text" type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label style = {{fontFamily:"Jost"}}>Password:</label>
          <input class= "input-group-text" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" class="btn btn-success" style = {{marginTop:"10px"}}>Register</button>
      </form>
      <a href='/login'>Login</a>
    </div>
  );
};

export default Register;
