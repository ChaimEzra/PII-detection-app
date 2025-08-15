// function PrivacyPolicy() {
//   return <div className="nothing">Privacy Policy.</div>;
// }
// export default PrivacyPolicy;
export default function PrivacyPolicy() {
  return (
    <div className="nothing" style={{ textAlign: "center" }}>
      <h3 className="text-3xl font-bold mb-6">Privacy Policy</h3>
      <p className="mb-4 text-lg">
        Your privacy is important to us. The <strong>PII Detection App</strong>
        is committed to protecting the personal information of our users and
        ensuring transparency in how data is collected, used, and stored.
      </p>
      <h5 className="text-2xl font-semibold mt-6 mb-2">
        Information We Collect,How We Use Your Information
      </h5>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Account information such as email, username, and password.</li>
        <li>Uploaded files and scanning results.</li>
        <li>Usage data like login times, file uploads, and feature usage.</li>
        <li>To provide and improve the scanning service.</li>
        <li>To secure your account and manage access.</li>
        <li>To communicate important updates and support information.</li>
        <li>To analyze usage trends and improve user experience.</li>
      </ul>
      <h5 className="text-2xl font-semibold mt-6 mb-2">
        Data Sharing,Security
      </h5>
      <p className="mb-4">
        We do not sell or share your personal files or data with third parties.
        Data may be shared with trusted service providers only to maintain the
        app's functionality (e.g., MongoDB Atlas for database storage). We use
        industry-standard security measures to protect your data, including
        encryption and secure authentication. Your privacy and data security are
        our top priorities.
      </p>
      <h5 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h5>
      <p>
        If you have questions about this Privacy Policy, please reach out to us
        via the
        <a href="/community" className="text-blue-600 underline">
          {" "}
          Community page
        </a>
        .
      </p>
    </div>
  );
}
