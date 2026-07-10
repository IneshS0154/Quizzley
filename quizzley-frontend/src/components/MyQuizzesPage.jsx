import { useState } from 'react';
import Header from './Header';

export default function MyQuizzesPage({ setCurrentPage, setLastResult, profile }) {
  const [activeTab, setActiveTab] = useState('All Quizzes');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Quiz Modal State
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(0);

  const tabs = ['All Quizzes', 'Live', 'Upcoming', 'Completed'];

  const quizzes = [
    {
      id: 'algebra-midterm',
      title: 'Midterm Assessment - Algebra',
      subject: 'Mathematics',
      time: '10:00 AM - 11:00 AM',
      status: 'Live',
      timeLeft: '24 mins left',
      iconBg: 'bg-blue-50 text-blue-600',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      actionLabel: 'Take Quiz',
      actionClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/10'
    },
    {
      id: 'quadratic',
      title: 'Quadratic Equations',
      subject: 'Mathematics',
      time: '14th March, 10:00 AM - 11:00 AM',
      status: 'Scheduled',
      iconBg: 'bg-slate-50 text-slate-450',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      actionLabel: 'View details',
      actionClass: 'border border-slate-200 text-slate-700 hover:bg-slate-50'
    },
    {
      id: 'probability',
      title: 'Probability Test',
      subject: 'Mathematics',
      time: '16th March, 12:00 PM - 1:00 PM',
      status: 'Scheduled',
      iconBg: 'bg-slate-50 text-slate-450',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      actionLabel: 'View details',
      actionClass: 'border border-slate-200 text-slate-700 hover:bg-slate-50'
    },
    {
      id: 'weekly-science',
      title: 'Weekly Science Test',
      subject: 'Science',
      time: '18th March, 3:00 PM - 4:00 PM',
      status: 'Scheduled',
      iconBg: 'bg-slate-50 text-slate-450',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      actionLabel: 'View details',
      actionClass: 'border border-slate-200 text-slate-700 hover:bg-slate-50'
    },
    {
      id: 'linear-equations',
      title: 'Linear Equations - Practice',
      subject: 'Mathematics',
      time: 'Score: 23/25',
      status: 'Completed',
      iconBg: 'bg-emerald-50 text-emerald-650',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
      actionLabel: 'View results',
      actionClass: 'border border-slate-200 text-slate-700 hover:bg-slate-50'
    },
    {
      id: 'trig-basics',
      title: 'Trigonometry Basics Quiz',
      subject: 'Mathematics',
      time: 'Scheduled on 8th March • 10:00 AM - 11:00 AM',
      status: 'Missed',
      iconBg: 'bg-rose-50 text-rose-650',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      actionLabel: 'View details',
      actionClass: 'border border-slate-200 text-slate-700 hover:bg-slate-50'
    }
  ];

  // Interactive Quiz Questions
  const mockQuizQuestions = [
    {
      id: 1,
      question: 'What is the value of x in the equation "2x + 5 = 13"?',
      options: ['2', '3', '4', '5'],
      correct: '4'
    },
    {
      id: 2,
      question: 'Solve for y: 3y - 7 = 8',
      options: ['3', '4', '5', '6'],
      correct: '5'
    },
    {
      id: 3,
      question: 'Simplify: 2(x + 4) - 3x when x = 2',
      options: ['4', '6', '8', '10'],
      correct: '6'
    }
  ];

  const handleAction = (quiz) => {
    if (quiz.status === 'Live') {
      setShowQuizModal(true);
      setQuizSubmitted(false);
      setSelectedAnswers({});
    } else if (quiz.status === 'Completed' || quiz.id === 'linear-equations') {
      setCurrentPage('results');
    } else {
      alert(`Details for "${quiz.title}": Subject is ${quiz.subject}. Timing: ${quiz.time}.`);
    }
  };

  const handleSelectAnswer = (qId, option) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: option
    }));
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    mockQuizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    
    // Save state back to display in Results page if desired
    if (setLastResult) {
      setLastResult({
        score: score,
        total: mockQuizQuestions.length,
        title: 'Midterm Assessment - Algebra',
        date: 'Today',
        answers: selectedAnswers
      });
    }
  };

  // Filter quizzes based on active tab and search query
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesTab = activeTab === 'All Quizzes' || quiz.status === activeTab;
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          quiz.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex-1 bg-slate-50 min-h-screen flex flex-col relative animate-fade-in-up">
      <Header profile={profile} setCurrentPage={setCurrentPage} />
      <div className="p-8 sm:p-10 flex-1 overflow-y-auto relative">
        {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-slate-200/50">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Quizzes</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium font-sans">View and attempt your quizzes</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search quizzes by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all text-xs font-semibold shadow-sm"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl mb-6 max-w-md">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-center rounded-lg text-xs font-bold transition-all active-spring cursor-pointer ${
              activeTab === tab
                ? 'bg-white shadow text-slate-950'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Quiz List */}
      <div className="space-y-4">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz, idx) => (
            <div 
              key={quiz.id}
              className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 75}ms` }}
            >
              {/* Info Column */}
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl shrink-0 ${quiz.iconBg}`}>
                  {quiz.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{quiz.title}</h3>
                  <p className="text-xs font-semibold text-slate-450 mt-1 flex items-center space-x-2">
                    <span>{quiz.subject}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-slate-550">{quiz.time}</span>
                  </p>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex items-center space-x-4 self-end sm:self-auto shrink-0">
                {quiz.status === 'Live' && (
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-md uppercase">Live</span>
                    <span className="text-xs font-semibold text-rose-500">{quiz.timeLeft}</span>
                  </div>
                )}
                {quiz.status === 'Scheduled' && (
                  <span className="px-2.5 py-1 bg-amber-50 border border-amber-100 text-amber-600 text-[10px] font-bold rounded-full uppercase">Scheduled</span>
                )}
                {quiz.status === 'Completed' && (
                  <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase">Completed</span>
                )}
                {quiz.status === 'Missed' && (
                  <span className="px-2.5 py-1 bg-rose-50 border border-rose-100 text-rose-550 text-[10px] font-bold rounded-full uppercase">Missed</span>
                )}

                <button
                  onClick={() => handleAction(quiz)}
                  className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all active-spring cursor-pointer ${quiz.actionClass}`}
                >
                  {quiz.actionLabel}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm animate-fade-in">
            <p className="text-slate-400 font-semibold text-sm">No quizzes found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Mock Quiz Attempt Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-scale-in">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attempting Quiz</span>
                <h3 className="text-lg font-bold mt-1">Midterm Assessment - Algebra</h3>
              </div>
              {!quizSubmitted && (
                <button 
                  onClick={() => setShowQuizModal(false)}
                  className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800 active-spring cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {!quizSubmitted ? (
                <form onSubmit={handleQuizSubmit} className="space-y-6">
                  {mockQuizQuestions.map((q) => (
                    <div key={q.id} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                      <span className="text-xs font-bold text-blue-600">Question {q.id} of {mockQuizQuestions.length}</span>
                      <p className="font-bold text-slate-800 text-sm mt-1 mb-3">{q.question}</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {q.options.map((option) => {
                          const isSelected = selectedAnswers[q.id] === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleSelectAnswer(q.id, option)}
                              className={`py-3 px-4 rounded-xl border text-sm font-semibold text-left transition-all active-spring cursor-pointer ${
                                isSelected
                                  ? 'border-blue-600 bg-blue-50/50 text-blue-700'
                                  : 'border-slate-200 text-slate-650 hover:bg-slate-50'
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={Object.keys(selectedAnswers).length < mockQuizQuestions.length}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 disabled:opacity-50 transition-all active-spring cursor-pointer text-sm"
                  >
                    Submit Quiz
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center animate-fade-in">
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200/50 animate-scale-in">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  <h4 className="text-xl font-extrabold text-slate-900">Quiz Submitted Successfully!</h4>
                  <p className="text-slate-500 mt-2 text-sm max-w-sm mx-auto font-semibold">
                    You answered {quizScore} of {mockQuizQuestions.length} questions correctly.
                  </p>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-6 max-w-xs mx-auto animate-scale-in delay-150">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Your Score</span>
                    <div className="text-3xl font-black text-slate-800 mt-1">
                      {Math.round((quizScore / mockQuizQuestions.length) * 100)}%
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <button
                      onClick={() => {
                        setShowQuizModal(false);
                        setCurrentPage('results');
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all active-spring cursor-pointer text-sm"
                    >
                      View Detailed Review
                    </button>
                    <button
                      onClick={() => setShowQuizModal(false)}
                      className="w-full border border-slate-200 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all active-spring cursor-pointer text-sm"
                    >
                      Back to Quizzes
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      </div>
    </div>
  );
}
