import React, { useState } from 'react';

export default function ViewResultPage({ setCurrentPage, lastResult }) {
  const [expandedId, setExpandedId] = useState(1);

  // Default values if no active mock attempt is loaded
  const score = lastResult ? lastResult.score : 18;
  const total = lastResult ? lastResult.total : 25;
  const percentage = Math.round((score / total) * 100);
  const correctCount = score;
  const incorrectCount = total - score;
  
  const title = lastResult ? lastResult.title : 'Midterm Assessment - Algebra';
  const submittedTime = lastResult ? 'Today' : '12th March 2026 at 10:58AM';

  // Toggle accordion item
  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const questions = [
    {
      id: 1,
      isCorrect: true,
      question: 'What is the value of x in the equation "2x + 5 = 13"?',
      yourAnswer: '4',
      correctAnswer: '4',
      explanation: 'To solve 2x + 5 = 13, subtract 5 from both sides to get 2x = 8. Then divide by 2 to find x = 4.'
    },
    {
      id: 2,
      isCorrect: false,
      question: 'Solve the equation: 5x - 4 = 16',
      yourAnswer: '3',
      correctAnswer: '4',
      explanation: 'Add 4 to both sides: 5x = 20. Then divide both sides by 5 to get x = 4.'
    },
    {
      id: 3,
      isCorrect: true,
      question: 'Simplify: 3(x + 2) - 5 when x = 4',
      yourAnswer: '13',
      correctAnswer: '13',
      explanation: 'Substitute x = 4: 3(4 + 2) - 5 = 3(6) - 5 = 18 - 5 = 13.'
    },
    {
      id: 4,
      isCorrect: true,
      question: 'Find the y-intercept of the line y = 3x - 7',
      yourAnswer: '-7',
      correctAnswer: '-7',
      explanation: 'The slope-intercept form is y = mx + c, where c is the y-intercept. In y = 3x - 7, the intercept is -7.'
    },
    {
      id: 5,
      isCorrect: false,
      question: 'Calculate the slope of the line passing through (2, 3) and (5, 9)',
      yourAnswer: '3',
      correctAnswer: '2',
      explanation: 'The slope formula is m = (y2 - y1) / (x2 - x1). Here, m = (9 - 3) / (5 - 2) = 6 / 3 = 2.'
    }
  ];

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8 sm:p-10">
      
      {/* Back button and page title */}
      <div className="flex items-center space-x-3 mb-8">
        <button 
          onClick={() => setCurrentPage('results')}
          className="p-2 bg-white border border-slate-100 hover:bg-slate-50 text-slate-600 rounded-xl transition-all cursor-pointer shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assessment Results</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">View Result</h1>
        </div>
      </div>

      {/* Main Two-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Score Card, Breakdown & Help (Width: 5/12) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Assessment Score Card */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-black text-slate-950">{score}</span>
                  <span className="text-xl text-slate-400 font-bold ml-1">/ {total}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Total Score</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black ${percentage >= 70 ? 'bg-emerald-55/70 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                {percentage}%
              </span>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">{title}</h2>
              
              <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold mt-3">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Mathematics • Today, 10:00AM - 11:00AM</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Submitted on {submittedTime}</span>
            </div>
          </div>

          {/* Correct/Incorrect Stat Cards */}
          <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-lg font-black text-slate-800">{total}/{total}</span>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Questions Answered</p>
            </div>
            
            <div className="border-l border-slate-100">
              <span className="text-lg font-black text-emerald-600">{correctCount}</span>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Correct Answers</p>
            </div>

            <div className="border-l border-slate-100">
              <span className="text-lg font-black text-rose-500">{incorrectCount}</span>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-1">Incorrect Answers</p>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className="w-full bg-[#1e3a8a] hover:bg-[#172e70] active:bg-[#112255] text-white font-semibold py-3.5 rounded-2xl shadow-md transition-all text-sm cursor-pointer"
            >
              Back to dashboard
            </button>
            <button 
              onClick={() => setCurrentPage('quizzes')}
              className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3.5 rounded-2xl transition-all text-sm cursor-pointer"
            >
              View other quizzes
            </button>
          </div>

          {/* Need Help card */}
          <div className="bg-blue-50/50 border border-blue-100/50 p-6 rounded-3xl flex items-start space-x-3.5">
            <div className="p-2 bg-blue-100/80 text-blue-600 rounded-xl shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-blue-900 text-sm">Need help understanding?</h4>
              <p className="text-xs text-blue-700 mt-1.5 leading-relaxed font-semibold">
                Review the explanations below or reach out to your teacher for further clarification on incorrect answers.
              </p>
              <button 
                onClick={() => alert("Contact Teacher: An email request has been composed to teacher@quizzley.edu.")}
                className="text-xs font-extrabold text-blue-700 hover:text-blue-900 mt-3 inline-flex items-center transition-colors cursor-pointer"
              >
                <span>Contact Teacher</span>
                <span className="ml-1">→</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Detailed Review / Accordions (Width: 7/12) */}
        <div className="lg:col-span-7 bg-white border border-slate-100 p-6 rounded-3xl shadow-sm space-y-5">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-extrabold text-slate-900">Detailed Review</h2>
            
            <div className="flex items-center space-x-3 text-xs font-bold">
              <span className="inline-flex items-center space-x-1.5 text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Correct</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 text-rose-500">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Incorrect</span>
              </span>
            </div>
          </div>

          {/* Accordion Questions List */}
          <div className="divide-y divide-slate-100">
            {questions.map((q) => {
              const isExpanded = expandedId === q.id;
              return (
                <div key={q.id} className="py-4 first:pt-0 last:pb-0">
                  
                  {/* Accordion Header */}
                  <button 
                    onClick={() => toggleAccordion(q.id)}
                    className="w-full flex items-center justify-between py-2 text-left cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      {q.isCorrect ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-55 flex items-center justify-center text-emerald-600 shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-rose-50/70 flex items-center justify-center text-rose-500 shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      )}
                      <span className="font-bold text-slate-800 text-sm">Question {q.id}</span>
                    </div>
                    
                    <span className="text-slate-400">
                      {isExpanded ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                  </button>

                  {/* Accordion Content */}
                  {isExpanded && (
                    <div className="mt-4 pl-9 space-y-4 transition-all duration-300">
                      <p className="text-slate-700 text-sm font-semibold leading-relaxed">{q.question}</p>
                      
                      {/* Grid: Your Answer vs Correct Answer */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className={`p-4 rounded-2xl border ${q.isCorrect ? 'border-emerald-250 bg-emerald-50/10' : 'border-rose-200 bg-rose-50/5'} flex flex-col`}>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Your Answer</span>
                          <span className={`text-base font-extrabold mt-1.5 ${q.isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>{q.yourAnswer}</span>
                        </div>

                        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/20 flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Correct Answer</span>
                          <span className="text-base font-extrabold text-slate-800 mt-1.5">{q.correctAnswer}</span>
                        </div>
                      </div>

                      {/* Explanation Card */}
                      <div className="bg-blue-50/30 border border-blue-100/50 p-4 rounded-2xl flex items-start space-x-3">
                        <div className="text-blue-500 shrink-0 mt-0.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block">Explanation</span>
                          <p className="text-xs text-slate-700 mt-1 leading-relaxed font-semibold">{q.explanation}</p>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <button 
              onClick={() => alert("Showing all 25 questions in the review list.")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center space-x-1 cursor-pointer"
            >
              <span>View all 25 questions</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
