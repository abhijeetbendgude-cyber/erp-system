
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Product from './pages/Product';
import Orders from './pages/Orders';
import Customer from './pages/Customer';
import Outward from './pages/Outward';
import Inward from './pages/Inward';
import StockPage from './pages/StockPage';
import CustomerProfile from './pages/CustomerProfilePage';
import VendorList from './pages/VendorList';
import VendorForm from './components/VendorForm';
import OrderDetailForm from './components/OrderDetailForm';
import RecentOrders from './pages/RecentOrders'; // Assuming you have a RecentOrders component
import StockCount from './pages/StockCount';
import PurchaseOrderForm from './components/PurchaseOrderForm';
import InvoiceCreate from './pages/invoice';


import PurchaseOrdersPage from './pages/PurchaseOrdersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/outward" element={<Outward />} />
        <Route path="/inward" element={<Inward />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/customers/:id" element={<CustomerProfile />} />
        <Route path="/vendors" element={<VendorList />} />
        
        <Route path="/vendors/new" element={<VendorForm onSubmitSuccess={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path='/OrderDetailForm' element={<OrderDetailForm onSubmit={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
        <Route path="/recent-orders" element={<RecentOrders />} />
        <Route path="/stock-count" element={<StockCount />} />
        <Route path="/purchase-orders" element={<PurchaseOrdersPage/>} />
        <Route path="/purchase-orders/new" element={<PurchaseOrderForm onSubmit={function (): void {
          throw new Error('Function not implemented.');
        } } />} />

        <Route path="/invoice" element={<InvoiceCreate />} />

        
        
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
