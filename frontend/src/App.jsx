import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PlanList from './components/Plans/PlanList';
import PlanDetails from './components/Plans/PlanDetails';
import Cart from './components/Cart/Cart';
import Checkout from './components/Cart/Checkout';
import OrderHistory from './pages/OrderHistory';
import SuperAdmin from './components/Dashboard/SuperAdmin';
import Admin from './components/Dashboard/Admin';
import User from './components/Dashboard/USer.jsx';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<PlanList />} />
            <Route path="/plans/:id" element={<PlanDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/dashboard/superadmin" element={<SuperAdmin />} />
            <Route path="/dashboard/admin" element={<Admin />} />
            <Route path="/dashboard/user" element={<User />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
