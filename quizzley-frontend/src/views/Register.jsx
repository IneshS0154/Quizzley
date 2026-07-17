import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/api';
import { User, Mail, KeyRound, Briefcase, GraduationCap } from 'lucide-react';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [specializationId, setSpecializationId] = useState('');
  const [batchId, setBatchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        fullName,
        email,
        password,
        role,
        specializationId: role === 'STUDENT' ? Number(specializationId) : null,
        batchId: role === 'STUDENT' ? Number(batchId) : null,
      };
      await authApi.register(payload);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-900 rounded-full filter blur-[128px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-4 w-96 h-96 bg-teal-900 rounded-full filter blur-[128px] opacity-30 animate-pulse"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center items-center space-x-3">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent tracking-tight">
            Quizzley
          </span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100 tracking-tight">
          Create account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Or{' '}
          <Link to="/login" className="font-medium text-teal-400 hover:text-teal-300 transition-colors">
            log in to existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 py-8 px-4 shadow-2xl rounded-3xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-2xl text-sm text-red-300">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300">Full Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-800 rounded-2xl bg-slate-950/50 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Email Address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-800 rounded-2xl bg-slate-950/50 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                  placeholder="name@quizzley.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-800 rounded-2xl bg-slate-950/50 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Account Type</label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('STUDENT')}
                  className={`py-3 px-4 border rounded-2xl text-sm font-semibold transition-all ${
                    role === 'STUDENT'
                      ? 'border-teal-500 bg-teal-500/10 text-teal-400'
                      : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:bg-slate-950/50'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('ADMIN')}
                  className={`py-3 px-4 border rounded-2xl text-sm font-semibold transition-all ${
                    role === 'ADMIN'
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                      : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:bg-slate-950/50'
                  }`}
                >
                  Teacher/Admin
                </button>
              </div>
            </div>

            {role === 'STUDENT' && (
              <div className="space-y-4 pt-2 border-t border-slate-800/60">
                <div>
                  <label className="block text-sm font-medium text-slate-300">Specialization</label>
                  <select
                    required
                    value={specializationId}
                    onChange={(e) => setSpecializationId(e.target.value)}
                    className="mt-1 block w-full px-3 py-3 border border-slate-800 rounded-2xl bg-slate-950/50 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                  >
                    <option value="" disabled className="bg-slate-950">Select Specialization</option>
                    <option value="1" className="bg-slate-950">Software Engineering</option>
                    <option value="2" className="bg-slate-950">Cyber Security</option>
                    <option value="3" className="bg-slate-950">Data Science</option>
                    <option value="4" className="bg-slate-950">Information Technology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300">Batch</label>
                  <select
                    required
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    className="mt-1 block w-full px-3 py-3 border border-slate-800 rounded-2xl bg-slate-950/50 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                  >
                    <option value="" disabled className="bg-slate-950">Select Batch</option>
                    <option value="1" className="bg-slate-950">Y1S1 (2026)</option>
                    <option value="2" className="bg-slate-950">Y1S2 (2026)</option>
                    <option value="3" className="bg-slate-950">Y2S1 (2026)</option>
                    <option value="4" className="bg-slate-950">Y2S2 (2026)</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
