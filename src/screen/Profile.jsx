import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { FiUser, FiMail, FiMapPin, FiCalendar, FiLogOut } from "react-icons/fi";
import { MdWc } from "react-icons/md";
import { AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineCloseCircle } from "react-icons/ai";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    // Ambil user
    axios
      .get("http://localhost:5000/api/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUser(res.data))
      .finally(() => setLoadingUser(false));

    // Ambil orders
    axios
      .get("http://localhost:5000/api/orders/my", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data))
      .finally(() => setLoadingOrders(false));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const renderStatusIcon = (status) => {
    if (status === "pending") return <AiOutlineClockCircle className="text-yellow-500 w-6 h-6" />;
    if (status === "completed") return <AiOutlineCheckCircle className="text-green-500 w-6 h-6" />;
    return <AiOutlineCloseCircle className="text-red-500 w-6 h-6" />;
  };

  if (!token) return <Layout><p>Silakan login terlebih dahulu...</p></Layout>;
  if (loadingUser) return <Layout><p>Memuat data profile...</p></Layout>;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-cyan-600 mb-8 text-center">Profile Saya</h1>

        {/* Tab Menu */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-semibold ${activeTab === "profile" ? "border-b-2 border-cyan-600 text-cyan-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("profile")}
          >
            Info Profile
          </button>
          <button
            className={`ml-4 px-4 py-2 font-semibold ${activeTab === "orders" ? "border-b-2 border-cyan-600 text-cyan-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("orders")}
          >
            My Orders
          </button>
        </div>

        {/* Profile Info */}
        {activeTab === "profile" && (
          <div className="bg-white shadow rounded-xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3"><FiUser className="text-cyan-600 w-6 h-6" /> <span className="font-semibold">Username:</span> {user.username}</div>
            <div className="flex items-center gap-3"><FiMail className="text-cyan-600 w-6 h-6" /> <span className="font-semibold">Email:</span> {user.email}</div>
            <div className="flex items-center gap-3"><FiCalendar className="text-cyan-600 w-6 h-6" /> <span className="font-semibold">Tanggal Lahir:</span> {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "-"}</div>
            <div className="flex items-center gap-3"><MdWc className="text-cyan-600 w-6 h-6" /> <span className="font-semibold">Jenis Kelamin:</span> {user.gender || "-"}</div>
            <div className="flex items-center gap-3"><FiMapPin className="text-cyan-600 w-6 h-6" /> <span className="font-semibold">Alamat:</span> {user.address || "-"}</div>
            <button onClick={handleLogout} className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-cyan-700 text-white py-3 rounded-lg flex items-center justify-center gap-2">
              <FiLogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        )}

        {/* My Orders */}
        {activeTab === "orders" && (
          <div>
            {loadingOrders ? <p className="text-center text-cyan-600 animate-pulse">Memuat pesanan...</p>
            : orders.length === 0 ? <p className="text-center text-gray-500 mt-10">Belum ada pesanan.</p>
            : orders.map(order => (
              <div key={order._id} className="bg-white shadow rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div>
                  <p><span className="font-semibold">Order ID:</span> {order._id}</p>
                  <p className="flex items-center gap-1">
                    {renderStatusIcon(order.status)}
                    <span className="font-semibold capitalize">{order.status}</span>
                  </p>
                  <p><span className="font-semibold">Total:</span> Rp {order.totalPrice.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
