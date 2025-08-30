// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAppContext } from '../layout';
// import { 
//   Plus, 
//   ArrowRight, 
//   Users, 
//   Target, 
//   Calendar,
//   Search,
//   Filter,
//   Crown,
//   Shield
// } from 'lucide-react';

// export default function StaqsPage() {
//   const router = useRouter();
//   const { staqs, setSelectedStaq } = useAppContext();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');

//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-NG', {
//       style: 'currency',
//       currency: 'NGN'
//     }).format(amount);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-NG', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   // Filter staqs
//   const filteredStaqs = staqs.filter(staq => {
//     const matchesSearch = staq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          staq.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterType === 'all' || 
//                          (filterType === 'admin' && staq.isAdmin) ||
//                          (filterType === 'member' && !staq.isAdmin);
//     return matchesSearch && matchesFilter;
//   });

//   const handleStaqClick = (staq) => {
//     setSelectedStaq(staq);
//     router.push('/staq/overview');
//   };

//   return (
//     <div className="p-4 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-lg font-semibold">My Staqs</h2>
//           <p className="text-sm text-gray-500">{staqs.length} active groups</p>
//         </div>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
//           <Plus className="h-4 w-4 mr-2" />
//           Create
//         </button>
//       </div>

//       {/* Search and Filter */}
//       <div className="bg-white rounded-xl p-4 border border-gray-200">
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input 
//               type="text" 
//               placeholder="Search staqs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//             <Filter className="h-5 w-5 text-gray-500" />
//           </button>
//         </div>

//         {/* Filter Tabs */}
//         <div className="flex space-x-2">
//           {[
//             { id: 'all', label: 'All Staqs' },
//             { id: 'admin', label: 'Admin' },
//             { id: 'member', label: 'Member' }
//           ].map((filter) => (
//             <button
//               key={filter.id}
//               onClick={() => setFilterType(filter.id)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 filterType === filter.id
//                   ? 'bg-blue-100 text-blue-600'
//                   : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               {filter.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-2 gap-4">
//         <div className="bg-white p-4 rounded-xl border border-gray-200">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600 text-sm">Total Savings</span>
//             <Target className="h-4 w-4 text-blue-500" />
//           </div>
//           <p className="text-lg font-bold text-blue-600">
//             {formatCurrency(staqs.reduce((sum, staq) => sum + staq.balance, 0))}
//           </p>
//         </div>

//         <div className="bg-white p-4 rounded-xl border border-gray-200">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-gray-600 text-sm">Admin Roles</span>
//             <Crown className="h-4 w-4 text-yellow-500" />
//           </div>
//           <p className="text-lg font-bold text-yellow-600">
//             {staqs.filter(staq => staq.isAdmin).length}
//           </p>
//         </div>
//       </div>

//       {/* Staqs List */}
//       <div className="space-y-4">
//         {filteredStaqs.length > 0 ? (
//           filteredStaqs.map((staq) => (
//             <div 
//               key={staq.id} 
//               onClick={() => handleStaqClick(staq)}
//               className="bg-white p-6 rounded-2xl border border-gray-200 cursor-pointer hover:shadow-md transition-all duration-200 hover:border-blue-200"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-2 mb-1">
//                     <h3 className="font-semibold text-lg">{staq.name}</h3>
//                     {staq.isAdmin && (
//                       <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs flex items-center">
//                         <Shield className="h-3 w-3 mr-1" />
//                         Admin
//                       </div>
//                     )}
//                   </div>
//                   <p className="text-sm text-gray-500 mb-2">{staq.description}</p>
//                   <div className="flex items-center space-x-4 text-xs text-gray-400">
//                     <div className="flex items-center">
//                       <Users className="h-3 w-3 mr-1" />
//                       {staq.members} members
//                     </div>
//                     <div className="flex items-center">
//                       <Calendar className="h-3 w-3 mr-1" />
//                       {formatDate(staq.created)}
//                     </div>
//                   </div>
//                 </div>
//                 <ArrowRight className="h-5 w-5 text-gray-400 mt-2" />
//               </div>
              
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600 text-sm">Current Balance</span>
//                   <span className="font-semibold text-lg">{formatCurrency(staq.balance)}</span>
//                 </div>
                
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600 text-sm">Target Goal</span>
//                   <span className="font-medium text-gray-900">{formatCurrency(staq.goal)}</span>
//                 </div>
                
//                 {/* Progress Bar */}
//                 <div className="space-y-2">
//                   <div className="w-full bg-gray-200 rounded-full h-3">
//                     <div 
//                       className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300" 
//                       style={{ width: `${Math.min((staq.balance / staq.goal) * 100, 100)}%` }}
//                     ></div>
//                   </div>
                  
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">
//                       {Math.round((staq.balance / staq.goal) * 100)}% achieved
//                     </span>
//                     <span className="text-gray-500">
//                       {formatCurrency(staq.goal - staq.balance)} remaining
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="bg-gray-50 p-8 rounded-xl text-center">
//             <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="h-8 w-8 text-gray-400" />
//             </div>
//             <p className="text-gray-500 mb-2">No staqs found</p>
//             <p className="text-sm text-gray-400 mb-4">Try adjusting your search criteria or create a new staq</p>
//             <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//               Create Your First Staq
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Create Staq CTA */}
//       {filteredStaqs.length > 0 && (
//         <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-semibold text-blue-900 mb-1">Start a New Staq</h3>
//               <p className="text-sm text-blue-700">Invite friends and family to save together</p>
//             </div>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//               Create Staq
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


let v =()=>{
  <></>
}

export default v