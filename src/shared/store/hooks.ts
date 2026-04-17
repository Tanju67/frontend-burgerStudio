import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { RootState, AppDispatch } from "./index"; // store.ts'den gelecek

// Artık bileşenlerde bunları kullanacaksın:
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
