import React, { useState } from 'react';
<<<<<<< Updated upstream
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BookOpen, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { loginSuccess } from '../store/authSlice';
import api from '../api/axios';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      const user = {
        role: data.role,
        email: data.email,
        name: data.fullName,
        fullName: data.fullName,
        userId: data.userId,
      };
      dispatch(loginSuccess({ token: data.token, user }));
      if (data.role === 'STUDENT') {
        navigate('/student/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Invalid email or password. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
=======
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import { authApi } from '../services/api';
import { KeyRound, Mail, Sparkles, GraduationCap } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const data = await authApi.login(email, password);
      dispatch(loginSuccess(data));
      if (data.user.role === 'ADMIN' || data.user.role === 'QUIZ_MANAGER') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      dispatch(loginFailure(err.message || 'Authentication failed'));
    }
  };

  const handleQuickLogin = (role) => {
    if (role === 'teacher') {
      setEmail('teacher@quizzley.com');
      setPassword('password');
    } else {
      setEmail('student@quizzley.com');
      setPassword('password');
>>>>>>> Stashed changes
    }
  };

  return (
<<<<<<< Updated upstream
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-blue-100/50 border border-slate-100 overflow-hidden">
        {/* Top accent */}
        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600" />

        <div className="p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-md mb-4">
              <BookOpen size={26} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Quizzley</h1>
            <p className="text-slate-500 text-sm mt-1">Quiz Platform for Educators</p>
          </div>

          <h2 className="text-lg font-semibold text-slate-800 mb-1">Welcome back</h2>
          <p className="text-slate-500 text-sm mb-6">Sign in to your account to continue</p>

          {/* Error Banner */}
          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-10 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-150 text-sm mt-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Footer link */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Don&apos;t have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 font-medium hover:underline cursor-pointer"
            >
              Register
            </button>
          </p>
=======
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
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
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Or{' '}
          <Link to="/register" className="font-medium text-teal-400 hover:text-teal-300 transition-colors">
            create a new account
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
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Quick Login Helpers */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-xs text-slate-500 uppercase tracking-widest flex items-center gap-1.5 font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-teal-400" /> Quick Demo Login
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickLogin('teacher')}
                className="w-full inline-flex justify-center py-2 px-4 border border-slate-800 rounded-xl bg-slate-950/30 text-xs font-semibold text-blue-400 hover:bg-slate-950/70 transition-colors"
              >
                Teacher Portal
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('student')}
                className="w-full inline-flex justify-center py-2 px-4 border border-slate-800 rounded-xl bg-slate-950/30 text-xs font-semibold text-teal-400 hover:bg-slate-950/70 transition-colors"
              >
                Student Portal
              </button>
            </div>
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
}
