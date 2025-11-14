import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const API_URL = "http://localhost:5000/api/cart";

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Perbaikan di sini aja
  const handleAddToCart = async (product) => {
    if (!token) {
      alert("Silahkan login terlebih dahulu!");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        API_URL,
        { productId: product._id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`${product.name} berhasil ditambahkan ke keranjang!`);
    } catch (err) {
      console.error("Gagal menambahkan ke keranjang:", err);
      alert("Terjadi kesalahan saat menambahkan produk ke keranjang.");
    }
  };
  // ✅ Selesai ubah di sini

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-cyan-600 animate-pulse">
        Memuat produk...
      </div>
    );

  return (
    <Layout>
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Semua Produk</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default ProductPage;
