import React, { useState, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import {jwtDecode} from "jwt-decode";

function Navbar() {
  const navigate = useNavigate(); 
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!cookies.access_token);  
    if (cookies.access_token) {
      const decoded = jwtDecode(cookies.access_token);
      const currentTime = Date.now() / 1000; 

      if (decoded.exp < currentTime) {
          console.log("Token expired, logging out...");
          removeCookie("access_token"); 
          window.location.href = "/login"; 
      }
  }
  }, [cookies.access_token]); 

  const handleLogout = () => {
    removeCookie("access_token");  
    localStorage.removeItem("userID"); 
    setIsLoggedIn(false);  
    window.location.href = "/login";  
  };

  const handleProtectedNavigation = (event, path) => {
    if (!cookies.access_token) {
        event.preventDefault(); 
        alert("You must register first to access this page!"); 
        navigate("/register");
    } else {
        navigate(path);
    }
};

  return (
    <header className="registration-header">
      <div className="container">
        <div className="logo">
          <Link id="logo"to="/">Tasty Bites</Link>
        </div>
        <nav>
          <ul>
            <li className="link"><Link to="/">Home</Link></li>
            <li className="link">
                            <button id="create-btn" onClick={(event) => handleProtectedNavigation(event, "/create-recipe")}>
                                Create Recipe
                            </button>
                        </li>
                        <li className="link">
                            <button id="save-btn" onClick={(event) => handleProtectedNavigation(event, "/saved-recipes")}>
                                Saved Recipes
                            </button>
                        </li>
            {isLoggedIn ? (
              
              <li className="link"><button id="logout_btn" onClick={handleLogout}>Logout</button></li>
            ) : (
              <li className="link"><Link to="/register">Register</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
