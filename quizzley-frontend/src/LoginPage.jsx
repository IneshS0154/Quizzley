import React from 'react';
import { GoogleLogin } from '@react-oauth/google'; // Changed import

export default function LoginPage() {
  
  // We no longer need the useGoogleLogin hook here!

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">INKODE Quizzley</h2>
          <p className="text-slate-500 mt-2">Sign in to your account</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
              placeholder="student@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="button" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center space-x-4">
          <span className="h-px w-full bg-slate-200"></span>
          <span className="text-sm text-slate-500 font-medium">OR</span>
          <span className="h-px w-full bg-slate-200"></span>
        </div>

        {/* The Official Google Login Component */}
        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log("Success! JWT credential:", credentialResponse);
              // This gives you a credential string you can send to Janindu's backend
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap // Optional: triggers a smooth slide-in prompt if they are already logged into Chrome
          />
        </div>
        
      </div>
    </div>
  );
}