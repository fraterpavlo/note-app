import { INoteData } from "src/components/Note/Note.model";

export const BASE_URL = "https://649b5496bf7c145d023a3abb.mockapi.io/notes";

export async function getAllProducts() {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}

export async function getProductById(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}

export async function addNote(noteData: INoteData) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(noteData),
    });

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}

export async function deleteNote(id: number) {
  try {
    fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}

export async function changeNote(noteData: INoteData) {
  try {
    fetch(`${BASE_URL}/${noteData.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(noteData),
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}
