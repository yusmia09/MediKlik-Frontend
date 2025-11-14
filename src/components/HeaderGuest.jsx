import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import logo from "../assets/logo.png";

const HeaderGuest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    const productsSection = document.getElementById("products");
    if (productsSection) productsSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="MediKlik Logo"
          className="h-12 w-auto cursor-pointer"
          onClick={() => navigate("/")}
        />
        <form onSubmit={handleSearch} className="relative w-[28rem]">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
        </form>
      </div>
      <nav className="flex items-center gap-6">
        <Link to="/">Beranda</Link>
        <Link to="/product">Produk</Link>
        <Link to="/about">Tentang Kami</Link>
        <Link to="/cart"><ShoppingCart className="w-6 h-6" /></Link>
        <button
          onClick={() => navigate("/login")}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
        >
          Login
        </button>
      </nav>
    </header>
  );
};

export default HeaderGuest;
