import { useState, useEffect } from 'react';

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState(() => {
    const localQuizzes = localStorage.getItem('mockQuizzes');
    if (localQuizzes) {
      return JSON.parse(localQuizzes);
    }
    const defaultQuizzes = [
      {
        id: 'q-1',
        title: 'Midterm Assessment - Algebra',
        assignedClass: '10 - A',
        timeDate: 'Mar 12, 10:00-11:00 AM',
        participation: '18 / 25',
        status: 'Live',
        duration: '60',
        instructions: 'Please complete all questions. Non-programmable calculators are allowed. Show all steps for full marks.',
        isAvailable: true,
        questions: [
          { id: 1, text: 'Solve for x: 3x + 12 = 27', options: ['x = 3', 'x = 5', 'x = 6', 'x = 9'], correctAnswer: 'x = 5' },
          { id: 2, text: 'Factorise completely: x^2 - 9', options: ['(x-3)(x-3)', '(x+3)(x-3)', '(x+3)(x+3)', 'x(x-9)'], correctAnswer: '(x+3)(x-3)' }
        ],
        settings: { shuffleQuestions: true, showImmediateResults: true }
      },
      {
        id: 'q-2',
        title: 'Linear Equations - Practice',
        assignedClass: '9 - A',
        timeDate: '—',
        participation: '—',
        status: 'Draft',
        duration: '45',
        instructions: 'Practice questions on drawing linear equations and finding intercepts.',
        isAvailable: false,
        questions: [],
        settings: { shuffleQuestions: false, showImmediateResults: true }
      },
      {
        id: 'q-3',
        title: 'Quadratic Equations Quiz',
        assignedClass: '10 - B',
        timeDate: 'Mar 13, 9:30-10:00 AM',
        participation: '—',
        status: 'Scheduled',
        duration: '30',
        instructions: 'Focus on finding roots using the quadratic formula.',
        isAvailable: true,
        questions: [
          { id: 1, text: 'What is the quadratic formula?', options: ['x = (-b ± √(b^2-4ac))/2a', 'x = (b ± √(b^2-4ac))/2a', 'x = -b/2a', 'x = (a ± √(b^2-4ac))/2'], correctAnswer: 'x = (-b ± √(b^2-4ac))/2a' }
        ],
        settings: { shuffleQuestions: false, showImmediateResults: true }
      },
      {
        id: 'q-4',
        title: 'Weekly Math Practice - Week 4',
        assignedClass: '9 - A',
        timeDate: 'Mar 10, 2:30-3:00 PM',
        participation: '19 / 30',
        status: 'Completed',
        duration: '30',
        instructions: 'Revision of basic fractions, decimals, and percentage conversions.',
        isAvailable: false,
        questions: [],
        settings: { shuffleQuestions: false, showImmediateResults: true }
      },
      {
        id: 'q-5',
        title: 'Trigonometry Basics Test',
        assignedClass: '11 - A',
        timeDate: 'Mar 8, 12:00-12:45 PM',
        participation: '24 / 28',
        status: 'Completed',
        duration: '45',
        instructions: 'Use sine, cosine, and tangent rules to find missing angles and lengths.',
        isAvailable: false,
        questions: [],
        settings: { shuffleQuestions: true, showImmediateResults: false }
      },
      {
        id: 'q-6',
        title: 'Probability Concepts Quiz',
        assignedClass: '11 - B',
        timeDate: 'Mar 14, 11:00-11:30 AM',
        participation: '—',
        status: 'Scheduled',
        duration: '30',
        instructions: 'This quiz covers simple event probability, unions, and intersections.',
        isAvailable: true,
        questions: [],
        settings: { shuffleQuestions: false, showImmediateResults: true }
      },
      {
        id: 'q-7',
        title: 'Polynomials - Revision Quiz',
        assignedClass: '10 - A',
        timeDate: '—',
        participation: '—',
        status: 'Draft',
        duration: '50',
        instructions: 'Perform addition, subtraction, multiplication, and synthetic division on polynomials.',
        isAvailable: false,
        questions: [],
        settings: { shuffleQuestions: false, showImmediateResults: true }
      },
      {
        id: 'q-8',
        title: 'Mensuration Unit Test',
        assignedClass: '9 - B',
        timeDate: 'Mar 6, 10:00-10:40 AM',
        participation: '—',
        status: 'Completed',
        duration: '40',
        instructions: 'Calculate cylinder, cone, and sphere surface areas and volumes.',
        isAvailable: false,
        questions: [],
        settings: { shuffleQuestions: false, showImmediateResults: true }
      },
      // 16 additional quizzes to show rich pagination and hit exactly 24
      { id: 'q-9', title: 'Coordinate Geometry Basics', assignedClass: '9 - A', timeDate: 'Mar 4, 11:00-11:30 AM', participation: '28 / 30', status: 'Completed', duration: '30', instructions: '', questions: [], isAvailable: false, settings: {} },
      { id: 'q-10', title: 'Statistics - Central Tendency', assignedClass: '10 - A', timeDate: 'Mar 15, 1:00-1:45 PM', participation: '—', status: 'Scheduled', duration: '45', instructions: '', questions: [], isAvailable: true, settings: {} },
      { id: 'q-11', title: 'Calculus Introduction', assignedClass: '11 - A', timeDate: '—', participation: '—', status: 'Draft', duration: '60', instructions: '', questions: [], isAvailable: false, settings: {} },
      { id: 'q-12', title: 'Arithmetic Progression Test', assignedClass: '10 - B', timeDate: 'Mar 2, 9:00-9:45 AM', participation: '22 / 25', status: 'Completed', duration: '45', instructions: '', questions: [], isAvailable: false, settings: {} },
      { id: 'q-13', title: 'Set Theory Concepts', assignedClass: '9 - B', timeDate: 'Mar 18, 10:00-10:30 AM', participation: '—', status: 'Scheduled', duration: '30', instructions: '', questions: [], isAvailable: true, settings: {} },
      { id: 'q-14', title: 'Permutations & Combinations', assignedClass: '11 - B', timeDate: '—', participation: '—', status: 'Draft', duration: '40', instructions: '', questions: [], isAvailable: false, settings: {} },
      { id: 'q-15', title: 'Matrices and Determinants', assignedClass: '11 - A', timeDate: 'Feb 28, 2:00-3:00 PM', participation: '26 / 28', status: 'Completed', duration: '60', instructions: '', questions: [], isAvailable: false, settings: {} },
      { id: 'q-16', title: 'Euclidean Geometry Proofs', assignedClass: '9 - A', timeDate: 'Feb 26, 1:00-1:50 PM', participation: '29 / 30', status: 'Completed', duration: '50', instructions: '', questions: [], isAvailable: false, settings: {} },
      { id: 'q-17', title: 'Complex Numbers Introduction', assignedClass: '11 - B', timeDate: 'Mar 20, 11:30 AM-12:30 PM', participation: '—', status: 'Scheduled', duration: '60', instructions: '', questions: [], isAvailable: true, settings: {} },
      { id: 'q-18', title: 'Vector Algebra Basics', assignedClass: '11 - A', timeDate: '—', participation: '—', status: 'Draft', duration: '45', instructions: '', questions: [], isAvailable: false, settings: {} },
      { id: 'q-19', title: 'Logarithms & Indices', assignedClass: '9 - B', timeDate: 'Feb 20, 10:00-10:45 AM', participation: '23 / 24', status: 'Completed', duration: '45', instructions: '', questions: [], isAvailable: false, settings: {} },
      { id: 'q-20', title: 'Ratios and Proportions', assignedClass: '9 - A', timeDate: 'Feb 18, 9:00-9:30 AM', participation: '30 / 30', status: 'Completed', duration: '30', instructions: '', questions: [], isAvailable: false, settings: {} },
      { id: 'q-21', title: 'Circles and Tangents', assignedClass: '10 - B', timeDate: 'Mar 22, 10:00-10:40 AM', participation: '—', status: 'Scheduled', duration: '40', instructions: '', questions: [], isAvailable: true, settings: {} },
      { id: 'q-22', title: 'Probability Concepts Quiz II', assignedClass: '11 - B', timeDate: '—', participation: '—', status: 'Draft', duration: '45', instructions: '', questions: [], isAvailable: false, settings: {} },
      { id: 'q-23', title: 'Sequences and Series', assignedClass: '10 - A', timeDate: 'Feb 15, 11:00-11:50 AM', participation: '23 / 25', status: 'Completed', duration: 50, instructions: '', questions: [], isAvailable: false, settings: {} },
      { id: 'q-24', title: 'Trigonometry Identities', assignedClass: '11 - A', timeDate: 'Feb 12, 12:00-1:00 PM', participation: '27 / 28', status: 'Completed', duration: 60, instructions: '', questions: [], isAvailable: false, settings: {} }
    ];
    localStorage.setItem('mockQuizzes', JSON.stringify(defaultQuizzes));
    return defaultQuizzes;
  });

  const [viewMode, setViewMode] = useState('list'); // 'list' or 'create'
  
  // Filtering & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Quizzes'); // 'All Quizzes', 'Live', 'Drafts', 'Scheduled', 'Completed'
  const [classFilter, setClassFilter] = useState('All Classes');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Active quiz being viewed (Monitor / View / View Results Modal)
  const [selectedQuizDetails, setSelectedQuizDetails] = useState(null);

  // Form states for creating/editing quiz
  const [creationStep, setCreationStep] = useState(1); // 1 to 4
  const [editingQuizId, setEditingQuizId] = useState(null);
  
  const [quizTitle, setQuizTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [assignedClass, setAssignedClass] = useState('10 - A');
  const [duration, setDuration] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [scheduledDate, setScheduledDate] = useState('');
  
  // Questions list inside the wizard
  const [questions, setQuestions] = useState([]);
  // Form state for adding a single question
  const [currentQuestionText, setCurrentQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  // Settings step states
  const [shuffleQuestions, setShuffleQuestions] = useState(false);
  const [showImmediateResults, setShowImmediateResults] = useState(true);
  const [passingPercentage, setPassingPercentage] = useState('70');

  // Filter quizzes based on query, status tab, and class filter
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status tab filter matching
    let matchesStatus = true;
    if (statusFilter === 'Live') matchesStatus = quiz.status === 'Live';
    else if (statusFilter === 'Drafts') matchesStatus = quiz.status === 'Draft';
    else if (statusFilter === 'Scheduled') matchesStatus = quiz.status === 'Scheduled';
    else if (statusFilter === 'Completed') matchesStatus = quiz.status === 'Completed';

    // Class filter dropdown matching
    let matchesClass = true;
    if (classFilter !== 'All Classes') {
      matchesClass = quiz.assignedClass === classFilter;
    }

    return matchesSearch && matchesStatus && matchesClass;
  });

  // Calculate pagination details
  const totalItems = filteredQuizzes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  // Adjust current page if it overflows due to filters
  useEffect(() => {
    if (currentPage > totalPages) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuizzes = filteredQuizzes.slice(startIndex, startIndex + itemsPerPage);

  const startShowing = totalItems === 0 ? 0 : startIndex + 1;
  const endShowing = Math.min(startIndex + itemsPerPage, totalItems);

  // Switch to Create mode
  const handleCreateNewClick = () => {
    setEditingQuizId(null);
    setQuizTitle('');
    setInstructions('');
    setAssignedClass('10 - A');
    setDuration('');
    setIsAvailable(true);
    setScheduledDate('');
    setQuestions([]);
    setShuffleQuestions(false);
    setShowImmediateResults(true);
    setPassingPercentage('70');
    setCreationStep(1);
    setViewMode('create');
  };

  // Switch to Edit Mode loaded with a Draft quiz
  const handleEditDraft = (quiz) => {
    setEditingQuizId(quiz.id);
    setQuizTitle(quiz.title);
    setInstructions(quiz.instructions || '');
    setAssignedClass(quiz.assignedClass || '10 - A');
    setDuration(quiz.duration || '');
    setIsAvailable(quiz.isAvailable !== undefined ? quiz.isAvailable : true);
    setQuestions(quiz.questions || []);
    setShuffleQuestions(quiz.settings?.shuffleQuestions || false);
    setShowImmediateResults(quiz.settings?.showImmediateResults !== undefined ? quiz.settings?.showImmediateResults : true);
    setPassingPercentage(quiz.settings?.passingPercentage || '70');
    
    // Set scheduled date if exists
    if (quiz.timeDate && quiz.timeDate !== '—' && quiz.status === 'Scheduled') {
      // extract date format if standard or just keep it
      setScheduledDate(quiz.timeDate);
    } else {
      setScheduledDate('');
    }

    setCreationStep(1);
    setViewMode('create');
  };

  // Add a question helper
  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!currentQuestionText.trim()) return;
    if (options.some(opt => !opt.trim())) {
      alert('Please fill out all option choices.');
      return;
    }
    if (!correctAnswer) {
      alert('Please select which option is the correct answer.');
      return;
    }

    const newQuestion = {
      id: Date.now(),
      text: currentQuestionText,
      options: [...options],
      correctAnswer: correctAnswer
    };

    setQuestions([...questions, newQuestion]);
    
    // Reset inputs
    setCurrentQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  // Remove a question from list
  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  // Handle saving the quiz (either as draft or final publish)
  const handleSaveQuiz = (finalStatus = 'Draft') => {
    if (!quizTitle.trim()) {
      alert('Quiz Title is required.');
      return;
    }

    let calculatedTimeDate = '—';
    if (finalStatus === 'Live') {
      calculatedTimeDate = 'Today, 12:00-1:00 PM'; // Mock live duration
    } else if (finalStatus === 'Scheduled') {
      calculatedTimeDate = scheduledDate || 'Mar 15, 10:00-11:00 AM';
    }

    const quizData = {
      id: editingQuizId || 'q-' + Date.now(),
      title: quizTitle,
      assignedClass: assignedClass,
      timeDate: calculatedTimeDate,
      participation: finalStatus === 'Completed' ? '0 / 25' : (finalStatus === 'Live' ? '0 / 25' : '—'),
      status: finalStatus,
      duration: duration || '0',
      instructions: instructions,
      isAvailable: isAvailable,
      questions: questions,
      settings: {
        shuffleQuestions,
        showImmediateResults,
        passingPercentage
      }
    };

    const updatedList = editingQuizId
      ? quizzes.map(q => q.id === editingQuizId ? quizData : q)
      : [quizData, ...quizzes];

    localStorage.setItem('mockQuizzes', JSON.stringify(updatedList));
    setQuizzes(updatedList);
    setViewMode('list');
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-8 sm:p-10 flex flex-col justify-between animate-fade-in-up">
      <div>
        {viewMode === 'list' ? (
          /* ========================================================================= */
          /* LIST VIEW SECTION                                                         */
          /* ========================================================================= */
          <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-slate-200/50">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Quizzes</h1>
                <p className="text-sm text-slate-500 mt-1 font-medium font-sans">Manage all assessments across departments.</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button 
                  onClick={handleCreateNewClick}
                  className="px-5 py-2.5 bg-[#0a2540] hover:bg-slate-800 text-white text-sm font-semibold rounded-xl flex items-center space-x-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Create New Quiz</span>
                </button>
              </div>
            </div>

            {/* Filter Bar Grid Card */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              
              {/* Status Tabs Pills */}
              <div className="flex flex-wrap bg-slate-100/70 p-1 rounded-xl max-w-fit gap-1">
                {['All Quizzes', 'Live', 'Drafts', 'Scheduled', 'Completed'].map((tab) => {
                  const isActive = statusFilter === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        setStatusFilter(tab);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0a2540] text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Search & Class Dropdown */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                {/* Search Box */}
                <div className="relative flex-1 sm:w-64">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input 
                    type="text" 
                    placeholder="Search quizzes..." 
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-xs font-semibold"
                  />
                </div>

                {/* Class Dropdown */}
                <div className="relative">
                  <select 
                    value={classFilter}
                    onChange={(e) => {
                      setClassFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-none cursor-pointer pr-8 appearance-none shadow-sm"
                  >
                    <option value="All Classes">All Classes</option>
                    <option value="9 - A">Class 9 - A</option>
                    <option value="9 - B">Class 9 - B</option>
                    <option value="10 - A">Class 10 - A</option>
                    <option value="10 - B">Class 10 - B</option>
                    <option value="11 - A">Class 11 - A</option>
                    <option value="11 - B">Class 11 - B</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Quizzes Table Card */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70">
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Quiz Title</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Class</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Time / Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Participation</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedQuizzes.length > 0 ? (
                      paginatedQuizzes.map((quiz) => (
                        <tr key={quiz.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-bold text-blue-900 text-sm hover:underline cursor-pointer" onClick={() => setSelectedQuizDetails(quiz)}>
                              {quiz.title}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-500 font-bold text-xs">{quiz.assignedClass}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-500 font-semibold text-xs">{quiz.timeDate}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-500 font-semibold text-xs">{quiz.participation}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              quiz.status === 'Live' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                              quiz.status === 'Scheduled' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                              quiz.status === 'Draft' ? 'bg-slate-100 text-slate-600 border border-slate-200' :
                              'bg-slate-50 text-slate-500 border border-slate-200/50' // Completed
                            }`}>
                              {quiz.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {quiz.status === 'Live' && (
                              <button onClick={() => setSelectedQuizDetails(quiz)} className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline">Monitor</button>
                            )}
                            {quiz.status === 'Draft' && (
                              <button onClick={() => handleEditDraft(quiz)} className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline">Continue Editing</button>
                            )}
                            {quiz.status === 'Scheduled' && (
                              <button onClick={() => setSelectedQuizDetails(quiz)} className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline">View</button>
                            )}
                            {quiz.status === 'Completed' && (
                              <button onClick={() => setSelectedQuizDetails(quiz)} className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline">View Results</button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-slate-400 text-sm font-semibold">
                          No quizzes found matching filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer / Pagination */}
              <div className="bg-slate-50/50 px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-xs text-slate-500 font-semibold">
                  Showing {startShowing} to {endShowing} of {totalItems} quizzes
                </span>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center space-x-1">
                    {/* Previous Button */}
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer font-bold text-xs"
                    >
                      &lt;
                    </button>
                    
                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      const isActive = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#0f172a] text-white shadow-sm shadow-slate-900/10'
                              : 'border border-slate-200 text-slate-650 hover:bg-slate-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    {/* Next Button */}
                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-transparent cursor-pointer font-bold text-xs"
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* ========================================================================= */
          /* CREATION FLOW WIZARD SECTION                                              */
          /* ========================================================================= */
          <>
            {/* Top link & Save button */}
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => setViewMode('list')} 
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1.5 cursor-pointer"
              >
                <span>&larr;</span> <span>Back to Quizzes</span>
              </button>
              
              <button 
                onClick={() => handleSaveQuiz('Draft')}
                className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Save as Draft
              </button>
            </div>

            {/* Main Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {editingQuizId ? 'Edit Quiz Details' : 'Create New Quiz'}
              </h1>
              <p className="text-sm text-slate-500 mt-1 font-medium">Set up your quiz details before adding questions.</p>
            </div>

            {/* Multi-step progress layout */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4 max-w-4xl mx-auto">
                
                {/* Step 1 */}
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    creationStep === 1 
                      ? 'bg-blue-600 text-white ring-4 ring-blue-50' 
                      : (creationStep > 1 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400')
                  }`}>
                    {creationStep > 1 ? '✓' : '1'}
                  </div>
                  <div>
                    <span className={`text-xs font-bold block ${creationStep === 1 ? 'text-blue-600' : 'text-slate-400'}`}>Quiz Details</span>
                  </div>
                </div>

                <div className="hidden sm:block flex-1 h-px bg-slate-200"></div>

                {/* Step 2 */}
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    creationStep === 2 
                      ? 'bg-blue-600 text-white ring-4 ring-blue-50' 
                      : (creationStep > 2 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400')
                  }`}>
                    {creationStep > 2 ? '✓' : '2'}
                  </div>
                  <div>
                    <span className={`text-xs font-bold block ${creationStep === 2 ? 'text-blue-600' : 'text-slate-400'}`}>Add Questions</span>
                  </div>
                </div>

                <div className="hidden sm:block flex-1 h-px bg-slate-200"></div>

                {/* Step 3 */}
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    creationStep === 3 
                      ? 'bg-blue-600 text-white ring-4 ring-blue-50' 
                      : (creationStep > 3 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400')
                  }`}>
                    {creationStep > 3 ? '✓' : '3'}
                  </div>
                  <div>
                    <span className={`text-xs font-bold block ${creationStep === 3 ? 'text-blue-600' : 'text-slate-400'}`}>Settings</span>
                  </div>
                </div>

                <div className="hidden sm:block flex-1 h-px bg-slate-200"></div>

                {/* Step 4 */}
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    creationStep === 4 
                      ? 'bg-blue-600 text-white ring-4 ring-blue-50' 
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    4
                  </div>
                  <div>
                    <span className={`text-xs font-bold block ${creationStep === 4 ? 'text-blue-600' : 'text-slate-400'}`}>Preview & Publish</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Wizard Form Panels */}
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden mb-8 max-w-4xl mx-auto">
              
              {/* STEP 1: QUIZ DETAILS */}
              {creationStep === 1 && (
                <div className="p-8 animate-slide-in-right">
                  <div className="mb-6">
                    <h2 className="text-lg font-extrabold text-slate-900">Basic Information</h2>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">Define the core parameters for this assessment.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Quiz Title <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        placeholder="e.g. Midterm Assessment - Algebra"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-sm font-semibold shadow-inner"
                      />
                    </div>

                    {/* Instructions */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Instructions for Students</label>
                      <textarea 
                        rows="4"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="Add any specific instructions or rules students should follow during the quiz..."
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-sm font-semibold shadow-inner resize-y"
                      />
                      <span className="text-[10px] text-slate-400 font-bold mt-1.5 flex items-center space-x-1">
                        <span>👁</span> <span>This will be visible to students before they start.</span>
                      </span>
                    </div>

                    {/* Class & Duration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                      
                      {/* Assign Class */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2.5">Assign to Class <span className="text-red-500">*</span></label>
                        <div className="flex flex-wrap gap-2">
                          {['9 - A', '9 - B', '10 - A', '11 - A'].map((cls) => {
                            const isSel = assignedClass === cls;
                            return (
                              <button
                                key={cls}
                                type="button"
                                onClick={() => setAssignedClass(cls)}
                                className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                                  isSel 
                                    ? 'bg-[#0f172a] border-[#0f172a] text-white' 
                                    : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50'
                                }`}
                              >
                                {cls}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Duration */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Duration (Minutes)</label>
                        <div className="relative rounded-xl shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            {/* timer icon */}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <input 
                            type="number" 
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="e.g. 60"
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-sm font-semibold"
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold mt-1.5 block">
                          Enter 0 or leave blank if there is no time limit.
                        </span>
                      </div>
                    </div>

                    {/* Availability & Date details */}
                    <div className="pt-6 border-t border-slate-100 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block text-sm font-bold text-slate-800">Availability Status</label>
                          <p className="text-[10px] text-slate-400 font-bold">Toggle whether this quiz will be accessible instantly by students.</p>
                        </div>
                        
                        {/* Switch */}
                        <button
                          type="button"
                          onClick={() => setIsAvailable(!isAvailable)}
                          className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                            isAvailable ? 'bg-blue-600' : 'bg-slate-200'
                          }`}
                        >
                          <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            isAvailable ? 'translate-x-5.5' : 'translate-x-0'
                          }`}></div>
                        </button>
                      </div>

                      {/* Scheduled Date optional field */}
                      <div className="max-w-md">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Schedule Time Date (Optional)</label>
                        <input 
                          type="text" 
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          placeholder="e.g. Mar 15, 10:00-11:00 AM"
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-none transition-all text-xs font-semibold"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 2: ADD QUESTIONS */}
              {creationStep === 2 && (
                <div className="p-8 animate-slide-in-right">
                  <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900">Add Questions</h2>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">Build the question bank for this assessment.</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">
                      {questions.length} Question{questions.length !== 1 ? 's' : ''} Added
                    </span>
                  </div>

                  {/* Added Questions List Accordion */}
                  {questions.length > 0 && (
                    <div className="mb-8 space-y-3">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Questions List</h3>
                      <div className="space-y-2.5 max-h-80 overflow-y-auto pr-2">
                        {questions.map((q, idx) => (
                          <div key={q.id} className="p-4 bg-slate-50 border border-slate-200/50 rounded-xl flex items-start justify-between">
                            <div className="text-xs font-semibold text-slate-800">
                              <span className="font-bold text-blue-600">Q{idx + 1}:</span> {q.text}
                              <div className="grid grid-cols-2 gap-1.5 mt-2 max-w-md">
                                {q.options.map((opt, oIdx) => (
                                  <div key={oIdx} className={`px-2 py-1 rounded text-[10px] ${
                                    opt === q.correctAnswer 
                                      ? 'bg-green-50 text-green-700 font-bold border border-green-200' 
                                      : 'bg-white text-slate-550 border border-slate-100'
                                  }`}>
                                    {String.fromCharCode(65 + oIdx)}. {opt}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveQuestion(q.id)}
                              className="text-xs font-bold text-rose-500 hover:text-rose-700 hover:underline shrink-0"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add Question Form Block */}
                  <form onSubmit={handleAddQuestion} className="bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-5">
                    <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">+</span>
                      <span>Add A New Question</span>
                    </h3>

                    <div className="space-y-4">
                      {/* Question Text */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Question Text</label>
                        <input 
                          type="text"
                          value={currentQuestionText}
                          onChange={(e) => setCurrentQuestionText(e.target.value)}
                          placeholder="e.g. Solve for x: 5x + 3 = 18"
                          className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none text-xs font-semibold"
                        />
                      </div>

                      {/* Options Grid */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Option Choices</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                          {options.map((opt, oIdx) => (
                            <div key={oIdx} className="flex items-center space-x-2">
                              <span className="text-xs font-extrabold text-slate-400">{String.fromCharCode(65 + oIdx)}</span>
                              <input 
                                type="text"
                                value={opt}
                                onChange={(e) => {
                                  const nextOptions = [...options];
                                  nextOptions[oIdx] = e.target.value;
                                  setOptions(nextOptions);
                                }}
                                placeholder={`Option Choice ${String.fromCharCode(65 + oIdx)}`}
                                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none text-xs font-semibold"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Correct Answer Selection */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                        <div className="flex items-center space-x-2.5">
                          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Correct Option:</span>
                          <div className="flex space-x-1">
                            {options.map((opt, oIdx) => {
                              const char = String.fromCharCode(65 + oIdx);
                              const isCorrect = correctAnswer === opt && opt !== '';
                              return (
                                <button
                                  key={char}
                                  type="button"
                                  onClick={() => setCorrectAnswer(opt)}
                                  disabled={!opt.trim()}
                                  className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                                    isCorrect 
                                      ? 'bg-green-600 border-green-600 text-white shadow-sm' 
                                      : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white'
                                  }`}
                                >
                                  {char}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer"
                        >
                          Add Question
                        </button>
                      </div>

                    </div>
                  </form>
                </div>
              )}

              {/* STEP 3: SETTINGS */}
              {creationStep === 3 && (
                <div className="p-8 animate-slide-in-right">
                  <div className="mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-lg font-extrabold text-slate-900">Quiz Settings</h2>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">Customise behavior and rules for the quiz takers.</p>
                  </div>

                  <div className="space-y-6">
                    
                    {/* Shuffle questions */}
                    <div className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-200/50 rounded-2xl">
                      <div>
                        <label className="block text-sm font-bold text-slate-800">Shuffle Questions</label>
                        <p className="text-[10px] text-slate-400 font-bold">Students will get questions presented in randomized order.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShuffleQuestions(!shuffleQuestions)}
                        className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                          shuffleQuestions ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      >
                        <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                          shuffleQuestions ? 'translate-x-5.5' : 'translate-x-0'
                        }`}></div>
                      </button>
                    </div>

                    {/* Show results */}
                    <div className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-200/50 rounded-2xl">
                      <div>
                        <label className="block text-sm font-bold text-slate-800">Show Immediate Feedback</label>
                        <p className="text-[10px] text-slate-400 font-bold">Provide immediate score and correct answers upon quiz submission.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowImmediateResults(!showImmediateResults)}
                        className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                          showImmediateResults ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      >
                        <div className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                          showImmediateResults ? 'translate-x-5.5' : 'translate-x-0'
                        }`}></div>
                      </button>
                    </div>

                    {/* Passing Criteria */}
                    <div className="max-w-md pt-4">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Passing Grade Percentage (%)</label>
                      <input 
                        type="number"
                        value={passingPercentage}
                        onChange={(e) => setPassingPercentage(e.target.value)}
                        placeholder="e.g. 70"
                        className="w-24 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm font-semibold shadow-inner"
                      />
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 4: PREVIEW & PUBLISH */}
              {creationStep === 4 && (
                <div className="p-8 animate-slide-in-right">
                  <div className="mb-6 pb-4 border-b border-slate-100">
                    <h2 className="text-lg font-extrabold text-slate-900">Preview & Publish</h2>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">Verify all configurations before launching.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Header Info Banner */}
                    <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Quiz Details Summary</span>
                      <h3 className="text-xl font-extrabold text-slate-900 mt-1">{quizTitle || 'Untitled Quiz'}</h3>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-semibold text-slate-500">
                        <span className="flex items-center space-x-1 bg-white px-2.5 py-1 rounded-lg border border-slate-100">
                          <span className="text-slate-400">Class:</span> <strong className="text-slate-800">{assignedClass}</strong>
                        </span>
                        <span className="flex items-center space-x-1 bg-white px-2.5 py-1 rounded-lg border border-slate-100">
                          <span className="text-slate-400">Duration:</span> <strong className="text-slate-800">{duration || 'Unlimited'} mins</strong>
                        </span>
                        <span className="flex items-center space-x-1 bg-white px-2.5 py-1 rounded-lg border border-slate-100">
                          <span className="text-slate-400">Questions:</span> <strong className="text-slate-800">{questions.length}</strong>
                        </span>
                      </div>

                      {instructions && (
                        <div className="mt-4 pt-4 border-t border-slate-200/50 text-xs font-semibold text-slate-650 leading-relaxed">
                          <strong>Instructions:</strong> {instructions}
                        </div>
                      )}
                    </div>

                    {/* Questions summary layout */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3.5">Review Questions ({questions.length})</h4>
                      {questions.length === 0 ? (
                        <p className="text-xs text-slate-450 italic font-semibold">No questions added yet. Go back to Step 2 to add questions.</p>
                      ) : (
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                          {questions.map((q, idx) => (
                            <div key={q.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                              <p className="text-xs font-bold text-slate-800">Q{idx + 1}: {q.text}</p>
                              <div className="grid grid-cols-2 gap-1.5 mt-2">
                                {q.options.map((opt, oIdx) => (
                                  <div key={oIdx} className={`text-[10px] font-semibold px-2 py-1 rounded ${
                                    opt === q.correctAnswer ? 'bg-green-50 text-green-700 font-bold border border-green-200' : 'bg-white border border-slate-100 text-slate-500'
                                  }`}>
                                    {String.fromCharCode(65 + oIdx)}. {opt}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Settings brief summary */}
                    <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-500">
                      <div>
                        Shuffle Questions: <strong className="text-slate-800">{shuffleQuestions ? 'Enabled' : 'Disabled'}</strong>
                      </div>
                      <div>
                        Immediate Feedback: <strong className="text-slate-800">{showImmediateResults ? 'Enabled' : 'Disabled'}</strong>
                      </div>
                      <div>
                        Passing Criteria: <strong className="text-slate-800">{passingPercentage}%</strong>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Sticky Footer Wizard Control Row */}
              <div className="border-t border-slate-100 px-8 py-5 bg-slate-50 flex items-center justify-between">
                
                {/* Cancel on left */}
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to cancel? Any unsaved progress will be lost.')) {
                      setViewMode('list');
                    }
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>

                {/* Navigation Group on right */}
                <div className="flex items-center space-x-3.5">
                  {creationStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setCreationStep(prev => prev - 1)}
                      className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-650 hover:text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      &larr; Back
                    </button>
                  )}
                  
                  {creationStep < 4 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (creationStep === 1 && !quizTitle.trim()) {
                          alert('Quiz Title is required.');
                          return;
                        }
                        setCreationStep(prev => prev + 1);
                      }}
                      className="px-5 py-2.5 bg-[#0a2540] hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all hover:-translate-y-0.5 flex items-center space-x-1.5 cursor-pointer"
                    >
                      <span>Continue to {creationStep === 1 ? 'Questions' : (creationStep === 2 ? 'Settings' : 'Preview')}</span>
                      <span>&rarr;</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleSaveQuiz(scheduledDate ? 'Scheduled' : 'Live')}
                        disabled={questions.length === 0}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:bg-blue-800 transition-all hover:-translate-y-0.5 cursor-pointer"
                      >
                        Publish Quiz
                      </button>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </>
        )}
      </div>

      {/* Footer Branding */}
      <div className="pt-6 border-t border-slate-200/40 text-center mt-8">
        <p className="text-xs text-slate-400 font-medium">Quizzley Admin Console • © 2026 Quizzley Inc.</p>
      </div>

      {/* ========================================================================= */}
      {/* MOCK MONITOR / REVIEW DETAIL DIALOG MODAL                                 */}
      {/* ========================================================================= */}
      {selectedQuizDetails && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="bg-[#0f172a] text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assessment Details</span>
                <h3 className="text-lg font-bold mt-0.5 leading-tight">{selectedQuizDetails.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedQuizDetails(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              
              {/* Parameters info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Class Level</span>
                  <span className="text-sm font-bold text-slate-800">{selectedQuizDetails.assignedClass}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Time / Date</span>
                  <span className="text-sm font-bold text-slate-800">{selectedQuizDetails.timeDate}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Status</span>
                  <span className={`text-xs font-bold inline-block mt-0.5 ${
                    selectedQuizDetails.status === 'Live' ? 'text-indigo-600' :
                    selectedQuizDetails.status === 'Scheduled' ? 'text-blue-600' :
                    selectedQuizDetails.status === 'Draft' ? 'text-slate-500' : 'text-slate-700'
                  }`}>{selectedQuizDetails.status}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Participation</span>
                  <span className="text-sm font-bold text-slate-800">{selectedQuizDetails.participation}</span>
                </div>
              </div>

              {/* Instructions */}
              {selectedQuizDetails.instructions && (
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Instructions</span>
                  <p className="text-xs text-slate-650 leading-relaxed font-semibold">{selectedQuizDetails.instructions}</p>
                </div>
              )}

              {/* Questions list */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Questions bank ({selectedQuizDetails.questions?.length || 0})</h4>
                {!selectedQuizDetails.questions || selectedQuizDetails.questions.length === 0 ? (
                  <p className="text-xs text-slate-450 italic font-semibold">No questions uploaded for this assessment.</p>
                ) : (
                  <div className="space-y-3">
                    {selectedQuizDetails.questions.map((q, idx) => (
                      <div key={q.id || idx} className="p-3.5 border border-slate-100 rounded-xl bg-slate-50/30">
                        <span className="text-[10px] font-bold text-blue-600">Question {idx + 1}</span>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">{q.text}</p>
                        <div className="grid grid-cols-2 gap-1.5 mt-2">
                          {q.options?.map((opt, oIdx) => (
                            <div key={oIdx} className={`text-[10px] font-semibold px-2 py-1 rounded ${
                              opt === q.correctAnswer ? 'bg-green-50 text-green-700 font-bold border border-green-250/30' : 'bg-white text-slate-500 border border-slate-100'
                            }`}>
                              {String.fromCharCode(65 + oIdx)}. {opt}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSelectedQuizDetails(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
