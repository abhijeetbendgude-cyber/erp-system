import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, Pencil, Trash2 } from 'lucide-react';

interface Order {
  id: number;
  customer_name: string;
  order_date: string;
  statuss: string;
  order_number: string;
  product_name?: string;
  quantity?: number;
  price?: string;
  total_amount?: string;
}

const RecentOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = () => {
    axios
      .get('http://127.0.0.1:8000/orders/order-entries/') // Sort by most recent first
      .then((res) => {
        // Limiting to only the last 5 orders (you can adjust the number)
        console.log('Fetched orders:', res.data); 
        setOrders(res.data.slice(0, 5));
      })
      .catch((err) => console.error('Error fetching recent orders:', err));
  };

  const handleDelete = async (orderId: number) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/orders/order-entries/${orderId}/`);
      fetchRecentOrders();
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 mt-6 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">🛍️ Recent Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-400">No recent orders available.</p>
      ) : (
        <table className="min-w-full table-auto bg-gray-800 rounded-xl overflow-hidden">
          <thead className="bg-gray-700 text-gray-300 text-sm uppercase">
            <tr>
              <th className="px-4 py-3">Order No.</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-700 hover:bg-gray-700/40 transition">
                <td className="px-4 py-3">{order.order_number}</td>
                <td className="px-4 py-3">{order.customer_name}</td>
                <td className="px-4 py-3">
                  {new Date(order.order_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.statuss === 'pending'
                        ? 'bg-yellow-600'
                        : order.statuss === 'shipped'
                        ? 'bg-green-600'
                        : 'bg-red-600'
                    }`}
                  >
                    {order.statuss}
                  </span>
                </td>
                <td className="px-4 py-3 text-center flex justify-center gap-3">
                  <button onClick={() => handleDelete(order.id)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                  <button onClick={() => { /* Handle View/Edit Order */ }} className="text-yellow-400 hover:text-yellow-600">
                    <Pencil size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentOrders;
