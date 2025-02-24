import { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/FileUp.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Footer from "./Footer";

function FileUp() {
  const [pdfFile, setPdfFile] = useState(null);
  const [folderFiles, setFolderFiles] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("PDF file:", pdfFile);
    console.log("Folder files:", folderFiles);
    window.alert("PDF file and folder files uploaded successfully!");
  };

  const handleDrop = (acceptedFiles) => {
    const pdfs = acceptedFiles.filter(
      (file) => file.type === "application/pdf"
    );
    const files = acceptedFiles.filter(
      (file) => file.type !== "application/pdf"
    );

    if (pdfs.length == 1) {
      setPdfFile(pdfs[pdfs.length - 1]); // Assuming we take only the last PDF file
    } else if (pdfs.length > 1) {
      setFolderFiles(pdfs); // Add multiple PDF files
    }
    if (files.length > 0) {
      setFolderFiles(files); // Add non-PDF files (like images)
    }
  };

  // React Dropzone hook
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: ".pdf", // Allow PDFs and images
    multiple: true,
    webkitdirectory: true,
  });

  return (
    <div className="main-content">
      <div className="container-fluid-fileup mt-5">
        <div className="row justify-content-center">
          <div className="the-box col-12 col-md-6 p-4 rounded shadow">
            <h1 className="text-center mb-4">PII Detection PDF Uploader</h1>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div {...getRootProps()} className="dropzone">
                <i className="fa-solid fa-cloud-arrow-down fa-3x"></i>
                <input {...getInputProps()} />
                <p>Drag and Drop files&folders</p>
              </div>
              <button type="submit" className="btn btn-primary">
                Upload PDF
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUp;
