import { useState } from "react";
// import { useEffect } from "react";
import "../assets/styles/HomePage.css";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
function HomePage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [folderFiles, setFolderFiles] = useState([]);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleFolderChange = (event) => {
    setFolderFiles(Array.from(event.target.files));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("PDF file:", pdfFile);
    console.log("Folder files:", folderFiles);
  };

  // useEffect(() => {
  //   if (pdfFile) {
  //     console.log("PDF file updated:", pdfFile);
  //   }
  // }, [pdfFile]);

  // useEffect(() => {
  //   if (folderFiles.length > 0) {
  //     console.log("Folder files updated:", folderFiles);
  //   }
  // }, [folderFiles]);

  return (
    <>
      <div className="container">
        <h1>PII Detection PDF Uploader</h1>
        <form
          onSubmit={handleSubmit}
          // action="/upload"
          // method="post"
          encType="multipart/form-data"
        >
          <input
            type="file"
            name="pdf"
            accept="application/pdf"
            required
            onChange={handleFileChange}
          />
          <br />
          <input
            type="file"
            name="folder"
            webkitdirectory="true"
            multiple
            onChange={handleFolderChange}
          />
          <br />
          <button type="submit">Upload PDF</button>
        </form>
      </div>
    </>
  );
}

export default HomePage;
