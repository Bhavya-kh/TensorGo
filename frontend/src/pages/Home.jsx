import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Our SaaS Platform</h1>
      <Link to="/plans">View Plans</Link>
    </div>
  );
};

export default Home;
