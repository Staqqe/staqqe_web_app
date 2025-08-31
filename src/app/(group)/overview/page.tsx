"use client";

import React, { useState } from "react";
import { useAppContext } from "../../layout";
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
} from "lucide-react";

export default function StaqOverviewPage() {
  const { selectedStaq, user } = useAppContext();
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [contributeAmount, setContributeAmount] = useState("");

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

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: "contribution",
      user: "Sarah Johnson",
      amount: 25000,
      date: "2025-01-05T10:30:00Z",
    },
    {
      id: 2,
      type: "member_joined",
      user: "Mike Chen",
      date: "2025-01-04T15:20:00Z",
    },
    {
      id: 3,
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

  const progressPercentage = Math.min(
    (selectedStaq.balance / selectedStaq.goal) * 100,
    100
  );
  const remainingAmount = selectedStaq.goal - selectedStaq.balance;
  const estimatedMonthsToGoal = Math.ceil(
    remainingAmount / (selectedStaq.balance / 12)
  ); // Rough estimate

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

      {/* Goal Progress */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            Goal Progress
          </h3>
          <span className="text-sm text-gray-500">
            {formatDate(selectedStaq.created)}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Target Amount</span>
            <span className="font-semibold">
              {formatCurrency(selectedStaq.goal)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Remaining</span>
            <span className="font-semibold text-orange-600">
              {formatCurrency(remainingAmount)}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${Math.max(progressPercentage, 8)}%` }}
            >
              {progressPercentage > 15 && (
                <span className="text-white text-xs font-medium">
                  {Math.round(progressPercentage)}%
                </span>
              )}
            </div>
          </div>

          {remainingAmount > 0 && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Estimate:</strong> {estimatedMonthsToGoal} months to
                reach goal at current rate
              </p>
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
        <button className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center hover:shadow-md transition-shadow">
          <Users className="h-6 w-6 text-gray-600 mb-2" />
          <span className="font-medium">Invite Members</span>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
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
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "contribution"
                        ? "bg-green-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {activity.type === "contribution" ? (
                      <ArrowDownRight className="h-4 w-4 text-green-600" />
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
                        : `${activity.user} joined the staq`}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(activity.date)}
                    </p>
                  </div>
                </div>
                {activity.amount && (
                  <span className="font-semibold text-green-600">
                    +{formatCurrency(activity.amount)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staq Details */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
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
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
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
    </div>
  );
}
