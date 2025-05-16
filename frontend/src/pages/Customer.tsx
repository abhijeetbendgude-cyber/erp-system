// pages/Customer.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';

interface Customer {
  id: number;
  name: string;
  city: string;
}

const CustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/customers/customers/')
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error('Error fetching customers:', err));
  }, []);

  return (
    <Layout>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">👥 Customers</h1>
        <table className="min-w-full table-auto bg-gray-800 rounded-xl">
          <thead className="bg-gray-700 text-gray-300 text-sm uppercase">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">City</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t border-gray-700 hover:bg-gray-700/40 cursor-pointer"
                onClick={() => navigate(`/customers/${customer.id}`)}
              >
                <td className="px-4 py-3 text-blue-400 hover:underline">{customer.name}</td>
                <td className="px-4 py-3">{customer.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default CustomerPage;
