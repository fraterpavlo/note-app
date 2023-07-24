import { Container } from "@mui/material";
import CreateForm from "../components/CreateNoteForm/CreateNoteForm";
import NotesList from "../components/NotesList/NotesList";

const MainPage = () => {
  return (
    <>
      <Container>
        <CreateForm />
        <h1>Заметки</h1>
        <NotesList />
      </Container>
    </>
  );
};

export default MainPage;
