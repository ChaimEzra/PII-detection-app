import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-white text-center text-lg-start margin-top">
        <div className="container p-4">
          <section className="mb-4">
            <a
              href="https://www.facebook.com/"
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://x.com/"
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.google.com/"
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <i className="fab fa-google"></i>
            </a>
            <a
              href="https://www.instagram.com/"
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/feed/"
              className="btn btn-outline-light btn-floating m-1"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com/ChaimEzra"
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
                    <Link to="about" className="text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="careers" className="text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link to="contact" className="text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Products</h5>
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to="pricing" className="text-white">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="features" className="text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link to="integrations" className="text-white">
                      Integrations
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Support</h5>
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to="help-center" className="text-white">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link to="FAQs" className="text-white">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link to="community" className="text-white">
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Legal</h5>
                <ul className="list-unstyled mb-0">
                  <li>
                    <Link to="privecy-policy" className="text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="terms-of-servis" className="text-white">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link to="cookie-policy" className="text-white">
                      Cookie Policy
                    </Link>
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
