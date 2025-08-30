"use client";

import React, { useState } from "react";
// import { useAppContext } from '../layout';
import {
  Plus,
  Crown,
  Mail,
  Phone,
  MoreVertical,
  UserCheck,
  UserX,
  Shield,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Share2,
} from "lucide-react";
import { useAppContext } from "@/app/layout";

export default function StaqMembersPage() {
  const { selectedStaq } = useAppContext();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showMemberActions, setShowMemberActions] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteMethod, setInviteMethod] = useState("email");
  const [inviteData, setInviteData] = useState({
    email: "",
    phone: "",
    message: "",
  });

  if (!selectedStaq) {
    return <div className="p-4">No Staq selected</div>;
  }

  // Mock members data
  const members = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+234 801 234 5678",
      role: "admin",
      joinDate: "2025-01-01",
      totalContributions: 150000,
      lastContribution: "2025-01-05",
      status: "active",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+234 802 345 6789",
      role: "member",
      joinDate: "2025-01-02",
      totalContributions: 75000,
      lastContribution: "2025-01-04",
      status: "active",
      avatar: "SJ",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "+234 803 456 7890",
      role: "member",
      joinDate: "2025-01-03",
      totalContributions: 25000,
      lastContribution: "2025-01-03",
      status: "pending",
      avatar: "MC",
    },
  ];

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

  const handleInvite = (e) => {
    e.preventDefault();
    console.log("Inviting member:", inviteData);
    setShowInviteModal(false);
    setInviteData({ email: "", phone: "", message: "" });
  };

  const handleMemberAction = (memberId, action) => {
    console.log(`${action} member ${memberId}`);
    setShowMemberActions(null);
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalContributions = members.reduce(
    (sum, member) => sum + member.totalContributions,
    0
  );
  const activeMembers = members.filter((m) => m.status === "active").length;

  return (
    <div className="p-4 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Active Members</span>
            <UserCheck className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-lg font-bold text-green-600">{activeMembers}</p>
          <p className="text-xs text-gray-500">
            {members.length - activeMembers} pending
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Contributed</span>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-lg font-bold text-blue-600">
            {formatCurrency(totalContributions)}
          </p>
          <p className="text-xs text-gray-500">All members combined</p>
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Members</h2>
          <p className="text-sm text-gray-500">
            {members.length} total members
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Invite
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Members List */}
      <div className="space-y-4">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white p-6 rounded-2xl border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600">
                  {member.avatar}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    {member.role === "admin" && (
                      <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs flex items-center">
                        <Crown className="h-3 w-3 mr-1" />
                        Admin
                      </div>
                    )}
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        member.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-2" />
                      {member.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 mr-2" />
                      {member.phone}
                    </div>
                  </div>
                </div>
              </div>

              {selectedStaq.isAdmin && member.role !== "admin" && (
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowMemberActions(
                        showMemberActions === member.id ? null : member.id
                      )
                    }
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                  </button>

                  {showMemberActions === member.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <div className="py-1">
                        <button
                          onClick={() =>
                            handleMemberAction(member.id, "make_admin")
                          }
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center text-sm"
                        >
                          <Shield className="h-4 w-4 mr-2 text-blue-500" />
                          Make Admin
                        </button>
                        <button
                          onClick={() =>
                            handleMemberAction(member.id, "remove")
                          }
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center text-sm text-red-600"
                        >
                          <UserX className="h-4 w-4 mr-2" />
                          Remove Member
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Member Stats */}
            <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Contributed</p>
                <p className="font-semibold text-green-600">
                  {formatCurrency(member.totalContributions)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Joined Date</p>
                <p className="font-medium flex items-center text-sm">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(member.joinDate)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Last Contribution</p>
                <p className="font-medium text-sm">
                  {formatDate(member.lastContribution)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="bg-gray-50 p-8 rounded-xl text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-2">No members found</p>
          <p className="text-sm text-gray-400">
            Try adjusting your search criteria
          </p>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Invite Member</h2>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleInvite} className="space-y-6">
                {/* Invite Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invite Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="method"
                        value="email"
                        checked={inviteMethod === "email"}
                        onChange={(e) => setInviteMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <Mail className="h-5 w-5 mb-1 text-blue-600" />
                        <p className="font-medium">Email</p>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="method"
                        value="phone"
                        checked={inviteMethod === "phone"}
                        onChange={(e) => setInviteMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <Phone className="h-5 w-5 mb-1 text-green-600" />
                        <p className="font-medium">SMS</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Contact Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {inviteMethod === "email"
                      ? "Email Address"
                      : "Phone Number"}
                  </label>
                  <input
                    type={inviteMethod === "email" ? "email" : "tel"}
                    value={inviteData[inviteMethod]}
                    onChange={(e) =>
                      setInviteData((prev) => ({
                        ...prev,
                        [inviteMethod]: e.target.value,
                      }))
                    }
                    placeholder={
                      inviteMethod === "email"
                        ? "friend@email.com"
                        : "+234 801 234 5678"
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    value={inviteData.message}
                    onChange={(e) =>
                      setInviteData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    placeholder="Join our savings group to reach our goals together!"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Note:</strong> The invited person will receive an
                    invitation to join "{selectedStaq.name}" and will need to
                    create an account if they don't have one.
                  </p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Send Invite
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
