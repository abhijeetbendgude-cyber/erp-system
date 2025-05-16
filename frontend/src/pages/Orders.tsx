import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { Eye, X, Pencil, Trash2, Plus } from 'lucide-react';
import OrderDetailForm from '../components/OrderDetailForm';

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
  isEditing?: boolean;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get('http://127.0.0.1:8000/orders/order-entries/')
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Error fetching orders:', err));
  };

  const handleDelete = async (orderId: number) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/orders/order-entries/${orderId}/`);
      fetchOrders();
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  const toggleEditMode = (orderId: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, isEditing: !order.isEditing } : order
      )
    );
  };

  const handleChange = (orderId: number, field: keyof Order, value: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, [field]: value } : order
      )
    );
  };

  const handleSave = async (order: Order) => {
    try {
      await axios.put(`http://127.0.0.1:8000/orders/order-entries/${order.id}/`, order);
      toggleEditMode(order.id);
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const handleViewItems = async (orderId: number) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/orders/order-entries/${orderId}/`);
      setSelectedOrder(res.data);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  };

  const handlePrint = () => {
    // Temporarily hide the print button and "X" button
    const printButton = document.getElementById("printButton");
    const cancelButton = document.getElementById("cancelButton");
    const modalContent = document.getElementById("orderDetails");
  
    if (printButton) printButton.style.display = "none";
    if (cancelButton) cancelButton.style.display = "none";
  
    // Save the current content and update the body content to only the modal
    const originalContents = document.body.innerHTML;
    const modalContentHTML = modalContent?.innerHTML || '';
  
    document.body.innerHTML = modalContentHTML;
  
    // Trigger the print dialog
    window.print();
  
    // Restore the original body content after printing
    document.body.innerHTML = originalContents;
  };

  return (
    <Layout>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📦 Orders</h1>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <Plus size={18} /> Add Order
          </button>
        </div>

        {orders.length === 0 ? (
          <p className="text-gray-400">No orders available.</p>
        ) : (
          <table className="min-w-full table-auto bg-gray-800 rounded-xl overflow-hidden">
            <thead className="bg-gray-700 text-gray-300 text-sm uppercase">
              <tr>
                <th className="px-4 py-3">ID</th>
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
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">
                    {order.isEditing ? (
                      <input
                        className="bg-gray-600 text-white px-2 py-1 rounded"
                        value={order.order_number}
                        onChange={(e) => handleChange(order.id, 'order_number', e.target.value)}
                      />
                    ) : (
                      order.order_number
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {order.isEditing ? (
                      <input
                        className="bg-gray-600 text-white px-2 py-1 rounded"
                        value={order.customer_name}
                        onChange={(e) => handleChange(order.id, 'customer_name', e.target.value)}
                      />
                    ) : (
                      order.customer_name
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {order.isEditing ? (
                      <input
                        type="date"
                        className="bg-gray-600 text-white px-2 py-1 rounded"
                        value={order.order_date.split('T')[0]}
                        onChange={(e) => handleChange(order.id, 'order_date', e.target.value)}
                      />
                    ) : (
                      new Date(order.order_date).toLocaleDateString()
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {order.isEditing ? (
                      <select
                        className="bg-gray-600 text-white px-2 py-1 rounded"
                        value={order.statuss}
                        onChange={(e) => handleChange(order.id, 'statuss', e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
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
                    )}
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-3">
                    {order.isEditing ? (
                      <>
                        <button onClick={() => handleSave(order)} className="text-green-400 hover:text-green-600">✅</button>
                        <button onClick={() => toggleEditMode(order.id)} className="text-gray-400 hover:text-gray-600">❌</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleViewItems(order.id)} className="text-blue-400 hover:text-blue-600">
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
        )}
{selectedOrder && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div id="orderDetails" className="bg-white text-gray-900 rounded-2xl p-6 shadow-lg w-full max-w-md relative">
      {/* Cancel Button */}
      <button
        id="cancelButton"
        onClick={() => setSelectedOrder(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
      >
        <X size={20} />
      </button>

      <h2 className="text-2xl font-bold mb-4">🛒 Order #{selectedOrder.order_number}</h2>
      <div className="space-y-2 text-sm text-gray-600">
        <p><strong>Customer:</strong> {selectedOrder.customer_name}</p>
        <p><strong>Product:</strong> {selectedOrder.product_name}</p>
        <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
        <p><strong>Price:</strong> ₹{selectedOrder.price}</p>
        <p><strong>Total Amount:</strong> ₹{selectedOrder.total_amount}</p>
        <p><strong>Date:</strong> {new Date(selectedOrder.order_date).toLocaleDateString()}</p>
        <p><strong>Status:</strong> <span className="capitalize">{selectedOrder.statuss}</span></p>
      </div>

      {/* Print Button */}
      <div className="mt-4 flex justify-end">
        <button
          id="printButton"
          onClick={handlePrint} // Trigger print
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
        >
          🖨️ Print
        </button>
      </div>
    </div>
  </div>
)}

        {showForm && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-lg w-full max-w-md relative">
              <button onClick={() => setShowForm(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
                <X size={20} />
              </button>
              <OrderDetailForm
                onSubmit={async (data) => {
                  try {
                    await axios.post('http://127.0.0.1:8000/orders/order-entries/', data);
                    fetchOrders();
                    setShowForm(false);
                  } catch (error) {
                    console.error('Error creating order:', error);
                  }
                }}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;
