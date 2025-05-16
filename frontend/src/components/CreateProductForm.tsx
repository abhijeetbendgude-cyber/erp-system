import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Package,
  Tag,
  Text,
  IndianRupee,
  Truck,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface Product {
  id?: number;
  name: string;
  sku: string;
  description: string;
  price: string;
  vendor: string;
  created_at?: string;
}

interface CreateProductFormProps {
  product?: Product;
  onClose: () => void;
  onProductSaved?: () => void;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({
  product,
  onClose,
  onProductSaved,
}) => {
  const [formData, setFormData] = useState<Product>({
    name: '',
    sku: '',
    description: '',
    price: '',
    vendor: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    try {
      if (product?.id) {
        // Edit mode
        await axios.put(`http://127.0.0.1:8000/products/products/${product.id}/`, formData);
      } else {
        // Create mode
        await axios.post('http://127.0.0.1:8000/products/products/', formData);
      }

      setSuccess(true);
      if (!product) {
        setFormData({ name: '', sku: '', description: '', price: '', vendor: '' });
      }

      if (onProductSaved) onProductSaved();
    } catch (err) {
      console.error(err);
      setError('Failed to save product. Please try again.');
    }
  };

  return (
    <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Package className="text-blue-600" size={24} />
        {product ? 'Edit Product' : 'Add New Product'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium flex items-center gap-1">
            <Tag size={16} /> Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium flex items-center gap-1">
            <Tag size={16} /> SKU
          </label>
          <input
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium flex items-center gap-1">
            <Text size={16} /> Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium flex items-center gap-1">
            <IndianRupee size={16} /> Price (₹)
          </label>
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            step="0.01"
            className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium flex items-center gap-1">
            <Truck size={16} /> Vendor
          </label>
          <input
            name="vendor"
            value={formData.vendor}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
            required
          />
        </div>

        {success && (
          <p className="flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle size={16} /> Product saved successfully!
          </p>
        )}
        {error && (
          <p className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle size={16} /> {error}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white font-semibold transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
