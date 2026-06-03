import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form fields state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  
  // Feedback states
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validate email pattern to display the green checkmark
  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (isSignUp) {
      // Mock registration submission to give user feedback
      setTimeout(() => {
        setSuccess("Registration mock success! The database developer will integrate saving student accounts soon.");
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password credentials');
      }

      const data = await response.json();
      setSuccess(`Signed in successfully! User Role: ${data.role}`);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: credentialResponse.credential }),
      });

      if (!response.ok) {
        throw new Error('Google Authentication rejected by backend');
      }

      const data = await response.json();
      setSuccess(`Google Login Successful! User Role: ${data.role}`);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
    } catch (err) {
      setError(err.message || 'Google Login failed on backend token verification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Column: Forms */}
      <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-white min-h-screen">
        
        {/* Brand Header */}
        <div className="flex items-center space-x-2">
          <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2z" />
            <path d="M4.14 11.17l-.14-.07V17c0 1.66 3.58 3 8 3s8-1.34 8-3v-5.9l-.14.07C17.76 12.11 15 13 12 13s-5.76-.89-7.86-1.83z" />
          </svg>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Quizzley</span>
        </div>

        {/* Form Body Container */}
        <div className="my-auto py-8 max-w-md w-full mx-auto">
          
          {/* Signin / Signup Pill Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8 max-w-[280px]">
            <button
              onClick={() => {
                setIsSignUp(false);
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 py-2 text-center rounded-lg text-xs font-semibold transition-all ${
                !isSignUp 
                  ? 'bg-white shadow text-slate-950' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsSignUp(true);
                setError(null);
                setSuccess(null);
              }}
              className={`flex-1 py-2 text-center rounded-lg text-xs font-semibold transition-all ${
                isSignUp 
                  ? 'bg-white shadow text-slate-950' 
                  : 'text-slate-500 hover:text-slate-800'
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

                {/* Student ID Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Student ID</label>
                  <div className="relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m-4 4h6" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      required={isSignUp}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-sm"
                      placeholder="Student ID"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                {isSignUp ? 'University Email' : 'Email Address'}
              </label>
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
                    <svg className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
              ) : isSignUp ? (
                'Create Account'
              ) : (
                'Continue'
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="my-6 flex items-center justify-center space-x-3">
            <span className="h-px w-full bg-slate-200"></span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">Or Continue With</span>
            <span className="h-px w-full bg-slate-200"></span>
          </div>

          {/* Social Row */}
          <div className="flex items-center justify-center mb-6">
            
            {/* Google Squircle Icon Button Container */}
            <div className="w-[56px] h-[56px] flex items-center justify-center bg-white border border-[#D6D6E0] rounded-[18px] shadow-sm hover:bg-slate-50 hover:border-slate-400 transition-all overflow-hidden relative cursor-pointer">
              <div className="opacity-0 absolute inset-0 z-10 scale-150 cursor-pointer">
                <GoogleLogin
                  type="icon"
                  shape="square"
                  size="large"
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google Login Failed')}
                />
              </div>
              <svg className="w-6 h-6 z-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
            </div>
            
          </div>

        </div>

        {/* Footer Text */}
        <p className="text-[10px] text-slate-400 text-center leading-relaxed max-w-sm mx-auto">
         Welcome to Quizzly. You can access a library of Past papers, Mock exams and Practice Quizzes through our platform.
        </p>

      </div>

      {/* Right Column: Hero Image (Split Screen) */}
      <div className="hidden lg:block lg:w-[55%] relative h-screen">
        
        {/* Dynamic Background Image */}
        <img 
          src={isSignUp ? '/signup_hero.png' : '/signin_hero.png'} 
          alt="Library background" 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out scale-100"
        />
        
        {/* Dark subtle overlay to keep text highly readable */}
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