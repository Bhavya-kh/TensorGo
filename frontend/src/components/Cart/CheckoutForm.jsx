import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../services/api';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, token } = await stripe.createToken(elements.getElement(CardElement));

    if (error) {
      console.error(error);
      alert('Payment failed');
    } else {
      try {
        const res = await axios.post('/payments/checkout', {
          token: token.id,
          cart,
        });
        alert('Payment successful');
        navigate('/order-history');
      } catch (err) {
        console.error(err);
        alert('Payment processing failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

export default CheckoutForm;
