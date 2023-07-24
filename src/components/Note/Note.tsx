import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Stack,
} from "@mui/material";
import { INoteData } from "./Note.model";
import HashTagEditor from "../HashTagEditor/HashTagEditor";
import { changeNote, deleteNote } from "src/api/apiRequests";
import {
  changeFilterSelectedTags,
  changeNote as changeNoteInState,
  deleteNote as deleteNoteInState,
} from "src/store/reducers/mainPageSlice";
import { useAppDispatch } from "src/hooks/hooks";
import { useState } from "react";
import { findHashtags } from "src/utils/functions";
import "./style.scss";

const Note = ({ title, text, tags, id }: INoteData) => {
  const dispatch = useAppDispatch();
  const [isNoteEditing, setIsNoteEditing] = useState(false);
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteText, setNoteText] = useState(text);

  function onDelete(id: number) {
    deleteNote(id);
    dispatch(deleteNoteInState(id));
  }

  function onNoteEdit() {
    setIsNoteEditing(true);
  }

  function onNoteSave() {
    setIsNoteEditing(false);
    const changedNoteData = {
      id,
      title: noteTitle,
      text: noteText,
      tags: findHashtags(noteText + noteTitle),
    };

    dispatch(changeNoteInState(changedNoteData));
    changeNote(changedNoteData);
  }

  function onTagChipClick(item: string) {
    const arrWithItem = [item];
    dispatch(changeFilterSelectedTags(arrWithItem));
  }

  const tagsList = tags.map((item) => (
    <Chip
      key={item}
      size="small"
      variant="outlined"
      label={item}
      onClick={() => onTagChipClick(item)}
    />
  ));

  return (
    <Grid item xs={12} sm={4}>
      <Card sx={{ height: "100%" }} className="note-card">
        <CardContent className="note-card__content-container">
          <HashTagEditor
            classNames={`note-card__title-editor ${
              isNoteEditing ? "editing" : ""
            }`}
            initialValue={title}
            readOnly={!isNoteEditing}
            onChangeCallBack={setNoteTitle}
          />
          <HashTagEditor
            classNames={`note-card__text-editor ${
              isNoteEditing ? "editing" : ""
            }`}
            initialValue={text}
            readOnly={!isNoteEditing}
            onChangeCallBack={setNoteText}
          />
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={isNoteEditing ? onNoteSave : onNoteEdit}
          >
            {isNoteEditing ? "Сохранить" : "Изменить"}
          </Button>
          <Button size="small" onClick={() => onDelete(id)}>
            Удалить
          </Button>
        </CardActions>
        <Stack
          className="note-card__tags-container"
          spacing={1}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {tagsList}
        </Stack>
      </Card>
    </Grid>
  );
};

export default Note;
