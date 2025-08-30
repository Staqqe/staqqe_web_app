'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  ArrowLeft, 
  Users, 
  Receipt, 
  MessageSquare, 
  Settings 
} from 'lucide-react';

export default function StaqsLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Users, path: '/staqs' },
    { id: 'transactions', label: 'Transactions', icon: Receipt, path: '/staqs/transactions' },
    { id: 'requests', label: 'Requests', icon: MessageSquare, path: '/staqs/requests' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/staqs/settings' }
  ];

  const isActive = (path) => {
    if (path === '/staqs') {
      return pathname === '/staqs';
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </button>
            <h1 className="text-lg font-semibold">My Staqs</h1>
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.path)}
                  className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    active
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pb-20">
        {children}
      </div>
    </div>
  );
}