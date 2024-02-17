import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(res => {
        console.log(res);
        if (res.data.Login) {
          navigate("/dashboard");
        } else {
          // Display error alert
          alert("Invalid email or password");
        }
      })
      .catch(err => {
        // Display error alert for other errors
        alert("An error occurred. Please try again.");
        console.log(err);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '280px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#28a745', color: '#fff' }}>Login</button>
        </form>
        <p style={{ textAlign: 'center' }}>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;