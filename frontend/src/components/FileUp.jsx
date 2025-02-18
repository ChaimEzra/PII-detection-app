import { useState, useEffect } from "react";
import "../styles/FileUp.css";
import "bootstrap/dist/css/bootstrap.min.css";

function FileUp() {
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

  useEffect(() => {
    if (pdfFile) {
      console.log("PDF file updated:", pdfFile);
    }
  }, [pdfFile]);

  useEffect(() => {
    if (folderFiles.length > 0) {
      console.log("Folder files updated:", folderFiles);
    }
  }, [folderFiles]);

  return (
    <div className="main-content">
      <div className="container-fluid-fileup mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 p-4 bg-light rounded shadow">
            <h1 className="text-center mb-4">PII Detection PDF Uploader</h1>
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="d-flex flex-column gap-3"
            >
              <input
                type="file"
                name="pdf"
                accept="application/pdf"
                required
                onChange={handleFileChange}
                className="form-control"
              />
              <input
                type="file"
                name="folder"
                webkitdirectory="true"
                multiple
                onChange={handleFolderChange}
                className="form-control"
              />
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
