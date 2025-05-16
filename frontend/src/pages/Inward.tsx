import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';

interface Inward {
  id: number;
  received_date: string;
  received_by: string;
  remarks: string;
  status: string;
  purchase_order: number;
}

const InwardPage: React.FC = () => {
  const [inwards, setInwards] = useState<Inward[]>([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/inventory/inward/')
      .then((res) => setInwards(res.data))
      .catch((err) => console.error('Error fetching inwards:', err));
  }, []);

  return (
    <Layout>
      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-6">📥 Inward Material Receipts</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-left text-sm uppercase text-gray-300">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Received Date</th>
                <th className="px-6 py-3">Received By</th>
                <th className="px-6 py-3">Remarks</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">PO Number</th>
              </tr>
            </thead>
            <tbody>
              {inwards.map((item) => (
                <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-700 transition">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{new Date(item.received_date).toLocaleString()}</td>
                  <td className="px-6 py-4">{item.received_by}</td>
                  <td className="px-6 py-4">{item.remarks}</td>
                  <td className="px-6 py-4 capitalize">{item.status}</td>
                  <td className="px-6 py-4">{item.purchase_order}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default InwardPage;
