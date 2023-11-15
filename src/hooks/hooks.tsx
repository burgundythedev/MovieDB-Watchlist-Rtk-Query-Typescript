import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

type DispatchFunction = () => AppDispatch;

export const useWatchListDispatch: DispatchFunction = useDispatch;
export const useWatchListSelector: TypedUseSelectorHook<RootState> =
  useSelector;
