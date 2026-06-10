import { useState } from 'react';

export default function AdminQuizManagersPage() {
  const [managers, setManagers] = useState(() => {
    // Load users from localStorage and filter for QUIZ_MANAGER
    const localUsers = localStorage.getItem('mockUsers');
    let parsedUsers = [];
    if (localUsers) {
      parsedUsers = JSON.parse(localUsers);
    }

    // Default seed Quiz Managers if none exist in mockUsers
    const seedQuizManagers = [
      {
        fullName: 'Dr. Angela Carter',
        email: 'angela.c@quizzley.edu',
        role: 'QUIZ_MANAGER',
        department: 'Computer Science',
        dateJoined: 'May 10, 2023',
        status: 'ACTIVE',
        phoneNumber: '1234567890',
        averageScore: '—'
      },
      {
        fullName: 'Prof. Robert Hood',
        email: 'r.hood@quizzley.edu',
        role: 'QUIZ_MANAGER',
        department: 'Mathematics',
        dateJoined: 'Feb 14, 2024',
        status: 'ACTIVE',
        phoneNumber: '0987654321',
        averageScore: '—'
      }
    ];

    // Merge seed managers if they are not already in the main user list
    let updatedUsers = [...parsedUsers];
    let addedAny = false;
    seedQuizManagers.forEach(seed => {
      if (!updatedUsers.some(u => u.email === seed.email)) {
        updatedUsers.push(seed);
        addedAny = true;
      }
    });

    if (addedAny) {
      localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
    }

    // Display only QUIZ_MANAGERs
    return updatedUsers.filter(u => u.role === 'QUIZ_MANAGER');
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  
  // Validation and feedback states
  const [modalError, setModalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Sync state when mockUsers changes
  const reloadManagers = () => {
    const localUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    setManagers(localUsers.filter(u => u.role === 'QUIZ_MANAGER'));
  };

  const handlePhoneChange = (e, setter) => {
    const val = e.target.value;
    if (val === '' || /^\d*$/.test(val)) {
      if (val.length <= 10) {
        setter(val);
      }
    }
  };

  const handleAddManager = (e) => {
    e.preventDefault();
    setModalError(null);

    // Validations
    if (!fullName.trim() || !email.trim() || !phoneNumber.trim() || !password.trim()) {
      setModalError("All fields are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setModalError("Please enter a valid email address.");
      return;
    }

    if (phoneNumber.length !== 10) {
      setModalError("Phone number must be exactly 10 digits.");
      return;
    }

    if (password.length < 6) {
      setModalError("Password must be at least 6 characters.");
      return;
    }

    const localUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    if (localUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setModalError("A user with this email address already exists.");
      return;
    }

    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });

    const newManager = {
      fullName,
      email,
      phoneNumber,
      password,
      role: 'QUIZ_MANAGER',
      department,
      status: 'ACTIVE', // Instantly active because admin added them
      dateJoined: formattedDate,
      averageScore: '—'
    };

    const updatedUsers = [...localUsers, newManager];
    localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
    
    // Reset form states
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setDepartment('Computer Science');
    setIsModalOpen(false);
    
    // Reload UI
    reloadManagers();
    
    // Show success notification
    setSuccessMessage(`Quiz Manager "${fullName}" added successfully!`);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // Filter logic
  const filteredManagers = managers.filter(manager => {
    const matchesSearch = 
      (manager.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (manager.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (manager.department || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDept = true;
    if (deptFilter !== 'ALL') {
      matchesDept = manager.department === deptFilter;
    }

    return matchesSearch && matchesDept;
  });

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8 sm:p-10 flex flex-col justify-between relative animate-fade-in-up">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-slate-200/50">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Quiz Managers</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium font-sans">
              Add and manage faculty administrators who can create, configure, and grade quizzes.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button 
              onClick={() => {
                setModalError(null);
                setIsModalOpen(true);
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-750 text-white text-sm font-semibold rounded-xl flex items-center space-x-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer bg-[#0B2545]"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Quiz Manager</span>
            </button>
          </div>
        </div>

        {/* Success message banner */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl flex items-center shadow-sm">
            <svg className="w-5 h-5 mr-3 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Search Input Box */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search by name, email, department..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all text-xs font-semibold"
            />
          </div>

          {/* Filtering dropdown selector */}
          <div className="flex items-center gap-3">
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
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
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

        {/* Quiz Managers Table Card */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-[#0B2545] text-white">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Manager</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Contact Number</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Date Added</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredManagers.length > 0 ? (
                  filteredManagers.map((manager, index) => {
                    const initials = manager.fullName
                      ? manager.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
                      : 'M';
                    
                    return (
                      <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                        {/* Manager Column */}
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3.5">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-100/50 shrink-0">
                              {initials}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm leading-tight">{manager.fullName || 'Unnamed'}</div>
                              <div className="text-xs text-slate-400 font-semibold mt-0.5">{manager.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Phone Number */}
                        <td className="px-6 py-4 text-slate-650 font-semibold text-sm">
                          {manager.phoneNumber || '—'}
                        </td>

                        {/* Department Column */}
                        <td className="px-6 py-4">
                          <span className="text-slate-650 font-semibold text-sm">{manager.department || 'General'}</span>
                        </td>

                        {/* Date Joined Column */}
                        <td className="px-6 py-4">
                          <span className="text-slate-500 font-semibold text-sm">{manager.dateJoined || '—'}</span>
                        </td>

                        {/* Status Column */}
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-blue-600">
                            {manager.status || 'Active'}
                          </span>
                        </td>

                        {/* Actions Column */}
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => alert(`Details/edit panel for Quiz Manager ${manager.fullName}.`)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors inline-flex items-center cursor-pointer"
                          >
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
                      No Quiz Managers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Simple Showing Summary Footer */}
          <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">
              Showing 1 to {filteredManagers.length} of {filteredManagers.length} results
            </span>
            
            {/* Pagination */}
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

      {/* Modern Add Quiz Manager Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 animate-scale-in">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#0B2545] text-white flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Add Quiz Manager</h3>
                <p className="text-xs text-slate-300 mt-1 font-medium">Create a new Quiz Manager account</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddManager} className="p-6 space-y-4">
              {modalError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center">
                  <svg className="w-4 h-4 mr-2 text-rose-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">{modalError}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Jane Doe"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all text-xs font-semibold"
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jane.doe@quizzley.edu"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all text-xs font-semibold"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Phone Number (10 digits)</label>
                <input 
                  type="tel" 
                  value={phoneNumber}
                  onChange={(e) => handlePhoneChange(e, setPhoneNumber)}
                  placeholder="e.g. 5550192834"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all text-xs font-semibold"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all text-xs font-semibold"
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Department</label>
                <div className="relative">
                  <select 
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer pr-8 appearance-none text-xs font-semibold"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="General">General</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-455">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  Save Manager
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
