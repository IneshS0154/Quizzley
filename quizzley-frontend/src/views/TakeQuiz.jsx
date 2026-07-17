import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, AlertTriangle, CheckCircle, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import api from '../api/axios';

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOptionIndex }
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const { data } = await api.get(`/api/admin/quizzes`); // Fetch all quizzes
        const activeQuiz = data.find(q => q.quizId === parseInt(id)) || {
          quizId: parseInt(id),
          title: 'Java Fundamentals Practice Test',
          timerMinutes: 10,
          description: 'A test quiz checking programming syntax.',
        };

        setQuiz(activeQuiz);
        setTimeLeft((activeQuiz.timerMinutes || 10) * 60);

        // Fetch questions or use mock data
        setQuestions([
          {
            id: 101,
            text: 'Which of the following is NOT a primitive data type in Java?',
            options: ['int', 'double', 'String', 'boolean'],
            correctIdx: 2,
          },
          {
            id: 102,
            text: 'Java inheritance uses the "implements" keyword for classes.',
            options: ['True', 'False'],
            correctIdx: 1,
          },
          {
            id: 103,
            text: 'Which memory section stores object instances in Java?',
            options: ['Stack Memory', 'Heap Memory', 'Class Register', 'Garbage Collector'],
            correctIdx: 1,
          },
        ]);
      } catch (err) {
        // Fallback
        setQuiz({
          quizId: parseInt(id),
          title: 'Java Fundamentals Practice Test',
          timerMinutes: 10,
        });
        setTimeLeft(600);
        setQuestions([
          {
            id: 101,
            text: 'Which of the following is NOT a primitive data type in Java?',
            options: ['int', 'double', 'String', 'boolean'],
            correctIdx: 2,
          },
          {
            id: 102,
            text: 'Java inheritance uses the "implements" keyword for classes.',
            options: ['True', 'False'],
            correctIdx: 1,
          },
          {
            id: 103,
            text: 'Which memory section stores object instances in Java?',
            options: ['Stack Memory', 'Heap Memory', 'Class Register', 'Garbage Collector'],
            correctIdx: 1,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleSelectOption = (optionIdx) => {
    if (submitted) return;
    setAnswers({
      ...answers,
      [questions[currentIdx].id]: optionIdx,
    });
  };

  const handleSubmit = (auto = false) => {
    if (submitted) return;
    setSubmitted(true);
    // Calculate Score
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIdx) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / questions.length) * 100);
    setScore(percentage);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600" />
      </div>
    );
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-100 shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Quiz Completed!</h1>
          <p className="text-slate-500 text-sm mt-2">
            Your answers have been submitted successfully.
          </p>

          <div className="my-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 inline-block w-full">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Your Score</p>
            <p className="text-5xl font-black text-blue-600 mt-2">{score}%</p>
            <p className="text-sm text-slate-600 mt-2">
              You answered correctly for {Math.round((score / 100) * questions.length)} out of {questions.length} questions.
            </p>
          </div>

          <button
            onClick={() => navigate('/student/dashboard')}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition cursor-pointer shadow-sm"
          >
            Back to Portal
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-slate-900 leading-tight">{quiz?.title}</h1>
          <p className="text-xs text-slate-400 mt-0.5">Question {currentIdx + 1} of {questions.length}</p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3.5 py-1.5 rounded-xl border border-amber-100 text-sm font-bold">
          <Clock size={16} />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </header>

      {/* Main Panel */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 flex flex-col justify-between">
        {/* Question Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-6 leading-snug">
            {currentQuestion?.text}
          </h2>

          <div className="space-y-3.5">
            {currentQuestion?.options.map((option, idx) => {
              const isSelected = answers[currentQuestion.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left px-5 py-4 border rounded-xl text-sm font-medium transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/45 text-blue-700'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{option}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center gap-4">
          <button
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(prev => prev - 1)}
            className="flex items-center gap-1.5 px-4.5 py-2.5 border border-slate-200 bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 rounded-xl text-sm font-bold transition cursor-pointer"
          >
            <ArrowLeft size={16} /> Previous
          </button>

          {currentIdx === questions.length - 1 ? (
            <button
              onClick={() => handleSubmit(false)}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition cursor-pointer shadow-sm"
            >
              Submit Test <Send size={14} />
            </button>
          ) : (
            <button
              onClick={() => setCurrentIdx(prev => prev + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-sm font-bold transition cursor-pointer"
            >
              Next <ArrowRight size={16} />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
