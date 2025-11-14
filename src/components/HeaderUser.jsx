import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import logo from "../assets/logo.png";

const HeaderUser = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      // Ambil data user dari API
      fetch("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  if (!token) return null;

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="MediKlik Logo" className="h-12 w-auto" />
        <span className="font-bold text-cyan-600 text-lg">MediKlik</span>
      </div>
      <nav className="flex items-center gap-6">
        <Link to="/">Beranda</Link>
        <Link to="/product">Produk</Link>
        <Link to="/about">Tentang Kami</Link>
        <Link to="/cart"><ShoppingCart className="w-6 h-6" /></Link>
        {userData && (
          <Link to="/profile" className="flex items-center gap-2">
            <img
              src={userData.avatar || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="hidden sm:inline">{userData.username}</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default HeaderUser;
