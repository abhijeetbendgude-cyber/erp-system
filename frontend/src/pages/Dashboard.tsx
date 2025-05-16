import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import Chart from '../components/dashboard/Chart';
import DataTable from '../components/data/DataTable';
import { statsData } from '../data/mockData';
import axios from 'axios';

const Dashboard = () => {
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/orders/order-entries/');
        setRecentOrders(response.data);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    };

    fetchRecentOrders();
  }, []);

  const sortedOrders = [...recentOrders].sort((a, b) => {
    if (!sortConfig) {
      // Default: sort by order_date descending
      return new Date(b.order_date).getTime() - new Date(a.order_date).getTime();
    }

    const { key, direction } = sortConfig;
    const aValue = a[key];
    const bValue = b[key];

    if (key === 'order_date') {
      return direction === 'asc'
        ? new Date(aValue).getTime() - new Date(bValue).getTime()
        : new Date(bValue).getTime() - new Date(aValue).getTime();
    }

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const orderColumns = [
    {
      key: 'no',
      title: 'No',
      sortable: false,
      render: (_: any, index: number) => (currentPage - 1) * itemsPerPage + index + 1,
    },
    { key: 'order_number', title: 'Order No.', sortable: true },
    { key: 'customer_name', title: 'Customer', sortable: true },
    {
      key: 'order_date',
      title: 'Order Date',
      sortable: true,
      render: (value: string) => {
        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }, 
    },
    {
      key: 'statuss',
      title: 'Status',
      sortable: true,
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${
            value === 'pending'
              ? 'bg-yellow-600'
              : value === 'shipped'
              ? 'bg-green-600'
              : 'bg-red-600'
          }`}
        >
          {value}
        </span>
      ),
    },
  ];
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Chart title="Revenue Overview" type="line" data={{}} />
        <Chart title="Orders Summary" type="bar" data={{}} />
      </div>

      <div className="mb-6">
        <DataTable
          title="Recent Orders"
          columns={orderColumns}
          data={paginatedOrders}
          pagination={{
            totalItems: recentOrders.length,
            itemsPerPage,
            currentPage,
            onPageChange: setCurrentPage,
          }}
          onSortChange={setSortConfig}
          sortConfig={sortConfig}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
