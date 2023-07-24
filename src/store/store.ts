import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import mainPageReducer from "./reducers/mainPageSlice";

export const store = configureStore({
  reducer: {
    mainPage: mainPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
