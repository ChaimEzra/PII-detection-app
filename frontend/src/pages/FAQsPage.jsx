// function FAQs() {
//   return <div className="nothing">FAQs</div>;
// }
// export default FAQs;
export default function FAQs() {
  return (
    <div className="nothing" style={{ textAlign: "center" }}>
      <h2>Frequently Asked Questions (FAQs)</h2>

      <div>
        <h5>What is the PII Detection App?</h5>
        <p>
          The PII Detection App is a web-based platform that scans uploaded PDF
          documents and identifies personally identifiable information (PII),
          such as names, phone numbers, emails, and ID numbers.
        </p>

        <h5>What file formats are supported?</h5>
        <p>
          Currently, the app supports <strong>PDF files</strong> and folders
          containing multiple PDFs. Future updates will expand to include Word
          and plain-text files.
        </p>

        <h5 className="text-xl font-semibold">
          How accurate is the detection?
        </h5>
        <p>
          Our system uses AI models trained to recognize PII patterns. While
          highly accurate, no system is perfect, and users should always review
          the results carefully before relying on them.
        </p>

        <h5 className="text-xl font-semibold">Where is my data stored?</h5>
        <p>
          All uploaded files and results are stored securely in{" "}
          <strong>MongoDB Atlas</strong>, using authentication to protect your
          privacy.
        </p>

        <h5 className="text-xl font-semibold">Can I download my results?</h5>
        <p>
          Yes. After scanning, you can export results for compliance purposes or
          further analysis.
        </p>

        <h5 className="text-xl font-semibold">Who can access my files?</h5>
        <p>
          Only you can access your uploaded files and results. Our system
          ensures user-level data privacy and does not share files with others.
        </p>
      </div>
    </div>
  );
}
