"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import { useAppContext } from './layout';
import {
  ArrowLeft,
  Download,
  Share2,
  CheckCircle,
  Copy,
  Calendar,
  Clock,
  User,
  DollarSign,
  Building2,
} from "lucide-react";
import { useAppContext } from "@/app/layout";
// import { useAppContext } from '../layout';

export default function ReceiptPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { transactions, user } = useAppContext();

  const transactionId = searchParams.get("id");
  const transaction = transactions.find(
    (t) => t.id === parseInt(transactionId)
  );

  if (!transaction) {
    return (
      <div className="p-4">
        <div className="text-center py-12">
          <p className="text-gray-500">Transaction not found</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-NG", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { date, time } = formatDateTime(transaction.date);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const downloadReceipt = () => {
    // Implementation for downloading receipt as PDF
    console.log("Downloading receipt...");
  };

  const shareReceipt = () => {
    // Implementation for sharing receipt
    console.log("Sharing receipt...");
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        <div className="flex items-center space-x-3">
          <button
            onClick={shareReceipt}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button
            onClick={downloadReceipt}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full"
          >
            <Download className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Receipt Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Status Banner */}
        <div
          className={`p-4 text-center ${
            transaction.status === "completed"
              ? "bg-green-50 text-green-800"
              : "bg-yellow-50 text-yellow-800"
          }`}
        >
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="h-6 w-6 mr-2" />
            <span className="font-semibold capitalize">
              Transaction {transaction.status}
            </span>
          </div>
          <p className="text-sm opacity-75">
            {transaction.status === "completed"
              ? "Your transaction was processed successfully"
              : "Your transaction is being processed"}
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-6">
          {/* Amount */}
          <div className="text-center py-6 border-b border-gray-100">
            <p className="text-gray-500 text-sm mb-2">Amount</p>
            <p
              className={`text-4xl font-bold ${
                transaction.type === "deposit"
                  ? "text-green-600"
                  : "text-blue-600"
              }`}
            >
              {formatCurrency(transaction.amount)}
            </p>
            <p className="text-gray-500 text-sm mt-2 capitalize">
              {transaction.type} Transaction
            </p>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Transaction Details</h3>

            {/* Reference Number */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Reference Number</p>
                  <p className="text-sm text-gray-500">TXN{transaction.id}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(`TXN${transaction.id}`)}
                className="p-2 hover:bg-gray-200 rounded-full"
              >
                <Copy className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* From/To */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <User className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">From</p>
                  <p className="text-sm text-gray-500">{transaction.from}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <User className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">To</p>
                  <p className="text-sm text-gray-500">{transaction.to}</p>
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <Calendar className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-sm text-gray-500">{date}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <Clock className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-sm text-gray-500">{time}</p>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                <Building2 className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium">Bank</p>
                <p className="text-sm text-gray-500">Staq Digital Bank</p>
              </div>
            </div>

            {/* Account Number */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                  <User className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium">Account Number</p>
                  <p className="text-sm text-gray-500">{user.accountNumber}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(user.accountNumber)}
                className="p-2 hover:bg-gray-200 rounded-full"
              >
                <Copy className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="border-t border-gray-100 pt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> This is an electronic receipt. Keep this
                for your records. If you have any questions, contact our support
                team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={downloadReceipt}
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
        >
          <Download className="h-5 w-5 mr-2" />
          Download PDF
        </button>
        <button
          onClick={shareReceipt}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Share2 className="h-5 w-5 mr-2" />
          Share Receipt
        </button>
      </div>
    </div>
  );
}
