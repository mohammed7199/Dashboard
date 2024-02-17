import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', { name, email, password })
      .then(res => {
        navigate('/login');
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ background: '#fff', padding: '3rem', borderRadius: '8px', width: '100%' }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="name"><strong>Name</strong></label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              style={{ width: '100%', borderRadius: '0', padding: '0.375rem 0.75rem', border: '1px solid #ced4da', lineHeight: '1.5' }}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              style={{ width: '100%', borderRadius: '0', padding: '0.375rem 0.75rem', border: '1px solid #ced4da', lineHeight: '1.5' }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              style={{ width: '100%', borderRadius: '0', padding: '0.375rem 0.75rem', border: '1px solid #ced4da', lineHeight: '1.5' }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#28a745', color: '#fff' }}>Register</button>
        </form>
        <p style={{ marginTop: '10px', textAlign: 'center' }}>Already Have an Account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Registration;