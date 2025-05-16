import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { Eye, Pencil, Trash2, X, Plus } from 'lucide-react';
import PurchaseOrderForm from '../components/PurchaseOrderForm';

interface PurchaseOrder {
  id: number;
  vendor: number;
  vendor_name: string;
  product_name: string;
  quantity: number;
  order_date: string;
  reference_number: string;
  total_amount: string;
  isEditing?: boolean;
  cost_price: string;
}

const PurchaseOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get('http://127.0.0.1:8000/purchase/purchase-orders/')
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Error fetching purchase orders:', err));
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this purchase order?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/purchase/purchase-orders/${id}/`);
      fetchOrders();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const toggleEditMode = (id: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, isEditing: !order.isEditing } : order
      )
    );
  };

  const handleChange = (id: number, field: keyof PurchaseOrder, value: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, [field]: value } : order
      )
    );
  };

  const handleSave = async (order: PurchaseOrder) => {
    try {
      await axios.put(`http://127.0.0.1:8000/purchase/purchase-orders/${order.id}/`, order);
      toggleEditMode(order.id);
      fetchOrders();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleAddOrder = (data: any) => {
    axios
      .post('http://127.0.0.1:8000/purchase/purchase-orders/', data)
      .then(() => {
        fetchOrders();
        setShowForm(false);
      })
      .catch((err) => console.error('Error adding purchase order:', err));
  };

  const filteredOrders = orders.filter((order) =>
    [order.reference_number, order.vendor_name, order.product_name]
      .some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6">📦 Purchase Orders</h1>

        {/* Top Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="🔍 Search by Reference, Vendor, or Product"
            className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset to page 1 on search
            }}
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md w-full md:w-auto justify-center"
            onClick={() => setShowForm(true)}
          >
            <Plus size={18} /> Add Purchase Order
          </button>
        </div>

        {/* Mobile FAB */}
        <button
          onClick={() => setShowForm(true)}
          className="md:hidden fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-200"
          aria-label="Add Purchase Order"
        >
          <Plus size={24} />
        </button>

        {/* Table */}
        <table className="min-w-full table-auto bg-gray-800 rounded-xl overflow-hidden">
          <thead className="bg-gray-700 text-gray-300 text-sm uppercase">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Reference</th>
              <th className="px-4 py-3">Vendor</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="border-t border-gray-700 hover:bg-gray-700/40 transition">
                <td className="px-4 py-3">{order.id}</td>
                <td className="px-4 py-3">
                  {order.isEditing ? (
                    <input
                      className="bg-gray-600 text-white px-2 py-1 rounded"
                      value={order.reference_number}
                      onChange={(e) => handleChange(order.id, 'reference_number', e.target.value)}
                    />
                  ) : (
                    order.reference_number
                  )}
                </td>
                <td className="px-4 py-3">{order.vendor_name}</td>
                <td className="px-4 py-3">₹{order.total_amount}</td>
                <td className="px-4 py-3">{new Date(order.order_date).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-center flex justify-center gap-3">
                  {order.isEditing ? (
                    <>
                      <button onClick={() => handleSave(order)} className="text-green-400 hover:text-green-600">✅</button>
                      <button onClick={() => toggleEditMode(order.id)} className="text-gray-400 hover:text-gray-600">❌</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setSelectedOrder(order)} className="text-blue-400 hover:text-blue-600">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => toggleEditMode(order.id)} className="text-yellow-400 hover:text-yellow-600">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(order.id)} className="text-red-400 hover:text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-700 text-gray-400' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          >
            ← Previous
          </button>
          <span className="text-sm text-gray-400">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-700 text-gray-400' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          >
            Next →
          </button>
        </div>

        {/* View Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center">🧾 {selectedOrder.reference_number}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                <div>
                  <p><strong>Vendor:</strong> {selectedOrder.vendor_name}</p>
                  <p><strong>Product:</strong> {selectedOrder.product_name}</p>
                  <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
                </div>
                <div>
                  <p><strong>Total:</strong> ₹{selectedOrder.total_amount}</p>
                  <p><strong>Price:</strong> ₹{selectedOrder.cost_price}</p>
                  <p><strong>Date:</strong> {new Date(selectedOrder.order_date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-lg w-full max-w-md relative">
              <button onClick={() => setShowForm(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
                <X size={20} />
              </button>
              <PurchaseOrderForm
                onSubmit={handleAddOrder}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PurchaseOrdersPage;
