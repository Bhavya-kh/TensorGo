import React, { useState, useEffect, useContext } from 'react';
import axios from '../services/api';
import { AuthContext } from '../context/AuthContext';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get('/orders', {
        params: { userId: user._id },
      });
      setOrders(res.data);
    };
    if (user) fetchOrders();
  }, [user]);

  if (!user) return <div>Please log in to view your order history.</div>;

  return (
    <div>
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <p>Plan: {order.plan.name}</p>
              <p>Price: INR {order.amount}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
