import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import NoteCard from "./Components/NoteCard";
import NoteForm from "./Components/NoteForm";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDarkMode")) || false
  );
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");


  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const addNote = (note) => {
    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = note;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, note]);
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const editNote = (index) => {
    setEditIndex(index);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };


  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.content.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" ||
      (note.category && note.category.toLowerCase() === categoryFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });


  const categories = ["All", ...new Set(notes.map((note) => note.category || "General"))];

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <div className="container my-5">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NoteForm addNote={addNote} editNote={notes[editIndex]} />
        </motion.div>

        <hr className="my-4" />
        <h4 className="text-center mb-3 fw-bold text-primary">📚 Your Notes</h4>

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search notes..."
            className="form-control w-50"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <select
            className="form-select w-auto"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="row g-4">
          <AnimatePresence>
            {filteredNotes.length === 0 ? (
              <motion.p
                key="empty"
                className="text-center text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No matching notes found.
              </motion.p>
            ) : (
              filteredNotes.map((note, index) => (
                <NoteCard
                  key={index}
                  note={note}
                  index={index}
                  deleteNote={deleteNote}
                  editNote={editNote}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default App;