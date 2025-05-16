import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, ShoppingBag, XCircle, CheckCircle } from 'lucide-react'; // Import Lucide icons

interface Customer {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

interface OrderFormData {
  customer: number;
  product: number;
  statuss: string;
  quantity: number;
}

interface Props {
  initialData?: OrderFormData;
  onSubmit: (data: OrderFormData) => void;
  onCancel?: () => void;
}

const OrderDetailForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<OrderFormData>(
    initialData || {
      customer: 0,
      product: 0,
      statuss: 'pending',
      quantity: 1,
    }
  );

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch customers and products from the provided APIs
    axios.get('http://127.0.0.1:8000/customers/customers/')
      .then(res => setCustomers(res.data))
      .catch(err => console.error('Error fetching customers:', err));

    axios.get('http://127.0.0.1:8000/products/products/')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleChange = (field: keyof OrderFormData, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data to be posted
    const dataToPost: OrderFormData = {
      customer: formData.customer,
      product: formData.product,
      statuss: formData.statuss,
      quantity: formData.quantity,
    };

    if (initialData) {
      // Update existing order if initial data exists
      axios.put(`http://127.0.0.1:8000/orders/order-entries/${initialData.customer}/`, dataToPost)
        .then(() => onSubmit(formData))
        .catch(err => console.error('Error updating order:', err));
    } else {
      // Create new order if no initial data
      axios.post('http://127.0.0.1:8000/orders/order-entries/', dataToPost)
        .then(() => onSubmit(formData))
        .catch(err => console.error('Error creating order:', err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4 text-gray-900 max-w-md">
      <h2 className="text-xl font-semibold flex items-center">
        {initialData ? <Edit className="w-5 h-5 mr-2" /> : <ShoppingBag className="w-5 h-5 mr-2" />}
        {initialData ? 'Edit Order' : 'New Order'}
      </h2>

      <div>
        <label className="block font-medium mb-1 flex items-center">
          <ShoppingBag className="w-5 h-5 mr-2" />
          Customer
        </label>
        <select
          value={formData.customer}
          onChange={(e) => handleChange('customer', Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1 flex items-center">
          <ShoppingBag className="w-5 h-5 mr-2" />
          Product
        </label>
        <select
          value={formData.product}
          onChange={(e) => handleChange('product', Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1 flex items-center">
          <Edit className="w-5 h-5 mr-2" />
          Status
        </label>
        <select
          value={formData.statuss}
          onChange={(e) => handleChange('statuss', e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1 flex items-center">
          <Edit className="w-5 h-5 mr-2" />
          Quantity
        </label>
        <input
          type="number"
          value={formData.quantity}
          onChange={(e) => handleChange('quantity', Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
          min={1}
          required
        />
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 flex items-center gap-2"
          >
            <XCircle className="w-5 h-5" />
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          {initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default OrderDetailForm;
