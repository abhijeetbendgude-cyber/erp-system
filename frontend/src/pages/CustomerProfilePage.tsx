import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { Pencil, Trash2, Check, X } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  gstin: string;
  phone: string;
  email: string;
  mobaile: string;
  website: string;
  craeted_at: string;
  payment_terms: string;
  credit_limit: string;
  credit_days: number;
}

const CustomerProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Customer>>({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/customers/customers/${id}/`)
      .then((res) => {
        setCustomer(res.data);
        setFormData(res.data);
      })
      .catch((err) => console.error('Error fetching customer:', err));
  }, [id]);

  const handleInputChange = (field: keyof Customer, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    axios
      .put(`http://127.0.0.1:8000/customers/customers/${id}/`, formData)
      .then(() => {
        setEditing(false);
        setCustomer({ ...customer!, ...formData } as Customer);
      })
      .catch((err) => console.error('Error updating customer:', err));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      axios
        .delete(`http://127.0.0.1:8000/customers/customers/${id}/`)
        .then(() => navigate('/customers'))
        .catch((err) => console.error('Error deleting customer:', err));
    }
  };

  if (!customer) return <div className="text-white p-6">Loading...</div>;

  const Field = (label: string, field: keyof Customer) => (
    <div className="mb-4">
      <label className="text-sm text-gray-400">{label}</label>
      {editing ? (
        <input
          className="w-full px-3 py-2 mt-1 rounded bg-gray-800 text-white border border-gray-700 text-base"
          value={formData[field]?.toString() || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
      ) : (
        <p className="mt-1 text-base text-white">{customer[field]}</p>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="bg-gray-900 text-white min-h-screen p-6 flex justify-center">
        <div className="w-full max-w-5xl bg-gray-800 p-6 rounded-xl shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Customer Profile</h1>
            <div className="flex gap-2">
              {editing ? (
                <>
                  <button onClick={handleSave} className="text-green-400 hover:text-green-600">
                    <Check size={20} />
                  </button>
                  <button onClick={() => setEditing(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditing(true)} className="text-blue-400 hover:text-blue-600">
                    <Pencil size={20} />
                  </button>
                  <button onClick={handleDelete} className="text-red-400 hover:text-red-600">
                    <Trash2 size={20} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Contact Info Section */}
          <h2 className="text-lg font-semibold text-blue-400 mb-3">📞 Contact Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {Field('Name', 'name')}
            {Field('Email', 'email')}
            {Field('Phone', 'phone')}
            {Field('Mobile', 'mobaile')}
            {Field('Website', 'website')}
          </div>

          {/* Address Info Section */}
          <h2 className="text-lg font-semibold text-blue-400 mt-6 mb-3">🏠 Address Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {Field('Description', 'description')}
            {Field('Address', 'address')}
            {Field('City', 'city')}
            {Field('State', 'state')}
            {Field('Zip Code', 'zip')}
            {Field('Country', 'country')}
            {Field('GSTIN', 'gstin')}
          </div>

          {/* Financial Info Section */}
          <h2 className="text-lg font-semibold text-blue-400 mt-6 mb-3">💰 Financial Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {Field('Payment Terms', 'payment_terms')}
            {Field('Credit Limit (₹)', 'credit_limit')}
            {Field('Credit Days', 'credit_days')}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerProfilePage;
