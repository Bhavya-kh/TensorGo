import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  if (cart.length === 0) return <div>Your cart is empty</div>;

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((plan) => (
          <li key={plan._id}>
            <h3>{plan.name}</h3>
            <p>Price: INR {plan.price}</p>
            <button onClick={() => removeFromCart(plan._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <Link to="/checkout">Proceed to Checkout</Link>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
