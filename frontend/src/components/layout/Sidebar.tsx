import React from 'react';
import {
  Home,
  Box,
  Users,
  DollarSign,
  BarChart,
  Settings,
  FileText,
  ShoppingCart,
  
  Truck,
  Calendar,
  HelpCircle,
  ChevronDown,
  Inbox,
  ArrowUpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

type NavItemProps = {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  children?: React.ReactNode;
};

const NavItem: React.FC<NavItemProps> = ({
  icon,
  title,
  isActive = false,
  hasDropdown = false,
  children
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="mb-1">
      <button
        onClick={() => hasDropdown && setIsOpen(!isOpen)}
        className={`flex items-center w-full px-4 py-2.5 text-left transition-colors duration-200 rounded-lg ${
          isActive
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-white'
            : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
        }`}
      >
        <div className="mr-3">{icon}</div>
        <span className="font-medium">{title}</span>
        {hasDropdown && (
          <ChevronDown
            className={`ml-auto w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          />
        )}
      </button>

      {hasDropdown && isOpen && (
        <div className="pl-11 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const SubNavItem: React.FC<{ title: string; to?: string; isActive?: boolean }> = ({
  title,
  to = "#",
  isActive = false
}) => {
  return (
    <Link
      to={to}
      className={`block px-4 py-2 text-sm rounded-lg ${
        isActive
          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-white'
          : 'text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
      }`}
    >
      {title}
    </Link>
  );
};

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-20 w-64 h-full pt-16 pb-4 overflow-y-auto transition-transform duration-300 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="px-3 py-4">
        <div className="space-y-2">
          <NavItem icon={<Home size={20} />} title="Dashboard" isActive />

          <NavItem icon={<Box size={20} />} title="Inventory" hasDropdown>
            <SubNavItem title="Products" to="/products" />
            <SubNavItem title="Categories" />
            <SubNavItem title="Stock Management" to='/stock-count'/>
            <SubNavItem title="Warehouse" />
          </NavItem>

          <NavItem icon={<ShoppingCart size={20} />} title="Sales" hasDropdown>
            <SubNavItem title="Orders" to="/orders" />
            <SubNavItem title="Customers" to="/customers" />
            <SubNavItem title="Invoices" />
            <SubNavItem title="Point of Sale" />
          </NavItem>

          <NavItem icon={<Truck size={20} />} title="Procurement" hasDropdown>
            <SubNavItem title="Purchase Orders" to="/purchase-orders"/>
            <SubNavItem title="Vendor" to='/vendors'/>
            <SubNavItem title="Receiving" />
          </NavItem>

          <Link to="/invoice">
          <NavItem icon={<Inbox size={20} />} title="Inward" />
          </Link>

          <NavItem icon={<DollarSign size={20} />} title="Finance" hasDropdown>
            <SubNavItem title="Accounting" />
            <SubNavItem title="Expenses" />
            <SubNavItem title="Banking" />
            <SubNavItem title="Reports" />
          </NavItem>

          <Link to="/inward">
          <NavItem icon={<Inbox size={20} />} title="Inward" />
          </Link>

          <Link to="/outward">
  <NavItem icon={<ArrowUpCircle size={20} />} title="outwards" />
</Link>

          {/* <NavItem icon={<TrendingUp size={20} />} title="Projects" hasDropdown>
            <SubNavItem title="All Projects" />
            <SubNavItem title="Tasks" />
            <SubNavItem title="Gantt Chart" />
          </NavItem> */}


          <NavItem icon={<BarChart size={20} />} title="Reports" />

          <NavItem icon={<Calendar size={20} />} title="Calendar" />

          <NavItem icon={<FileText size={20} />} title="Documents" />

          <NavItem icon={<Settings size={20} />} title="Settings" />

          <NavItem icon={<HelpCircle size={20} />} title="Help Center" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
