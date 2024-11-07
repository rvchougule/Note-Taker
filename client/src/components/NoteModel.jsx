import { useState, useEffect } from "react";
import axios from "axios";
import { createPortal } from "react-dom";
import Editor from "./Editor";

export default function NoteModel({ setOpen, noteToEdit, setNoteToEdit }) {
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });
  // console.log("noteToEdit", noteToEdit);

  // Set initial note data if editing
  useEffect(() => {
    if (noteToEdit) {
      setNote({
        title: noteToEdit?.title || "",
        description: noteToEdit?.description?.blocks || "",
      });
    }
  }, [noteToEdit]);

  const validateConfig = {
    title: [{ required: true, message: "title is required" }],
    description: [
      { required: true, message: "Please add something to the note!" },
    ],
  };

  // Validate form data
  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });
    setErrors(errorsData);
    return errorsData;
  };

  // Handle form submission for both create and update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsData = validate(note);

    if (Object.keys(errorsData).length) return;

    if (noteToEdit) {
      // Update API call
      await axios
        .patch(`/notes/${noteToEdit._id}`, {
          title: note.title,
          description: note.description,
        })
        .then((res) => {
          console.log(`${res.data.message}`, res.data.data);
          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Create new note
      await axios
        .post("/notes/", {
          title: note.title,
          description: note.description,
        })
        .then((res) => {
          console.log(`${res.data.message}`, res.data.data);
          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevState) => ({ ...prevState, [name]: value }));
    setErrors({});
  };

  return createPortal(
    <div
      className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center w-full"
      onClick={() => {
        setOpen(false);
        setNoteToEdit(null);
      }}
    >
      <div
        className="mt-4 flex flex-col gap-2 w-full max-w-[70vw] bg-white p-4 text-black border-2 ring-gray-300 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold">
          {noteToEdit ? "Edit Note" : "Create Note"}
        </h1>
        <div className="mt-2 w-full">
          <label htmlFor="title" className="block text-md font-bold leading-6">
            Title
          </label>

          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
          />

          <p className="text-sm text-red-500 font-semibold">{errors.title}</p>
        </div>
        <div className="mt-2 w-full">
          <label
            htmlFor="description"
            className="block text-md font-bold leading-6"
          >
            Description
          </label>
          <Editor id="description" note={note} setNote={setNote} />
          <p className="text-sm text-red-500 font-semibold">
            {errors.description}
          </p>
        </div>
        <button
          className="w-full text-xl mt-4 py-2 font-semibold text-slate-200 bg-indigo-500 rounded"
          onClick={handleSubmit}
        >
          {noteToEdit ? "Update Note" : "Create Note"}
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
