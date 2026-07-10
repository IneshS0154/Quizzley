import { useState } from 'react';
import Header from './Header';

export default function ProfilePage({ profile, setProfile, setCurrentPage = () => {} }) {
  const role = localStorage.getItem('role') || 'STUDENT';
  const isAdmin = role === 'ADMIN';

  const [isEditing, setIsEditing] = useState(false);



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
      <Header profile={profile} setCurrentPage={setCurrentPage} />

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
                        {profile.avatar ? (
                          <img src={profile.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                        )}
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
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm shrink-0 flex items-center justify-center bg-slate-100 text-slate-400">
                      {profile.avatar ? (
                        <img src={profile.avatar} alt="Profile photo" className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
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



          </div>

          {/* Right Column: Academic Standing & Account Settings (4/12) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Academic Standing Card (Gradient background) */}


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
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
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
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
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
