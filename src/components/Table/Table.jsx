import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UilEdit, UilTimes } from "@iconscout/react-unicons";
import './Table.css';

const API_URL = "http://localhost:5000/api/orders";

const makeStyles = (status) => {
  switch(status.toLowerCase()){
    case 'pending':
      return { background: '#ffadad8f', color: 'red' };
    case 'approved':
      return { background: 'rgba(168, 230, 207, 0.5)', color: '#3E8E41' };
    case 'completed':
    case 'delivered':
      return { background: '#59bfff', color: 'white' };
    default:
      return { background: 'gray', color: 'white' };
  }
};

const OrderListTable = () => {
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
      alert(" Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="Table">
      <h3>Recent Orders</h3>
      <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {order.user?.username}<br/>
                  <small>{order.user?.email}</small>
                </TableCell>
                <TableCell>
                  {order.products.map(p => (
                    <div key={p.product._id}>{p.product.name} x {p.quantity}</div>
                  ))}
                </TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString("id-ID")}</TableCell>
                <TableCell>
                  <span className='status' style={makeStyles(order.status)}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <button className="status-btn" onClick={() => openStatusModal(order)}>
                   Detail
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL DETAIL & EDIT STATUS */}
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
              <p><strong>Total Amount:</strong> Rp{Number(selectedOrder.totalAmount || selectedOrder.totalPrice).toLocaleString("id-ID")}</p>

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
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="save-btn" onClick={handleStatusChange}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderListTable;
