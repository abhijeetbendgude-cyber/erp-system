import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { Package, X } from 'lucide-react';

interface StockItem {
  id: number;
  product_name: string;
  quantity_on_hand: number;
  last_updated: string;
}

const StockCount: React.FC = () => {
  const [stock, setStock] = useState<StockItem[]>([]);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/stock/stock/');
      setStock(res.data);
    } catch (err) {
      console.error('Error fetching stock data:', err);
    }
  };

  return (
    <Layout>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Package size={28} /> Stock Count
          </h1>
        </div>

        {stock.length === 0 ? (
          <p className="text-gray-400">No stock items available.</p>
        ) : (
          <table className="min-w-full table-auto bg-gray-800 rounded-xl overflow-hidden">
            <thead className="bg-gray-700 text-gray-300 text-sm uppercase">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Product Name</th>
                <th className="px-4 py-3 text-left">Quantity On Hand</th>
                <th className="px-4 py-3 text-left">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => (
                <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-700/40 transition">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{item.product_name}</td>
                  <td className="px-4 py-3 font-semibold">{item.quantity_on_hand}</td>
                  <td className="px-4 py-3">{new Date(item.last_updated).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default StockCount;
