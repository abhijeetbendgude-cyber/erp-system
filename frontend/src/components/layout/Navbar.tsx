import React, { useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  Settings, 
  Search, 
  Moon, 
  Sun, 
  User,
  Menu,
  X
} from 'lucide-react';

type NavbarProps = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // This would actually implement dark mode in a real application
  };

  const notifications = [
    { id: 1, message: 'New order received (#1234)', time: '2 min ago', isRead: false },
    { id: 2, message: 'Monthly report ready', time: '1 hour ago', isRead: false },
    { id: 3, message: 'Staff meeting at 3 PM', time: '3 hours ago', isRead: true },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full shadow-sm transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              aria-expanded={isSidebarOpen}
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                ERP<span className="text-indigo-600 dark:text-indigo-400">System</span>
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden lg:flex lg:flex-1 mx-4">
            <div className="relative w-full max-w-xl mr-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className="flex items-center">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                  {notifications.filter(n => !n.isRead).length}
                </span>
                <Bell size={20} />
              </button>

              {/* Notifications dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 dark:bg-gray-700 border dark:border-gray-600">
                  <div className="px-4 py-2 font-medium text-gray-700 border-b border-gray-200 dark:text-white dark:border-gray-600">
                    Notifications
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 border-b border-gray-200 dark:border-gray-600 ${
                          !notification.isRead ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
                        }`}
                      >
                        <div className="text-sm text-gray-800 dark:text-white">{notification.message}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 text-sm text-center text-indigo-600 font-medium border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 dark:text-indigo-400">
                    View all notifications
                  </div>
                </div>
              )}
            </div>

            {/* Profile dropdown */}
            <div className="relative ml-3">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open user menu</span>
                <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <User className="absolute w-10 h-10 text-gray-400 -left-1" />
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 dark:bg-gray-700 border dark:border-gray-600">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;