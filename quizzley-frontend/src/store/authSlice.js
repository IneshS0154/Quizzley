import { createSlice } from '@reduxjs/toolkit';

<<<<<<< Updated upstream
const savedAuth = (() => {
  try {
    const raw = localStorage.getItem('quizzley_auth');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

const initialState = savedAuth
  ? { token: savedAuth.token, user: savedAuth.user, isAuthenticated: true }
  : { token: null, user: null, isAuthenticated: false };
=======
const token = localStorage.getItem('token');
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const initialState = {
  token: token || null,
  user: user || null,
  isAuthenticated: !!token,
  error: null,
  loading: false,
};
>>>>>>> Stashed changes

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
<<<<<<< Updated upstream
    loginSuccess(state, action) {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem('quizzley_auth', JSON.stringify({ token, user }));
=======
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
>>>>>>> Stashed changes
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
<<<<<<< Updated upstream
      localStorage.removeItem('quizzley_auth');
=======
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('quiz_attempt');
>>>>>>> Stashed changes
    },
  },
});

<<<<<<< Updated upstream
export const { loginSuccess, logout } = authSlice.actions;
=======
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
>>>>>>> Stashed changes
export default authSlice.reducer;
