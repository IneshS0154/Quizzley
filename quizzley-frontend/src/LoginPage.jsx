import React, { useState } from 'react';
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginPage({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    setPhoneNumber(val);
    if (val && !/^\d*$/.test(val)) {
      setError("Phone number must contain only numbers.");
    } else if (val.length > 10) {
      setError("Phone number cannot be greater than 10 digits.");
    } else {
      setError(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (isSignUp) {
      if (phoneNumber && !/^\d+$/.test(phoneNumber)) {
        setError("Phone number must contain only numbers.");
        setLoading(false);
        return;
      }
      if (phoneNumber.length > 10) {
        setError("Phone number cannot be greater than 10 digits.");
        setLoading(false);
        return;
      }
      if (phoneNumber.length < 10) {
        setError("Phone number must be exactly 10 digits.");
        setLoading(false);
        return;
      }

      const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      if (mockUsers.some(u => u.email === email)) {
        setError("User with this email already exists.");
        setLoading(false);
        return;
      }
      mockUsers.push({ email, password, fullName, phoneNumber, role: 'STUDENT' });
      localStorage.setItem('mockUsers', JSON.stringify(mockUsers));

      setTimeout(() => {
        setSuccess("Account created successfully! Please sign in using your credentials.");
        setIsSignUp(false);
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      // Check for predefined admin credentials
      if (email === 'admin@quizzley.com' && password === 'admin123') {
        setSuccess(`Signed in successfully! User Role: ADMIN`);
        localStorage.setItem('token', 'mock-token-admin');
        localStorage.setItem('role', 'ADMIN');
        if (onLoginSuccess) {
          onLoginSuccess('mock-token-admin', 'ADMIN');
        }
        setLoading(false);
        return;
      }

      const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const localUser = mockUsers.find(u => u.email === email && u.password === password);

      if (localUser) {
        setSuccess(`Signed in successfully! User Role: ${localUser.role}`);
        localStorage.setItem('token', 'mock-token-' + localUser.email);
        localStorage.setItem('role', localUser.role);
        if (onLoginSuccess) {
          onLoginSuccess('mock-token-' + localUser.email);
        }
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password credentials');
      }

      const data = await response.json();
      setSuccess(`Signed in successfully! User Role: ${data.role}`);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      if (onLoginSuccess) {
        onLoginSuccess(data.token);
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please verify that the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: credentialResponse.credential }),
      });

      if (!response.ok) {
        throw new Error('Google Authentication rejected by backend');
      }

      const data = await response.json();
      setSuccess(`Google Login Successful! User Role: ${data.role}`);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      if (onLoginSuccess) {
        onLoginSuccess(data.token);
      }
    } catch (err) {
      setError(err.message || 'Google Login failed on backend token verification.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      await handleGoogleSuccess({ credential: idToken });
    } catch (err) {
      setError(err.message || 'Google Login failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row overflow-hidden">

      {/* Left Column: Forms */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-white min-h-screen">

        {/* Brand Header */}
        <div className="flex items-center">
          <img src="/logo.png" alt="Quizzley" className="h-16 object-contain" />
        </div>

        {/* Form Body Container */}
        <div className="my-auto py-8 max-w-md w-full mx-auto">

          {/* Signin / Signup Pill Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8 max-w-[280px]">
            <button
              onClick={() => { setIsSignUp(false); setError(null); setSuccess(null); }}
              className={`flex-1 py-2 text-center rounded-lg text-xs font-semibold transition-all ${
                !isSignUp ? 'bg-white shadow text-slate-950' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(null); setSuccess(null); }}
              className={`flex-1 py-2 text-center rounded-lg text-xs font-semibold transition-all ${
                isSignUp ? 'bg-white shadow text-slate-950' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Signup
            </button>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              {isSignUp
                ? 'Join Quizzley today to start your academic journey'
                : 'Welcome Back, Please enter Your details'}
            </p>
          </div>

          {/* Error and Success Alerts */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center">
              <svg className="w-4 h-4 mr-2 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl flex items-center">
              <svg className="w-4 h-4 mr-2 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{success}</span>
            </div>
          )}

          {/* Main Action Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">

            {isSignUp && (
              <>
                {/* Full Name Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Full Name</label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={isSignUp}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-sm"
                      placeholder="Full Name"
                    />
                  </div>
                </div>

                {/* Phone Number Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Phone Number</label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      required={isSignUp}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-sm"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Email Address</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-sm"
                  placeholder="student@example.com"
                />
                {!isSignUp && isValidEmail(email) && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">Password</label>
                {!isSignUp && (
                  <a href="#forgot" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    Forgot Password?
                  </a>
                )}
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-11 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-sm"
                  placeholder={isSignUp ? 'Password' : '••••••••'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all text-sm flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : isSignUp ? 'Create Account' : 'Continue'}
            </button>
          </form>

          {/* Social Divider */}
          <div className="my-6 flex items-center justify-center space-x-3">
            <span className="h-px w-full bg-slate-200"></span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">Or Continue With</span>
            <span className="h-px w-full bg-slate-200"></span>
          </div>

          {/* Google Login Button */}
          <div className="flex items-center justify-center mb-6 w-full">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border border-slate-300 rounded-xl py-3 px-4 bg-white hover:bg-slate-50 transition font-medium text-slate-700 flex items-center justify-center"
              aria-label="Sign in with Google"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path fill="#4285F4" d="M21.805 10.023H12v4.01h5.27c-.23 1.19-.89 2.2-1.89 2.88v2.39h3.06c1.79-1.65 2.82-4.08 2.82-6.97 0-.68-.06-1.33-.18-1.96z" />
                <path fill="#34A853" d="M12 22c2.55 0 4.69-.84 6.25-2.29l-3.06-2.39c-.85.57-1.94.91-3.19.91-2.45 0-4.53-1.66-5.28-3.89H3.56v2.45A10 10 0 0 0 12 22z" />
                <path fill="#FBBC05" d="M6.72 14.34A6.01 6.01 0 0 1 6.72 9.66V7.21H3.56a10 10 0 0 0 0 7.13l3.16-2.5z" />
                <path fill="#EA4335" d="M12 6.09c1.38 0 2.62.47 3.59 1.39l2.69-2.69C16.68 3.4 14.55 2.5 12 2.5A10 10 0 0 0 3.56 7.21l3.16 2.45C7.47 7.75 9.55 6.09 12 6.09z" />
              </svg>
            </button>
          </div>

        </div>

        {/* Footer Text */}
        <p className="text-[10px] text-slate-400 text-center leading-relaxed max-w-sm mx-auto">
          Welcome to Quizzly. You can access a library of Past papers, Mock exams and Practice Quizzes through our platform.
        </p>

      </div>

      {/* Right Column: Hero Image */}
      <div className="hidden lg:block lg:w-[55%] relative h-screen">
        <img
          src={isSignUp ? '/signup_hero.png' : '/signin_hero.png'}
          alt="Library background"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-slate-950/10 flex flex-col justify-end p-16">
          <div className="text-white max-w-xl transition-all duration-500 ease-in-out">
            <h3 className="text-3xl font-bold leading-tight tracking-tight mb-3">
              {isSignUp ? 'Empowering your academic excellence' : 'Unlock Your Potential with Quizzley'}
            </h3>
            <p className="text-slate-200 text-sm font-medium leading-relaxed">
              {isSignUp
                ? 'Join our community of lifelong learners and achieve your goals with Quizzley.'
                : 'Access your personalized dashboard, track your quiz performance, and make informed learning decisions.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
