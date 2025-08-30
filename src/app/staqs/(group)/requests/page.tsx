"use client";

import React, { useState } from "react";
// import { useAppContext } from '../layout';
import {
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  Users,
  Calendar,
  DollarSign,
  MessageCircle,
} from "lucide-react";
import { useAppContext } from "@/app/layout";

export default function StaqsRequestsPage() {
  const { user } = useAppContext();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("received");
  const [formData, setFormData] = useState({
    type: "contribution",
    amount: "",
    description: "",
    dueDate: "",
  });

  // Mock requests data
  const requests = {
    received: [
      {
        id: 1,
        type: "contribution",
        from: "Family Vacation Staq",
        amount: 50000,
        description: "Monthly contribution for December",
        dueDate: "2025-01-15",
        status: "pending",
        createdAt: "2025-01-05",
      },
      {
        id: 2,
        type: "join",
        from: "Sarah Johnson",
        staqName: "House Fund Staq",
        description: "Would like to join your savings group",
        status: "pending",
        createdAt: "2025-01-03",
      },
    ],
    sent: [
      {
        id: 3,
        type: "contribution",
        to: "Wedding Staq",
        amount: 25000,
        description: "Contribution reminder for venue booking",
        dueDate: "2025-01-20",
        status: "approved",
        createdAt: "2025-01-02",
      },
    ],
  };

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

  const handleCreateRequest = (e) => {
    e.preventDefault();
    console.log("Creating request:", formData);
    setShowCreateModal(false);
    setFormData({
      type: "contribution",
      amount: "",
      description: "",
      dueDate: "",
    });
  };

  const handleRequestAction = (requestId, action) => {
    console.log(`${action} request ${requestId}`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "declined":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Requests</h2>
          <p className="text-sm text-gray-500">
            Manage contribution and join requests
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex">
          {[
            {
              id: "received",
              label: "Received",
              count: requests.received.length,
            },
            { id: "sent", label: "Sent", count: requests.sent.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests[activeTab].length > 0 ? (
          requests[activeTab].map((request) => (
            <div
              key={request.id}
              className="bg-white p-6 rounded-2xl border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      request.type === "contribution"
                        ? "bg-blue-100"
                        : "bg-purple-100"
                    }`}
                  >
                    {request.type === "contribution" ? (
                      <DollarSign
                        className={`h-5 w-5 ${
                          request.type === "contribution"
                            ? "text-blue-600"
                            : "text-purple-600"
                        }`}
                      />
                    ) : (
                      <Users className="h-5 w-5 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold capitalize">
                        {request.type} Request
                      </h3>
                      <div className="flex items-center">
                        {getStatusIcon(request.status)}
                        <span
                          className={`ml-1 text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {activeTab === "received"
                        ? `From: ${request.from || request.staqName}`
                        : `To: ${request.to}`}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Created {formatDate(request.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div className="space-y-3">
                {request.amount && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Amount</span>
                    <span className="font-semibold text-lg">
                      {formatCurrency(request.amount)}
                    </span>
                  </div>
                )}

                {request.dueDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Due Date</span>
                    <span className="font-medium">
                      {formatDate(request.dueDate)}
                    </span>
                  </div>
                )}

                {request.description && (
                  <div>
                    <span className="text-gray-600 text-sm block mb-1">
                      Description
                    </span>
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg text-sm">
                      {request.description}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                {activeTab === "received" && request.status === "pending" && (
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => handleRequestAction(request.id, "decline")}
                      className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleRequestAction(request.id, "approve")}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      {request.type === "contribution" ? "Pay Now" : "Approve"}
                    </button>
                  </div>
                )}

                {request.status !== "pending" && (
                  <div className="pt-4">
                    <button className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-50 p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">No {activeTab} requests</p>
            <p className="text-sm text-gray-400">
              {activeTab === "received"
                ? "You don't have any pending requests"
                : "You haven't sent any requests yet"}
            </p>
          </div>
        )}
      </div>

      {/* Create Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Create Request</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCreateRequest} className="space-y-6">
                {/* Request Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Request Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="type"
                        value="contribution"
                        checked={formData.type === "contribution"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            type: e.target.value,
                          }))
                        }
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium">Contribution</p>
                        <p className="text-xs text-gray-500">Request payment</p>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="type"
                        value="withdrawal"
                        checked={formData.type === "withdrawal"}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            type: e.target.value,
                          }))
                        }
                        className="mr-3"
                      />
                      <div>
                        <p className="font-medium">Withdrawal</p>
                        <p className="text-xs text-gray-500">Request payout</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (NGN)
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Add a note about this request..."
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        dueDate: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Request
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
