import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderList.css";
import { UilEdit, UilTimes } from "@iconscout/react-unicons";

const API_URL = "http://localhost:5000/api/orders";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setShowModal(true);
  };

  const handleStatusChange = async () => {
    try {
      await axios.put(
        `${API_URL}/${selectedOrder._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Status updated!");
      setShowModal(false);
      setSelectedOrder(null);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="OrderList">
      <h1>Order Management</h1>

      <table className="order-table">
        <thead>
          <tr>
            <th>No</th>
            <th>User</th>
            <th>Products</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Address</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((o, index) => (
              <tr key={o._id}>
                <td>{index + 1}</td>
                <td>
                  {o.user?.username}
                  <br />
                  <small>{o.user?.email}</small>
                </td>
                <td>
                  {o.products.map((p) => (
                    <div key={p.product._id}>
                      {p.product?.name} x {p.quantity}
                    </div>
                  ))}
                </td>
                <td>Rp{Number(o.totalAmount).toLocaleString("id-ID")}</td>
                <td>{o.paymentMethod}</td>
                <td>{o.address}</td>
                <td>{new Date(o.createdAt).toLocaleDateString("id-ID")}</td>
                <td>
                  <span className={`status ${o.status.toLowerCase()}`}>
                    {o.status}
                  </span>
                </td>
                <td>
                  <button className="status-btn" onClick={() => openStatusModal(o)}>
                    <UilEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ==================== MODAL DETAIL & EDIT STATUS ==================== */}
      {showModal && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Order Details</h2>
              <UilTimes className="close-icon" onClick={() => setShowModal(false)} />
            </div>

            <div className="modal-body">
              <p><strong>Order ID:</strong> {selectedOrder._id}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString("id-ID")}</p>

              <hr />

              <p><strong>User:</strong> {selectedOrder.user?.username}</p>
              <p><strong>Email:</strong> {selectedOrder.user?.email}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>

              <hr />

              <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
              <p><strong>Total Amount:</strong> Rp{Number(selectedOrder.totalAmount).toLocaleString("id-ID")}</p>

              <hr />

              <p><strong>Products:</strong></p>
              <ul>
                {selectedOrder.products.map((p) => (
                  <li key={p.product._id}>
                    {p.product?.name} — {p.quantity} pcs
                  </li>
                ))}
              </ul>

              <hr />

              <label><strong>Status:</strong></label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleStatusChange}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
