import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token, navigate]);

  if (!token) {
    return null; // token tidak ada, jangan render apa-apa
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-cyan-600 animate-pulse">
        Memuat keranjang...
      </div>
    );
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-cyan-600 mb-6">Keranjang Belanja</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-700 text-lg text-center mt-10">
            Keranjang kosong.{" "}
            <button
              className="text-cyan-600 underline"
              onClick={() => navigate("/product")}
            >
              Belanja sekarang
            </button>
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {cartItems.map((item) => (
              <CartItem
                key={item._id || item.productId}
                item={item}
                onRemove={(id) => console.log("hapus", id)}
                onUpdateQuantity={(id, qty) => console.log("update", id, qty)}
              />
            ))}

            <div className="flex justify-end mt-6">
              <div className="bg-white p-6 rounded-xl shadow w-full md:w-1/3">
                <p className="text-gray-700 font-semibold mb-4">Total Harga:</p>
                <p className="text-2xl font-bold text-cyan-600 mb-4">
                  Rp{totalPrice.toLocaleString("id-ID")}
                </p>
                <button className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
