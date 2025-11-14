import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data?.products || []);
      } catch (err) {
        console.error(err);
        alert("Gagal mengambil data keranjang.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token, navigate]);

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Keranjang masih kosong!");
    setCheckoutLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/checkout",
        { address, paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message || "Checkout berhasil!");
      setCart([]); // Kosongkan cart di frontend
      navigate("/my-orders");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Checkout gagal, coba lagi nanti.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-cyan-600 animate-pulse">
        Memuat checkout...
      </div>
    );
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Layout>
      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Checkout</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Keranjang Anda kosong.</p>
        ) : (
          <>
            <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Produk di Keranjang</h2>
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between border-b border-gray-200 py-2"
                >
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x Rp {item.product.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="font-semibold">
                    Rp {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-4">
                <p>Total</p>
                <p>Rp {totalPrice.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Detail Pengiriman</h2>
              <textarea
                className="w-full border rounded-lg p-3 mb-4"
                placeholder="Masukkan alamat pengiriman..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <select
                className="w-full border rounded-lg p-3 mb-4"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="COD">Bayar di Tempat (COD)</option>
                <option value="Transfer">Transfer Bank</option>
                <option value="QRIS">QRIS</option>
              </select>

              <button
                onClick={handleCheckout}
                className="bg-cyan-600 text-white px-5 py-3 rounded-xl hover:bg-cyan-700 transition"
                disabled={checkoutLoading}
              >
                {checkoutLoading ? "Memproses..." : "Selesaikan Checkout"}
              </button>
            </div>
          </>
        )}
      </main>
    </Layout>
  );
};

export default CheckoutPage;
