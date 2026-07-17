import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create Axios Instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to add Bearer Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ----------------------------------------------------
// LOCAL STORAGE MOCK DATABASE (Fallback if Backend is Offline)
// ----------------------------------------------------
const INITIAL_MOCK_QUIZZES = [
  {
    quizId: 1,
    moduleId: 4,
    moduleName: 'Programming Fundamentals',
    moduleCode: 'PF101',
    title: 'Midterm Assessment - Algebra',
    description: 'Algebra midterm covers linear and quadratic concepts.',
    quizType: 'MOCK',
    timerMinutes: 60,
    focusModeEnabled: true,
    isActive: true,
    isTemporarilyDisabled: false,
    availableFrom: '2026-03-12T10:00:00',
    availableUntil: '2026-03-12T11:00:00',
    specializationId: 1,
    specializationName: 'Software Engineering',
    batchId: 1,
    batchName: 'Y1S1',
    participationCount: 18,
    totalParticipants: 25,
    status: 'Live',
    actionText: 'Monitor',
    questions: [
      {
        questionId: 1,
        questionText: 'Solve for x: 3x - 7 = 14',
        questionType: 'MCQ',
        marks: 2.00,
        options: [
          { optionId: 1, optionText: 'x = 5', isCorrect: false },
          { optionId: 2, optionText: 'x = 7', isCorrect: true },
          { optionId: 3, optionText: 'x = 21', isCorrect: false },
          { optionId: 4, optionText: 'x = 3', isCorrect: false },
        ]
      },
      {
        questionId: 2,
        questionText: 'What is the root of the equation x^2 - 9 = 0?',
        questionType: 'MCQ',
        marks: 2.00,
        options: [
          { optionId: 5, optionText: '3', isCorrect: false },
          { optionId: 6, optionText: '3 and -3', isCorrect: true },
          { optionId: 7, optionText: '9 and -9', isCorrect: false },
          { optionId: 8, optionText: '0', isCorrect: false },
        ]
      },
      {
        questionId: 3,
        questionText: 'The sum of angles in a triangle is 180 degrees.',
        questionType: 'TRUE_FALSE',
        marks: 1.00,
        options: [
          { optionId: 9, optionText: 'True', isCorrect: true },
          { optionId: 10, optionText: 'False', isCorrect: false },
        ]
      }
    ]
  },
  {
    quizId: 2,
    moduleId: 4,
    moduleName: 'Programming Fundamentals',
    moduleCode: 'PF101',
    title: 'Linear Equations - Practice',
    description: 'Self-paced practice questions for linear formulas.',
    quizType: 'PRACTICE',
    timerMinutes: null,
    focusModeEnabled: false,
    isActive: true,
    isTemporarilyDisabled: false,
    availableFrom: null,
    availableUntil: null,
    specializationId: 1,
    specializationName: 'Software Engineering',
    batchId: 1,
    batchName: 'Y1S1',
    participationCount: 0,
    totalParticipants: 0,
    status: 'Draft',
    actionText: 'Continue Editing',
    questions: []
  },
  {
    quizId: 3,
    moduleId: 4,
    moduleName: 'Programming Fundamentals',
    moduleCode: 'PF101',
    title: 'Quadratic Equations Quiz',
    description: 'Assess your skills in completing the square.',
    quizType: 'MOCK',
    timerMinutes: 30,
    focusModeEnabled: false,
    isActive: true,
    isTemporarilyDisabled: false,
    availableFrom: '2026-03-13T09:30:00',
    availableUntil: '2026-03-13T10:00:00',
    specializationId: 1,
    specializationName: 'Software Engineering',
    batchId: 2,
    batchName: 'Y1S2',
    participationCount: 0,
    totalParticipants: 0,
    status: 'Scheduled',
    actionText: 'View',
    questions: []
  },
  {
    quizId: 4,
    moduleId: 1,
    moduleName: 'Database Systems',
    moduleCode: 'DBS101',
    title: 'Weekly Math Practice - Week 4',
    description: 'Common math applications in database logic structures.',
    quizType: 'PRACTICE',
    timerMinutes: 30,
    focusModeEnabled: false,
    isActive: true,
    isTemporarilyDisabled: false,
    availableFrom: '2026-03-10T14:30:00',
    availableUntil: '2026-03-10T15:00:00',
    specializationId: 1,
    specializationName: 'Software Engineering',
    batchId: 1,
    batchName: 'Y1S1',
    participationCount: 19,
    totalParticipants: 30,
    status: 'Completed',
    actionText: 'View Results',
    questions: []
  },
  {
    quizId: 5,
    moduleId: 4,
    moduleName: 'Programming Fundamentals',
    moduleCode: 'PF101',
    title: 'Trigonometry Basics Test',
    description: 'Introductory trigonometry questions covering triangles and sine/cosine identities.',
    quizType: 'MOCK',
    timerMinutes: 45,
    focusModeEnabled: true,
    isActive: true,
    isTemporarilyDisabled: false,
    availableFrom: '2026-03-08T12:00:00',
    availableUntil: '2026-03-08T12:45:00',
    specializationId: 2,
    specializationName: 'Cyber Security',
    batchId: 1,
    batchName: 'Y1S1',
    participationCount: 24,
    totalParticipants: 28,
    status: 'Completed',
    actionText: 'View Results',
    questions: [
      {
        questionId: 4,
        questionText: 'What is sin(90 degrees)?',
        questionType: 'MCQ',
        marks: 2.00,
        options: [
          { optionId: 11, optionText: '0', isCorrect: false },
          { optionId: 12, optionText: '0.5', isCorrect: false },
          { optionId: 13, optionText: '1', isCorrect: true },
          { optionId: 14, optionText: '-1', isCorrect: false },
        ]
      },
      {
        questionId: 5,
        questionText: 'If cos(theta) = 0, what is theta in degrees?',
        questionType: 'MCQ',
        marks: 3.00,
        options: [
          { optionId: 15, optionText: '0 degrees', isCorrect: false },
          { optionId: 16, optionText: '45 degrees', isCorrect: false },
          { optionId: 17, optionText: '90 degrees', isCorrect: true },
          { optionId: 18, optionText: '180 degrees', isCorrect: false },
        ]
      }
    ]
  },
  {
    quizId: 6,
    moduleId: 1,
    moduleName: 'Database Systems',
    moduleCode: 'DBS101',
    title: 'Probability Concepts Quiz',
    description: 'Basics of permutations, combinations, and basic probability.',
    quizType: 'MOCK',
    timerMinutes: 30,
    focusModeEnabled: false,
    isActive: true,
    isTemporarilyDisabled: false,
    availableFrom: '2026-03-14T11:00:00',
    availableUntil: '2026-03-14T11:30:00',
    specializationId: 2,
    specializationName: 'Cyber Security',
    batchId: 2,
    batchName: 'Y1S2',
    participationCount: 0,
    totalParticipants: 0,
    status: 'Scheduled',
    actionText: 'View',
    questions: []
  },
  {
    quizId: 7,
    moduleId: 2,
    moduleName: 'Software Engineering',
    moduleCode: 'SE201',
    title: 'Polynomials - Revision Quiz',
    description: 'Algebraic concepts and root calculations.',
    quizType: 'PRACTICE',
    timerMinutes: null,
    focusModeEnabled: false,
    isActive: true,
    isTemporarilyDisabled: false,
    availableFrom: null,
    availableUntil: null,
    specializationId: 1,
    specializationName: 'Software Engineering',
    batchId: 1,
    batchName: 'Y1S1',
    participationCount: 0,
    totalParticipants: 0,
    status: 'Draft',
    actionText: 'Continue Editing',
    questions: []
  },
  {
    quizId: 8,
    moduleId: 4,
    moduleName: 'Programming Fundamentals',
    moduleCode: 'PF101',
    title: 'Mensuration Unit Test',
    description: 'Evaluating volumetric and surface calculations.',
    quizType: 'MOCK',
    timerMinutes: 40,
    focusModeEnabled: true,
    isActive: true,
    isTemporarilyDisabled: false,
    availableFrom: '2026-03-06T10:00:00',
    availableUntil: '2026-03-06T10:40:00',
    specializationId: 1,
    specializationName: 'Software Engineering',
    batchId: 1,
    batchName: 'Y1S1',
    participationCount: 0,
    totalParticipants: 0,
    status: 'Completed',
    actionText: 'View Results',
    questions: []
  }
];

const getLocalStorageData = () => {
  let quizzes = localStorage.getItem('mock_quizzes');
  if (!quizzes) {
    localStorage.setItem('mock_quizzes', JSON.stringify(INITIAL_MOCK_QUIZZES));
    quizzes = JSON.stringify(INITIAL_MOCK_QUIZZES);
  }
  return JSON.parse(quizzes);
};

const saveLocalStorageData = (quizzes) => {
  localStorage.setItem('mock_quizzes', JSON.stringify(quizzes));
};

// ----------------------------------------------------
// AUTHENTICATION API
// ----------------------------------------------------
export const authApi = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.warn('Backend offline. Using Mock Auth fallback.');
      if (email === 'teacher@quizzley.com' && password === 'password') {
        return {
          token: 'mock_jwt_token_for_teacher',
          user: {
            userId: 1,
            fullName: 'Admin Teacher',
            email: 'teacher@quizzley.com',
            role: 'ADMIN',
          }
        };
      } else if (email === 'student@quizzley.com' && password === 'password') {
        return {
          token: 'mock_jwt_token_for_student',
          user: {
            userId: 2,
            fullName: 'Student User',
            email: 'student@quizzley.com',
            role: 'STUDENT',
            specializationId: 1,
            specializationName: 'Software Engineering',
            batchId: 1,
            batchName: 'Y1S1',
          }
        };
      }
      throw new Error(error.response?.data || 'Invalid email or password.');
    }
  },
  register: async (data) => {
    try {
      const response = await apiClient.post('/auth/register', data);
      return response.data;
    } catch (error) {
      console.warn('Backend offline. Mock register fallback.');
      return {
        userId: Math.floor(Math.random() * 1000) + 10,
        fullName: data.fullName,
        email: data.email,
        role: data.role || 'STUDENT',
        specializationId: data.specializationId,
        specializationName: data.specializationId === 1 ? 'Software Engineering' : 'Cyber Security',
        batchId: data.batchId,
        batchName: 'Y1S1',
      };
    }
  }
};

// ----------------------------------------------------
// QUIZZES API
// ----------------------------------------------------
export const quizzesApi = {
  getQuizzes: async (role) => {
    try {
      const path = role === 'ADMIN' ? '/admin/quizzes' : '/student/quizzes';
      const response = await apiClient.get(path);
      return response.data;
    } catch (error) {
      console.warn('Backend offline. Mock quizzes list fallback.');
      const data = getLocalStorageData();
      if (role === 'ADMIN') {
        return data;
      } else {
        // filter by student batch (Software Engineering Y1S1 is specializationId 1, batchId 1)
        return data.filter(q => q.specializationId === 1 && q.batchId === 1);
      }
    }
  },
  getQuizDetails: async (quizId, role) => {
    try {
      const path = role === 'ADMIN' ? `/admin/quizzes/${quizId}` : `/student/quizzes/${quizId}`;
      const response = await apiClient.get(path);
      return response.data;
    } catch (error) {
      console.warn('Backend offline. Mock quiz details fallback.');
      const data = getLocalStorageData();
      const quiz = data.find(q => q.quizId === Number(quizId));
      if (!quiz) throw new Error('Quiz not found');
      return quiz;
    }
  },
  saveQuiz: async (quizDto) => {
    try {
      const response = await apiClient.post('/admin/quizzes', quizDto);
      return response.data;
    } catch (error) {
      console.warn('Backend offline. Mock save quiz fallback.');
      const data = getLocalStorageData();
      if (quizDto.quizId) {
        // Update
        const idx = data.findIndex(q => q.quizId === quizDto.quizId);
        if (idx !== -1) {
          data[idx] = { ...data[idx], ...quizDto };
        }
      } else {
        // Create
        quizDto.quizId = Math.floor(Math.random() * 1000) + 10;
        quizDto.participationCount = 0;
        quizDto.totalParticipants = 25;
        quizDto.status = 'Draft';
        data.push(quizDto);
      }
      saveLocalStorageData(data);
      return quizDto;
    }
  },
  deleteQuiz: async (quizId) => {
    try {
      await apiClient.delete(`/admin/quizzes/${quizId}`);
      return true;
    } catch (error) {
      console.warn('Backend offline. Mock delete quiz fallback.');
      const data = getLocalStorageData();
      const filtered = data.filter(q => q.quizId !== Number(quizId));
      saveLocalStorageData(filtered);
      return true;
    }
  }
};

// ----------------------------------------------------
// ATTEMPTS API
// ----------------------------------------------------
export const attemptsApi = {
  startAttempt: async (quizId) => {
    try {
      const response = await apiClient.post(`/student/attempts/start?quizId=${quizId}`);
      return response.data;
    } catch (error) {
      console.warn('Backend offline. Mock start attempt fallback.');
      const data = getLocalStorageData();
      const quiz = data.find(q => q.quizId === Number(quizId));
      if (!quiz) throw new Error('Quiz not found');
      
      // Shuffle questions
      const shuffledQs = [...quiz.questions].sort(() => 0.5 - Math.random());
      
      return {
        attemptId: Math.floor(Math.random() * 10000) + 100,
        quizId: quiz.quizId,
        title: quiz.title,
        timerMinutes: quiz.timerMinutes,
        focusModeEnabled: quiz.focusModeEnabled,
        questions: shuffledQs.map(q => ({
          ...q,
          options: q.options.map(opt => ({ ...opt, isCorrect: false })) // Hide answers
        }))
      };
    }
  },
  submitAttempt: async (submitRequest) => {
    try {
      const response = await apiClient.post('/student/attempts/submit', submitRequest);
      return response.data;
    } catch (error) {
      console.warn('Backend offline. Mock submit attempt fallback.');
      const data = getLocalStorageData();
      const quiz = data.find(q => q.quizId === submitRequest.quizId);
      
      let obtained = 0;
      let total = 0;
      
      const details = submitRequest.answers.map(ans => {
        const fullQ = quiz.questions.find(q => q.questionId === ans.questionId);
        total += fullQ.marks;
        
        const correctOpt = fullQ.options.find(o => o.isCorrect);
        const isCorrect = correctOpt.optionId === ans.selectedOptionId;
        if (isCorrect) {
          obtained += fullQ.marks;
        }
        
        return {
          questionId: ans.questionId,
          selectedOptionId: ans.selectedOptionId,
          isCorrect,
          marksAwarded: isCorrect ? fullQ.marks : 0,
        };
      });

      // Save attempts to localStorage to keep score logs
      const attempts = JSON.parse(localStorage.getItem('mock_attempts') || '[]');
      const newAttempt = {
        attemptId: submitRequest.attemptId,
        quizId: submitRequest.quizId,
        quizTitle: quiz.title,
        startedAt: new Date().toISOString(),
        submittedAt: new Date().toISOString(),
        totalMarks: total,
        obtainedMarks: obtained,
        status: 'SUBMITTED',
        details
      };
      attempts.push(newAttempt);
      localStorage.setItem('mock_attempts', JSON.stringify(attempts));

      return newAttempt;
    }
  },
  getAttempts: async () => {
    try {
      const response = await apiClient.get('/student/attempts');
      return response.data;
    } catch (error) {
      console.warn('Backend offline. Mock get attempts fallback.');
      return JSON.parse(localStorage.getItem('mock_attempts') || '[]');
    }
  }
};
