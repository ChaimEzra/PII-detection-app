// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../styles/Navbar.css";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
// import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu"
// import "frontend/public/web_icon.svg";
import { Link } from "react-router-dom";
function Navbar() {
  const { logout } = useAuth();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);
  const handleLogout = async () => {
    const userId = localStorage.getItem("user_id");
    try {
      // await fetch("http://localhost:8000/login-page", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ user_id: userId }),
      // });
      const res = await fetch(
        `http://localhost:8000/login-page/logout?user_id=${userId}`,
        {
          method: "POST",
        }
      );
      const data = await res.json();

      console.log(data.message);
      console.log(data.user_id);
      // ניקוי ה-localStorage
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      localStorage.removeItem("isUploaded");
      logout();
    } catch (err) {
      console.error(err);
      alert("Error logging out");
    }
    // alert("Logout successful!");
    // Call the logout function from AuthContext
    // setUsername("");
    // window.location.reload(); // Reload the page to reflect the changes
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-gray">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="web_icon.svg"
              alt=""
              width="45"
              height="45"
              className="d-inline-block align-text-top"
            />
          </Link>
          <div className="navbar-buttons ">
            {/* <Link to="login-page">
              <button className="btn-primary btn-login">Login</button>
            </Link> */}
            <div>
              {username ? (
                <span className="badge fs-5 fw-bold px-3 py-2 shadow">
                  Welcome {username}
                </span>
              ) : (
                <span>Not logged in</span>
              )}
            </div>

            <div className="logout-button">
              {username ? (
                <span
                  className="badge fs-5 fw-bold px-3 py-2 shadow "
                  onClick={handleLogout}
                >
                  Logout
                </span>
              ) : (
                <span>Not logged in</span>
              )}
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className=" collapse navbar-collapse " id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
              <Link className="nav-link" to="features">
                Features
              </Link>
              <Link className="nav-link" to="pricing">
                Pricing
              </Link>
              {/* <a className="nav-link disabled" aria-disabled="false" href="#">
                Disabled
              </a> d-none */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
