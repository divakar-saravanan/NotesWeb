import React from "react";
import { motion } from "framer-motion";
import notepad from ".assets/"

const Navbar = ({ isDarkMode, toggleTheme }) => {
  return (
    <>
      <motion.nav
        className={`navbar ${
          isDarkMode ? "navbar-dark bg-dark" : "navbar-dark bg-primary"
        } px-3 shadow`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="/logo192.png"
            alt="Logo"
            width="35"
            height="35"
            className="me-2 rounded-circle"
          />
          <strong>Notes App</strong>
        </a>

        <motion.button
          className={`btn btn-sm ${
            isDarkMode ? "btn-light" : "btn-outline-light"
          }`}
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isDarkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </motion.button>
      </motion.nav>
    </>
  );
};

export default Navbar;