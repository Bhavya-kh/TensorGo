import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import axios from '../../services/api';
import { useNavigate } from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    alert('Please login to proceed with checkout');
    navigate('/login');
    return null;
  }

  const totalAmount = cart.reduce((sum, plan) => sum + plan.price, 0);

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total Amount: INR {totalAmount}</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} />
      </Elements>
    </div>
  );
};

export default Checkout;
