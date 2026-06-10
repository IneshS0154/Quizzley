import { useState } from 'react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem('adminSettings');
    return stored ? JSON.parse(stored) : {
      systemName: 'Quizzley',
      maintenanceMode: false,
      publicRegistration: true,
      defaultTimeLimit: 45,
      allowRetakes: true,
      passingScore: 70,
      sessionTimeout: 30,
      passwordComplexity: 'Medium'
    };
  });

  const [activeTab, setActiveTab] = useState('general');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate premium visual load state
    setTimeout(() => {
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      setIsSaving(false);
      setShowSaveSuccess(true);
      
      // Auto-hide alert banner after 3 seconds
      setTimeout(() => {
        setShowSaveSuccess(false);
      }, 3000);
    }, 600);
  };

  const handleReset = () => {
    const defaultSettings = {
      systemName: 'Quizzley',
      maintenanceMode: false,
      publicRegistration: true,
      defaultTimeLimit: 45,
      allowRetakes: true,
      passingScore: 70,
      sessionTimeout: 30,
      passwordComplexity: 'Medium'
    };
    setSettings(defaultSettings);
    localStorage.setItem('adminSettings', JSON.stringify(defaultSettings));
    
    // Quick flash of success
    setShowSaveSuccess(true);
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 2000);
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8 sm:p-10 flex flex-col justify-between animate-fade-in-up">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-slate-200/50">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Settings</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Manage platform options, security policies, and default quiz configurations.</p>
          </div>
        </div>

        {/* Success Alert Banner */}
        {showSaveSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-800 animate-fadeIn transition-all">
            <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm font-bold">Settings saved successfully! Configuration updated and applied.</div>
          </div>
        )}

        {/* Layout */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row">
          
          {/* Tabs Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-100 p-6 space-y-1 bg-slate-50/50">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'general'
                  ? 'bg-blue-50/70 text-blue-600 border border-blue-100/30'
                  : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>General Settings</span>
            </button>

            <button
              onClick={() => setActiveTab('quizzes')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'quizzes'
                  ? 'bg-blue-50/70 text-blue-600 border border-blue-100/30'
                  : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Quiz Policies</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'security'
                  ? 'bg-blue-50/70 text-blue-600 border border-blue-100/30'
                  : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Security & Access</span>
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-8">
            <form onSubmit={handleSave} className="space-y-6">
              
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-1">General Application Options</h3>
                    <p className="text-xs text-slate-500 font-medium">Control frontend presentation, branding, and registration toggles.</p>
                  </div>
                  
                  {/* System Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">System Branding Name</label>
                    <input 
                      type="text" 
                      value={settings.systemName}
                      onChange={(e) => handleChange('systemName', e.target.value)}
                      className="w-full max-w-md px-4 py-2 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-sm font-semibold"
                      required
                    />
                  </div>

                  {/* Version (Readonly) */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Console Version</label>
                    <input 
                      type="text" 
                      value="v1.0.0-PRO (Production Release)"
                      disabled
                      className="w-full max-w-md px-4 py-2 border border-slate-200 bg-slate-50 text-slate-400 rounded-xl text-sm font-semibold cursor-not-allowed"
                    />
                  </div>

                  {/* Maintenance Mode Toggle */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl max-w-md border border-slate-100">
                    <div>
                      <div className="text-sm font-bold text-slate-800">Maintenance Mode</div>
                      <div className="text-xs text-slate-400 mt-0.5 font-medium">Force logout non-admin users and display a splash screen.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.maintenanceMode}
                        onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Public Registration */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl max-w-md border border-slate-100">
                    <div>
                      <div className="text-sm font-bold text-slate-800">Public Registrations</div>
                      <div className="text-xs text-slate-400 mt-0.5 font-medium">Allow new students to sign up from the public web page.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.publicRegistration}
                        onChange={(e) => handleChange('publicRegistration', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'quizzes' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-1">Global Quiz Policies</h3>
                    <p className="text-xs text-slate-500 font-medium">Set default thresholds and rules for student quiz attempts.</p>
                  </div>

                  {/* Default Time Limit */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Default Time Limit (minutes)</label>
                    <input 
                      type="number" 
                      min="5"
                      max="480"
                      value={settings.defaultTimeLimit}
                      onChange={(e) => handleChange('defaultTimeLimit', parseInt(e.target.value) || 0)}
                      className="w-full max-w-xs px-4 py-2 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-sm font-semibold"
                      required
                    />
                  </div>

                  {/* Minimum Passing Score */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Minimum Passing Score (%)</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" 
                        min="50"
                        max="95"
                        step="5"
                        value={settings.passingScore}
                        onChange={(e) => handleChange('passingScore', parseInt(e.target.value) || 70)}
                        className="w-full max-w-xs h-2 bg-slate-100 border border-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <span className="text-sm font-bold text-slate-800 shrink-0 w-10 text-right">{settings.passingScore}%</span>
                    </div>
                  </div>

                  {/* Allow Retakes */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl max-w-md border border-slate-100">
                    <div>
                      <div className="text-sm font-bold text-slate-800">Allow Quiz Retakes</div>
                      <div className="text-xs text-slate-400 mt-0.5 font-medium">Allow students to retry failed or completed quizzes.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.allowRetakes}
                        onChange={(e) => handleChange('allowRetakes', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-1">Security & Access Control</h3>
                    <p className="text-xs text-slate-500 font-medium">Configure administrator credentials and policy access controls.</p>
                  </div>

                  {/* Session Timeout Slider */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Admin Session Timeout (Minutes)</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" 
                        min="5"
                        max="120"
                        step="5"
                        value={settings.sessionTimeout}
                        onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value) || 30)}
                        className="w-full max-w-xs h-2 bg-slate-100 border border-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <span className="text-sm font-bold text-slate-800 shrink-0 w-16 text-right">{settings.sessionTimeout} mins</span>
                    </div>
                  </div>

                  {/* Password Complexity */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Password Complexity Policy</label>
                    <select 
                      value={settings.passwordComplexity}
                      onChange={(e) => handleChange('passwordComplexity', e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer w-full max-w-xs"
                    >
                      <option value="Standard">Standard (Min 6 characters)</option>
                      <option value="Medium">Medium (Alphanumeric, Min 8 chars)</option>
                      <option value="Strong">Strong (Letters, numbers, special characters, Min 8 chars)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Form Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 active-spring cursor-pointer"
                >
                  Reset Defaults
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center gap-2 active-spring cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Settings'
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-slate-200/40 text-center mt-8">
        <p className="text-xs text-slate-400 font-medium">Quizzley Admin Console • © 2026 Quizzley Inc.</p>
      </div>
    </div>
  );
}
