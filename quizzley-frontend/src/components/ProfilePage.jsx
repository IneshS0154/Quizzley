import { useState } from 'react';

export default function ProfilePage() {
  const role = localStorage.getItem('role') || 'STUDENT';
  const isAdmin = role === 'ADMIN';
  const storedName = localStorage.getItem('userName') || (isAdmin ? 'System Admin' : 'Student');
  const storedEmail = localStorage.getItem('userEmail') || (isAdmin ? 'admin@quizzley.com' : '');
  const initials = storedName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: storedName,
    studentId: isAdmin ? 'ADMIN-0001' : 'QZ-2024-8931',
    department: isAdmin ? 'Administration' : 'Computer Science & Engineering',
    major: isAdmin ? 'System Manager' : 'Software Engineering, B.S.',
    email: storedEmail,
    graduation: isAdmin ? 'N/A' : 'Spring 2026',
    avatar: ''
  });

  const enrollment = [
    { code: 'CS 301', name: 'Data Structures & Algorithms', credits: 4, grade: 'A-' },
    { code: 'MATH 220', name: 'Linear Algebra', credits: 3, grade: 'B+' },
    { code: 'SWE 410', name: 'Software Architecture', credits: 3, grade: 'A' },
    { code: 'ENG 205', name: 'Technical Writing', credits: 3, grade: 'A' },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen flex flex-col animate-fade-in-up">
      
      {/* Top Search & Profile Bar */}
      <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between shrink-0">
        
        {/* Search */}
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search courses, library..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/60 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Navigation & Avatar Controls */}
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-5 text-xs font-semibold text-slate-500">
            <a href="#courses" className="hover:text-slate-850 transition-colors">My Courses</a>
            <a href="#library" className="hover:text-slate-850 transition-colors">Library</a>
            <a href="#schedule" className="hover:text-slate-850 transition-colors">Schedule</a>
          </nav>
          
          <div className="h-4 w-px bg-slate-200 hidden md:block"></div>

          <div className="flex items-center space-x-3.5">
            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
            </button>

            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {profile.avatar ? (
              <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                <img src={profile.avatar} alt="User avatar" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs border border-blue-500">
                {initials}
              </div>
            )}
          </div>
        </div>

      </header>

      {/* Main Container */}
      <div className="p-8 sm:p-10 flex-1 overflow-y-auto">
        
        {/* Title row */}
        <div className="mb-8 pb-6 border-b border-slate-200/50">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {isAdmin ? 'Admin Profile' : 'Student Profile'}
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {isAdmin ? 'Manage your personal admin credentials and settings.' : 'Manage your personal information and academic settings.'}
          </p>
        </div>

        {/* Two-Column Profile layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Columns: Profile details and enrollments (8/12) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Eleanor Vance Profile Details Card */}
            <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-sm">
              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-6">
                  <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3 uppercase tracking-wider">Edit Profile Details</h3>
                  
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    {/* Interactive Avatar Upload */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-150 shadow-sm group">
                        <img src={profile.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                        <label 
                          htmlFor="avatar-upload" 
                          className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-[10px] font-bold"
                        >
                          <svg className="w-6 h-6 mb-1 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                          </svg>
                          <span>Upload Photo</span>
                        </label>
                        <input 
                          type="file" 
                          id="avatar-upload" 
                          accept="image/*" 
                          onChange={handleFileChange}
                          className="hidden" 
                        />
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase mt-2">Click to change</span>
                    </div>

                    {/* Form Fields Grid */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={profile.name} 
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Graduation Semester</label>
                        <input 
                          type="text" 
                          name="graduation" 
                          value={profile.graduation} 
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Department</label>
                        <input 
                          type="text" 
                          name="department" 
                          value={profile.department} 
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Major</label>
                        <input 
                          type="text" 
                          name="major" 
                          value={profile.major} 
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                          required 
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Institutional Email</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={profile.email} 
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" 
                          required 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4 border-t border-slate-100 justify-end">
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-all cursor-pointer active-spring"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all cursor-pointer active-spring"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 w-full">
                    {/* Profile avatar photo */}
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm shrink-0 flex items-center justify-center bg-blue-600 text-white font-extrabold text-2xl">
                      {profile.avatar ? (
                        <img src={profile.avatar} alt="Profile photo" className="w-full h-full object-cover" />
                      ) : (
                        initials
                      )}
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">{profile.name}</h2>
                      
                      <div className="mt-2.5">
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-extrabold tracking-wide">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                          </svg>
                          <span>{isAdmin ? 'Admin ID' : 'Student ID'}: {profile.studentId}</span>
                        </span>
                      </div>

                      {/* Detail fields info grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-6 pt-6 border-t border-slate-100">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Department</span>
                          <span className="text-xs font-bold text-slate-800 block mt-1 leading-normal">{profile.department}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Major</span>
                          <span className="text-xs font-bold text-slate-800 block mt-1 leading-normal">{profile.major}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Institutional Email</span>
                          <span className="text-xs font-bold text-slate-800 block mt-1 leading-normal break-all">{profile.email}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Expected Graduation</span>
                          <span className="text-xs font-bold text-slate-800 block mt-1 leading-normal">{profile.graduation}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsEditing(true)}
                    className="shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold rounded-xl shadow-sm inline-flex items-center space-x-1.5 transition-all cursor-pointer active-spring"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span>Edit Profile</span>
                  </button>
                </div>
              )}
            </div>

            {/* Current Enrollment Card Table */}
            {!isAdmin && (
              <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
                    <span className="text-blue-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </span>
                    <span>Current Enrollment</span>
                  </h3>
                  <button 
                    onClick={() => alert("Transcript report: Request sent to Registrar Office.")}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center transition-colors cursor-pointer"
                  >
                    <span>View Transcript</span>
                    <span className="ml-1">→</span>
                  </button>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-bold text-slate-400 uppercase border-b border-slate-50">
                        <th className="pb-3 pr-4 font-bold">Course Code</th>
                        <th className="pb-3 px-4 font-bold">Course Name</th>
                        <th className="pb-3 px-4 font-bold">Credits</th>
                        <th className="pb-3 pl-4 font-bold text-right">Current Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {enrollment.map((course, idx) => (
                        <tr key={idx} className="text-xs text-slate-700 font-semibold">
                          <td className="py-3.5 pr-4 text-blue-600 font-bold">{course.code}</td>
                          <td className="py-3.5 px-4 text-slate-800">{course.name}</td>
                          <td className="py-3.5 px-4 text-slate-500">{course.credits}</td>
                          <td className="py-3.5 pl-4 text-right">
                            <span className="inline-block px-2.5 py-1 bg-blue-50/70 border border-blue-100/30 text-blue-650 text-[10px] font-extrabold rounded-lg">
                              {course.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Academic Standing & Account Settings (4/12) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Academic Standing Card (Gradient background) */}
            {!isAdmin && (
              <div className="bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-white p-6 rounded-3xl shadow-md relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/5 border border-white/10"></div>
                
                <div className="flex justify-between items-start">
                  <span className="text-xs font-extrabold tracking-wider uppercase text-blue-100">Academic Standing</span>
                  <span className="text-blue-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                </div>

                {/* GPA */}
                <div className="mt-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-black">3.85</span>
                    <span className="text-sm font-semibold text-blue-150 ml-1">/ 4.00</span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase text-blue-200 tracking-wider block mt-1">Cumulative GPA</span>
                </div>

                {/* Stats Footer Row */}
                <div className="mt-6 pt-6 border-t border-white/15 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xl font-black block">84</span>
                    <span className="text-[9px] font-bold text-blue-150 uppercase tracking-wider block mt-0.5">Credits Earned</span>
                  </div>
                  <div>
                    <span className="text-xl font-black block">16</span>
                    <span className="text-[9px] font-bold text-blue-150 uppercase tracking-wider block mt-0.5">Current Credits</span>
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings List */}
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <h3 className="font-bold text-slate-900 text-base pb-4 border-b border-slate-100 mb-4 flex items-center space-x-2">
                <span className="text-slate-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span>Account Settings</span>
              </h3>

              <div className="space-y-4">
                
                <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 cursor-pointer group transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-indigo-50 text-indigo-650 rounded-xl">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800">Security & Password</span>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Update credentials</p>
                    </div>
                  </div>
                  <span className="text-slate-350 group-hover:text-slate-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 cursor-pointer group transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-blue-50 text-blue-650 rounded-xl">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800">Notification Preferences</span>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Email & SMS alerts</p>
                    </div>
                  </div>
                  <span className="text-slate-350 group-hover:text-slate-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 cursor-pointer group transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-cyan-50 text-cyan-650 rounded-xl">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800">Privacy Settings</span>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Profile visibility</p>
                    </div>
                  </div>
                  <span className="text-slate-350 group-hover:text-slate-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 cursor-pointer group transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-indigo-55/70 text-indigo-650 rounded-xl">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800">Active Sessions</span>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Manage devices</p>
                    </div>
                  </div>
                  <span className="text-slate-350 group-hover:text-slate-500 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
