import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  name: string | null;
  email: string | null;
  role: string | null;
  image: string | null;
  session?: string | null;
  isLoggedIn: boolean;
}

const initialState: IAuthState = {
  name: null,
  email: null,
  role: null,
  image: null,
  session: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeAuthUser: (state, action: PayloadAction<any>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.role = action.payload.role;
      state.session = action.payload.session ? action.payload.session : null;
      state.isLoggedIn = true;
    },
    deleteAuthUser: (state) => {
      state = { ...initialState };
    },
  },
});

export const { storeAuthUser, deleteAuthUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
