import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, MoreVertical, Mail, Users } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const STUDENTS = [
  {
    id: 1,
    name: 'Aarav Mehta',
    email: 'aarav.mehta@example.com',
    specialization: 'Computer Science',
    batch: 'B.Tech 2024',
    status: 'Active',
    lastActive: '2 hours ago',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    specialization: 'Information Technology',
    batch: 'B.Tech 2025',
    status: 'Active',
    lastActive: '1 day ago',
  },
  {
    id: 3,
    name: 'Rohan Verma',
    email: 'rohan.verma@example.com',
    specialization: 'Computer Science',
    batch: 'B.Tech 2024',
    status: 'Inactive',
    lastActive: '5 days ago',
  },
  {
    id: 4,
    name: 'Sneha Patel',
    email: 'sneha.patel@example.com',
    specialization: 'Electronics',
    batch: 'B.Tech 2026',
    status: 'Active',
    lastActive: 'Just now',
  },
  {
    id: 5,
    name: 'Karan Singh',
    email: 'karan.singh@example.com',
    specialization: 'Mechanical Engineering',
    batch: 'B.Tech 2025',
    status: 'Active',
    lastActive: '3 hours ago',
  },
];

const STATUS_STYLES = {
  Active: 'bg-green-100 text-green-700',
  Inactive: 'bg-slate-100 text-slate-500',
};

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-violet-100 text-violet-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-teal-100 text-teal-700',
];

export default function Students() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeItem="students" />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Students</h1>
            <p className="text-slate-500 text-sm mt-0.5">View and manage enrolled students</p>
          </div>
          <button
            onClick={() => {}}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm shadow-blue-200 transition-colors duration-150 cursor-pointer"
          >
            <UserPlus size={16} />
            Add Student
          </button>
        </div>

        {/* Stats mini bar */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Students', value: STUDENTS.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Active', value: STUDENTS.filter((s) => s.status === 'Active').length, icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Inactive', value: STUDENTS.filter((s) => s.status === 'Inactive').length, icon: Users, color: 'text-slate-500', bg: 'bg-slate-100' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-100 shadow-sm px-5 py-4 flex items-center gap-4">
              <div className={`${bg} rounded-lg p-2.5`}>
                <Icon size={18} className={color} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">{label}</p>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Search bar */}
          <div className="px-6 py-4 border-b border-slate-100">
            <div className="relative max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email…"
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Specialization</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Batch</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Active</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400 text-sm">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((student, idx) => (
                    <tr key={student.id} className="hover:bg-slate-50/70 transition-colors duration-100">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}>
                            {getInitials(student.name)}
                          </div>
                          <span className="font-medium text-slate-800">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Mail size={13} className="text-slate-400" />
                          {student.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{student.specialization}</td>
                      <td className="px-6 py-4 text-slate-500">{student.batch}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[student.status]}`}>
                          {student.status === 'Active' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
                          )}
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{student.lastActive}</td>
                      <td className="px-6 py-4 text-right relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === student.id ? null : student.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                        >
                          <MoreVertical size={16} />
                        </button>
                        {openMenu === student.id && (
                          <div className="absolute right-6 top-10 z-10 bg-white border border-slate-200 rounded-xl shadow-lg py-1 w-40">
                            <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer" onClick={() => setOpenMenu(null)}>View Profile</button>
                            <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer" onClick={() => setOpenMenu(null)}>Edit</button>
                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer" onClick={() => setOpenMenu(null)}>Remove</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Showing {filtered.length} of {STUDENTS.length} students</span>
          </div>
        </div>
      </main>
    </div>
  );
}
