import React, { useState, useEffect } from 'react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  useEffect(() => {
    // Seed default mock users if localStorage is empty
    const localUsers = localStorage.getItem('mockUsers');
    let parsedUsers = [];
    
    if (localUsers) {
      parsedUsers = JSON.parse(localUsers);
    }
    
    
    // Seed system admin account if not already in store
    const seedUsers = [
      { email: 'admin@quizzley.com', fullName: 'System Admin', phoneNumber: '0000000000', role: 'ADMIN', department: 'Administration', averageScore: '-' }
    ];

    // Merge seed users with existing mockUsers, avoiding duplicates
    const finalUsers = [...parsedUsers];
    seedUsers.forEach(seed => {
      if (!finalUsers.some(u => u.email === seed.email)) {
        finalUsers.push(seed);
      }
    });

    localStorage.setItem('mockUsers', JSON.stringify(finalUsers));
    setUsers(finalUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.department || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    if (roleFilter === 'ALL') return matchesSearch;
    return matchesSearch && user.role === roleFilter;
  });

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8 sm:p-10 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-slate-200/50">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Users Directory</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Manage and monitor students, teachers, and system administrators.</p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search by name, email, or department..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-sm font-medium"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Role Filter:</span>
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Roles</option>
              <option value="STUDENT">Students</option>
              <option value="ADMIN">Administrators</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Phone Number</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-100/50">
                            {user.fullName ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{user.fullName || 'Unnamed'}</div>
                            <div className="text-xs text-slate-400 font-medium">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          user.role === 'ADMIN' 
                            ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-600 font-semibold text-sm">{user.department || 'General'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-500 font-medium text-sm">{user.phoneNumber || '-'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-bold text-sm ${
                          user.averageScore !== '-' && parseFloat(user.averageScore) < 70
                            ? 'text-rose-500'
                            : user.averageScore !== '-' ? 'text-emerald-500' : 'text-slate-400'
                        }`}>
                          {user.averageScore || '-'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-slate-400 text-sm font-medium">
                      No users found matching the query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-slate-200/40 text-center mt-8">
        <p className="text-xs text-slate-400 font-medium">Quizzley Admin Console • © 2026 Quizzley Inc.</p>
      </div>
    </div>
  );
}
