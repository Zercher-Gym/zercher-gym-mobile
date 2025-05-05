import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

export interface IAuthenticationState {
  token: string | null;
}

const initialState: IAuthenticationState = {
  token: null,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
  },
});

const selectSelf = (state: RootState) => state;
const selectIsSignedIn = createSelector(
  selectSelf,
  (state) => state.authentication.token !== null
);

export const { setToken, removeToken } = authenticationSlice.actions;
export { selectIsSignedIn };
export default authenticationSlice;
