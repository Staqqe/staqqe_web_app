"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { useAppContext } from '../layout';
import {
  Edit3,
  Target,
  Users,
  Bell,
  Trash2,
  Lock,
  Calendar,
  AlertTriangle,
  Save,
  X,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAppContext } from "@/app/layout";

export default function StaqSettingsPage() {
  const router = useRouter();
  const { selectedStaq, updateStaq, removeStaq } = useAppContext();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({
    name: selectedStaq?.name || "",
    description: selectedStaq?.description || "",
    goal: selectedStaq?.goal || "",
    duration: selectedStaq?.duration || 12,
  });
  const [notifications, setNotifications] = useState({
    newContributions: true,
    goalReached: true,
    newMembers: false,
    requests: true,
  });

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

  const handleUpdateStaq = (e) => {
    e.preventDefault();
    const updatedStaq = {
      ...selectedStaq,
      name: editData.name,
      description: editData.description,
      goal: parseFloat(editData.goal),
      duration: parseInt(editData.duration),
    };
    updateStaq && updateStaq(updatedStaq);
    setShowEditModal(false);
  };

  const handleDeleteStaq = () => {
    removeStaq && removeStaq(selectedStaq.id);
    setShowDeleteModal(false);
    router.push("/staqs");
  };

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const settingsItems = [
    // {
    //   category: "Basic Information",
    //   items: [
    //     {
    //       icon: Edit3,
    //       title: "Edit Staq Details",
    //       subtitle: "Change name, description, and goal",
    //       action: () => setShowEditModal(true),
    //       adminOnly: true,
    //     },
    //     {
    //       icon: Target,
    //       title: "Goal Settings",
    //       subtitle: "Adjust savings target and timeline",
    //       action: () => console.log("Goal settings"),
    //       adminOnly: true,
    //     },
    //   ],
    // },
    // {
    //   category: "Membership",
    //   items: [
    //     {
    //       icon: Users,
    //       title: "Member Permissions",
    //       subtitle: "Manage member roles and access",
    //       action: () => console.log("Member permissions"),
    //       adminOnly: true,
    //     },
    //     {
    //       icon: Lock,
    //       title: "Privacy Settings",
    //       subtitle: "Control who can join and see the staq",
    //       action: () => console.log("Privacy settings"),
    //       adminOnly: true,
    //     },
    //   ],
    // },
    {
      category: "Notifications",
      items: [
        {
          icon: Bell,
          title: "Notification Preferences",
          subtitle: "Choose what updates you receive",
          component: "notifications",
        },
      ],
    },
    // {
    //   category: "Advanced",
    //   items: [
    //     {
    //       icon: Calendar,
    //       title: "Auto-Save Settings",
    //       subtitle: "Set up automatic contributions",
    //       action: () => console.log("Auto-save settings"),
    //     },
    //     {
    //       icon: Shield,
    //       title: "Security Settings",
    //       subtitle: "Manage staq security options",
    //       action: () => console.log("Security settings"),
    //       adminOnly: true,
    //     },
    //   ],
    // },
    {
      category: "Danger Zone",
      items: [
        {
          icon: Trash2,
          title: "Delete Staq",
          subtitle: "Permanently delete this staq",
          action: () => setShowDeleteModal(true),
          destructive: true,
          adminOnly: true,
        },
      ],
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Staqs Settings</h2>
        <p className="text-sm text-gray-500">
          Manage General Staq settings and preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsItems.map((section) => (
          <div
            key={section.category}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
          >
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">
                {section.category}
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {section.items.map((item, index) => {
                // Skip admin-only items if user is not admin
                if (item.adminOnly && !selectedStaq.isAdmin) {
                  return null;
                }

                return (
                  <div key={index}>
                    {item.component === "notifications" ? (
                      <div className="p-6">
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <item.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-500">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4 ml-13">
                          {Object.entries(notifications).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between"
                            >
                              <div>
                                <p className="font-medium">
                                  {key === "newContributions" &&
                                    "New Contributions"}
                                  {key === "goalReached" && "Goal Reached"}
                                  {key === "newMembers" && "New Members"}
                                  {key === "requests" && "Payment Requests"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {key === "newContributions" &&
                                    "When someone contributes to this staq"}
                                  {key === "goalReached" &&
                                    "When the savings goal is achieved"}
                                  {key === "newMembers" &&
                                    "When new members join the staq"}
                                  {key === "requests" &&
                                    "When payment requests are sent"}
                                </p>
                              </div>
                              <button
                                onClick={() => handleNotificationToggle(key)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  value ? "bg-blue-600" : "bg-gray-200"
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    value ? "translate-x-6" : "translate-x-1"
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={item.action}
                        className={`w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                          item.destructive ? "hover:bg-red-50" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              item.destructive ? "bg-red-100" : "bg-blue-100"
                            }`}
                          >
                            <item.icon
                              className={`h-5 w-5 ${
                                item.destructive
                                  ? "text-red-600"
                                  : "text-blue-600"
                              }`}
                            />
                          </div>
                          <div className="text-left">
                            <h4
                              className={`font-medium ${
                                item.destructive
                                  ? "text-red-600"
                                  : "text-gray-900"
                              }`}
                            >
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>
                        <div className="text-gray-400">›</div>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Staq Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Edit Staq</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateStaq} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Staq Name
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Savings Goal (NGN)
                  </label>
                  <input
                    type="number"
                    value={editData.goal}
                    onChange={(e) =>
                      setEditData((prev) => ({ ...prev, goal: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    min="1000"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Current: {formatCurrency(selectedStaq.goal)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (months)
                  </label>
                  <select
                    value={editData.duration}
                    onChange={(e) =>
                      setEditData((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="18">18 months</option>
                    <option value="24">24 months</option>
                  </select>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-yellow-800 font-medium">
                        Important
                      </p>
                      <p className="text-sm text-yellow-700">
                        Changes to the goal amount will be visible to all
                        members. Consider discussing major changes with your
                        group first.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Staq Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-red-900">
                    Delete Staq
                  </h2>
                </div>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-700">
                  Are you sure you want to delete{" "}
                  <strong>"{selectedStaq.name}"</strong>? This action cannot be
                  undone.
                </p>

                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-800 font-medium mb-2">
                    This will:
                  </p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Remove all members from the staq</li>
                    <li>• Delete all transaction history</li>
                    <li>• Return remaining balance to members</li>
                    <li>• Permanently delete all staq data</li>
                  </ul>
                </div>

                <div className="border border-gray-300 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Type the staq name to confirm:
                  </p>
                  <input
                    type="text"
                    placeholder={selectedStaq.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteStaq}
                    className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Staq
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
