
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkStyles =
    "px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition duration-200 font-bold text-2xl ";

  return (
    <nav className="bg-blue-400 text-white p-4  ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">
          Todo
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Link to="/main" className={navLinkStyles}>
            Home
          </Link>
          
          <Link to="/logout" className={navLinkStyles}>
            Logout
          </Link>
         
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-2 mt-4 bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700">
          <Link to="/main" className={navLinkStyles} onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/logout" className={navLinkStyles} onClick={() => setIsOpen(false)}>
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
