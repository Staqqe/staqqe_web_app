"use client";

import React, { useState } from "react";
import { useAppContext } from "../../../layout";
import {
  Plus,
  TrendingUp,
  Users,
  Calendar,
  Target,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Activity,
  CreditCard,
  Minus,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function StaqOverviewPage() {
  const { selectedStaq, user } = useAppContext();
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showWithdrawalRequests, setShowWithdrawalRequests] = useState(false);
  const [contributeAmount, setContributeAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawReason, setWithdrawReason] = useState("");

  if (!selectedStaq) {
    return <div className="p-4">No Staq selected</div>;
  }

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
    });
  };

  // Mock account details
  const accountDetails = {
    bankName: "First Bank of Nigeria",
    accountNumber: "3087654321",
    accountName: "STAQ POOL - " + selectedStaq.name.toUpperCase(),
    routingNumber: "011000015",
  };

  // Mock user's withdrawable amount
  const userWithdrawableAmount = 75000; // Amount user can withdraw

  // Mock withdrawal requests (for admin view)
  const withdrawalRequests = [
    {
      id: 1,
      user: "Sarah Johnson",
      amount: 50000,
      reason: "Medical emergency",
      date: "2025-01-06T10:30:00Z",
      status: "pending",
      approvals: ["Mike Chen"],
      required_approvals: 2,
    },
    {
      id: 2,
      user: "Mike Chen",
      amount: 25000,
      reason: "Business investment",
      date: "2025-01-05T15:20:00Z",
      status: "approved",
      approvals: ["Sarah Johnson", "You"],
      required_approvals: 2,
    },
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "withdrawal_approved",
      user: "Mike Chen",
      amount: 25000,
      date: "2025-01-05T16:30:00Z",
    },
    {
      id: 2,
      type: "contribution",
      user: "Sarah Johnson",
      amount: 25000,
      date: "2025-01-05T10:30:00Z",
    },
    {
      id: 3,
      type: "withdrawal_request",
      user: "Sarah Johnson",
      amount: 50000,
      date: "2025-01-04T15:20:00Z",
    },
    {
      id: 4,
      type: "contribution",
      user: "You",
      amount: 50000,
      date: "2025-01-03T09:15:00Z",
    },
  ];

  const handleContribute = (e) => {
    e.preventDefault();
    const amount = parseFloat(contributeAmount);
    if (amount > 0 && amount <= user.balance) {
      console.log(`Contributing ${amount} to ${selectedStaq.name}`);
      // Update staq balance and user balance here
      setShowContributeModal(false);
      setContributeAmount("");
    }
  };

  const handleWithdrawRequest = (e) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= selectedStaq.balance) {
      console.log(
        `Requesting withdrawal of ${amount} from ${selectedStaq.name}. Reason: ${withdrawReason}`
      );
      // Create withdrawal request here
      setShowWithdrawModal(false);
      setWithdrawAmount("");
      setWithdrawReason("");
    }
  };

  const handleWithdrawFromPool = (amount) => {
    console.log(`Withdrawing ${amount} from withdrawable pool`);
    // Handle withdrawal from user's withdrawable amount
  };

  const handleReturnToPool = (amount) => {
    console.log(`Returning ${amount} back to staq pool`);
    // Handle returning money back to staq pool
  };

  const handleApproveWithdrawal = (requestId) => {
    console.log(`Approving withdrawal request ${requestId}`);
    // Handle approval logic
  };

  const handleRejectWithdrawal = (requestId) => {
    console.log(`Rejecting withdrawal request ${requestId}`);
    // Handle rejection logic
  };

  const progressPercentage = Math.min(
    (selectedStaq.balance / selectedStaq.goal) * 100,
    100
  );

  return (
    <div className="p-4 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Current Balance</span>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-lg font-bold text-green-600">
            {formatCurrency(selectedStaq.balance)}
          </p>
          <p className="text-xs text-gray-500">
            {Math.round(progressPercentage)}% of goal
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Members</span>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-lg font-bold text-blue-600">
            {selectedStaq.members}
          </p>
          <p className="text-xs text-gray-500">Active contributors</p>
        </div>
      </div>

      {/* Withdrawable Amount (if user has any) */}
      {userWithdrawableAmount > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-700 text-sm font-medium">
              Your Withdrawable Amount
            </span>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </div>
          <p className="text-lg font-bold text-purple-600 mb-3">
            {formatCurrency(userWithdrawableAmount)}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleWithdrawFromPool(userWithdrawableAmount)}
              className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Withdraw Now
            </button>
            <button
              onClick={() => handleReturnToPool(userWithdrawableAmount)}
              className="flex-1 bg-white text-purple-600 border border-purple-300 py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors"
            >
              Return to Pool
            </button>
          </div>
        </div>
      )}

      {/* Account Details */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
              Staq Account Details
            </h3>
            <button
              onClick={() => setShowAccountDetails(!showAccountDetails)}
              className="text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {showAccountDetails ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {showAccountDetails && (
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Bank Name</span>
                <span className="font-medium text-sm">
                  {accountDetails.bankName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Account Number</span>
                <span className="font-mono font-medium text-sm">
                  {accountDetails.accountNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Account Name</span>
                <span className="font-medium text-sm text-right">
                  {accountDetails.accountName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Routing Number</span>
                <span className="font-mono font-medium text-sm">
                  {accountDetails.routingNumber}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setShowContributeModal(true)}
          className="bg-blue-600 text-white p-4 rounded-xl flex flex-col items-center hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-6 w-6 mb-2" />
          <span className="font-medium">Contribute</span>
        </button>
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="bg-red-600 text-white p-4 rounded-xl flex flex-col items-center hover:bg-red-700 transition-colors"
        >
          <Minus className="h-6 w-6 mb-2" />
          <span className="font-medium">Request Withdrawal</span>
        </button>
      </div>

      {/* Withdrawal Requests (Admin View) */}
      {selectedStaq.isAdmin && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-orange-600" />
                Withdrawal Requests
              </h3>
              <button
                onClick={() =>
                  setShowWithdrawalRequests(!showWithdrawalRequests)
                }
                className="text-blue-600 text-sm hover:text-blue-800"
              >
                {showWithdrawalRequests ? "Hide" : "Show"} (
                {
                  withdrawalRequests.filter((r) => r.status === "pending")
                    .length
                }{" "}
                pending)
              </button>
            </div>
          </div>

          {showWithdrawalRequests && (
            <div className="divide-y divide-gray-200">
              {withdrawalRequests.map((request) => (
                <div key={request.id} className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{request.user}</p>
                      <p className="text-sm text-gray-600">{request.reason}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(request.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        {formatCurrency(request.amount)}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          request.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : request.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {request.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mb-3">
                    Approvals: {request.approvals.length}/
                    {request.required_approvals}
                    {request.approvals.length > 0 &&
                      ` (${request.approvals.join(", ")})`}
                  </div>

                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveWithdrawal(request.id)}
                        className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectWithdrawal(request.id)}
                        className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center">
              <Activity className="h-5 w-5 mr-2 text-gray-600" />
              Recent Activity
            </h3>
            <button className="text-blue-600 text-sm hover:text-blue-800">
              See all
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "contribution"
                        ? "bg-green-100"
                        : activity.type === "withdrawal_approved"
                        ? "bg-purple-100"
                        : activity.type === "withdrawal_request"
                        ? "bg-orange-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {activity.type === "contribution" ? (
                      <ArrowDownRight className="h-4 w-4 text-green-600" />
                    ) : activity.type === "withdrawal_approved" ? (
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                    ) : activity.type === "withdrawal_request" ? (
                      <ArrowUpRight className="h-4 w-4 text-orange-600" />
                    ) : (
                      <Users className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {activity.type === "contribution"
                        ? `${activity.user} contributed ${formatCurrency(
                            activity.amount
                          )}`
                        : activity.type === "withdrawal_approved"
                        ? `${activity.user}'s withdrawal of ${formatCurrency(
                            activity.amount
                          )} was approved`
                        : activity.type === "withdrawal_request"
                        ? `${
                            activity.user
                          } requested withdrawal of ${formatCurrency(
                            activity.amount
                          )}`
                        : `${activity.user} joined the staq`}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(activity.date)}
                    </p>
                  </div>
                </div>
                {activity.amount && (
                  <span
                    className={`font-semibold ${
                      activity.type === "contribution"
                        ? "text-green-600"
                        : activity.type === "withdrawal_approved"
                        ? "text-purple-600"
                        : "text-orange-600"
                    }`}
                  >
                    {activity.type === "contribution" ? "+" : "-"}
                    {formatCurrency(activity.amount)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staq Details */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="font-semibold mb-4">Staq Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">{selectedStaq.duration} months</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Contribution Type</span>
            <span className="font-medium capitalize">
              {selectedStaq.contributionType}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Created Date</span>
            <span className="font-medium">
              {formatDate(selectedStaq.created)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Your Role</span>
            <span className="font-medium">
              {selectedStaq.isAdmin ? "Administrator" : "Member"}
            </span>
          </div>
        </div>
      </div>

      {/* Contribute Modal */}
      {showContributeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Contribute to Staq</h2>
                <button
                  onClick={() => setShowContributeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-blue-900 mb-2">
                  {selectedStaq.name}
                </h3>
                <div className="flex justify-between text-sm text-blue-700">
                  <span>Current: {formatCurrency(selectedStaq.balance)}</span>
                  <span>Goal: {formatCurrency(selectedStaq.goal)}</span>
                </div>
              </div>

              <form onSubmit={handleContribute} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount to Contribute (NGN)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={contributeAmount}
                      onChange={(e) => setContributeAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      min="100"
                      max={user.balance}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Available balance: {formatCurrency(user.balance)}
                  </p>
                </div>

                {/* Quick Amount Buttons */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Quick amounts:
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[5000, 10000, 25000].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setContributeAmount(amount.toString())}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                        disabled={amount > user.balance}
                      >
                        {formatCurrency(amount)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Note:</strong> Your contribution will be instantly
                    added to the staq balance and deducted from your account.
                  </p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContributeModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !contributeAmount ||
                      parseFloat(contributeAmount) <= 0 ||
                      parseFloat(contributeAmount) > user.balance
                    }
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Contribute
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Request Withdrawal</h2>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="bg-red-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-red-900 mb-2">
                  {selectedStaq.name}
                </h3>
                <div className="flex justify-between text-sm text-red-700">
                  <span>Available: {formatCurrency(selectedStaq.balance)}</span>
                  <span>Members: {selectedStaq.members}</span>
                </div>
              </div>

              <form onSubmit={handleWithdrawRequest} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount to Request (NGN)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                      min="100"
                      max={selectedStaq.balance}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum: {formatCurrency(selectedStaq.balance)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Withdrawal
                  </label>
                  <textarea
                    value={withdrawReason}
                    onChange={(e) => setWithdrawReason(e.target.value)}
                    placeholder="Please provide a reason for this withdrawal request..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 h-24 resize-none"
                    required
                  />
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-orange-700">
                    <strong>Note:</strong> Your withdrawal request will need
                    approval from other admins before you can access the funds.
                  </p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowWithdrawModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !withdrawAmount ||
                      !withdrawReason ||
                      parseFloat(withdrawAmount) <= 0 ||
                      parseFloat(withdrawAmount) > selectedStaq.balance
                    }
                    className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Minus className="h-4 w-4 mr-2" />
                    Request
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
