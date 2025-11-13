import React from 'react';
import logo from '../../assets/logo2.svg';
import './Sidebar.css';
import { SidebarData } from '../../Data/Data';
import { NavLink } from 'react-router-dom';
import { UilSignOutAlt } from "@iconscout/react-unicons";

const Sidebar = () => {
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
        <div className="menuItem">
          <UilSignOutAlt />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
