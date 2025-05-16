import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Mail, Phone, Globe, MapPin, Building2, User,
  Landmark, IndianRupee, Calendar
} from 'lucide-react';

interface Customer {
  id?: number;
  name: string;
  description: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
  gstin: string;
  phone: string;
  mobaile: string;
  email: string;
  website: string;
  payment_terms: string;
  credit_limit: number;
  credit_days: number;
}

interface CreateCustomerFormProps {
  customer?: Customer;
  onSubmitSuccess: () => void;
}

const InputWithIcon = ({
  icon: Icon,
  ...props
}: {
  icon: React.ElementType;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) => (
  <div className="relative">
    <span className="absolute left-2 top-2.5 text-gray-400">
      <Icon size={18} />
    </span>
    <input
      {...props}
      className="pl-8 border p-2 rounded w-full"
    />
  </div>
);

const CreateCustomerForm: React.FC<CreateCustomerFormProps> = ({ customer, onSubmitSuccess }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'account'>('general');

  const [formData, setFormData] = useState<Customer>({
    name: '',
    description: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'India',
    gstin: '',
    phone: '',
    mobaile: '',
    email: '',
    website: '',
    payment_terms: '',
    credit_limit: 0,
    credit_days: 0,
  });

  useEffect(() => {
    if (customer) {
      setFormData(prev => ({
        ...prev,
        ...customer,
      }));
    }
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (customer?.id) {
        await axios.put(`http://127.0.0.1:8000/customers/customers/${customer.id}/`, formData);
      } else {
        await axios.post('http://127.0.0.1:8000/customers/customers/', formData);
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting customer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputWithIcon icon={User} name="name" value={formData.name} onChange={handleChange} placeholder="Customer Name" />
      <InputWithIcon icon={Building2} name="description" value={formData.description} onChange={handleChange} placeholder="Description" />

      <div className="border-b mt-4">
        <button type="button" className={`px-4 py-2 ${activeTab === 'general' ? 'border-b-2 border-blue-500 font-semibold' : ''}`} onClick={() => setActiveTab('general')}>General Info</button>
        <button type="button" className={`px-4 py-2 ${activeTab === 'account' ? 'border-b-2 border-blue-500 font-semibold' : ''}`} onClick={() => setActiveTab('account')}>Account</button>
      </div>

      {activeTab === 'general' && (
        <div className="grid grid-cols-2 gap-4">
          <InputWithIcon icon={MapPin} name="address" value={formData.address} onChange={handleChange} placeholder="Street Address" />
          <InputWithIcon icon={MapPin} name="address2" value={formData.address2 || ''} onChange={handleChange} placeholder="Address 2" />
          <InputWithIcon icon={MapPin} name="city" value={formData.city} onChange={handleChange} placeholder="City" />
          <InputWithIcon icon={Landmark} name="state" value={formData.state} onChange={handleChange} placeholder="State" />
          <InputWithIcon icon={MapPin} name="zip" value={formData.zip} onChange={handleChange} placeholder="Zip Code" />
          <input value="India" readOnly className="border p-2 rounded bg-gray-100" />
          <InputWithIcon icon={IndianRupee} name="gstin" value={formData.gstin} onChange={handleChange} placeholder="GSTIN" />
          <InputWithIcon icon={Phone} name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          <InputWithIcon icon={Phone} name="mobaile" value={formData.mobaile} onChange={handleChange} placeholder="Mobile" />
          <InputWithIcon icon={Mail} name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <InputWithIcon icon={Globe} name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
        </div>
      )}

      {activeTab === 'account' && (
        <div className="grid grid-cols-2 gap-4">
          <InputWithIcon icon={User} name="payment_terms" value={formData.payment_terms} onChange={handleChange} placeholder="Payment Terms" />
          <InputWithIcon icon={IndianRupee} name="credit_limit" type="number" value={formData.credit_limit} onChange={handleChange} placeholder="Credit Limit" />
          <InputWithIcon icon={Calendar} name="credit_days" type="number" value={formData.credit_days} onChange={handleChange} placeholder="Credit Days" />
        </div>
      )}

      <div className="flex justify-end space-x-4 mt-6">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">💾 {customer ? 'Update' : 'Save'}</button>
        <button type="button" onClick={onSubmitSuccess} className="bg-red-500 text-white px-4 py-2 rounded">❌ Cancel</button>
      </div>
    </form>
  );
};

export default CreateCustomerForm;
