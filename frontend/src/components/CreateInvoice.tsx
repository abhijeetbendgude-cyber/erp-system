import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
  onCancel: () => void;
  onSuccess?: () => void;  // optional callback when invoice created successfully
}

function getNextInvoiceNumber(latestInvoiceNumber: string | null) {
  if (!latestInvoiceNumber) {
    const year = new Date().getFullYear();
    return `INV-${year}-001`;
  }

  const year = new Date().getFullYear();
  let nextSeq = 1;

  // Expected format: "INV-2025-007"
  const parts = latestInvoiceNumber.split('-');
  if (parts.length === 3 && parts[1] === year.toString()) {
    const lastSeq = parseInt(parts[2], 10);
    if (!isNaN(lastSeq)) {
      nextSeq = lastSeq + 1;
    }
  }

  return `INV-${year}-${nextSeq.toString().padStart(3, '0')}`;
}

const CreateInvoice: React.FC<Props> = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    invoice_number: '',
    customer: '',
    date: '',
    due_date: '',
    total_amount: '',
    status: 'unpaid',
    notes: ''
  });

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch latest invoice and customers on mount
  useEffect(() => {
    const fetchLatestInvoiceAndResetForm = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/stock/invoice/?ordering=-created_at&page_size=1');
        console.log('Latest invoice API response:', res.data);

        const latestInvoice = res.data.results?.[0];
        const latestNumber = latestInvoice ? latestInvoice.invoice_number : null;
        console.log('Latest invoice number:', latestNumber);

        const newInvoiceNumber = getNextInvoiceNumber(latestNumber);
        console.log('New invoice number generated:', newInvoiceNumber);

        setFormData({
          invoice_number: newInvoiceNumber,
          customer: '',
          date: new Date().toISOString().slice(0, 10),
          due_date: '',
          total_amount: '',
          status: 'unpaid',
          notes: ''
        });
      } catch (error) {
        console.error('Error fetching latest invoice:', error);
        const fallbackInvoiceNumber = getNextInvoiceNumber(null);
        setFormData({
          invoice_number: fallbackInvoiceNumber,
          customer: '',
          date: new Date().toISOString().slice(0, 10),
          due_date: '',
          total_amount: '',
          status: 'unpaid',
          notes: ''
        });
      }
    };

    const fetchCustomers = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/customers/customers/');
        setCustomers(res.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchLatestInvoiceAndResetForm();
    fetchCustomers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('http://127.0.0.1:8000/stock/invoice/', formData);
      setLoading(false);
      if (onSuccess) onSuccess();
      // Reset form with new invoice number after successful save
      const res = await axios.get('http://127.0.0.1:8000/stock/invoice/?ordering=-created_at&page_size=1');
      const latestInvoice = res.data.results?.[0];
      const latestNumber = latestInvoice ? latestInvoice.invoice_number : null;
      const newInvoiceNumber = getNextInvoiceNumber(latestNumber);
      setFormData({
        invoice_number: newInvoiceNumber,
        customer: '',
        date: new Date().toISOString().slice(0, 10),
        due_date: '',
        total_amount: '',
        status: 'unpaid',
        notes: ''
      });
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data || 'Failed to create invoice');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label>Invoice Number</label>
        <input
          name="invoice_number"
          value={formData.invoice_number}
          readOnly
          className="w-full border px-2 py-1 rounded bg-gray-100 cursor-not-allowed"
          required
        />
      </div>
      <div>
        <label>Customer</label>
        <select
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        >
          <option value="">Select Customer</option>
          {customers.map((cust: any) => (
            <option key={cust.id} value={cust.id}>{cust.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label>Total Amount</label>
        <input
          type="number"
          name="total_amount"
          value={formData.total_amount}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        >
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label>Notes</label>
        <input
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default CreateInvoice;
