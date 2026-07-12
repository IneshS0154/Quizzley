import React, { useState, useEffect } from 'react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');

  useEffect(() => {
    // Seed default mock users matching Screenshot 3 if empty
    const localUsers = localStorage.getItem('mockUsers');
    let parsedUsers = [];
    
    if (localUsers) {
      parsedUsers = JSON.parse(localUsers);
    }
    
    // Default seed users matching the screenshot precisely
    const seedUsers = [
      { 
        fullName: 'Sarah Jenkins', 
        email: 'sarah.j@quizzley.edu', 
        role: 'STUDENT', 
        department: 'Computer Science', 
        dateJoined: 'Sep 12, 2023', 
        status: 'ACTIVE', 
        averageScore: '85%' 
      },
      { 
        fullName: 'Marcus Reed', 
        email: 'm.reed@quizzley.edu', 
        role: 'ADMIN', 
        department: 'Mathematics', 
        dateJoined: 'Jan 05, 2022', 
        status: 'ACTIVE', 
        averageScore: '—' 
      },
      { 
        fullName: 'David Chen', 
        email: 'd.chen@quizzley.edu', 
        role: 'STUDENT', 
        department: 'Physics', 
        dateJoined: 'Oct 22, 2023', 
        status: 'INACTIVE', 
        averageScore: '65%' 
      },
      { 
        fullName: 'System Admin', 
        email: 'admin@quizzley.com', 
        password: 'admin123',
        role: 'ADMIN', 
        department: 'Administration', 
        dateJoined: 'Jan 01, 2022', 
        status: 'ACTIVE', 
        averageScore: '—' 
      }
    ];

    // Merge seed users with existing mockUsers, avoiding duplicate emails
    const finalUsers = [...parsedUsers];
    seedUsers.forEach(seed => {
      if (!finalUsers.some(u => u.email === seed.email)) {
        finalUsers.push(seed);
      }
    });

    localStorage.setItem('mockUsers', JSON.stringify(finalUsers));
    setUsers(finalUsers);
  }, []);



  // Filter logic
  const filteredUsers = users.filter(user => {
    if (user.role === 'QUIZ_MANAGER') {
      return false;
    }
    const matchesSearch = 
      (user.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.department || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesRole = true;
    if (roleFilter !== 'ALL') {
      matchesRole = user.role === roleFilter;
    }

    let matchesDept = true;
    if (deptFilter !== 'ALL') {
      matchesDept = user.department === deptFilter;
    }

    return matchesSearch && matchesRole && matchesDept;
  });

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8 sm:p-10 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-slate-200/50">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">User Management</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium font-sans">
              Manage students, faculty, and administrators across the platform.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button 
              onClick={() => alert("Registration of new users is handled through the main login screen or signup forms.")}
              className="px-5 py-2.5 bg-[#0a2540] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl flex items-center space-x-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add New User</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Search Input Box */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-450">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-850 placeholder-slate-450 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all text-xs font-semibold"
            />
          </div>

          {/* Filtering dropdown selectors */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Roles selector */}
            <div className="relative">
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer pr-8 appearance-none shadow-sm"
              >
                <option value="ALL">All Roles</option>
                <option value="STUDENT">Students</option>
                <option value="ADMIN">Admins</option>
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>

            {/* Departments selector */}
            <div className="relative">
              <select 
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer pr-8 appearance-none shadow-sm"
              >
                <option value="ALL">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Administration">Administration</option>
                <option value="General">General</option>
              </select>
              <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>

        </div>

        {/* Users Table Card */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-[#0B2545] text-white">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Date Joined</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => {
                    const initials = user.fullName
                      ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
                      : 'U';
                    
                    return (
                      <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                        {/* User Column */}
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3.5">
                            {/* Avatar placeholder with initials */}
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-100/50 shrink-0">
                              {initials}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm leading-tight">{user.fullName || 'Unnamed'}</div>
                              <div className="text-xs text-slate-400 font-semibold mt-0.5">{user.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Role Column */}
                        <td className="px-6 py-4">
                          <span className={`text-sm ${
                            user.role === 'ADMIN' ? 'font-bold text-slate-900' : 'text-slate-550'
                          }`}>
                            {user.role === 'ADMIN' ? 'Admin' : (user.role === 'QUIZ_MANAGER' ? 'Quiz Manager' : 'Student')}
                          </span>
                        </td>

                        {/* Department Column */}
                        <td className="px-6 py-4">
                          <span className="text-slate-650 font-semibold text-sm">{user.department || 'General'}</span>
                        </td>

                        {/* Date Joined Column */}
                        <td className="px-6 py-4">
                          <span className="text-slate-500 font-semibold text-sm">{user.dateJoined || '—'}</span>
                        </td>

                        {/* Status Column */}
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            user.status === 'ACTIVE' 
                              ? 'bg-blue-50 text-blue-600' 
                              : (user.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-rose-50 text-rose-600')
                          }`}>
                            {user.status === 'ACTIVE' ? 'Active' : (user.status === 'PENDING' ? 'Pending Approval' : (user.status === 'DENIED' ? 'Denied' : 'Inactive'))}
                          </span>
                        </td>

                        {/* Actions Column */}
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => alert(`Edit capabilities for ${user.fullName} can be added here.`)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors inline-flex items-center cursor-pointer"
                          >
                            {/* Edit Pencil Icon */}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400 text-sm font-semibold">
                      No users found matching filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Simple Showing Summary Footer */}
          <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">
              Showing 1 to {filteredUsers.length} of {filteredUsers.length} results
            </span>
            
            {/* Pagination placeholder matching layout */}
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed text-xs font-bold">&lt;</button>
              <button className="w-8 h-8 rounded-lg text-xs font-bold bg-[#0B2545] text-white">1</button>
              <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed text-xs font-bold">&gt;</button>
            </div>
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
