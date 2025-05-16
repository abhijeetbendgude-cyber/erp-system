import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';

interface StockItem {
  id: number;
  product: string;
  quantity_on_hand: number;
  last_updated: string;
}

const StockPage: React.FC = () => {
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStock = () => {
    axios
      .get('http://127.0.0.1:8000/stock/stock/')
      .then((res) => setStocks(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch stock data');
      });
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const updateStock = (id: number, amount: number, type: 'add' | 'reduce') => {
    setLoading(true);
    axios
      .patch(`http://127.0.0.1:8000/inventory/stock/${id}/${type}/`, { amount })
      .then(() => fetchStock())
      .catch((err) => {
        console.error(err);
        setError(`Failed to ${type} stock`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">📦 Stock Management</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {stocks.length === 0 ? (
          <p className="text-gray-400">No stock data available.</p>
        ) : (
          <table className="min-w-full table-auto bg-gray-800 rounded-xl overflow-hidden">
            <thead className="bg-gray-700 text-gray-300 text-sm uppercase">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Last Updated</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id} className="border-t border-gray-700 hover:bg-gray-700/40 transition">
                  <td className="px-4 py-3">{stock.id}</td>
                  <td className="px-4 py-3">{stock.product}</td>
                  <td className="px-4 py-3">{stock.quantity_on_hand}</td>
                  <td className="px-4 py-3">{new Date(stock.last_updated).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-center flex gap-2 justify-center">
                    <button
                      disabled={loading}
                      onClick={() => updateStock(stock.id, 1, 'add')}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      + Add
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => updateStock(stock.id, 1, 'reduce')}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                    >
                      - Reduce
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default StockPage;
