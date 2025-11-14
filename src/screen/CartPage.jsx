import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API_URL = "http://localhost:5000/api/cart";

  // Ambil data cart user
  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchCart = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data?.products || []);
      } catch (err) {
        console.error("Gagal mengambil data keranjang:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token, navigate]);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${API_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error("Gagal menghapus produk:", err);
    }
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map((item) =>
      item.product._id === productId ? { ...item, quantity: newQty } : item
    );
    setCartItems(updated);
  };

  // Total harga
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen text-cyan-600 animate-pulse">
          Memuat keranjang...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-cyan-600 mb-8 text-center">
          Keranjang Belanja
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-700 text-lg text-center mt-10">
            Keranjang kosong.{" "}
            <button
              className="text-cyan-600 underline"
              onClick={() => navigate("/")}
            >
              Belanja sekarang
            </button>
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <CartItem
                  key={item.product._id}
                  item={item}
                  onRemove={handleRemove}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>

            <div className="flex justify-end mt-10">
              <div className="bg-white shadow-lg rounded-2xl p-6 w-full sm:w-1/3">
                <p className="text-gray-700 font-semibold mb-3">Total Harga:</p>
                <p className="text-3xl font-bold text-cyan-600 mb-4">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-cyan-600 text-white py-3 rounded-xl hover:bg-cyan-700 transition-all"
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? "Memuat..." : "Checkout"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
