import { createSlice } from '@reduxjs/toolkit';

<<<<<<< Updated upstream
const initialState = {
  quizzes: [],
=======
const loadSavedAttempt = () => {
  try {
    const saved = localStorage.getItem('quiz_attempt');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    return null;
  }
};

const initialState = {
  activeAttempt: loadSavedAttempt(),
>>>>>>> Stashed changes
  loading: false,
  error: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
<<<<<<< Updated upstream
    setQuizzes(state, action) {
      state.quizzes = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
=======
    startAttempt(state, action) {
      const { attemptId, quizId, title, questions, timerMinutes } = action.payload;
      state.activeAttempt = {
        attemptId,
        quizId,
        title,
        questions,
        selectedAnswers: {}, // key: questionId, value: selectedOptionId
        timeLeft: timerMinutes ? timerMinutes * 60 : null,
        startedAt: Date.now(),
      };
      localStorage.setItem('quiz_attempt', JSON.stringify(state.activeAttempt));
    },
    selectAnswer(state, action) {
      if (state.activeAttempt) {
        const { questionId, optionId } = action.payload;
        state.activeAttempt.selectedAnswers[questionId] = optionId;
        localStorage.setItem('quiz_attempt', JSON.stringify(state.activeAttempt));
      }
    },
    updateTimer(state, action) {
      if (state.activeAttempt && state.activeAttempt.timeLeft !== null) {
        state.activeAttempt.timeLeft = action.payload;
        localStorage.setItem('quiz_attempt', JSON.stringify(state.activeAttempt));
      }
    },
    clearAttempt(state) {
      state.activeAttempt = null;
      localStorage.removeItem('quiz_attempt');
>>>>>>> Stashed changes
    },
  },
});

<<<<<<< Updated upstream
export const { setQuizzes, setLoading, setError } = quizSlice.actions;
=======
export const { startAttempt, selectAnswer, updateTimer, clearAttempt } = quizSlice.actions;
>>>>>>> Stashed changes
export default quizSlice.reducer;
