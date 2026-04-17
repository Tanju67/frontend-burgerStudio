import { createSlice } from "@reduxjs/toolkit";

type DarkModeState = {
  darkMode: boolean;
};
const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme === "dark";
};

const initialState: DarkModeState = {
  darkMode: getInitialTheme(),
};
const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const darkModeActions = darkModeSlice.actions;

export default darkModeSlice.reducer;
