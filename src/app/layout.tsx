"use client";


import React, { useState, createContext, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  User, 
  CreditCard, 
  Users, 
  Settings, 
  Menu,
  X,
  Bell,
  Wallet,
  ArrowLeft
} from 'lucide-react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Create context for app state
const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // App state
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    accountNumber: '1234567890',
    balance: 25750.00,
    avatar: 'JD'
  });

  const [selectedStaq, setSelectedStaq] = useState({
    id: 1,
    name: 'Family Savings',
    balance: 15000.00,
    members: 4,
    admins: ['John Doe', 'Jane Doe'],
    isAdmin: true,
    accountNumber: 'STQ001234567',
    created: '2024-01-15',
    goal: 50000,
    description: 'Saving for family vacation'
  });

  // Sample data
  const staqs = [
    {
      id: 1,
      name: 'Family Savings',
      balance: 15000.00,
      members: 4,
      admins: ['John Doe', 'Jane Doe'],
      isAdmin: true,
      accountNumber: 'STQ001234567',
      created: '2024-01-15',
      goal: 50000,
      description: 'Saving for family vacation'
    },
    {
      id: 2,
      name: 'Friends Fund',
      balance: 8500.50,
      members: 6,
      admins: ['Mike Johnson'],
      isAdmin: false,
      accountNumber: 'STQ001234568',
      created: '2024-02-01',
      goal: 20000,
      description: 'Emergency fund for friends'
    }
  ];

  const requests = [
    {
      id: 1,
      type: 'withdrawal',
      amount: 5000,
      requestedBy: 'Jane Doe',
      staqName: 'Family Savings',
      reason: 'Medical emergency',
      status: 'pending',
      approvals: ['John Doe'],
      totalAdmins: 2,
      createdAt: '2024-08-28T10:30:00Z'
    }
  ];

  const transactions = [
    {
      id: 1,
      type: 'deposit',
      amount: 2000,
      from: 'John Doe',
      to: 'Family Savings',
      date: '2024-08-28T09:00:00Z',
      status: 'completed'
    },
    {
      id: 2,
      type: 'withdrawal',
      amount: 1500,
      from: 'Friends Fund',
      to: 'John Doe',
      date: '2024-08-27T14:30:00Z',
      status: 'completed'
    }
  ];

  // Navigation items
  const generalNavItems = [
    { id: '/', label: 'Home', icon: Home, path: '/' },
    { id: '/profile', label: 'Profile', icon: User, path: '/profile' },
    { id: '/transactions', label: 'Transactions', icon: CreditCard, path: '/transactions' },
    { id: '/staqs', label: 'Staqs', icon: Users, path: '/staqs' }
  ];

  const staqNavItems = [
    { id: '/staq/overview', label: 'Overview', icon: Home, path: '/staq/overview' },
    { id: '/staq/requests', label: 'Requests', icon: Bell, path: '/staq/requests' },
    { id: '/staq/transactions', label: 'Transactions', icon: CreditCard, path: '/staq/transactions' },
    { id: '/staq/members', label: 'Members', icon: Users, path: '/staq/members' },
    { id: '/staq/settings', label: 'Settings', icon: Settings, path: '/staq/settings' }
  ];

  // Determine current navigation
  const isStaqPage = pathname.startsWith('/staq');
  const currentNavItems = isStaqPage ? staqNavItems : generalNavItems;

  // Get page title
  const getPageTitle = () => {
    if (pathname.startsWith('/staq')) {
      const staqTitles = {
        '/staq/overview': selectedStaq?.name || 'Staq',
        '/staq/requests': 'Requests',
        '/staq/transactions': 'Transactions', 
        '/staq/members': 'Members',
        '/staq/settings': 'Settings'
      };
      return staqTitles[pathname] || 'Staq';
    }

    const generalTitles = {
      '/': 'Home',
      '/profile': 'Profile',
      '/transactions': 'Transactions',
      '/staqs': 'My Staqs'
    };
    return generalTitles[pathname] || 'Staq';
  };

  // Navigation component
  const Navigation = ({ items, mobile = false }) => (
    <nav className={mobile ? "flex justify-around bg-white border-t border-gray-200 p-2" : "space-y-2"}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        
        return (
          <button
            key={item.id}
            onClick={() => {
              router.push(item.path);
              if (mobile) setSidebarOpen(false);
            }}
            className={`${
              mobile 
                ? "flex flex-col items-center p-2 text-xs"
                : "flex items-center w-full px-4 py-3 text-sm rounded-lg"
            } ${
              isActive
                ? mobile 
                  ? "text-blue-600"
                  : "bg-blue-50 text-blue-600"
                : mobile
                  ? "text-gray-500"
                  : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Icon className={mobile ? "h-5 w-5 mb-1" : "h-5 w-5 mr-3"} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );


  

  return (
    <html>
      <body>
         <AppContext.Provider value={{
      user,
      selectedStaq,
      setSelectedStaq,
      staqs,
      requests,
      transactions
    }}>

   <main className="flex-1 overflow-auto pb-20 md:pb-0">
            {children}
          </main>
    </AppContext.Provider>


      </body>
    </html>
  );
}