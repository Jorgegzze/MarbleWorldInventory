import React, { useEffect, useState } from 'react';
import './InventoryPage.css';
import axios from 'axios';

const API_BASE_URL = 'https://your-backend-url.onrender.com/inventory';

const InventoryPage = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    image: '',
    material_id: '',
    name: '',
    category: '',
    finish: '',
    presentation: '',
    dimensions: '',
    price: '',
    quantity: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(API_BASE_URL)
      .then(res => {
        const sorted = [...res.data].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setMaterials(sorted);
      })
      .catch(err => console.error(err));
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(materials.map(m => m.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectItem = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    axios.delete(API_BASE_URL, { data: { ids: selectedIds } })
      .then(() => {
        setMaterials(prev => prev.filter(m => !selectedIds.includes(m.id)));
        setSelectedIds([]);
        setSelectAll(false);
      })
      .catch(err => console.error(err));
  };

  const handleDownloadTemplate = () => {
    window.open('https://marbleworldinventory.replit.app/materials_template.xlsx', '_blank');
  };

  const handleUploadTemplate = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    axios.post(`${API_BASE_URL}/upload`, formData)
      .then(() => fetchData())
      .catch(err => console.error(err));
  };

  const handleAddNewItem = () => {
    // Simulate adding via backend
    const item = { ...newItem, status: newItem.quantity === '0' ? 'Out of Stock' : 'Available' };
    axios.post(API_BASE_URL, item)
      .then(() => {
        fetchData();
        setShowAddModal(false);
        setNewItem({ image: '', material_id: '', name: '', category: '', finish: '', presentation: '', dimensions: '', price: '', quantity: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <h2>Materials Management</h2>
        <div className="button-group">
          <button onClick={handleDownloadTemplate}>⬇️ Download Template</button>
          <label className="upload-label">
            ⬆️ Upload Materials
            <input type="file" onChange={handleUploadTemplate} hidden />
          </label>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>+ Add New Material</button>
          <button onClick={handleDeleteSelected}>🗑 Delete Selected</button>
        </div>
      </div>

      <table className="materials-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </th>
            <th>Image</th>
            <th>Material ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Finish</th>
            <th>Presentation</th>
            <th>Dimensions</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((mat) => (
            <tr key={mat.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(mat.id)}
                  onChange={() => toggleSelectItem(mat.id)}
                />
              </td>
              <td><img src={mat.image} alt={mat.name} width="50" /></td>
              <td>{mat.material_id}</td>
              <td>{mat.name}</td>
              <td>{mat.category}</td>
              <td>{mat.finish}</td>
              <td>{mat.presentation}</td>
              <td>{mat.dimensions}</td>
              <td>{mat.price}</td>
              <td>{mat.quantity}</td>
              <td>
                <span className={mat.status === 'Available' ? 'badge-available' : 'badge-out'}>
                  {mat.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Material</h3>
            {Object.keys(newItem).map((field, index) => (
              <input
                key={index}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newItem[field]}
                onChange={e => setNewItem({ ...newItem, [field]: e.target.value })}
              />
            ))}
            <button onClick={handleAddNewItem}>Add</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
