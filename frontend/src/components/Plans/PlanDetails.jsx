import React, { useEffect, useState, useContext } from 'react';
import axios from '../../services/api';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const PlanDetails = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchPlan = async () => {
      const res = await axios.get(`/plans/${id}`);
      setPlan(res.data);
    };
    fetchPlan();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(plan);
    alert('Plan added to cart');
  };

  if (!plan) return <div>Loading...</div>;

  return (
    <div>
      <h2>{plan.name}</h2>
      <p>{plan.description}</p>
      <p>Price: INR {plan.price} per user</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default PlanDetails;
