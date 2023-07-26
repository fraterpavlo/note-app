import {
  Autocomplete,
  Backdrop,
  Checkbox,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  getFiltersState,
  getNotesData,
  getNotesState,
  getSelectedTags,
} from "../../store/selectors";
import Note from "../../components/Note/Note";
import {
  changeFilterSelectedTags,
  fetchNotesData,
} from "src/store/reducers/mainPageSlice";
import { BASE_URL } from "src/api/apiRequests";

const NotesList = () => {
  const dispatch = useAppDispatch();
  const notesState = useAppSelector(getNotesState);
  const notesData = useAppSelector(getNotesData);
  const filters = useAppSelector(getFiltersState);
  const filterSelectedTags = useAppSelector(getSelectedTags);
  const [valueOfTagFilterInput, setValueOfTagFilterInput] = useState<string[]>(
    []
  );

  async function onChangeTagFilterInput(
    event: SyntheticEvent<Element, Event>,
    selectedValues: string[]
  ) {
    setValueOfTagFilterInput(selectedValues);
    await dispatch(fetchNotesData(BASE_URL));
    dispatch(changeFilterSelectedTags(selectedValues));
  }

  const allAvailableTags = [
    ...new Set(notesData.map((item) => item.tags).flat(Infinity)),
  ];

  useEffect(() => {
    setValueOfTagFilterInput(filterSelectedTags);
  }, [filterSelectedTags]);

  useEffect(() => {
    dispatch(fetchNotesData(BASE_URL));
  }, []);

  const notesList = useMemo(() => {
    return notesData.map((itemData) => (
      <Note
        key={itemData.id}
        title={itemData.title}
        text={itemData.text}
        tags={itemData.tags}
        id={itemData.id}
      />
    ));
  }, [notesData]);

  if (notesState.isLoaded && notesData.length === 0)
    return (
      <strong>
        {filterSelectedTags.length === 0
          ? "Создайте первую карточку"
          : "Ничего не найдено"}
      </strong>
    );

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!notesState.isLoaded}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Autocomplete
        value={valueOfTagFilterInput}
        onChange={onChangeTagFilterInput}
        multiple
        options={allAvailableTags as string[]}
        disableCloseOnSelect
        getOptionLabel={(option: string) => option}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
            {option}
          </li>
        )}
        style={{ width: "100%" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Поиск по тегам"
            placeholder="Выберите теги"
          />
        )}
      />
      <Grid container spacing={2} sx={{ mt: "20px" }}>
        {notesState.error && <strong>{notesState.error}</strong>}
        {!notesState.error && notesState.isLoaded && notesList}
      </Grid>
    </>
  );
};

export default NotesList;
