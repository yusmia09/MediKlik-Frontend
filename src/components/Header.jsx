import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import logo from "../assets/logo.png";
import axios from "axios";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  // Ambil data user kalau sudah login
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUserData(res.data))
        .catch((err) => {
          console.error(err);
          setUserData(null);
        });
    }
  }, [token]);

  const handleSearch = (e) => {
    e.preventDefault();
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="MediKlik Logo"
          className="h-12 w-auto object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
        <form onSubmit={handleSearch} className="relative w-[28rem] max-sm:w-[14rem]">
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
        <Link
          to="/"
          className={`font-medium hover:text-cyan-600 ${
            location.pathname === "/" ? "text-cyan-600 font-bold" : ""
          }`}
        >
          Beranda
        </Link>

        <Link
          to="/product"
          className={`font-medium hover:text-cyan-600 ${
            location.pathname.startsWith("/product") ? "text-cyan-600 font-bold" : ""
          }`}
        >
          Produk
        </Link>

        <Link
          to="/about"
          className={`font-medium hover:text-cyan-600 ${
            location.pathname === "/about" ? "text-cyan-600 font-bold" : ""
          }`}
        >
          Tentang Kami
        </Link>

        <Link to="/cart" className="relative text-gray-700 hover:text-cyan-600">
          <ShoppingCart className="w-6 h-6" />
        </Link>

        {/* Tombol login / icon profile */}
        {token && userData ? (
          <Link
            to="/profile"
            className="text-gray-700 hover:text-cyan-600 font-medium flex items-center gap-1"
          >
            {/* Bisa tampilkan username atau icon */}
            <User className="w-6 h-6" />
            <span className="hidden sm:inline">{userData.username}</span>
          </Link>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
