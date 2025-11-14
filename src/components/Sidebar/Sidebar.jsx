import React from 'react';
import logo from '../../assets/logo2.svg';
import './Sidebar.css';
import { SidebarData } from '../../Data/Data';
import { NavLink, useNavigate } from 'react-router-dom';
import { UilSignOutAlt } from "@iconscout/react-unicons";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="Sidebar">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="logo" />
        <span>Medi<span>Klik</span></span>
      </div>

      {/* Menu */}
      <div className="menu">
        {SidebarData.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              isActive ? "menuItem active" : "menuItem"
            }
          >
            <item.icon />
            <span>{item.heading}</span>
          </NavLink>
        ))}

        {/* Signout */}
        <div className="menuItem signout" onClick={handleLogout}>
          <UilSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
