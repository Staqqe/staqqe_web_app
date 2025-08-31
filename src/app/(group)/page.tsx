"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { useAppContext } from './layout';
import {
  Send,
  Download,
  Users,
  Plus,
  ArrowRight,
  X,
  Target,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useAppContext } from "../layout";

export default function HomePage() {
  const router = useRouter();
  const { user, transactions, addStaq } = useAppContext();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    goal: "",
    duration: "12",
    contributionType: "flexible",
  });

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCreateStaq = (e) => {
    e.preventDefault();
    const newStaq = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      goal: parseFloat(formData.goal),
      balance: 0,
      members: 1,
      isAdmin: true,
      created: new Date().toISOString(),
      duration: parseInt(formData.duration),
      contributionType: formData.contributionType,
    };

    addStaq(newStaq);
    setShowCreateModal(false);
    setFormData({
      name: "",
      description: "",
      goal: "",
      duration: "12",
      contributionType: "flexible",
    });
    router.push("/staqs");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-medium mb-2">Total Balance</h2>
        <p className="text-3xl font-bold mb-4">
          {formatCurrency(user.balance)}
        </p>
        <div className="flex space-x-3">
          <button className="bg-white bg-opacity-20 backdrop-blur px-4 py-2 rounded-lg flex items-center hover:bg-opacity-30 transition-all">
            <Send className="h-4 w-4 mr-2" />
            Send
          </button>
          <button className="bg-white bg-opacity-20 backdrop-blur px-4 py-2 rounded-lg flex items-center hover:bg-opacity-30 transition-all">
            <Download className="h-4 w-4 mr-2" />
            Receive
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => router.push("/staqs")}
            className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow"
          >
            <Users className="h-8 w-8 text-blue-600 mb-2" />
            <span className="font-medium">My Staqs</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow"
          >
            <Plus className="h-8 w-8 text-blue-600 mb-2" />
            <span className="font-medium">Create Staq</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <button
            onClick={() => router.push("/transactions")}
            className="text-blue-600 text-sm hover:text-blue-800"
          >
            See all
          </button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 3).map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium capitalize">{transaction.type}</p>
                  <p className="text-sm text-gray-500">
                    {transaction.from} → {transaction.to}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(transaction.date)}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === "deposit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "deposit" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Summary */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="font-semibold mb-4">Account Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Account Number</span>
            <span className="font-medium">{user.accountNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Available Balance</span>
            <span className="font-medium text-green-600">
              {formatCurrency(user.balance)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Account Type</span>
            <span className="font-medium">Savings</span>
          </div>
        </div>
      </div>

      {/* Create Staq Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Create New Staq</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateStaq} className="space-y-6">
                {/* Staq Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Staq Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Family Vacation Fund"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="What are you saving for?"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Savings Goal */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Savings Goal (NGN) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="goal"
                      value={formData.goal}
                      onChange={handleInputChange}
                      placeholder="500000"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      min="1000"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (months)
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="18">18 months</option>
                    <option value="24">24 months</option>
                  </select>
                </div>

                {/* Contribution Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contribution Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="contributionType"
                        value="flexible"
                        checked={formData.contributionType === "flexible"}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium">Flexible</p>
                        <p className="text-xs text-gray-500">
                          Any amount, anytime
                        </p>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="contributionType"
                        value="fixed"
                        checked={formData.contributionType === "fixed"}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium">Fixed</p>
                        <p className="text-xs text-gray-500">
                          Set monthly amount
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Create Staq
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
