import { createSlice } from '@reduxjs/toolkit';

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem('quizzley_auth', JSON.stringify({ token, user }));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('quizzley_auth');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
