import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IAction, IState } from "./mainPageSlice.model";
import { INoteData } from "src/components/Note/Note.model";

export const fetchNotesData = createAsyncThunk(
  "mainPage/fetchNotesData",
  async (link: string, { rejectWithValue }) => {
    try {
      const response = await fetch(link);

      if (!response.ok) throw new Error("Server Error!");

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const defaultState: IState = {
  filtersState: {
    selectedTags: [],
  },
  notesState: {
    isLoaded: false,
    notesData: [],
    error: null,
  },
};

const mainPageSlice = createSlice({
  name: "mainPage",
  initialState: defaultState,
  reducers: {
    addNote(state: IState, action: IAction) {
      const noteData = action.payload as unknown as INoteData;
      state.notesState.notesData = [...state.notesState.notesData, noteData];
    },
    deleteNote(state: IState, action: IAction) {
      const noteId = action.payload as unknown as number;
      state.notesState.notesData = state.notesState.notesData.filter(
        (item) => item.id != noteId
      );
    },
    changeNote(state: IState, action: IAction) {
      const newNoteData = action.payload as INoteData;
      const notesDataClone = [...state.notesState.notesData];
      const indexOfElement = notesDataClone.findIndex(
        (item) => item.id === newNoteData.id
      );
      if (indexOfElement === -1) return;

      notesDataClone[indexOfElement] = newNoteData;
      state.notesState.notesData = notesDataClone;
    },
    changeFilterSelectedTags(state: IState, action: IAction) {
      state.filtersState.selectedTags = action.payload as string[];

      state.notesState.notesData =
        state.filtersState.selectedTags.length === 0
          ? state.notesState.notesData
          : state.notesState.notesData.filter((note) =>
              state.filtersState.selectedTags.some((tag) =>
                note.tags.includes(tag)
              )
            );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotesData.pending, (state, action) => {
      state.notesState.isLoaded = false;
      state.notesState.error = null;
    });
    builder.addCase(fetchNotesData.fulfilled, (state, action) => {
      state.notesState.isLoaded = true;
      state.notesState.error = null;
      state.notesState.notesData = action.payload;
    });
    builder.addCase(fetchNotesData.rejected, (state, action) => {
      state.notesState.isLoaded = true;
      state.notesState.error = action.payload as string;
    });
  },
});

export const { deleteNote, addNote, changeNote, changeFilterSelectedTags } =
  mainPageSlice.actions;
export default mainPageSlice.reducer;
