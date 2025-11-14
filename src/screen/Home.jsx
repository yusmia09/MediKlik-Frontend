import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Truck, CheckCircle, Tag } from "lucide-react";
import Header from "../components/Header";
import heroImg from "../assets/hero.jpg";

const API_URL = "http://localhost:5000/api/products";
const BASE_URL = "http://localhost:5000";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const productsRef = useRef(null);

  // Ambil data produk dari backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
      setFiltered(res.data.slice(0, 8));
    } catch (err) {
      console.error("Gagal ambil data produk:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 10000);
    return () => clearInterval(interval);
  }, []);

  // 🛒 Fungsi tambah ke keranjang (koneksi ke backend)
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Silakan login terlebih dahulu!");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200 || res.status === 201) {
        alert(`${product.name} berhasil ditambahkan ke keranjang!`);
      } else {
        alert("Gagal menambahkan produk ke keranjang.");
      }
    } catch (err) {
      console.error("Error add to cart:", err);
      alert("Terjadi kesalahan saat menambahkan ke keranjang.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-cyan-600 animate-pulse">
        Memuat data produk...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* ✅ Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden flex items-center px-6" style={{ minHeight: "70vh" }}>
        <div className="md:w-1/2 z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Apotek Online Terpercaya
          </h2>
          <p className="text-lg md:text-xl mb-6 max-w-md text-gray-700">
            Dapatkan obat-obatan, vitamin, dan produk kesehatan keluarga anda
            dengan cepat dan aman.
          </p>
          <a
            href="#products"
            className="bg-white text-cyan-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Belanja Sekarang
          </a>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full">
          <img
            src={heroImg}
            alt="Hero"
            className="w-full h-full object-cover"
            style={{ opacity: 0.6 }}
          />
        </div>
      </section>

      {/* Produk Terbaru */}
      <section ref={productsRef} id="products" className="py-14 px-6 max-w-7xl mx-auto">
        <h3 className="text-3xl font-semibold mb-8 text-center text-cyan-600">
          Produk Terbaru
        </h3>
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada produk tersedia</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((p) => {
              const imagePath = p.image
                ? `${BASE_URL}/${p.image.replace(/\\/g, "/")}`
                : "https://via.placeholder.com/300x200?text=No+Image";

              return (
                <div
                  key={p._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer flex flex-col"
                  onClick={() => navigate(`/product/${p._id}`)}
                >
                  <div className="overflow-hidden rounded-t-xl h-48 flex items-center justify-center bg-gray-100">
                    <img
                      src={imagePath}
                      alt={p.name}
                      className="object-contain h-full"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/300x200?text=No+Image")
                      }
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="text-lg font-semibold truncate">{p.name}</h4>
                      <p className="text-cyan-600 font-bold mt-1">
                        Rp{p.price?.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(p);
                      }}
                      className="mt-3 bg-cyan-600 text-white px-3 py-2 rounded-lg hover:bg-cyan-700 transition"
                    >
                      Tambah ke Keranjang
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Kenapa Kami */}
      <section className="py-14 px-6 bg-white mt-12">
        <h3 className="text-3xl font-semibold mb-8 text-center text-cyan-600">
          Kenapa Kami?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-cyan-50 p-6 rounded-lg text-center shadow hover:shadow-lg transition flex flex-col items-center">
            <Truck className="w-12 h-12 text-cyan-500 mb-4" />
            <h4 className="font-bold mb-2">Cepat & Aman</h4>
            <p className="text-gray-700 text-sm text-center">Pengiriman cepat dan terpercaya ke seluruh Indonesia.</p>
          </div>
          <div className="bg-cyan-50 p-6 rounded-lg text-center shadow hover:shadow-lg transition flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-cyan-500 mb-4" />
            <h4 className="font-bold mb-2">Produk Original</h4>
            <p className="text-gray-700 text-sm text-center">Semua produk asli dari apotek resmi dan terpercaya.</p>
          </div>
          <div className="bg-cyan-50 p-6 rounded-lg text-center shadow hover:shadow-lg transition flex flex-col items-center">
            <Tag className="w-12 h-12 text-cyan-500 mb-4" />
            <h4 className="font-bold mb-2">Harga Terjangkau</h4>
            <p className="text-gray-700 text-sm text-center">Harga kompetitif dengan promo menarik setiap waktu.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-12 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-cyan-400 font-semibold mb-2">MediKlik</h4>
            <p>Apotek online terpercaya untuk kebutuhan kesehatan keluarga Anda.</p>
          </div>
          <div>
            <h4 className="text-cyan-400 font-semibold mb-2">Kontak</h4>
            <p>Jl. Contoh Alamat No.123, Jakarta</p>
            <p>Email: info@mediklik.com</p>
            <p>Telp: +62 812 3456 7890</p>
          </div>
          <div>
            <h4 className="text-cyan-400 font-semibold mb-2">Sosial Media</h4>
            <p>Instagram: @mediklik</p>
            <p>Facebook: MediKlik</p>
            <p>Jam Operasional: 08.00 - 20.00 WIB</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} MediKlik. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
