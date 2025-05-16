import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { Eye, X, Pencil, Trash2, Plus } from 'lucide-react';

interface Invoice {
  customer_name: string;
  id: number;
  invoice_number: string;
  customer: string;
  date: string;
  due_date: string;
  total_amount: string;
  status: string;
  notes: string;
  isEditing?: boolean;
}

const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = () => {
    axios
      .get('http://127.0.0.1:8000/stock/invoice/')
      .then((res) => setInvoices(res.data))
      .catch((err) => console.error('Error fetching invoices:', err));
  };

  const handleDelete = async (invoiceId: number) => {
    if (!window.confirm('Are you sure you want to delete this invoice?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/stock/invoice/${invoiceId}/`);
      fetchInvoices();
    } catch (error) {
      console.error('Failed to delete invoice:', error);
    }
  };

  const toggleEditMode = (invoiceId: number) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId ? { ...inv, isEditing: !inv.isEditing } : inv
      )
    );
  };

  const handleChange = (id: number, field: keyof Invoice, value: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, [field]: value } : inv))
    );
  };

  const handleSave = async (invoice: Invoice) => {
    try {
      await axios.put(`http://127.0.0.1:8000/stock/invoice/${invoice.id}/`, invoice);
      toggleEditMode(invoice.id);
      fetchInvoices();
    } catch (error) {
      console.error('Failed to update invoice:', error);
    }
  };

  const handlePrint = () => {
    const printButton = document.getElementById('printButton');
    const cancelButton = document.getElementById('cancelButton');
    const content = document.getElementById('invoiceDetails');

    if (printButton) printButton.style.display = 'none';
    if (cancelButton) cancelButton.style.display = 'none';

    const original = document.body.innerHTML;
    document.body.innerHTML = content?.innerHTML || '';
    window.print();
    document.body.innerHTML = original;
  };

  return (
    <Layout>
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🧾 Invoices</h1>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={18} /> Create Invoice
          </button>
        </div>

        {invoices.length === 0 ? (
          <p className="text-gray-400">No invoices available.</p>
        ) : (
          <table className="min-w-full table-auto bg-gray-800 rounded-xl overflow-hidden">
            <thead className="bg-gray-700 text-gray-300 text-sm uppercase">
              <tr>
                <th className="px-4 py-3">Invoice No.</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-t border-gray-700 hover:bg-gray-700/40">
                  <td className="px-4 py-3">
                    {inv.isEditing ? (
                      <input
                        value={inv.invoice_number}
                        onChange={(e) => handleChange(inv.id, 'invoice_number', e.target.value)}
                        className="bg-gray-600 text-white px-2 py-1 rounded"
                      />
                    ) : (
                      inv.invoice_number
                    )}
                  </td>
                  <td className="px-4 py-3">{inv.customer_name}</td>
                  <td className="px-4 py-3">
                    {new Date(inv.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(inv.due_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">₹{inv.total_amount}</td>
                  <td className="px-4 py-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        inv.status === 'paid'
                          ? 'bg-green-600'
                          : inv.status === 'unpaid'
                          ? 'bg-yellow-600'
                          : 'bg-red-600'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-3">
                    {inv.isEditing ? (
                      <>
                        <button onClick={() => handleSave(inv)} className="text-green-400">✅</button>
                        <button onClick={() => toggleEditMode(inv.id)} className="text-gray-400">❌</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setSelectedInvoice(inv)} className="text-blue-400">
                          <Eye size={18} />
                        </button>
                        <button onClick={() => toggleEditMode(inv.id)} className="text-yellow-400">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => handleDelete(inv.id)} className="text-red-400">
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

        {selectedInvoice && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div id="invoiceDetails" className="bg-white text-gray-900 rounded-2xl p-6 shadow-lg w-full max-w-md relative">
              <button id="cancelButton" onClick={() => setSelectedInvoice(null)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-4">🧾 Invoice #{selectedInvoice.invoice_number}</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Customer:</strong> {selectedInvoice.customer}</p>
                <p><strong>Date:</strong> {new Date(selectedInvoice.date).toLocaleDateString()}</p>
                <p><strong>Due Date:</strong> {new Date(selectedInvoice.due_date).toLocaleDateString()}</p>
                <p><strong>Amount:</strong> ₹{selectedInvoice.total_amount}</p>
                <p><strong>Status:</strong> {selectedInvoice.status}</p>
                <p><strong>Notes:</strong> {selectedInvoice.notes}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  id="printButton"
                  onClick={handlePrint}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  🖨️ Print
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InvoicesPage;
