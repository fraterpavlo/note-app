import { INoteData } from "../../components/Note/Note.model";

export interface IAction {
  type: string;
  payload: number | INoteData | string[];
}

export interface IState {
  filtersState: IFiltersState;
  notesState: INotesState;
}

export interface IFiltersState {
  selectedTags: string[];
}

export interface INotesState {
  isLoaded: boolean;
  notesData: INoteData[];
  error: null | string;
}
