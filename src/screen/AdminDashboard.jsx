import React from 'react';
import '../App.css';
import Sidebar from '../components/Sidebar/Sidebar';
import MainDash from '../components/MainDash/MainDash';
import RightSide from '../components/RightSide/RightSide';
import { Routes, Route, useLocation } from "react-router-dom";
import CategoryList from '../components/Category/CategoryList';
import ProductList from '../components/Product/ProductList';
import OrderList from '../components/Order/OrderList';

const AdminDashboard = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/admin" || location.pathname === "/admin/";

  return (
    <div className='App'>
      <div className={`AppGlass ${!isDashboard ? 'noRightSide' : ''}`}>
        <Sidebar />

        <div className="MainContent">
          <Routes>
            <Route path="/dashboard" element={<MainDash />} />
            <Route path="category" element={<CategoryList />} />
            <Route path="product" element={<ProductList />} />
            <Route path="order" element={<OrderList /> } />
          </Routes>
        </div>

        {isDashboard && <RightSide />}
      </div>
    </div>
  );
};

export default AdminDashboard;
