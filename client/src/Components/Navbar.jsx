import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const menuItems = [
  { title: "Home", path: "/" },
  { title: "Extract Content", path: "/extract-content" },
  { title: "Summarizer", path: "/summarizer" },
  { title: "Flashcards", path: "/flashcards" },
  { title: "Downloads", path: "/downloads" },
  { title: "AI Study Coach", path: "/ai-study-coach" },
  { title: "Resume & Projects", path: "/resume-projects" },
  { title: "Profile", path: "/profile" },
];

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileLoginOpen, setMobileLoginOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setMobileLoginOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLoginClick = (role) => {
    setDropdownOpen(false);
    setMobileLoginOpen(false);
    setMenuOpen(false);
    navigate(`/login?role=${role}`);
  };

  return (
    <nav className="bg-gray-100 border-b-2 border-black px-6 py-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="text-xl font-bold text-black cursor-pointer">
            Smart Context
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-2xl text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden sm:flex items-center justify-evenly flex-1 space-x-4">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="text-black text-lg  px-3 py-2 hover:bg-gray-300 rounded"
            >
              {item.title}
            </Link>
          ))}

          {/* Desktop Login Button */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="w-40 h-14 bg-black text-white rounded-full inline-flex items-center justify-center hover:bg-gray-700 transition"
            >
              Login
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                {["Student", "Employee", "Mentor"].map((role) => (
                  <button
                    key={role}
                    onClick={() => handleLoginClick(role)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="text-black text-base font-medium px-4 py-2 hover:bg-gray-200 rounded"
            >
              {item.title}
            </Link>
          ))}

          {/* Mobile Login Dropdown */}
          <div className="px-4" ref={dropdownRef}>
            <button
              onClick={() => setMobileLoginOpen((prev) => !prev)}
              className="text-black text-base font-medium py-2 w-full text-left hover:bg-gray-200 rounded"
            >
              Login
            </button>
            {mobileLoginOpen && (
              <div className="mt-1 bg-white rounded shadow w-full">
                {["Student", "Employee", "Mentor"].map((role) => (
                  <button
                    key={role}
                    onClick={() => handleLoginClick(role)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
