import { IState } from "./reducers/mainPageSlice.model";
export const getFiltersState = (state: { mainPage: IState }) =>
  state.mainPage.filtersState;
export const getSelectedTags = (state: { mainPage: IState }) =>
  state.mainPage.filtersState.selectedTags;
export const getNotesState = (state: { mainPage: IState }) =>
  state.mainPage.notesState;
export const getNotesData = (state: { mainPage: IState }) =>
  state.mainPage.notesState.notesData;
