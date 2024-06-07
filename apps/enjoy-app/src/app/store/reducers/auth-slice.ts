import { createSlice } from '@reduxjs/toolkit';
import { AuthMode } from '@global/utils/enum';

interface AuthState {
  mode: AuthMode;
  isLoggedIn: boolean;
  isAuthModalOpened: boolean;
}

const initialState: AuthState = {
  mode: AuthMode.Login,
  isLoggedIn: false,
  isAuthModalOpened: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(state: AuthState) {
      state.isLoggedIn = true;
    },
    logOut(state: AuthState) {
      state.isLoggedIn = false;
    },
    openAuthModal(state: AuthState) {
      state.isAuthModalOpened = true;
    },
    closeAuthModal(state: AuthState) {
      state.isAuthModalOpened = false;
    },
    toggleMode(state: AuthState) {
      state.mode =
        state.mode === AuthMode.Login ? AuthMode.Register : AuthMode.Login;
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
