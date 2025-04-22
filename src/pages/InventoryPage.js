import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './InventoryPage.css';
import { FaDownload, FaUpload, FaTrash } from 'react-icons/fa';
import axios from 'axios';

function InventoryPage() {
  const [materials, setMaterials] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/inventory');
      setMaterials(response.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const handleDownloadTemplate = () => {
    window.location.href = '/materials_template.xlsx'; // Will download from public folder
  };

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/inventory/upload', formData);
      alert('Inventory uploaded successfully!');
      fetchMaterials();
    } catch (error) {
      console.error('Error uploading inventory:', error);
      alert('Upload failed.');
    }
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === materials.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(materials.map(item => item.id));
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) {
      alert('No materials selected.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/inventory/delete', { ids: selectedItems });
      alert('Selected materials deleted successfully!');
      fetchMaterials();
      setSelectedItems([]);
    } catch (error) {
      console.error('Error deleting materials:', error);
      alert('Failed to delete.');
    }
  };

  return (
    <div className="inventory-page">
      <aside className="sidebar">
        <h2>Inventory System</h2>
        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/reserved">Reserved Items</Link>
          <Link to="/users">Users Management</Link>
          <Link to="/">Sign Out</Link>
        </nav>
      </aside>

      <main className="inventory-main">
        <header className="inventory-header">
          <h1>Inventory</h1>
          <div className="inventory-buttons">
            <button className="download-btn" onClick={handleDownloadTemplate}>
              <FaDownload /> Download Template
            </button>

            <label htmlFor="file-upload" className="upload-btn">
              <FaUpload /> Upload
              <input id="file-upload" type="file" style={{ display: 'none' }} onChange={handleUploadFile} />
            </label>

            <button className="delete-btn" onClick={handleDeleteSelected}>
              <FaTrash /> Delete Selected
            </button>
          </div>
        </header>

        <table className="inventory-table">
          <thead>
            <tr>
              <th><input type="checkbox" onChange={handleSelectAll} checked={selectedItems.length === materials.length && materials.length !== 0} /></th>
              <th>Material</th>
              <th>Category</th>
              <th>Thickness</th>
              <th>Length</th>
              <th>Width</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Location</th>
              <th>Comments</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {materials.map(material => (
              <tr key={material.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(material.id)}
                    onChange={() => handleSelectItem(material.id)}
                  />
                </td>
                <td>{material.material_name}</td>
                <td>{material.category}</td>
                <td>{material.thickness}</td>
                <td>{material.length}</td>
                <td>{material.width}</td>
                <td>{material.quantity}</td>
                <td>${material.price}</td>
                <td>{material.location}</td>
                <td>{material.comments}</td>
                <td>{material.quantity > 0 ? 'In Stock' : 'Out of Stock'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default InventoryPage;
