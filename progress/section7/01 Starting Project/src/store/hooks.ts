import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

import { type RootState, type AppDispatch } from "./store.ts";

type DispatchFunction = () => AppDispatch;

// better typed version than standard useDispatch and useSelector
export const useCartDispatch: DispatchFunction = useDispatch;
export const useCartSelector: TypedUseSelectorHook<RootState> = useSelector;
