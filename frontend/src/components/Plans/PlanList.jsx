import React, { useEffect, useState } from 'react';
import axios from '../../services/api';
import { Link } from 'react-router-dom';

const PlanList = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await axios.get('/plans');
      setPlans(res.data);
    };
    fetchPlans();
  }, []);

  return (
    <div>
      <h2>Available Plans</h2>
      <ul>
        {plans.map((plan) => (
          <li key={plan._id}>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <p>Price: INR {plan.price} per user</p>
            <Link to={`/plans/${plan._id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanList;
