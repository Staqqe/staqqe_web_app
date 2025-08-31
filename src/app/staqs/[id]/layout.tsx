"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
// import { useAppContext } from '../layout';
import {
  ArrowLeft,
  BarChart3,
  Users,
  Receipt,
  MessageSquare,
  Settings,
  Crown,
  Target,
} from "lucide-react";
import { useAppContext } from "@/app/layout";

export default function StaqOverviewLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { selectedStaq } = useAppContext();

  if (!selectedStaq) {
    return (
      <div className="p-4">
        <div className="text-center py-12">
          <p className="text-gray-500">No Staq selected</p>
          <button
            onClick={() => router.push("/staqs")}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Go back to Staqs
          </button>
        </div>
      </div>
    );
  }
let baseurl = `/staqs/${selectedStaq.id}`
  const navigationItems = [
    {
      id: "overview",
      label: "Overview",
      icon: BarChart3,
      path: baseurl,
    },
    { id: "members", label: "Members", icon: Users, path:baseurl + "/members" },
    {
      id: "transactions",
      label: "Transactions",
      icon: Receipt,
      path:baseurl + "/transactions",
    },
    {
      id: "requests",
      label: "Requests",
      icon: MessageSquare,
      path:baseurl+ "/requests",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      path:baseurl+ "/settings",
    },
  ];

  const isActive = (path) => {
    if (path === "/staq/overview") {
      return pathname === "/staq/overview";
    }
    return pathname.startsWith(path);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const progressPercentage = Math.min(
    (selectedStaq.balance / selectedStaq.goal) * 100,
    100
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push("/staqs")}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Staqs
            </button>
            <div className="flex items-center space-x-2">
              {selectedStaq.isAdmin && (
                <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs flex items-center">
                  <Crown className="h-3 w-3 mr-1" />
                  Admin
                </div>
              )}
            </div>
          </div>

          {/* Staq Info */}
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-900">
              {selectedStaq.name}
            </h1>
            <p className="text-sm text-gray-500 mb-3">
              {selectedStaq.description}
            </p>

            {/* Progress */}
            {/* <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="text-sm font-medium text-gray-700">
                    Progress
                  </span>
                </div>
                <span className="text-sm font-semibold text-blue-600">
                  {Math.round(progressPercentage)}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-600">
                <span>{formatCurrency(selectedStaq.balance)}</span>
                <span>{formatCurrency(selectedStaq.goal)}</span>
              </div>
            </div> */}
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
                      ? "border-blue-500 text-blue-600 bg-blue-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
      <div className="pb-20">{children}</div>
    </div>
  );
}
