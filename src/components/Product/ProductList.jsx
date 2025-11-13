import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  UilEdit,
  UilTrashAlt,
  UilPlus,
  UilTimes,
  UilSearch,
  UilBox,
  UilCheckCircle,
  UilExclamationTriangle,
  UilTimesCircle,
} from "@iconscout/react-unicons";
import "./ProductList.css";

const API_URL = "http://localhost:5000/api/products";
const CATEGORY_URL = "http://localhost:5000/api/categories";
const SUMMARY_URL = "http://localhost:5000/api/products/summary/data";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState({});
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    size: "",
    category: "",
    image: null,
    active: true,
  });

  const token = localStorage.getItem("token");

  // ==================== FETCH DATA ====================
  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_URL);
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await axios.get(SUMMARY_URL);
      setSummary(res.data);
    } catch (err) {
      console.error("Summary error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSummary();

    const interval = setInterval(() => {
    fetchProducts();
    fetchSummary();
  }, 10000);

  return () => clearInterval(interval);
  }, []);

  // ==================== SEARCH FILTER ====================
  useEffect(() => {
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(result);
  }, [searchTerm, products]);

  // ==================== FORMAT PRICE ====================
  const formatPrice = (num) =>
    `Rp${Number(num).toLocaleString("id-ID", { minimumFractionDigits: 0 })}`;

  // ==================== ADD PRODUCT ====================
  const handleAdd = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      return alert("Please fill required fields!");
    }

    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, val]) => {
      formData.append(key, val);
    });

    try {
      await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setShowAddModal(false);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        size: "",
        category: "",
        image: null,
        active: true,
      });
      fetchProducts();
      fetchSummary();
      alert("✅ Product added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add product!");
    }
  };

  // ==================== OPEN EDIT MODAL ====================
  const openEditModal = (product) => {
    setSelectedProduct({
      ...product,
      category:
        typeof product.category === "object"
          ? product.category._id
          : product.category,
      image: product.image || null,
      active: product.active,
    });
    setShowEditModal(true);
  };

  // ==================== UPDATE PRODUCT ====================
  const handleUpdate = async () => {
    if (!selectedProduct) return;

    const formData = new FormData();
    formData.append("name", selectedProduct.name);
    formData.append("description", selectedProduct.description || "");
    formData.append("price", selectedProduct.price);
    formData.append("stock", selectedProduct.stock);
    formData.append("size", selectedProduct.size);
    formData.append("category", selectedProduct.category);
    formData.append("active", selectedProduct.active);

    if (selectedProduct.image instanceof File) {
      formData.append("image", selectedProduct.image);
    }

    try {
      await axios.put(`${API_URL}/${selectedProduct._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setShowEditModal(false);
      setSelectedProduct(null);
      fetchProducts();
      fetchSummary();
      alert("✅ Product updated successfully!");
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("❌ Failed to update product!");
    }
  };

  // ==================== DELETE PRODUCT ====================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      fetchSummary();
      alert("🗑️ Product deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete product!");
    }
  };

  return (
    <div className="ProductList">
      <h1>Product Management</h1>

      {/* ==================== SUMMARY CARDS ==================== */}
      <div className="product-summary">
        <div className="summary-card total">
          <UilBox size="32" />
          <div>
            <h3>{summary.totalProducts || 0}</h3>
            <p>Total Products</p>
          </div>
        </div>

        <div className="summary-card active">
          <UilCheckCircle size="32" />
          <div>
            <h3>{summary.activeProducts || 0}</h3>
            <p>Active Products</p>
          </div>
        </div>

        <div className="summary-card low">
          <UilExclamationTriangle size="32" />
          <div>
            <h3>{summary.lowStock || 0}</h3>
            <p>Low Stock</p>
          </div>
        </div>

        <div className="summary-card out">
          <UilTimesCircle size="32" />
          <div>
            <h3>{summary.outOfStock || 0}</h3>
            <p>Out of Stock</p>
          </div>
        </div>
      </div>

      {/* SEARCH + ADD */}
      <div className="product-toolbar">
        <div className="search-box">
          <UilSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          <UilPlus /> Add
        </button>
      </div>

      {/* ==================== TABLE ==================== */}
      <table className="product-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Active</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>
                  {p.image ? (
                    <img
                      src={`http://localhost:5000/${p.image}`}
                      alt={p.name}
                      className="product-img"
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>{p.name}</td>
                <td>{formatPrice(p.price)}</td>
                <td>{p.stock}</td>
                <td>
                  {p.active ? (
                    <span className="status-active">Active</span>
                  ) : (
                    <span className="status-inactive">Inactive</span>
                  )}
                </td>
                <td>{p.category?.name}</td>
                <td className="action-buttons">
                  <button className="edit-btn" onClick={() => openEditModal(p)}>
                    <UilEdit />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(p._id)}
                  >
                    <UilTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No products found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ==================== MODAL ADD ==================== */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Product</h2>
              <UilTimes
                className="close-icon"
                onClick={() => setShowAddModal(false)}
              />
            </div>

            <div className="modal-body">
              <input
                type="text"
                placeholder="Product name..."
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <textarea
                placeholder="Description..."
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Price..."
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Stock..."
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Size..."
                value={newProduct.size}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, size: e.target.value })
                }
              />
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <label>
                Active:
                <select
                  value={newProduct.active}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      active: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.files[0] })
                }
              />
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button className="save-btn" onClick={handleAdd}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL EDIT ==================== */}
      {showEditModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Edit Product</h2>
              <UilTimes
                className="close-icon"
                onClick={() => setShowEditModal(false)}
              />
            </div>

            <div className="modal-body">
              <input
                type="text"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
              />
              <textarea
                value={selectedProduct.description || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                }
              />
              <input
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
              />
              <input
                type="number"
                value={selectedProduct.stock}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    stock: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={selectedProduct.size || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    size: e.target.value,
                  })
                }
              />
              <select
                value={selectedProduct.category || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    category: e.target.value,
                  })
                }
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <label>
                Active:
                <select
                  value={selectedProduct.active}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      active: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </label>

              {selectedProduct.image &&
                !(selectedProduct.image instanceof File) && (
                  <img
                    src={`http://localhost:5000/${selectedProduct.image}`}
                    alt="preview"
                    className="product-img"
                  />
                )}

              <input
                type="file"
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    image: e.target.files[0],
                  })
                }
              />
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button className="save-btn" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
