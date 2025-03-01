// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../styles/Navbar.css";
// import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu"
// import "frontend/public/web_icon.svg";
import { Link } from "react-router-dom";
function Navbar() {
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
            <Link to="login-page">
              <button className="btn-primary btn-login">Login</button>
            </Link>
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
