import axios from "axios";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetAccessToken } from "../utils/localStorage";
import NoteModel from "../components/NoteModel";
import Note from "../components/Note";

// eslint-disable-next-line react/prop-types
function Home({ user, setUser, setAccessToken }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notesArr, setNotesArr] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [filter, setFilter] = useState("");

  const getCurrentUser = async () => {
    await axios
      .get("/user/current-user")
      .then(function (res) {
        setUser(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
        SetAccessToken(null);
        setAccessToken(false);
        navigate("/login");
      });
  };

  const getAllNotes = async () => {
    await axios
      .get("/notes/")
      .then(function (res) {
        setNotesArr(res.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onDelete = async (id) => {
    await axios
      .delete(`/notes/${id}`)
      .then(function () {
        // console.log(`${res.data.message}`, res.data.data);
        setNotesArr((prevState) => prevState.filter((note) => note._id !== id));
      })
      .catch(function (error) {
        console.log("Error while Note Deleting", error);
      });
  };

  const onEdit = (note) => {
    setNoteToEdit(note); // Set the note to be edited
    setOpen(true); // Open the modal
  };

  useEffect(() => {
    getCurrentUser();
    getAllNotes();
  }, []);

  // Filter notes based on the search filter
  const filteredNotes = notesArr.filter((note) =>
    note.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="relative h-screen flex flex-col">
      <Navbar user={user} filter={filter} setFilter={setFilter} />

      <div className="flex flex-wrap gap-2 justify-evenly w-full p-4">
        {filteredNotes.map((note) => (
          <Note
            key={note._id}
            data={note}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}

        {open && (
          <NoteModel
            setOpen={setOpen}
            noteToEdit={noteToEdit}
            setNoteToEdit={setNoteToEdit}
            setNotesArr={setNotesArr}
          />
        )}

        {/* Create Note Button */}
        <div
          className="text-4xl text-slate-200 font-bold absolute bottom-8 right-8 border-2 border-slate-200 bg-indigo-600 rounded-lg px-3 py-1 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          +
        </div>
      </div>
    </div>
  );
}

export default Home;
