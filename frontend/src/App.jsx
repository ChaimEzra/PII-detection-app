// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
// import ContactPage from "./pages/ContactPage";
// import Careers from "./pages/CareersPage";
// import Community from "./pages/CommunityPage";
// import CookiePolicy from "./pages/CookiePolicyPage";
// import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
// import TermOfService from "./pages/TermOfServicePage";
// import FAQs from "./pages/FAQsPage";
// import Features from "./pages/FeaturesPage";
// import Pricing from "./pages/PricingPage";
// import HelpCenter from "./pages/HelpCenterPage";
// import Integrations from "./pages/IntegrationsPage";
// import "./styles/App.css";
// import Login from "./pages/LoginPage";
// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="content">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="about" element={<AboutPage />} />
//           <Route path="privecy-policy" element={<PrivacyPolicyPage />} />
//           <Route path="contact" element={<ContactPage />} />
//           <Route path="careers" element={<Careers />} />
//           <Route path="community" element={<Community />} />
//           <Route path="cookie-policy" element={<CookiePolicy />} />
//           <Route path="terms-of-servis" element={<TermOfService />} />
//           <Route path="FAQs" element={<FAQs />} />
//           <Route path="features" element={<Features />} />
//           <Route path="pricing" element={<Pricing />} />
//           <Route path="help-center" element={<HelpCenter />} />
//           <Route path="integrations" element={<Integrations />} />
//           <Route path="login-page" element={<Login />} />
//         </Routes>
//       </div>
//       <Footer />
//     </Router>
//   );
// }
// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Careers from "./pages/CareersPage";
import Community from "./pages/CommunityPage";
import CookiePolicy from "./pages/CookiePolicyPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermOfService from "./pages/TermOfServicePage";
import FAQs from "./pages/FAQsPage";
import Features from "./pages/FeaturesPage";
import Pricing from "./pages/PricingPage";
import HelpCenter from "./pages/HelpCenterPage";
import Integrations from "./pages/IntegrationsPage";
import "./styles/App.css";
import Login from "./pages/LoginPage";
import { useAuth } from "./AuthContext";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <div className="content">
        <Routes>
          <Route path="/login-page" element={<Login />} />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route
                    path="privecy-policy"
                    element={<PrivacyPolicyPage />}
                  />
                  <Route path="*" element={<NotFoundPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="careers" element={<Careers />} />
                  <Route path="community" element={<Community />} />
                  <Route path="cookie-policy" element={<CookiePolicy />} />
                  <Route path="terms-of-servis" element={<TermOfService />} />
                  <Route path="FAQs" element={<FAQs />} />
                  <Route path="features" element={<Features />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="help-center" element={<HelpCenter />} />
                  <Route path="integrations" element={<Integrations />} />
                </Routes>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      {isAuthenticated && <Footer />}
    </>
  );
}

export default App;
