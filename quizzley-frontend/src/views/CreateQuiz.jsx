import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Check,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Clock,
  Shield,
  BookOpen,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';

// ─── Step Indicator ──────────────────────────────────────────────────────────
const STEPS = ['Basic Details', 'Add Questions', 'Settings', 'Review & Publish'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, idx) => {
        const num = idx + 1;
        const done = num < current;
        const active = num === current;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-200 ${
                  done
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : active
                    ? 'bg-white border-blue-600 text-blue-600'
                    : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                {done ? <Check size={14} /> : num}
              </div>
              <span
                className={`mt-1.5 text-xs font-medium whitespace-nowrap ${
                  active ? 'text-blue-600' : done ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mt-[-14px] mx-2 transition-all duration-200 ${
                  done ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Field Components ────────────────────────────────────────────────────────
function Label({ children, required }) {
  return (
    <label className="block text-sm font-medium text-slate-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function Input({ value, onChange, placeholder, type = 'text', ...rest }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      {...rest}
    />
  );
}

function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
    >
      {children}
    </select>
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
    />
  );
}

// ─── Step 1: Basic Details ───────────────────────────────────────────────────
function Step1({ data, onChange }) {
  return (
    <div className="space-y-5">
      <div>
        <Label required>Quiz Title</Label>
        <Input
          value={data.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="e.g. Data Structures Mid-Term"
        />
      </div>
      <div>
        <Label>Instructions</Label>
        <Textarea
          value={data.instructions}
          onChange={(e) => onChange('instructions', e.target.value)}
          placeholder="Enter any special instructions for students…"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label required>Module</Label>
          <Select value={data.module} onChange={(e) => onChange('module', e.target.value)}>
            <option value="">Select module</option>
            <option value="DBS101">DBS101 — Database Systems</option>
            <option value="SE201">SE201 — Software Engineering</option>
            <option value="CS101">CS101 — Cyber Security Fundamentals</option>
            <option value="PF101">PF101 — Programming Fundamentals</option>
          </Select>
        </div>
        <div>
          <Label required>Batch</Label>
          <Select value={data.batch} onChange={(e) => onChange('batch', e.target.value)}>
            <option value="">Select batch</option>
            <option value="Y1S1">Y1S1 (2026)</option>
            <option value="Y1S2">Y1S2 (2026)</option>
            <option value="Y2S1">Y2S1 (2026)</option>
            <option value="Y2S2">Y2S2 (2026)</option>
            <option value="Y3S1">Y3S1 (2026)</option>
            <option value="Y3S2">Y3S2 (2026)</option>
            <option value="Y4S1">Y4S1 (2026)</option>
            <option value="Y4S2">Y4S2 (2026)</option>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <Label>Available From</Label>
          <Input
            type="datetime-local"
            value={data.availableFrom}
            onChange={(e) => onChange('availableFrom', e.target.value)}
          />
        </div>
        <div>
          <Label>Available Until</Label>
          <Input
            type="datetime-local"
            value={data.availableUntil}
            onChange={(e) => onChange('availableUntil', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Step 2: Add Questions ───────────────────────────────────────────────────
const makeQuestion = () => ({
  id: Date.now(),
  text: '',
  type: 'MCQ',
  marks: 1,
  options: ['', '', '', ''],
  correctIndex: 0,
});

function QuestionCard({ q, idx, onChange, onRemove }) {
  const handleOption = (oIdx, val) => {
    const opts = [...q.options];
    opts[oIdx] = val;
    onChange(idx, 'options', opts);
  };

  const addOption = () => {
    onChange(idx, 'options', [...q.options, '']);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Question {idx + 1}
        </span>
        <button
          onClick={() => onRemove(idx)}
          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div>
        <Label required>Question Text</Label>
        <Textarea
          value={q.text}
          onChange={(e) => onChange(idx, 'text', e.target.value)}
          placeholder="Enter the question…"
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Type</Label>
          <Select value={q.type} onChange={(e) => onChange(idx, 'type', e.target.value)}>
            <option value="MCQ">Multiple Choice (MCQ)</option>
            <option value="TRUE_FALSE">True / False</option>
          </Select>
        </div>
        <div>
          <Label>Marks</Label>
          <Input
            type="number"
            value={q.marks}
            onChange={(e) => onChange(idx, 'marks', Number(e.target.value))}
            placeholder="1"
            min={1}
          />
        </div>
      </div>

      {/* MCQ Options */}
      {q.type === 'MCQ' && (
        <div className="space-y-2">
          <Label>Options</Label>
          {q.options.map((opt, oIdx) => (
            <div key={oIdx} className="flex items-center gap-2">
              <input
                type="radio"
                name={`correct-${q.id}`}
                checked={q.correctIndex === oIdx}
                onChange={() => onChange(idx, 'correctIndex', oIdx)}
                className="accent-blue-600 w-4 h-4 shrink-0 cursor-pointer"
                title="Mark as correct"
              />
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOption(oIdx, e.target.value)}
                placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          ))}
          {q.options.length < 6 && (
            <button
              onClick={addOption}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 mt-1 cursor-pointer"
            >
              <Plus size={12} /> Add option
            </button>
          )}
          <p className="text-xs text-slate-400 mt-1">Select the radio button next to the correct answer.</p>
        </div>
      )}

      {/* True/False Options */}
      {q.type === 'TRUE_FALSE' && (
        <div className="space-y-2">
          <Label>Correct Answer</Label>
          <div className="flex gap-4">
            {['True', 'False'].map((val, oIdx) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`tf-${q.id}`}
                  checked={q.correctIndex === oIdx}
                  onChange={() => onChange(idx, 'correctIndex', oIdx)}
                  className="accent-blue-600 w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-slate-700 font-medium">{val}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Step2({ questions, setQuestions }) {
  const addQuestion = () => setQuestions([...questions, makeQuestion()]);

  const removeQuestion = (idx) => {
    const updated = [...questions];
    updated.splice(idx, 1);
    setQuestions(updated);
  };

  const updateQuestion = (idx, field, value) => {
    const updated = [...questions];
    updated[idx] = { ...updated[idx], [field]: value };
    setQuestions(updated);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-700">Questions ({questions.length})</h3>
          <p className="text-xs text-slate-400 mt-0.5">Add MCQ or True/False questions to your quiz.</p>
        </div>
        <button
          onClick={addQuestion}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition cursor-pointer"
        >
          <Plus size={15} /> Add Question
        </button>
      </div>

      {questions.length === 0 ? (
        <div className="border-2 border-dashed border-slate-200 rounded-xl py-12 text-center">
          <BookOpen size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No questions yet. Click &quot;Add Question&quot; to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <QuestionCard
              key={q.id}
              q={q}
              idx={idx}
              onChange={updateQuestion}
              onRemove={removeQuestion}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Step 3: Settings ────────────────────────────────────────────────────────
function Step3({ settings, onChange }) {
  return (
    <div className="space-y-6">
      {/* Timer */}
      <div>
        <Label>Timer (minutes)</Label>
        <div className="relative max-w-xs">
          <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="number"
            value={settings.timer}
            onChange={(e) => onChange('timer', e.target.value)}
            placeholder="e.g. 30"
            min={1}
            max={300}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        <p className="text-xs text-slate-400 mt-1.5">Leave blank for no time limit.</p>
      </div>

      {/* Focus Mode */}
      <div className="flex items-start justify-between bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield size={20} className="text-blue-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-slate-700">Focus Mode</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Detects and warns students when they leave the quiz tab or window.
            </p>
          </div>
        </div>
        <button
          onClick={() => onChange('focusMode', !settings.focusMode)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${
            settings.focusMode ? 'bg-blue-600' : 'bg-slate-300'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
              settings.focusMode ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Quiz Type */}
      <div>
        <Label>Quiz Type</Label>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {['PRACTICE', 'MOCK', 'GROUP'].map((type) => (
            <button
              key={type}
              onClick={() => onChange('quizType', type)}
              className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all duration-150 cursor-pointer ${
                settings.quizType === type
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Practice: individual revision · Mock: graded exam · Group: collaborative
        </p>
      </div>
    </div>
  );
}

// ─── Step 4: Review & Publish ────────────────────────────────────────────────
function ReviewRow({ label, value }) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-slate-100 last:border-0">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider w-36 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-slate-700 font-medium flex-1">{value || <span className="text-slate-300 italic">Not provided</span>}</span>
    </div>
  );
}

function Step4({ basic, questions, settings }) {
  return (
    <div className="space-y-6">
      {/* Basic Details */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700">Basic Details</h3>
        </div>
        <div className="px-5">
          <ReviewRow label="Title" value={basic.title} />
          <ReviewRow label="Instructions" value={basic.instructions} />
          <ReviewRow label="Module" value={basic.module} />
          <ReviewRow label="Batch" value={basic.batch} />
          <ReviewRow label="Available From" value={basic.availableFrom} />
          <ReviewRow label="Available Until" value={basic.availableUntil} />
        </div>
      </div>

      {/* Questions Summary */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700">
            Questions ({questions.length}) — Total Marks:{' '}
            {questions.reduce((s, q) => s + (q.marks || 0), 0)}
          </h3>
        </div>
        {questions.length === 0 ? (
          <p className="px-5 py-4 text-sm text-slate-400 italic">No questions added.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {questions.map((q, idx) => (
              <div key={q.id} className="px-5 py-3 flex items-start gap-3">
                <span className="text-xs text-slate-400 font-medium w-5 shrink-0 mt-0.5">Q{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 font-medium truncate">{q.text || <span className="italic text-slate-300">Empty question</span>}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{q.type} · {q.marks} mark{q.marks !== 1 ? 's' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700">Settings</h3>
        </div>
        <div className="px-5">
          <ReviewRow label="Timer" value={settings.timer ? `${settings.timer} minutes` : 'No limit'} />
          <ReviewRow label="Focus Mode" value={settings.focusMode ? 'Enabled' : 'Disabled'} />
          <ReviewRow label="Quiz Type" value={settings.quizType} />
        </div>
      </div>
    </div>
  );
}

// ─── Toast ───────────────────────────────────────────────────────────────────
function Toast({ type, message, onClose }) {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;
  const iconClass = type === 'success' ? 'text-green-500' : 'text-red-500';

  return (
    <div className={`fixed top-5 right-5 z-50 flex items-start gap-3 border rounded-xl px-4 py-3 shadow-lg max-w-sm ${styles[type]}`}>
      <Icon size={18} className={`shrink-0 mt-0.5 ${iconClass}`} />
      <span className="text-sm font-medium flex-1">{message}</span>
      <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer ml-2">✕</button>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function CreateQuiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [basic, setBasic] = useState({
    title: '',
    instructions: '',
    module: '',
    batch: '',
    availableFrom: '',
    availableUntil: '',
  });

  const [questions, setQuestions] = useState([]);

  const [settings, setSettings] = useState({
    timer: '',
    focusMode: false,
    quizType: 'PRACTICE',
  });

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleBasicChange = (field, value) => {
    setBasic((prev) => ({ ...prev, [field]: value }));
  };

  const handleSettingsChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!basic.title.trim()) { showToast('error', 'Quiz title is required.'); return false; }
      if (!basic.module) { showToast('error', 'Please select a module.'); return false; }
      if (!basic.batch) { showToast('error', 'Please select a batch.'); return false; }
    }
    if (step === 2) {
      if (questions.length === 0) { showToast('error', 'Add at least one question.'); return false; }
      for (let i = 0; i < questions.length; i++) {
        if (!questions[i].text.trim()) { showToast('error', `Question ${i + 1} text is empty.`); return false; }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 4));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const buildPayload = (status) => ({
    title: basic.title,
    instructions: basic.instructions,
    moduleCode: basic.module,
    batch: basic.batch,
    availableFrom: basic.availableFrom || null,
    availableUntil: basic.availableUntil || null,
    timerMinutes: settings.timer ? Number(settings.timer) : null,
    focusMode: settings.focusMode,
    quizType: settings.quizType,
    status,
    questions: questions.map((q) => ({
      text: q.text,
      type: q.type,
      marks: q.marks,
      options: q.type === 'MCQ'
        ? q.options.map((o, i) => ({ text: o, correct: i === q.correctIndex }))
        : [{ text: 'True', correct: q.correctIndex === 0 }, { text: 'False', correct: q.correctIndex === 1 }],
    })),
  });

  const handlePublish = async () => {
    setLoading(true);
    try {
      await api.post('/api/admin/quizzes', buildPayload('PUBLISHED'));
      showToast('success', 'Quiz published successfully!');
      setTimeout(() => navigate('/admin/quizzes'), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to publish quiz. Please try again.';
      showToast('error', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      await api.post('/api/admin/quizzes', buildPayload('DRAFT'));
      showToast('success', 'Draft saved successfully!');
      setTimeout(() => navigate('/admin/quizzes'), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save draft.';
      showToast('error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeItem="quizzes" />

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
      )}

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Back button + Title */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/admin/quizzes')}
            className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 text-slate-500 hover:text-slate-700 transition cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Create New Quiz</h1>
            <p className="text-slate-500 text-sm mt-0.5">Fill in the details step by step</p>
          </div>
        </div>

        {/* Step Indicator */}
        <StepIndicator current={step} />

        {/* Step Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 mb-6 max-w-3xl">
          <h2 className="text-base font-semibold text-slate-800 mb-5">{STEPS[step - 1]}</h2>

          {step === 1 && <Step1 data={basic} onChange={handleBasicChange} />}
          {step === 2 && <Step2 questions={questions} setQuestions={setQuestions} />}
          {step === 3 && <Step3 settings={settings} onChange={handleSettingsChange} />}
          {step === 4 && <Step4 basic={basic} questions={questions} settings={settings} />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between max-w-3xl">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-white hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <div className="flex items-center gap-3">
            {step === 4 ? (
              <>
                <button
                  onClick={handleSaveDraft}
                  disabled={loading}
                  className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  {loading ? <Loader2 size={15} className="animate-spin" /> : null}
                  Save as Draft
                </button>
                <button
                  onClick={handlePublish}
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm shadow-blue-200 transition cursor-pointer"
                >
                  {loading ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle2 size={15} />}
                  Publish Quiz
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-sm shadow-blue-200 transition cursor-pointer"
              >
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
