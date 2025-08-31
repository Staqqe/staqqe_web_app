"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { useAppContext } from '../layout';
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Calendar,
  Receipt,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useAppContext } from "../../layout";
// import { useAppContext } from "@/app/layout";

export default function StaqsTransactionsPage() {
  const router = useRouter();
  const { transactions } = useAppContext();
  console.log(transactions, "uiui");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showFilterModal, setShowFilterModal] = useState(false);

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

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleViewReceipt = (transactionId) => {
    router.push(`/receipt?id=${transactionId}`);
  };

  // Calculate stats
  const totalDeposits = transactions
    .filter((t) => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalWithdrawals = transactions
    .filter((t) => t.type === "withdrawal")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-4 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Deposits</span>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-lg font-bold text-green-600">
            {formatCurrency(totalDeposits)}
          </p>
          <p className="text-xs text-gray-500">
            {transactions.filter((t) => t.type === "deposit").length}{" "}
            transactions
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Withdrawals</span>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-lg font-bold text-red-600">
            {formatCurrency(totalWithdrawals)}
          </p>
          <p className="text-xs text-gray-500">
            {transactions.filter((t) => t.type === "withdrawal").length}{" "}
            transactions
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilterModal(true)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2">
          {[
            { id: "all", label: "All" },
            { id: "deposit", label: "Deposits" },
            { id: "withdrawal", label: "Withdrawals" },
            { id: "transfer", label: "Transfers" },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterType(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === filter.id
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "deposit"
                        ? "bg-green-100"
                        : transaction.type === "withdrawal"
                        ? "bg-red-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {transaction.type === "deposit" ? (
                      <ArrowDownRight className={`h-5 w-5 text-green-600`} />
                    ) : (
                      <ArrowUpRight
                        className={`h-5 w-5 ${
                          transaction.type === "withdrawal"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium capitalize">{transaction.type}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.from} → {transaction.to}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(transaction.date)}
                    </p>
                  </div>
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
                  <div className="flex items-center space-x-2 mt-1">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {transaction.status}
                    </span>
                    <button
                      onClick={() => handleViewReceipt(transaction.id)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <Receipt className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">No transactions found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filter Transactions</h2>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Transaction Type */}
                <div>
                  <h3 className="font-medium mb-3">Transaction Type</h3>
                  <div className="space-y-2">
                    {[
                      { id: "all", label: "All Transactions" },
                      { id: "deposit", label: "Deposits Only" },
                      { id: "withdrawal", label: "Withdrawals Only" },
                      { id: "transfer", label: "Transfers Only" },
                    ].map((option) => (
                      <label key={option.id} className="flex items-center">
                        <input
                          type="radio"
                          name="transactionType"
                          value={option.id}
                          checked={filterType === option.id}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <h3 className="font-medium mb-3">Date Range</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="From"
                    />
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="To"
                    />
                  </div>
                </div>

                {/* Amount Range */}
                <div>
                  <h3 className="font-medium mb-3">Amount Range</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min amount"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max amount"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Apply Filters */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
