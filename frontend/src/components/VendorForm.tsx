import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Mail, Phone, Globe, MapPin, Landmark, Building2, User } from 'lucide-react';

interface Vendor {
  id?: number;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  mobaile: string;
  email: string;
  website: string;
}

interface VendorFormProps {
  vendor?: Vendor;
  onSubmitSuccess: () => void;
}

const InputWithIcon = ({
  icon: Icon,
  ...props
}: {
  icon: React.ElementType;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
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

const VendorForm: React.FC<VendorFormProps> = ({ vendor, onSubmitSuccess }) => {
  const [formData, setFormData] = useState<Vendor>({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    mobaile: '',
    email: '',
    website: '',
  });

  useEffect(() => {
    if (vendor) {
      setFormData(prev => ({
        ...prev,
        ...vendor,
      }));
    }
  }, [vendor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (vendor?.id) {
        await axios.put(`http://127.0.0.1:8000/vendors/vendors/${vendor.id}/`, formData);
      } else {
        await axios.post('http://127.0.0.1:8000/vendors/vendors/', formData);
      }
      onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting vendor:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputWithIcon icon={User} name="name" value={formData.name} onChange={handleChange} placeholder="Vendor Name" />
      <InputWithIcon icon={Building2} name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <InputWithIcon icon={MapPin} name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
      <InputWithIcon icon={MapPin} name="city" value={formData.city} onChange={handleChange} placeholder="City" />
      <InputWithIcon icon={Landmark} name="state" value={formData.state} onChange={handleChange} placeholder="State" />
      <InputWithIcon icon={MapPin} name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP Code" />
      <InputWithIcon icon={Phone} name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <InputWithIcon icon={Phone} name="mobaile" value={formData.mobaile} onChange={handleChange} placeholder="Mobile" />
      <InputWithIcon icon={Mail} name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <InputWithIcon icon={Globe} name="website" value={formData.website} onChange={handleChange} placeholder="Website" />

      <div className="flex justify-end space-x-4 mt-6">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          💾 {vendor ? 'Update' : 'Save'}
        </button>
        <button type="button" onClick={onSubmitSuccess} className="bg-red-500 text-white px-4 py-2 rounded">
          ❌ Cancel
        </button>
      </div>
    </form>
  );
};

export default VendorForm;
