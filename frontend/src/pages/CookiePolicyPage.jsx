// function CookiePolicy() {
//     return <div className="nothing">CookiePolicy</div>;
//   }
//   export default CookiePolicy;
export default function CookiePolicy() {
  return (
    <div className="nothing" style={{ textAlign: "center" }}>
      <h3 className="text-3xl font-bold mb-6">Cookie Policy</h3>
      <p className="mb-4 text-lg">
        This Cookie Policy explains how the <strong>PII Detection App</strong>{" "}
        uses cookies and similar technologies to enhance your experience and
        improve our services.
      </p>

      <h5 className="text-2xl font-semibold mt-6 mb-2">What Are Cookies?</h5>
      <p className="mb-4">
        Cookies are small text files stored on your device by your browser. They
        help remember your preferences, login information, and usage patterns.
      </p>

      <h5 className="text-2xl font-semibold mt-6 mb-2">
        How We Use Cookies,Types of Cookies
      </h5>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Maintain your login session for secure access.</li>
        <li>Remember your preferences for a personalized experience.</li>
        <li>Analyze usage trends to improve our services and interface.</li>
        <li>
          <strong>Essential Cookies:</strong> Required for login and basic
          functionality.
        </li>
        <li>
          <strong>Performance Cookies:</strong> Help track usage patterns to
          improve the app.
        </li>
        <li>
          <strong>Functional Cookies:</strong> Remember settings and preferences
          for convenience.
        </li>
      </ul>

      <h5 className="text-2xl font-semibold mt-6 mb-2">
        Managing Cookies,Contact Us
      </h5>
      <p className="mb-4">
        You can manage or disable cookies through your browser settings.
        However, some features may not function correctly if cookies are
        disabled. <br /> For questions regarding our Cookie Policy, please visit
        our
        <a href="/Contact" className="text-blue-600 underline">
          {" "}
          Contact page
        </a>
        .
      </p>
    </div>
  );
}
