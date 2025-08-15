import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  const click = () => {
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="divnav">
        <a
          href="/"
          className=" font-bold text-gray-500 text-[2.5rem] mx-[1rem] uppercase"
        >
          Coding Journal
        </a>
        
        <div className="relative md:hidden" ref={dropdownRef}>
          <button className="pubtn" onClick={() => setIsOpen(!isOpen)}>
            <DehazeIcon />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <ul className="py-1">
                <li>
                  <NavLink 
                    to="/" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/compose" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    Compose
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/blogs" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    Blogs
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/about" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/contact" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    Contact
                  </NavLink>
                </li>
                <li>
                  <button onClick={click} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/compose">Compose</NavLink>
          </li>
          <li>
            <NavLink to="/blogs">Blogs</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <button onClick={click} className="logbtn">Log Out</button>
        </ul>
      </div>
    </nav>
  );
}
