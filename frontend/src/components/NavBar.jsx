/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const NavBar = ({ logout }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken"); // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user")); // Get the user data from local storage

  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

   // Handle navigation to different pages
   const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold cursor-pointer" onClick={() => handleNavigation("/")}>
          Trust Bank
        </div>

        <div>
          <button className="mr-4" onClick={() => handleNavigation("/policies")}>
            Policies
          </button>
          <button className="mr-4" onClick={() => handleNavigation("/saam")}>
            SAAM
          </button>
          {user && user.isAdmin && (
            <button className="mr-4" onClick={() => handleNavigation("/dashboard")}>
              Admin Dashboard
            </button>
          )}
        </div>

        <div>
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.name}</span>
              <button className="mr-4" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="mr-4" onClick={() => handleNavigation("/login")}>
                Login
              </button>
              <button className="mr-4" onClick={() => handleNavigation("/signup")}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
