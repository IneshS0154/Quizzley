import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { startAttempt, selectAnswer, updateTimer, clearAttempt } from '../store/quizSlice';
import { attemptsApi } from '../services/api';
import { AlertCircle, Clock, CheckCircle2, ChevronLeft, ChevronRight, HelpCircle, ArrowLeft } from 'lucide-react';

export default function QuizAttempt() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activeAttempt } = useSelector((state) => state.quiz);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [results, setResults] = useState(null); // stores submitted feedback

  // Start attempt on mount if none exists for this quizId
  useEffect(() => {
    const initAttempt = async () => {
      if (activeAttempt && activeAttempt.quizId === Number(quizId)) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const attemptDetails = await attemptsApi.startAttempt(quizId);
        dispatch(startAttempt(attemptDetails));
      } catch (err) {
        console.error(err);
        alert('Failed to load quiz');
        navigate('/student/dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    initAttempt();
  }, [quizId, activeAttempt]);

  // Countdown timer loop
  useEffect(() => {
    if (!activeAttempt || activeAttempt.timeLeft === null || results) return;

    if (activeAttempt.timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      dispatch(updateTimer(activeAttempt.timeLeft - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [activeAttempt?.timeLeft, results]);

  const handleSelectOption = (questionId, optionId) => {
    dispatch(selectAnswer({ questionId, optionId }));
  };

  const handleAutoSubmit = () => {
    alert('Time has expired! Submitting your answers automatically.');
    handleSubmitQuiz();
  };

  const handleSubmitQuiz = async () => {
    if (!activeAttempt) return;

    const payload = {
      attemptId: activeAttempt.attemptId,
      quizId: activeAttempt.quizId,
      answers: Object.keys(activeAttempt.selectedAnswers).map(qId => ({
        questionId: Number(qId),
        selectedOptionId: activeAttempt.selectedAnswers[qId],
      }))
    };

    try {
      const response = await attemptsApi.submitAttempt(payload);
      setResults(response);
      dispatch(clearAttempt());
      setShowSubmitConfirm(false);
    } catch (e) {
      alert('Failed to submit answers.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Initializing quiz session...
      </div>
    );
  }

  // If results exist, render the score summary page immediately
  if (results) {
    const pct = ((results.obtainedMarks / results.totalMarks) * 100).toFixed(0);
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 relative">
        <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-blue-900/10 to-transparent filter blur-3xl"></div>
        
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center shadow-2xl z-10 space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl">
              <CheckCircle2 className="h-12 w-12 text-teal-400" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-100">Attempt Submitted!</h2>
            <p className="text-sm text-slate-400 mt-1">Your assessment has been evaluated successfully.</p>
          </div>

          <div className="p-6 border border-slate-800 rounded-2xl bg-slate-950/40 relative overflow-hidden">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Your Score</span>
            <div className="text-4xl font-extrabold text-white mt-1">
              {results.obtainedMarks} <span className="text-sm text-slate-500">/ {results.totalMarks} Marks</span>
            </div>
            <div className={`mt-3 inline-block px-3 py-1 rounded-lg text-xs font-semibold ${Number(pct) >= 70 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
              {pct}% Accuracy
            </div>
          </div>

          <button
            onClick={() => navigate('/student/dashboard')}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl shadow-lg shadow-blue-600/10 active:scale-[0.98] transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQ = activeAttempt.questions[currentIdx];
  const selectedOptId = activeAttempt.selectedAnswers[currentQ?.questionId];

  // Helper formatting for timer
  const formatTime = (seconds) => {
    if (seconds === null) return 'No Limit';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
      
      {/* Header bar with title and active clock */}
      <header className="border-b border-slate-900 bg-slate-900/50 backdrop-blur px-8 py-4.5 flex justify-between items-center z-10">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => {
              if (window.confirm('Leave quiz? Your current answers will be preserved but the timer continues.')) {
                navigate('/student/dashboard');
              }
            }}
            className="p-1.5 border border-slate-800 rounded-lg text-slate-400 hover:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-base font-semibold text-slate-200">{activeAttempt.title}</h1>
            <p className="text-[10px] text-slate-500 font-semibold uppercase mt-0.5">Attempt Session</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-slate-900 border border-slate-850 px-4 py-2 rounded-2xl">
          <Clock className="h-4.5 w-4.5 text-teal-400 animate-pulse" />
          <span className="text-sm font-bold font-mono text-slate-200">{formatTime(activeAttempt.timeLeft)}</span>
        </div>
      </header>

      {/* Main split screen */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-auto">
        
        {/* Left/Middle: Questions cards */}
        <section className="lg:col-span-2 space-y-6">
          <div className="border border-slate-850 bg-slate-900/40 rounded-3xl p-8 shadow-xl min-h-[400px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Question {currentIdx + 1} of {activeAttempt.questions.length}
                </span>
                <span className="text-xs font-semibold text-teal-400">{currentQ?.marks} Marks</span>
              </div>

              <h2 className="text-lg font-bold text-slate-100 mb-6">{currentQ?.questionText}</h2>

              {/* Options list */}
              <div className="space-y-3">
                {currentQ?.options.map((opt) => (
                  <button
                    key={opt.optionId}
                    onClick={() => handleSelectOption(currentQ.questionId, opt.optionId)}
                    className={`w-full text-left p-4.5 rounded-2xl border transition-all flex items-center justify-between group ${
                      selectedOptId === opt.optionId
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-slate-850 bg-slate-950/30 text-slate-300 hover:border-slate-800'
                    }`}
                  >
                    <span className="text-sm font-semibold">{opt.optionText}</span>
                    <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center transition-all ${
                      selectedOptId === opt.optionId
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-slate-850 group-hover:border-slate-700'
                    }`}>
                      {selectedOptId === opt.optionId && (
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 pt-6 border-t border-slate-800/60 flex justify-between items-center">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>

              {currentIdx === activeAttempt.questions.length - 1 ? (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                >
                  Submit Assessment
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Right side: Questions navigation map */}
        <section className="space-y-6">
          <div className="border border-slate-850 bg-slate-900/40 rounded-3xl p-6 shadow-xl">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Question Map</h3>
            
            {/* Grid of indices */}
            <div className="grid grid-cols-5 gap-3.5">
              {activeAttempt.questions.map((q, idx) => {
                const isAnswered = activeAttempt.selectedAnswers[q.questionId] !== undefined;
                const isCurrent = currentIdx === idx;
                
                return (
                  <button
                    key={q.questionId}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white ring-2 ring-blue-500/20'
                        : isAnswered
                        ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                        : 'bg-slate-950/50 text-slate-500 border border-slate-850'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800/60 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 bg-blue-600 rounded-md"></div>
                <span>Current Question</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 bg-teal-500/10 border border-teal-500/20 rounded-md"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3.5 w-3.5 bg-slate-950/50 border border-slate-850 rounded-md"></div>
                <span>Not Visited</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-2xl text-center space-y-4">
            <div className="flex justify-center">
              <AlertCircle className="h-10 w-10 text-amber-500" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-100">Finish Assessment?</h4>
              <p className="text-xs text-slate-400 mt-1">
                Make sure you have answered all questions. You cannot change your answers after submission.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-3 border border-slate-800 hover:border-slate-700 rounded-2xl text-xs font-semibold text-slate-400"
              >
                Go Back
              </button>
              <button
                onClick={handleSubmitQuiz}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-2xl"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
