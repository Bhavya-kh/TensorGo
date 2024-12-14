import React, { useState } from 'react';
import axios from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', userDetails);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Fields for name, email, password */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            required
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
          />
        </div>
        {/* ... similar for email and password */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
