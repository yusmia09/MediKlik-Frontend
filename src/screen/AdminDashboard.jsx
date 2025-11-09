import React from 'react';
import '../App.css';
import Sidebar from '../components/Sidebar/Sidebar';
import MainDash from '../components/MainDash/MainDash';

const AdminDashboard = () => {
  return (
    <div className='App'>
        <div className='AppGlass'>
            <Sidebar />
            <MainDash />
        </div>
    </div>
  )
}

export default AdminDashboard
