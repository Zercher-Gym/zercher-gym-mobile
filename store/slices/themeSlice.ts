import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IThemeState {
  mode: "light" | "dark";
}

const initialState: IThemeState = {
  mode: "dark",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleThemeMode: (state: IThemeState) => {
      if (state.mode === "dark") {
        state.mode = "light";
      } else {
        state.mode = "dark";
      }
    },
  },
});

const selectSelf = (state: RootState) => state;
const selectThemeMode = createSelector(
  selectSelf,
  (state: RootState) => state.theme.mode
);

export const { toggleThemeMode } = themeSlice.actions;
export { selectThemeMode };
export default themeSlice;
