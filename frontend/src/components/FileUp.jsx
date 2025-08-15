import { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/FileUp.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Footer from "./Footer";

function FileUp() {
  const [pdfFile, setPdfFile] = useState(null);
  const [folderFiles, setFolderFiles] = useState([]);
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("PDF file:", pdfFile);
  //   console.log("Folder files:", folderFiles);
  //   // window.alert("PDF file and folder files uploaded successfully!");
  // };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (!pdfFile && folderFiles.length === 0) {
  //     alert("Please select at least one PDF");
  //     return;
  //   }
  //   const formData = new FormData();
  //   if (pdfFile) {
  //     formData.append("pdfFile", pdfFile);
  //   }
  //   folderFiles.forEach((file) => {
  //     formData.append("files", file);
  //   });
  //   try {
  //     const res = await fetch("http://localhost:8000/pii/upload_pdfs", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await res.json();
  //     console.log(data);
  //     alert("PDF uploaded successfully!");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error uploading file");
  //   }
  // };

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
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pdfFile && folderFiles.length === 0) {
      alert("Please select at least one file");
      return;
    }

    const formData = new FormData();

    if (pdfFile) {
      formData.append("files", pdfFile);
    }

    folderFiles.forEach((file) => {
      formData.append("files", file);
    });

    const currentUserId = localStorage.getItem("user_id");
    // שליחת user_id
    formData.append("user_id", currentUserId); // בעתיד לשלוף מההתחברות

    try {
      const res = await fetch("http://localhost:8000/pii/upload_pdfs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      alert("Files uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading files");
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
                <input {...getInputProps()} />
                <i className="fa-solid fa-cloud-arrow-down fa-3x"></i>
                <p>
                  {pdfFile ? (
                    <>
                      Selected PDF: {pdfFile.name}{" "}
                      <i
                        className="fa-solid fa-file-pdf fa-1x"
                        style={{ color: "red" }}
                      ></i>
                    </>
                  ) : (
                    "Drag and drop a PDF file here, or click to select"
                  )}
                  <br />
                  {folderFiles.length > 0 ? (
                    <>
                      {folderFiles.length} files selected from folder{" "}
                      <i
                        className="fa-solid fa-folder fa-1x"
                        style={{ color: "blue" }}
                      ></i>
                    </>
                  ) : (
                    <span>No files selected from folder</span>
                  )}
                </p>
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
