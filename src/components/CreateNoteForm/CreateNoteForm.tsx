import {
  Button,
  FormControl,
  FormLabel,
  Paper,
  Stack,
  styled,
} from "@mui/material";
import { useState } from "react";
import HashTagEditor from "../HashTagEditor/HashTagEditor";
import "./CreateNoteForm.scss";
import { useAppDispatch } from "src/hooks/hooks";
import { addNote } from "src/api/apiRequests";
import { addNote as addNoteInState } from "src/store/reducers/mainPageSlice";
import { findHashtags } from "src/utils/functions";

const CreateNoteForm = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [isEmptyTitleError, setIsEmptyTitleError] = useState(false);
  const [noteText, setNoteText] = useState("");
  const dispatch = useAppDispatch();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (noteTitle.replace(/\r?\n|\r|\s|\x01/gm, "") === "") {
      setIsEmptyTitleError(true);
      return;
    }

    const noteData = {
      id: 0,
      title: noteTitle,
      text: noteText,
      tags: findHashtags(noteTitle + noteText),
    };

    const noteDataWithApiId = await addNote(noteData);

    dispatch(addNoteInState(noteDataWithApiId));
  };

  const hashtagsInNoteText = findHashtags(noteText + noteTitle).map(
    (item, idx) => {
      const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: "2px 5px",
        color: theme.palette.text.secondary,
        flexGrow: 0,
      }));
      return <Item key={`${item}_${idx}`}>{item}</Item>;
    }
  );

  return (
    <>
      <form autoComplete="off" onSubmit={onSubmit} className="form">
        <FormControl className="form__inner-container">
          <FormLabel>Создать заметку</FormLabel>
          <HashTagEditor
            placeholder="Заголовок*"
            classNames={`form__editor  form__editor_title ${
              isEmptyTitleError ? "form__editor_invalid" : ""
            }`}
            onChangeCallBack={(str: string) => {
              setIsEmptyTitleError(false);
              setNoteTitle(str);
            }}
          />
          <HashTagEditor
            placeholder="Текст"
            classNames="form__editor form__editor_text"
            onChangeCallBack={setNoteText}
          />
          <Stack
            className="form__tags-output"
            spacing={1}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {hashtagsInNoteText}
          </Stack>
          <Button type="submit">Создать</Button>
        </FormControl>
      </form>
    </>
  );
};

export default CreateNoteForm;
