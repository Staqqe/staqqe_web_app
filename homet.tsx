import React, { useState } from 'react';
import { 
  Home, 
  User, 
  CreditCard, 
  Users, 
  Settings, 
  Menu,
  X,
  Plus,
  ArrowRight,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  Download,
  UserPlus,
  UserMinus,
  Edit,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  Wallet
} from 'lucide-react';

const StaqApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedStaq, setSelectedStaq] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    accountNumber: '1234567890',
    balance: 25750.00,
    avatar: 'JD'
  });

  // Sample data
  const staqs = [
    {
      id: 1,
      name: 'Family Savings',
      balance: 15000.00,
      members: 4,
      admins: ['John Doe', 'Jane Doe'],
      isAdmin: true,
      accountNumber: 'STQ001234567',
      created: '2024-01-15',
      goal: 50000,
      description: 'Saving for family vacation'
    },
    {
      id: 2,
      name: 'Friends Fund',
      balance: 8500.50,
      members: 6,
      admins: ['Mike Johnson'],
      isAdmin: false,
      accountNumber: 'STQ001234568',
      created: '2024-02-01',
      goal: 20000,
      description: 'Emergency fund for friends'
    }
  ];

  const requests = [
    {
      id: 1,
      type: 'withdrawal',
      amount: 5000,
      requestedBy: 'Jane Doe',
      staqName: 'Family Savings',
      reason: 'Medical emergency',
      status: 'pending',
      approvals: ['John Doe'],
      totalAdmins: 2,
      createdAt: '2024-08-28T10:30:00Z'
    }
  ];

  const transactions = [
    {
      id: 1,
      type: 'deposit',
      amount: 2000,
      from: 'John Doe',
      to: 'Family Savings',
      date: '2024-08-28T09:00:00Z',
      status: 'completed'
    },
    {
      id: 2,
      type: 'withdrawal',
      amount: 1500,
      from: 'Friends Fund',
      to: 'John Doe',
      date: '2024-08-27T14:30:00Z',
      status: 'completed'
    }
  ];

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'staqs', label: 'Staqs', icon: Users }
  ];

  const staqNavItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'requests', label: 'Requests', icon: Bell },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Navigation component
  const Navigation = ({ items, current, onChange, mobile = false }) => (
    <nav className={mobile ? "flex justify-around bg-white border-t border-gray-200 p-2" : "space-y-2"}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`${
              mobile 
                ? "flex flex-col items-center p-2 text-xs"
                : "flex items-center w-full px-4 py-3 text-sm rounded-lg"
            } ${
              current === item.id
                ? mobile 
                  ? "text-blue-600"
                  : "bg-blue-50 text-blue-600"
                : mobile
                  ? "text-gray-500"
                  : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Icon className={mobile ? "h-5 w-5 mb-1" : "h-5 w-5 mr-3"} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );

  // Header component
  const Header = ({ title, showBack = false, onBack }) => (
    <header className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {showBack ? (
            <button onClick={onBack} className="mr-4 p-1">
              <X className="h-6 w-6" />
            </button>
          ) : (
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="md:hidden mr-4 p-1"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="h-6 w-6 text-gray-500" />
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">{user.avatar}</span>
          </div>
        </div>
      </div>
    </header>
  );

  // Home Page
  const HomePage = () => (
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-medium mb-2">Total Balance</h2>
        <p className="text-3xl font-bold mb-4">{formatCurrency(user.balance)}</p>
        <div className="flex space-x-3">
          <button className="bg-white bg-opacity-20 backdrop-blur px-4 py-2 rounded-lg flex items-center">
            <Send className="h-4 w-4 mr-2" />
            Send
          </button>
          <button className="bg-white bg-opacity-20 backdrop-blur px-4 py-2 rounded-lg flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Receive
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setCurrentPage('staqs')}
            className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center"
          >
            <Users className="h-8 w-8 text-blue-600 mb-2" />
            <span className="font-medium">My Staqs</span>
          </button>
          <button className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center">
            <Plus className="h-8 w-8 text-blue-600 mb-2" />
            <span className="font-medium">Create Staq</span>
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <button 
            onClick={() => setCurrentPage('transactions')}
            className="text-blue-600 text-sm"
          >
            See all
          </button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 3).map((transaction) => (
            <div key={transaction.id} className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium capitalize">{transaction.type}</p>
                  <p className="text-sm text-gray-500">{transaction.from} → {transaction.to}</p>
                  <p className="text-xs text-gray-400">{formatDate(transaction.date)}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Profile Page
  const ProfilePage = () => (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-medium">{user.avatar}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Account Number</span>
            <span className="font-medium">{user.accountNumber}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Account Balance</span>
            <span className="font-medium">{formatCurrency(user.balance)}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-600">Active Staqs</span>
            <span className="font-medium">{staqs.length}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button className="w-full bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <Edit className="h-5 w-5 text-gray-500 mr-3" />
            <span>Edit Profile</span>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </button>
        
        <button className="w-full bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-gray-500 mr-3" />
            <span>Security Settings</span>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </button>
        
        <button className="w-full bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <Settings className="h-5 w-5 text-gray-500 mr-3" />
            <span>App Settings</span>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );

  // Transactions Page
  const TransactionsPage = () => (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search transactions..."
            className="bg-gray-100 border-0 rounded-lg px-3 py-2 text-sm flex-1"
          />
        </div>
        <Filter className="h-5 w-5 text-gray-500" />
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    transaction.type === 'deposit' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <p className="font-medium capitalize">{transaction.type}</p>
                </div>
                <p className="text-sm text-gray-600">{transaction.from}</p>
                <p className="text-sm text-gray-600">→ {transaction.to}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(transaction.date)}</p>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  transaction.status === 'completed' 
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Staqs Page
  const StaqsPage = () => (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">My Staqs</h2>
          <p className="text-sm text-gray-500">{staqs.length} active groups</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Create
        </button>
      </div>

      <div className="space-y-4">
        {staqs.map((staq) => (
          <div 
            key={staq.id} 
            onClick={() => {
              setSelectedStaq(staq);
              setCurrentPage('staq-overview');
            }}
            className="bg-white p-6 rounded-2xl border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{staq.name}</h3>
                <p className="text-sm text-gray-500">{staq.description}</p>
              </div>
              {staq.isAdmin && (
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                  Admin
                </span>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Balance</span>
                <span className="font-semibold">{formatCurrency(staq.balance)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Goal</span>
                <span className="font-medium">{formatCurrency(staq.goal)}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(staq.balance / staq.goal) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{staq.members} members</span>
                <span className="text-gray-500">{Math.round((staq.balance / staq.goal) * 100)}% achieved</span>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Staq Overview Page
  const StaqOverviewPage = () => (
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
        <h2 className="text-lg font-medium mb-2">{selectedStaq?.name}</h2>
        <p className="text-3xl font-bold mb-2">{formatCurrency(selectedStaq?.balance || 0)}</p>
        <p className="text-blue-100 text-sm mb-4">Account: {selectedStaq?.accountNumber}</p>
        
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mb-2">
          <div 
            className="bg-white h-2 rounded-full" 
            style={{ width: `${((selectedStaq?.balance || 0) / (selectedStaq?.goal || 1)) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-blue-100">
          <span>Goal: {formatCurrency(selectedStaq?.goal || 0)}</span>
          <span>{Math.round(((selectedStaq?.balance || 0) / (selectedStaq?.goal || 1)) * 100)}% achieved</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center">
          <Send className="h-6 w-6 text-blue-600 mb-2" />
          <span className="text-sm font-medium">Deposit</span>
        </button>
        <button className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center">
          <Download className="h-6 w-6 text-blue-600 mb-2" />
          <span className="text-sm font-medium">Withdraw</span>
        </button>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Recent Activity</h3>
          <button 
            onClick={() => setCurrentPage('staq-transactions')}
            className="text-blue-600 text-sm"
          >
            See all
          </button>
        </div>
        
        <div className="space-y-3">
          {transactions.slice(0, 3).map((transaction) => (
            <div key={transaction.id} className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium capitalize">{transaction.type}</p>
                  <p className="text-sm text-gray-500">{transaction.from}</p>
                  <p className="text-xs text-gray-400">{formatDate(transaction.date)}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Pending Requests</h3>
          <button 
            onClick={() => setCurrentPage('staq-requests')}
            className="text-blue-600 text-sm"
          >
            See all
          </button>
        </div>
        
        {requests.length > 0 ? (
          <div className="space-y-3">
            {requests.slice(0, 2).map((request) => (
              <div key={request.id} className="bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="font-medium capitalize">{request.type} Request</p>
                    <p className="text-sm text-gray-600">{formatCurrency(request.amount)}</p>
                    <p className="text-xs text-gray-400">by {request.requestedBy}</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">
                    {request.approvals.length}/{request.totalAdmins} approved
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-xl text-center">
            <p className="text-gray-500">No pending requests</p>
          </div>
        )}
      </div>
    </div>
  );

  // Staq Requests Page
  const StaqRequestsPage = () => (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Requests</h2>
          <p className="text-sm text-gray-500">{selectedStaq?.name}</p>
        </div>
        <Filter className="h-5 w-5 text-gray-500" />
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white p-6 rounded-2xl border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="font-medium capitalize">{request.type} Request</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {formatCurrency(request.amount)}
                </p>
                <p className="text-sm text-gray-600 mb-1">Requested by {request.requestedBy}</p>
                <p className="text-xs text-gray-400">{formatDate(request.createdAt)}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                request.status === 'pending' 
                  ? 'bg-yellow-100 text-yellow-700'
                  : request.status === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
              }`}>
                {request.status}
              </span>
            </div>

            {request.reason && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Reason:</p>
                <p className="text-sm text-gray-600">{request.reason}</p>
              </div>
            )}

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Approvals</span>
                <span className="text-sm text-gray-500">
                  {request.approvals.length} of {request.totalAdmins} required
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(request.approvals.length / request.totalAdmins) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {request.approvals.map((admin, index) => (
                  <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {admin}
                  </span>
                ))}
              </div>
            </div>

            {selectedStaq?.isAdmin && request.status === 'pending' && !request.approvals.includes(user.name) && (
              <div className="flex space-x-3">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium">
                  Approve
                </button>
                <button className="flex-1 border border-red-200 text-red-600 py-2 px-4 rounded-lg font-medium">
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Staq Transactions Page
  const StaqTransactionsPage = () => (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Transactions</h2>
          <p className="text-sm text-gray-500">{selectedStaq?.name}</p>
        </div>
        <Filter className="h-5 w-5 text-gray-500" />
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-white p-4 rounded-xl border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    transaction.type === 'deposit' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <p className="font-medium capitalize">{transaction.type}</p>
                </div>
                <p className="text-sm text-gray-600">{transaction.from}</p>
                <p className="text-sm text-gray-600">→ {transaction.to}</p>
                <p className="text-xs text-gray-400 mt-1">{formatDate(transaction.date)}</p>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  transaction.status === 'completed' 
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Staq Members Page
  const StaqMembersPage = () => {
    const members = [
      { id: 1, name: 'John Doe', role: 'Admin', joined: '2024-01-15', avatar: 'JD' },
      { id: 2, name: 'Jane Doe', role: 'Admin', joined: '2024-01-15', avatar: 'JD' },
      { id: 3, name: 'Mike Johnson', role: 'Member', joined: '2024-02-01', avatar: 'MJ' },
      { id: 4, name: 'Sarah Wilson', role: 'Member', joined: '2024-02-15', avatar: 'SW' }
    ];

    return (
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Members</h2>
            <p className="text-sm text-gray-500">{selectedStaq?.name} • {members.length} members</p>
          </div>
          {selectedStaq?.isAdmin && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
              <UserPlus className="h-4 w-4 mr-2" />
              Add
            </button>
          )}
        </div>

        <div className="space-y-3">
          {members.map((member) => (
            <div key={member.id} className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">{member.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        member.role === 'Admin' 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {member.role}
                      </span>
                      <span className="text-xs text-gray-500">
                        Joined {formatDate(member.joined)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {selectedStaq?.isAdmin && member.name !== user.name && (
                  <button className="p-2">
                    <MoreHorizontal className="h-5 w-5 text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Staq Settings Page
  const StaqSettingsPage = () => (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Settings</h2>
        <p className="text-sm text-gray-500">{selectedStaq?.name}</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="font-semibold mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
              <input 
                type="text" 
                defaultValue={selectedStaq?.name}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                disabled={!selectedStaq?.isAdmin}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                defaultValue={selectedStaq?.description}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20"
                disabled={!selectedStaq?.isAdmin}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Savings Goal</label>
              <input 
                type="number" 
                defaultValue={selectedStaq?.goal}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                disabled={!selectedStaq?.isAdmin}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="font-semibold mb-4">Withdrawal Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Admin Approval Required</p>
                <p className="text-sm text-gray-500">All withdrawals must be approved by admins</p>
              </div>
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only" disabled={!selectedStaq?.isAdmin} />
                <div className="w-12 h-6 bg-blue-600 rounded-full shadow-inner"></div>
                <div className="absolute w-4 h-4 bg-white rounded-full shadow right-1 top-1 transition"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Member Withdrawal</p>
                <p className="text-sm text-gray-500">Allow all members to request withdrawals</p>
              </div>
              <div className="relative">
                <input type="checkbox" className="sr-only" disabled={!selectedStaq?.isAdmin} />
                <div className="w-12 h-6 bg-gray-300 rounded-full shadow-inner"></div>
                <div className="absolute w-4 h-4 bg-white rounded-full shadow left-1 top-1 transition"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="font-semibold mb-4">Account Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Account Number</span>
              <span className="font-medium">{selectedStaq?.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Created</span>
              <span className="font-medium">{formatDate(selectedStaq?.created)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Members</span>
              <span className="font-medium">{selectedStaq?.members}</span>
            </div>
          </div>
        </div>

        {selectedStaq?.isAdmin && (
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-medium">
              Save Changes
            </button>
            
            <button className="w-full border border-red-200 text-red-600 p-4 rounded-xl font-medium">
              Delete Staq
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Main render function
  const renderPage = () => {
    if (currentPage.startsWith('staq-')) {
      const staqPage = currentPage.replace('staq-', '');
      
      switch (staqPage) {
        case 'overview':
          return <StaqOverviewPage />;
        case 'requests':
          return <StaqRequestsPage />;
        case 'transactions':
          return <StaqTransactionsPage />;
        case 'members':
          return <StaqMembersPage />;
        case 'settings':
          return <StaqSettingsPage />;
        default:
          return <StaqOverviewPage />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'profile':
        return <ProfilePage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'staqs':
        return <StaqsPage />;
      default:
        return <HomePage />;
    }
  };

  const getPageTitle = () => {
    if (currentPage.startsWith('staq-')) {
      const staqPage = currentPage.replace('staq-', '');
      const titles = {
        'overview': selectedStaq?.name || 'Staq',
        'requests': 'Requests',
        'transactions': 'Transactions',
        'members': 'Members',
        'settings': 'Settings'
      };
      return titles[staqPage] || 'Staq';
    }

    const titles = {
      'home': 'Home',
      'profile': 'Profile',
      'transactions': 'Transactions',
      'staqs': 'My Staqs'
    };
    return titles[currentPage] || 'Staq';
  };

  const isStaqPage = currentPage.startsWith('staq-');
  const currentNavItems = isStaqPage ? staqNavItems : navItems;
  const currentNav = isStaqPage ? currentPage.replace('staq-', '') : currentPage;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
          <div className="flex items-center px-6 py-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Staq</span>
            </div>
          </div>
          
          <div className="flex-1 px-4 py-6">
            {isStaqPage && (
              <div className="mb-6">
                <button 
                  onClick={() => {
                    setSelectedStaq(null);
                    setCurrentPage('staqs');
                  }}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                >
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Back to Staqs
                </button>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="font-medium text-sm">{selectedStaq?.name}</p>
                  <p className="text-xs text-gray-500">{formatCurrency(selectedStaq?.balance || 0)}</p>
                </div>
              </div>
            )}
            
            <Navigation 
              items={currentNavItems}
              current={currentNav}
              onChange={(page) => {
                if (isStaqPage) {
                  setCurrentPage(`staq-${page}`);
                } else {
                  setCurrentPage(page);
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 h-full bg-white">
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Staq</span>
              </div>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="px-4 py-6">
              {isStaqPage && (
                <div className="mb-6">
                  <button 
                    onClick={() => {
                      setSelectedStaq(null);
                      setCurrentPage('staqs');
                      setSidebarOpen(false);
                    }}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                    Back to Staqs
                  </button>
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="font-medium text-sm">{selectedStaq?.name}</p>
                    <p className="text-xs text-gray-500">{formatCurrency(selectedStaq?.balance || 0)}</p>
                  </div>
                </div>
              )}
              
              <Navigation 
                items={currentNavItems}
                current={currentNav}
                onChange={(page) => {
                  if (isStaqPage) {
                    setCurrentPage(`staq-${page}`);
                  } else {
                    setCurrentPage(page);
                  }
                  setSidebarOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0">
        <Header 
          title={getPageTitle()}
          showBack={isStaqPage}
          onBack={() => {
            setSelectedStaq(null);
            setCurrentPage('staqs');
          }}
        />
        
        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          {renderPage()}
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <Navigation 
            items={currentNavItems}
            current={currentNav}
            onChange={(page) => {
              if (isStaqPage) {
                setCurrentPage(`staq-${page}`);
              } else {
                setCurrentPage(page);
              }
            }}
            mobile={true}
          />
        </div>
      </div>
    </div>
  );
};

export default StaqApp;