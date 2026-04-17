import { darkModeActions } from "../store/DarkModeSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function useDarkMode() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.darkMode.darkMode);

  const toggleDarkMode = () => dispatch(darkModeActions.toggleDarkMode());
  const setDarkMode = (val: boolean) =>
    dispatch(darkModeActions.setDarkMode(val));

  return { darkMode, toggleDarkMode, setDarkMode };
}

export default useDarkMode;
