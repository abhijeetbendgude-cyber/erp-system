import React, { useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';

interface Shipment {
  id: number;
  shipped_date: string;
  shipped_by: string;
  remarks: string;
  status: string;
  order: number;
}

interface OrderEntry {
  order_number: ReactNode;
  id: number;
  description: string;
  customer_name: string;
  product_name: string;
}

const OutwardsPage: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [orders, setOrders] = useState<OrderEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    shipped_date: '',
    shipped_by: '',
    remarks: '',
    status: 'pending',
    order: '',
  });

  useEffect(() => {
    fetchShipments();
    fetchOrders();
  }, []);

  const fetchShipments = () => {
    axios
      .get('http://127.0.0.1:8000/inventory/outward/')
      .then((res) => setShipments(res.data))
      .catch((err) => console.error('Error fetching shipments:', err));
  };

  const fetchOrders = () => {
    axios
      .get('http://127.0.0.1:8000/orders/order-entries/')
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Error fetching orders:', err));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8000/inventory/outward/', formData)
      .then(() => {
        setShowForm(false);
        setFormData({
          shipped_date: '',
          shipped_by: '',
          remarks: '',
          status: 'pending',
          order: '',
        });
        fetchShipments();
      })
      .catch((err) => console.error('Error posting shipment:', err));
  };

  const getOrderNumberByOrderId = (orderId: number) => {
    const order = orders.find((o) => o.id === orderId);
    return order?.order_number || 'N/A';
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-900 min-h-screen text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📤 Outward Material Issues</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            + New
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-left text-sm uppercase text-gray-300">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Order #</th>
                <th className="px-6 py-3">Shipped Date</th>
                <th className="px-6 py-3">Shipped By</th>
                <th className="px-6 py-3">Remarks</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
  {shipments.map((item) => (
    <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-700 transition">
      <td className="px-6 py-4">{item.id}</td>
      <td className="px-6 py-4">{getOrderNumberByOrderId(item.order)}</td>
      <td className="px-6 py-4">{new Date(item.shipped_date).toLocaleDateString()}</td>
      <td className="px-6 py-4">{item.shipped_by}</td>
      <td className="px-6 py-4">{item.remarks}</td>
      <td className="px-6 py-4">
      <select
  value={item.status}
  onChange={(e) => {
    const newStatus = e.target.value;
    axios
      .patch(`http://127.0.0.1:8000/inventory/outward/${item.id}/`, { status: newStatus })
      .then(() => {
        setShipments((prev) =>
          prev.map((s) => (s.id === item.id ? { ...s, status: newStatus } : s))
        );
      })
      .catch((err) => console.error('Failed to update status:', err));
  }}
  className={`text-white px-2 py-1 rounded
    ${item.status === 'pending' ? 'bg-yellow-600' : ''}
    ${item.status === 'shipped' ? 'bg-green-600' : ''}
  `}
>
  <option value="pending">Pending</option>
  <option value="shipped">Shipped</option>
</select>

      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">New Shipment Entry</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="datetime-local"
                  name="shipped_date"
                  value={formData.shipped_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="text"
                  name="shipped_by"
                  value={formData.shipped_by}
                  onChange={handleInputChange}
                  placeholder="Shipped By"
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                />
                <input
                  type="text"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  placeholder="Remarks"
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                />
               <select
  name="status"
  value={formData.status}
  onChange={handleInputChange}
  className={`w-full px-3 py-2 rounded text-white
    ${formData.status === 'pending' ? 'bg-yellow-600' : ''}
    ${formData.status === 'shipped' ? 'bg-green-600' : ''}
  `}
>
  <option value="pending">Pending</option>
  <option value="shipped">Shipped</option>
</select>

                <select
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                  required
                >
                  <option value="">-- Select Order --</option>
                  {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.order_number} - {order.customer_name} - {order.product_name}
                    </option>
                  ))}
                </select>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OutwardsPage;
