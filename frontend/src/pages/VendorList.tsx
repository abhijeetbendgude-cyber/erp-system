import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import CreateVendorForm from '../components/VendorForm';

interface Vendor {
  id: number;
  name: string;
  city: string;
  state: string;
  email: string;
  mobaile: string;
  website: string;
}

const VendorList: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filtered, setFiltered] = useState<Vendor[]>([]);
  const [search, setSearch] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/vendors/vendors/')
      .then((res) => {
        setVendors(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error('Error fetching vendors:', err));
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
    const filteredList = vendors.filter((v) =>
      v.name.toLowerCase().includes(value.toLowerCase()) ||
      v.city.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredList);
  };

  return (
    <Layout>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🏢 Vendors</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            <Plus size={18} /> Add Vendor
          </button>
        </div>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or city..."
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Vendor Table */}
        <table className="min-w-full table-auto bg-gray-800 rounded-xl">
          <thead className="bg-gray-700 text-gray-300 text-sm uppercase">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">State</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Website</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((vendor) => (
              <tr
                key={vendor.id}
                className="border-t border-gray-700 hover:bg-gray-700/40 cursor-pointer"
                onClick={() => navigate(`/vendors/${vendor.id}`)}
              >
                <td className="px-4 py-3 text-blue-400 hover:underline">{vendor.name}</td>
                <td className="px-4 py-3">{vendor.city}</td>
                <td className="px-4 py-3">{vendor.state}</td>
                <td className="px-4 py-3">{vendor.email}</td>
                <td className="px-4 py-3">{vendor.mobaile}</td>
                <td className="px-4 py-3">
                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:underline"
                  >
                    {vendor.website}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Create Vendor Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-lg w-full max-w-2xl relative">
              <button
                onClick={() => setShowCreateForm(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
              <CreateVendorForm
                onClose={() => setShowCreateForm(false)}
                onVendorCreated={() => {
                  axios.get('http://127.0.0.1:8000/vendors/vendors/').then((res) => {
                    setVendors(res.data);
                    setFiltered(res.data);
                    setShowCreateForm(false);
                  });
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VendorList;
