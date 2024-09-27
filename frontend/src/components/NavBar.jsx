/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Update for Heroicons v2

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Tracks login state
  const [userName, setUserName] = useState(""); // Stores logged-in user's name
  const [isAdmin, setIsAdmin] = useState(false); // Tracks if the user is an admin

  // Fetch token and user from localStorage to handle login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // If both token and user are available, set loggedIn state and user details
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user); // Parse user details from localStorage
        setLoggedIn(true); // Set the user as logged in
        setUserName(parsedUser.name); // Set user's name for display
        setIsAdmin(parsedUser.role === 'admin'); // Check if the user is an admin
      } catch (error) {
        console.error("Failed to parse user data:", error);
        handleLogout(); // If parsing fails, log the user out
      }
    }
  }, []);

  // Handles the logout by clearing localStorage and resetting state
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    localStorage.removeItem("user"); // Clear user data
    setLoggedIn(false); // Update login state
    setUserName(""); // Clear username
    setIsAdmin(false); // Reset admin state
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="flex justify-between items-center">
        
        {/* Left side: Trust Bank logo */}
        <Link
          to="/"
          className="text-white text-xl font-bold hover:text-gray-200 transition-colors duration-200"
        >
          Trust Bank
        </Link>

        {/* Center: Navigation links */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/"
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/policies"
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            Policies
          </Link>
          <Link
            to="/saam"
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            SAAM
          </Link>
        </div>

        {/* Right side: Search, login/signup or user profile */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button className="text-white hover:text-gray-200 transition-colors duration-200">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>

          {loggedIn ? (
            <>
              <span className="text-white">Welcome, {userName}</span>
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white hover:text-gray-200 transition-colors duration-200"
                >
                  {/* Profile Icon */}
                  <Bars3Icon className="h-6 w-6" />
                </button>

                {/* Dropdown Menu for user profile */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md py-2 z-50">
                    <Link to="/user" className="block px-4 py-2 hover:bg-gray-100">
                      User Dashboard
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100">
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white hover:text-gray-200 transition-colors duration-200"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
