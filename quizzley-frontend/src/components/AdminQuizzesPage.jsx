import React from 'react';

export default function AdminQuizzesPage() {
  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8 sm:p-10 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-slate-200/50">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Quiz Management</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Create, publish, and manage quizzes across all departments.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button 
              disabled
              className="px-5 py-2.5 bg-slate-200 text-slate-400 text-sm font-semibold rounded-xl cursor-not-allowed flex items-center space-x-2 shadow-sm"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Create Quiz</span>
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-12 sm:p-20 flex flex-col items-center text-center max-w-2xl mx-auto my-12">
          <div className="w-20 h-20 bg-blue-50/50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 border border-blue-100/30 shadow-inner">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">No Quizzes Created</h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
            There are no quizzes currently registered on the platform. Click on "+ Create Quiz" to create and distribute your first assessment.
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-6 border-t border-slate-200/40 text-center">
        <p className="text-xs text-slate-400 font-medium">Quizzley Admin Console • © 2026 Quizzley Inc.</p>
      </div>
    </div>
  );
}
