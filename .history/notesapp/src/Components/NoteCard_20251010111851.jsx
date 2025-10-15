import React from "react";
import { motion } from "framer-motion";

const NoteCard = ({ note, index, deleteNote, editNote }) => {
  return (
    
    <motion.div
      className="col-md-4"
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="card note-card border-0 shadow-sm p-3 h-100 bg-white"
        whileHover={{ scale: 1.05 }}
      >
        <div className="card-body">
          <h5 className="card-title text-primary fw-bold">{note.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {note.category || "General"}
          </h6>
          <p className="card-text">{note.content}</p>
        </div>
        <div className="card-footer bg-transparent border-0 d-flex justify-content-between">
          <motion.button
            className="btn btn-sm btn-outline-warning"
            onClick={() => editNote(index)}
            whileHover={{ scale: 1.1 }}
          >
            Edit
          </motion.button>
          <motion.button
            className="btn btn-sm btn-outline-danger"
            onClick={() => deleteNote(index)}
            whileHover={{ scale: 1.1 }}
          >
            Delete
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NoteCard;