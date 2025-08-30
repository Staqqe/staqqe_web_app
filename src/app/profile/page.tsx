"use client";

import React from "react";
import { useAppContext } from "../layout";
import {
  Edit,
  Shield,
  Settings,
  ArrowRight,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
} from "lucide-react";

export default function ProfilePage() {
  const { user, staqs } = useAppContext();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-medium">
              {user.avatar}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400">Member since Jan 2024</p>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Edit className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{staqs.length}</p>
            <p className="text-sm text-gray-500">Active Staqs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(user.balance)}
            </p>
            <p className="text-sm text-gray-500">Total Balance</p>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="font-semibold mb-4">Account Information</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Account Number</span>
            <span className="font-medium">{user.accountNumber}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Account Balance</span>
            <span className="font-medium">{formatCurrency(user.balance)}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Account Status</span>
            <span className="font-medium text-green-600">Active</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-600">Verification Level</span>
            <span className="font-medium text-blue-600">Verified</span>
          </div>
        </div>
      </div>

      {/* Settings & Actions */}
      <div className="space-y-3">
        <button className="w-full bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center">
            <Edit className="h-5 w-5 text-gray-500 mr-3" />
            <div className="text-left">
              <p className="font-medium">Edit Profile</p>
              <p className="text-sm text-gray-500">
                Update your personal information
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </button>

        <button className="w-full bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-gray-500 mr-3" />
            <div className="text-left">
              <p className="font-medium">Security Settings</p>
              <p className="text-sm text-gray-500">Manage password and 2FA</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </button>

        <button className="w-full bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-gray-500 mr-3" />
            <div className="text-left">
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-gray-500">
                Configure notification preferences
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </button>

        <button className="w-full bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 text-gray-500 mr-3" />
            <div className="text-left">
              <p className="font-medium">Payment Methods</p>
              <p className="text-sm text-gray-500">
                Manage cards and bank accounts
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </button>

        <button className="w-full bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center">
            <Settings className="h-5 w-5 text-gray-500 mr-3" />
            <div className="text-left">
              <p className="font-medium">App Settings</p>
              <p className="text-sm text-gray-500">
                Theme, language, and preferences
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      {/* Support & Legal */}
      <div className="space-y-3">
        <button className="w-full bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center">
            <HelpCircle className="h-5 w-5 text-gray-500 mr-3" />
            <span className="font-medium">Help & Support</span>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </button>

        <button className="w-full bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between hover:shadow-sm transition-shadow">
          <div className="flex items-center">
            <LogOut className="h-5 w-5 text-red-500 mr-3" />
            <span className="font-medium text-red-600">Sign Out</span>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      {/* App Version */}
      <div className="text-center py-4">
        <p className="text-sm text-gray-400">Staq App v1.0.0</p>
      </div>
    </div>
  );
}
