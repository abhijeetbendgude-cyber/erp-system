import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, ShoppingBag, XCircle, CheckCircle } from 'lucide-react'; // Import Lucide icons

interface Vendor {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number; // Added price to the Product interface
  vendor: number; // To associate product with its vendor
}

interface PurchaseOrderFormData {
  vendor: number;
  order_date: string;
  product: number;
  quantity: number;
  total_amount: string;
}

interface Props {
  initialData?: PurchaseOrderFormData;
  onSubmit: (data: PurchaseOrderFormData) => void;
  onCancel?: () => void;
}

const PurchaseOrderForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<PurchaseOrderFormData>(
    initialData || {
      vendor: 0,
      order_date: new Date().toISOString(),
      product: 0,
      quantity: 1,
      total_amount: '0.00',
    }
  );

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // To store the selected product

  // Fetch vendors from the provided API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/vendors/vendors/')
      .then(res => setVendors(res.data))
      .catch(err => console.error('Error fetching vendors:', err));
  }, []);

  // Fetch products when a vendor is selected
  useEffect(() => {
    if (formData.vendor) {
      axios.get(`http://127.0.0.1:8000/products/products/?vendor=${formData.vendor}`)
        .then(res => setProducts(res.data))
        .catch(err => console.error('Error fetching products:', err));
    } else {
      setProducts([]); // If no vendor is selected, reset the products
    }
  }, [formData.vendor]);

  // Handle product selection to update the selected product and price
  const handleProductChange = (productId: number) => {
    const product = products.find((prod) => prod.id === productId);
    setSelectedProduct(product || null); // Set selected product or null if not found

    // Update formData with the new product and calculate total amount
    if (product) {
      setFormData((prevData) => ({
        ...prevData,
        product: product.id,
        total_amount: (product.price * prevData.quantity).toFixed(2), // Dynamically calculate total_amount
      }));
    }
  };

  // Handle quantity change and recalculate the total amount dynamically
  const handleQuantityChange = (value: number) => {
    if (selectedProduct) {
      setFormData((prevData) => ({
        ...prevData,
        quantity: value,
        total_amount: (selectedProduct.price * value).toFixed(2), // Recalculate total amount based on selected product's price
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data to be posted
    const dataToPost: PurchaseOrderFormData = {
      vendor: formData.vendor,
      order_date: formData.order_date,
      product: formData.product,
      quantity: formData.quantity,
      total_amount: formData.total_amount,
    };

    if (initialData) {
      // Update existing purchase order if initial data exists
      axios.put(`http://127.0.0.1:8000/purchase/purchase-orders/${initialData.vendor}/`, dataToPost)
        .then(() => onSubmit(formData))
        .catch(err => console.error('Error updating purchase order:', err));
    } else {
      // Create new purchase order if no initial data
      axios.post('http://127.0.0.1:8000/purchase/purchase-orders/', dataToPost)
        .then(() => onSubmit(formData))
        .catch(err => console.error('Error creating purchase order:', err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4 text-gray-900 max-w-md">
      <h2 className="text-xl font-semibold flex items-center">
        {initialData ? <Edit className="w-5 h-5 mr-2" /> : <ShoppingBag className="w-5 h-5 mr-2" />}
        {initialData ? 'Edit Purchase Order' : 'New Purchase Order'}
      </h2>

      <div>
        <label className="block font-medium mb-1 flex items-center">
          Vendor
        </label>
        <select
          value={formData.vendor}
          onChange={(e) => setFormData({ ...formData, vendor: Number(e.target.value) })}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select a vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1 flex items-center">
          Order Date
        </label>
        <input
          type="datetime-local"
          value={formData.order_date.substring(0, 16)} // Format the date to match the input type
          onChange={(e) => setFormData({ ...formData, order_date: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1 flex items-center">
          Product
        </label>
        <select
          value={formData.product}
          onChange={(e) => handleProductChange(Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
          required
          disabled={!formData.vendor} // Disable product selection until a vendor is selected
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
          Quantity
        </label>
        <input
          type="number"
          value={formData.quantity}
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
          min={1}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1 flex items-center">
          Total Amount
        </label>
        <input
          type="text"
          value={formData.total_amount}
          readOnly
          className="w-full border px-3 py-2 rounded bg-gray-100"
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

export default PurchaseOrderForm;
