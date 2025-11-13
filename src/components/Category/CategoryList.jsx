import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {UilEdit, UilTrashAlt, UilPlus, UilTimes, UilSearch,} from '@iconscout/react-unicons';
import './CategoryList.css';

const API_URL = "http://localhost:5000/api/categories";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch data
  const fetchCategories = async () => {
    try {
      setLoading(true)
      const res = await axios.get(API_URL);
      setCategories(res.data);
      setFiltered(res.data);
    } catch(err) {
      console.error("Error fetching categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //Search fillter
  useEffect(() => {
    const result = categories.filter((cat) => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFiltered(result);
  }, [searchTerm, categories]);

  //Add category
  const handleAdd = async () => {
    if (!newCategory.trim()) return alert("Category name cannot be empty");
    try {
      await axios.post(
        API_URL, 
        { name: newCategory },
        {headers: {Authorization: `Bearer ${token}`}}
      );
      setNewCategory("");
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Failed to add category")
    }
  };

  // Update category
  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `${API_URL}/${id}`,
        { name: editCategory.name },
        {headers: {Authorization:`Bearer ${token}` } }
      );
      setEditCategory(null);
      fetchCategories();
    } catch (err){
      console.error(err);
      alert("Failed to update category");
    }
  };

  // Delete
  const handleDelete= async (id) => {
    if(!window.confirm("Are you sure you want to delete this category?")) return;
    try{
      await axios.delete(`${API_URL}/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      fetchCategories();
    } catch(err){
      console.error(err);
      alert("Failed to delete category");
    }
  };

  return (
    <div className="CategoryList">
      <h1>Category Management</h1>

      {/* SEARCH + ADD */}
      <div className="category-toolbar">
        <div className="search-box">
          <UilSearch className="search-icon" /> 
          <input 
          type='text'
          placeholder='Search category..'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={() => setShowModal(true)}
          > <UilPlus/> Add</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : ( 
        <table className="category-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { filtered.length > 0 ? (
              filtered.map((cat,index) => (
              <tr key={cat._id || index}>
                <td>{index +1}</td>
                <td>
                  {editCategory?.id === cat._id  ? ( 
                    <input type="text"
                    value={editCategory.name}
                    onChange={ (e) => 
                      setEditCategory ({
                        ...editCategory, 
                        name: e.target.value,
                      })
                    } />
                  ) : (
                    cat.name
                  )}
                </td>
                <td className='action-buttons'>
                  {editCategory?.id === cat._id ? (
                    <button className="save-btn"
                    onClick={() => handleUpdate(cat._id)}>Save
                    </button>
                  ): (
                    <button className="edit-btn"
                    onClick={() => 
                      setEditCategory({id: cat._id, name: cat.name})
                    }> 
                    < UilEdit/> 
                    </button>
                  )}
                  <button className="delete-btn" 
                  onClick={() => handleDelete(cat._id)}>
                    <UilTrashAlt/>
                    </button> 
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan="3">No categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* MODAL ADD */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add Category</h2>
                <UilTimes className="close-icon" onClick={() => setShowModal(false)} />
            </div>

            <div className="modal-body">
              <input type="text"
              placeholder='Category name...'
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)} />
            </div>

            <div className="modal-actions">
            <button className="cancel-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          <button className="save-btn" onClick={handleAdd}>
              Save
            </button> 
          </div>  
          </div>    
        </div>
      )}
    </div>
  )
}

export default CategoryList;
