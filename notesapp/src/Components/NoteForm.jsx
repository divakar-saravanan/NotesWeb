import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NoteForm = ({ addNote, editNote }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setCategory(editNote.category);
      setContent(editNote.content);
    } else {
      setTitle("");
      setCategory("");
      setContent("");
    }
  }, [editNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please fill in the title and content!");
      return;
    }

    const newNote = { title, category, content };
    addNote(newNote);
    setTitle("");
    setCategory("");
    setContent("");
  };

  return (
    <motion.div
      className="card shadow-lg border-0 p-4 bg-white"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <h4 className="text-center mb-3 text-primary">
        {editNote ? "✏ Edit Note" : "📝 Add a New Note"}
      </h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Category (optional)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="col-12">
          <textarea
            className="form-control form-control-lg"
            rows="3"
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="col-12 text-end">
          <motion.button
            type="submit"
            className={`btn ${editNote ? "btn-warning" : "btn-primary"} px-4 py-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
          >
            {editNote ? "Update Note" : "Add Note"}
          </motion.button>
        </div>
        <div className="notes-container">
  <div className="note-card red">Note 1</div>
  <div className="note-card blue">Note 2</div>
  <div className="note-card green">Note 3</div>
  <div className="note-card purple">Note 4</div>
</div>
      </form>
    </motion.div>
  );
};

export default NoteForm;