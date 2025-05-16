import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import CreateProductForm from '../components/CreateProductForm';
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react';

interface Material {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: string;
  vendor: string;
}

const PAGE_SIZE = 10;

const ProductPage: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedMaterial, setEditedMaterial] = useState<Partial<Material>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMaterials = () => {
    axios
      .get('http://127.0.0.1:8000/products/products/')
      .then((res) => setMaterials(res.data))
      .catch((err) => console.error('Error fetching materials:', err));
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const startEdit = (material: Material) => {
    setEditingId(material.id);
    setEditedMaterial({ ...material });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedMaterial({});
  };

  const saveEdit = (id: number) => {
    axios
      .put(`http://127.0.0.1:8000/products/products/${id}/`, editedMaterial)
      .then(() => {
        fetchMaterials();
        cancelEdit();
      })
      .catch((err) => console.error('Error updating product:', err));
  };

  const deleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      axios
        .delete(`http://127.0.0.1:8000/products/products/${id}/`)
        .then(() => fetchMaterials())
        .catch((err) => console.error('Error deleting product:', err));
    }
  };

  const paginatedMaterials = materials.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const totalPages = Math.ceil(materials.length / PAGE_SIZE);

  return (
    <Layout>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-1">📦 Materials Inventory</h1>
            <p className="text-gray-400 text-sm">Overview of all available products and raw materials.</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            <Plus size={18} />
            Add New
          </button>
        </div>

        {showCreateForm && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-lg w-full max-w-2xl relative">
              <button
                onClick={() => setShowCreateForm(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
              <CreateProductForm
                onClose={() => setShowCreateForm(false)}
                onProductCreated={() => {
                  fetchMaterials();
                  setShowCreateForm(false);
                }}
              />
            </div>
          </div>
        )}

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full table-auto bg-gray-800 rounded-xl">
            <thead className="bg-gray-700 text-gray-300 text-sm uppercase">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Price (₹)</th>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMaterials.map((mat) => (
                <tr key={mat.id} className="border-t border-gray-700 hover:bg-gray-700/40">
                  <td className="px-4 py-3">{mat.id}</td>
                  <td className="px-4 py-3">
                    {editingId === mat.id ? (
                      <input
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                        value={editedMaterial.name || ''}
                        onChange={(e) => setEditedMaterial({ ...editedMaterial, name: e.target.value })}
                      />
                    ) : (
                      mat.name
                    )}
                  </td>
                  <td className="px-4 py-3">{mat.sku}</td>
                  <td className="px-4 py-3 text-sm">
                    {editingId === mat.id ? (
                      <input
                        className="bg-gray-700 text-white px-2 py-1 rounded w-full"
                        value={editedMaterial.description || ''}
                        onChange={(e) => setEditedMaterial({ ...editedMaterial, description: e.target.value })}
                      />
                    ) : (
                      mat.description
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === mat.id ? (
                      <input
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                        value={editedMaterial.price || ''}
                        onChange={(e) => setEditedMaterial({ ...editedMaterial, price: e.target.value })}
                      />
                    ) : (
                      mat.price
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === mat.id ? (
                      <input
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                        value={editedMaterial.vendor || ''}
                        onChange={(e) => setEditedMaterial({ ...editedMaterial, vendor: e.target.value })}
                      />
                    ) : (
                      mat.vendor
                    )}
                  </td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    {editingId === mat.id ? (
                      <>
                        <button onClick={() => saveEdit(mat.id)} className="text-green-400 hover:text-green-600">
                          <Check size={16} />
                        </button>
                        <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600">
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(mat)} className="text-blue-400 hover:text-blue-600">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => deleteProduct(mat.id)} className="text-red-400 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
