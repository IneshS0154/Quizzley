import React from 'react';

export default function ResultsPage({ setCurrentPage, lastResult }) {
  const defaultResults = [
    // {
    //   id: 'algebra-midterm',
    //   title: 'Midterm Assessment - Algebra',
    //   subject: 'Mathematics',
    //   date: '12th March 2026',
    //   score: 18,
    //   total: 25,
    //   percent: 72,
    //   status: 'Pass'
    // },
    // {
    //   id: 'linear-equations',
    //   title: 'Linear Equations - Practice',
    //   subject: 'Mathematics',
    //   date: '4th June 2026',
    //   score: 23,
    //   total: 25,
    //   percent: 92,
    //   status: 'Pass'
    // },
    // {
    //   id: 'intro-calculus',
    //   title: 'Introduction to Calculus',
    //   subject: 'Mathematics',
    //   date: '28th May 2026',
    //   score: 15,
    //   total: 25,
    //   percent: 60,
    //   status: 'Pass'
    // }
  ];

  // If user completed the mock quiz, prepended it to the top!
  // const results = lastResult 
  //   ? [
  //       {
  //         id: 'algebra-midterm-attempt',
  //         title: lastResult.title,
  //         subject: 'Mathematics',
  //         date: lastResult.date,
  //         score: lastResult.score,
  //         total: lastResult.total,
  //         percent: Math.round((lastResult.score / lastResult.total) * 100),
  //         status: lastResult.score >= 2 ? 'Pass' : 'Fail'
  //       },
  //       ...defaultResults.filter(r => r.id !== 'algebra-midterm')
  //     ]
  //   : defaultResults;

  // const handleSelectResult = (resultId) => {
  //   setCurrentPage('view-result');
  // };

//   return (
//     <div className="flex-1 bg-slate-50 min-h-screen p-8 sm:p-10">
//       {/* Header */}
//       <div className="mb-8 pb-6 border-b border-slate-200/50">
//         <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Quiz Results</h1>
//         <p className="text-sm text-slate-500 mt-1 font-medium">Review your performance, detailed scores, and feedback for all completed assessments.</p>
//       </div>

//       {/* Grid List */}
//       <div className="space-y-4">
//         {results.map((res, idx) => (
//           <div 
//             key={idx}
//             onClick={() => handleSelectResult(res.id)}
//             className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
//           >
//             <div>
//               <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{res.subject}</span>
//               <h3 className="font-bold text-slate-900 text-base mt-2">{res.title}</h3>
//               <p className="text-xs font-semibold text-slate-450 mt-1">Submitted on {res.date}</p>
//             </div>

//             <div className="flex items-center space-x-6 self-end md:self-auto shrink-0">
//               <div className="text-right">
//                 <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Score</span>
//                 <span className="text-lg font-extrabold text-slate-900">{res.score} / {res.total}</span>
//               </div>

//               <div className="h-10 w-px bg-slate-150"></div>

//               <div className="text-center w-16">
//                 <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Percent</span>
//                 <span className={`text-base font-extrabold ${res.percent >= 70 ? 'text-emerald-600' : 'text-rose-500'}`}>{res.percent}%</span>
//               </div>

//               <div className="h-10 w-px bg-slate-150"></div>

//               <button className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
}
