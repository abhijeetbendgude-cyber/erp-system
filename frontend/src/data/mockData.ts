// Mock data for the ERP dashboard

// Stats
export const statsData = [
  {
    id: 1,
    title: 'Total Revenue',
    value: '$85,240',
    change: {
      value: '12.5%',
      isPositive: true,
    },
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  },
  {
    id: 2,
    title: 'New Orders',
    value: '384',
    change: {
      value: '8.2%',
      isPositive: true,
    },
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  },
  {
    id: 3,
    title: 'Inventory Items',
    value: '2,456',
    change: {
      value: '3.1%',
      isPositive: false,
    },
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  },
  {
    id: 4,
    title: 'Support Tickets',
    value: '28',
    change: {
      value: '14.2%',
      isPositive: false,
    },
    color: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300',
  },
];

// Chart data - placeholders, actual data would be more complex
export const revenueData = {};
export const ordersData = {};
export const salesData = {};

// Table data - Products
export const productsData = [
  {
    id: 'PRD001',
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    price: '$249.99',
    inStock: 42,
    status: 'In Stock',
  },
  {
    id: 'PRD002',
    name: 'Adjustable Standing Desk',
    category: 'Furniture',
    price: '$499.99',
    inStock: 15,
    status: 'In Stock',
  },
  {
    id: 'PRD003',
    name: 'Wireless Keyboard',
    category: 'Electronics',
    price: '$89.99',
    inStock: 78,
    status: 'In Stock',
  },
  {
    id: 'PRD004',
    name: 'Ultra HD Monitor',
    category: 'Electronics',
    price: '$349.99',
    inStock: 0,
    status: 'Out of Stock',
  },
  {
    id: 'PRD005',
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: '$59.99',
    inStock: 25,
    status: 'In Stock',
  },
  {
    id: 'PRD006',
    name: 'Laptop Stand',
    category: 'Accessories',
    price: '$39.99',
    inStock: 8,
    status: 'Low Stock',
  },
  {
    id: 'PRD007',
    name: 'Desk Lamp',
    category: 'Lighting',
    price: '$29.99',
    inStock: 34,
    status: 'In Stock',
  },
];

// Table data - Recent Orders
export const ordersTableData = [
  {
    id: 'ORD1234',
    customer: 'John Smith',
    date: '2025-04-12',
    amount: '$589.99',
    status: 'Delivered',
    paymentStatus: 'Paid',
  },
  {
    id: 'ORD1235',
    customer: 'Sarah Johnson',
    date: '2025-04-11',
    amount: '$249.99',
    status: 'Processing',
    paymentStatus: 'Paid',
  },
  {
    id: 'ORD1236',
    customer: 'Michael Brown',
    date: '2025-04-11',
    amount: '$1,249.98',
    status: 'Shipped',
    paymentStatus: 'Paid',
  },
  {
    id: 'ORD1237',
    customer: 'Emily Davis',
    date: '2025-04-10',
    amount: '$89.99',
    status: 'Delivered',
    paymentStatus: 'Paid',
  },
  {
    id: 'ORD1238',
    customer: 'Robert Wilson',
    date: '2025-04-10',
    amount: '$399.95',
    status: 'Pending',
    paymentStatus: 'Unpaid',
  },
  {
    id: 'ORD1239',
    customer: 'Jessica Martinez',
    date: '2025-04-09',
    amount: '$149.99',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
  },
];

// Activity Feed
export const activitiesData = [
  {
    id: 1,
    user: {
      name: 'Alex Thompson',
      avatar: '',
    },
    action: 'created a new order',
    target: '#ORD1240',
    time: '2 minutes ago',
  },
  {
    id: 2,
    user: {
      name: 'Madison Lee',
      avatar: '',
    },
    action: 'updated inventory for',
    target: 'Wireless Keyboard',
    time: '15 minutes ago',
  },
  {
    id: 3,
    user: {
      name: 'Ryan Jackson',
      avatar: '',
    },
    action: 'added a new product',
    target: 'Noise Cancelling Headphones',
    time: '1 hour ago',
  },
  {
    id: 4,
    user: {
      name: 'Sophia Chen',
      avatar: '',
    },
    action: 'processed payment for order',
    target: '#ORD1238',
    time: '2 hours ago',
  },
  {
    id: 5,
    user: {
      name: 'Daniel Kim',
      avatar: '',
    },
    action: 'shipped order',
    target: '#ORD1236',
    time: '3 hours ago',
  },
];