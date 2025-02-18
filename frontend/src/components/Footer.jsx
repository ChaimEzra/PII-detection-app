// import React from "react";

// import { Container, Grid, Typography } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-white text-center text-lg-start margin-top">
        <div className="container p-4">
          <section className="mb-4">
            <a
              href="https://www.youtube.com/"
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <i className="fab fa-google"></i>
            </a>
            <a
              href="#"
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="#"
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>

          <section>
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Company</h5>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#" className="text-white">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Products</h5>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#" className="text-white">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Integrations
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Support</h5>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#" className="text-white">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Community
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Legal</h5>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href="#" className="text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="text-center p-3 bg-secondary text-white">
          © {new Date().getFullYear()} Company Name. All rights reserved Y&C.
        </div>
      </footer>
    </>
  );
};

export default Footer;
