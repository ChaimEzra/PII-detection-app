// function TermOfService() {
//     return <div className="nothing">TermOfService</div>;
//   }
//   export default TermOfService;
export default function TermOfService() {
  return (
    <div className="nothing" style={{ textAlign: "center" }}>
      <h5 className="text-3xl font-bold mb-6">Terms of Service</h5>
      <p className="mb-4 text-lg">
        Welcome to the <strong>PII Detection App</strong>. By accessing or using
        this service, you agree to comply with the following terms and
        conditions.
      </p>

      <h5 className="text-2xl font-semibold mt-6 mb-2">
        Account Responsibilities,Use of the Service
      </h5>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>Keep your login credentials secure and confidential.</li>
        <li>
          Ensure that all uploaded files comply with applicable laws and
          regulations.
        </li>
        <li>
          You are responsible for any activity that occurs under your account.
        </li>

        <li>
          The app is provided for detecting PII in your documents for personal
          or business use.
        </li>
        <li>
          You may not misuse the service, attempt unauthorized access, or
          disrupt system functionality.
        </li>
        <li>
          Compliance with privacy and data protection laws is your
          responsibility.
        </li>
      </ul>

      <h5 className="text-2xl font-semibold mt-6 mb-2">
        Limitations of Liability,Changes to Terms
      </h5>
      <p className="mb-4">
        The service is provided "as is" without warranties of any kind. We are
        not liable for indirect, incidental, or consequential damages arising
        from the use or inability to use the service. We may update these Terms
        of Service at any time. Continued use of the service indicates
        acceptance of the updated terms.
      </p>

      <h5 className="text-2xl font-semibold mt-6 mb-2">Contact</h5>
      <p>
        For questions regarding these terms, please reach out through our
        <a href="/community" className="text-blue-600 underline">
          {" "}
          Community page
        </a>
        .
      </p>
    </div>
  );
}
