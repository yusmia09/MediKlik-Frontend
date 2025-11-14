import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const statusColors = {
  Pending: "bg-yellow-400",
  Diproses: "bg-blue-400",
  Dikirim: "bg-purple-500",
  Selesai: "bg-green-500",
  Dibatalkan: "bg-red-500",
};

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5000/api/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading)
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen text-cyan-600 animate-pulse">
          Memuat pesanan...
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-10 relative">
        {/* Tombol silang / back ke Cart */}
        <button
          onClick={() => navigate("/cart")}
          className="absolute top-0 right-0 mt-6 mr-6 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Pesanan Saya</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">Belum ada pesanan.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white shadow-lg rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Order ID: {order._id}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      statusColors[order.status] || "bg-gray-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  {order.products.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex justify-between py-2 border-b last:border-b-0"
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
                    <p>Rp {order.totalPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyOrdersPage;
