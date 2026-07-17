import React from 'react';
import Sidebar from '../components/Sidebar';
import { Save, User, Shield, Key, Database } from 'lucide-react';

export default function Settings() {
  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800 font-sans">
      <Sidebar activeItem="settings" />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Settings</h1>
              <p className="text-slate-500 mt-1 text-sm">Configure system properties and profiles.</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Form Card 1 */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <User size={20} className="text-blue-600" />
                <h2 className="font-semibold text-slate-800">Profile Information</h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    defaultValue="System Administrator"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    defaultValue="admin@quizzley.com"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Form Card 2 */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                <Database size={20} className="text-blue-600" />
                <h2 className="font-semibold text-slate-800">Database Connection</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Database Driver</label>
                    <input
                      type="text"
                      disabled
                      defaultValue="MySQL (Connector/J)"
                      className="w-full px-4 py-2 border border-slate-100 bg-slate-50 text-slate-500 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Connection URL</label>
                    <input
                      type="text"
                      disabled
                      defaultValue="jdbc:mysql://localhost:3306/quiz_platform_db"
                      className="w-full px-4 py-2 border border-slate-100 bg-slate-50 text-slate-500 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm cursor-pointer transition shadow-sm">
                <Save size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
