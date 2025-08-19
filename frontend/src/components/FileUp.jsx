import { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/FileUp.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Footer from "./Footer";
import PropTypes from "prop-types";
function FileUp({
  isUploaded,
  setFileDataAsJson,
  setIsUploaded,
  setPdfFile,
  setFolderFiles,
  pdfFile,
  folderFiles,
}) {
  // const [pdfFile, setPdfFile] = useState(null);
  // const [folderFiles, setFolderFiles] = useState([]);
  const [folderNotPdf, setFolderNotPdf] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    console.log("Accepted files:", acceptedFiles);
    console.log("PDF files:", pdfs);
    const files = acceptedFiles.filter(
      (file) => file.type !== "application/pdf"
    );
    console.log("Non-PDF files:", files);

    if (pdfs.length === 1) {
      setPdfFile(pdfs[pdfs.length - 1]); // Assuming we take only the last PDF file
    } else if (pdfs.length > 1) {
      setFolderFiles(pdfs); // Add multiple PDF files
    }

    if (files.length > 0) {
      setFolderNotPdf(files);
      setErrorMessage(
        `These files are not PDFs and will be ignored: ${files
          .map((f) => f.name)
          .join(", ")}`
      );
      console.log(folderNotPdf);
    }

    if (pdfFile) {
      console.log("PDF file:", pdfFile.type);
      if (pdfFile.type !== "application/pdf") {
        alert("Please select a valid PDF file");
        return;
      }
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pdfFile && folderFiles.length === 0) {
      setErrorMessage("Please select at least one file");
      return;
    }
    setLoading(true);
    const formData = new FormData();

    if (pdfFile) {
      formData.append("files", pdfFile);
    }

    folderFiles.forEach((file) => {
      formData.append("files", file);
    });

    const currentUserId = localStorage.getItem("user_id");
    // user_id
    formData.append("user_id", currentUserId);

    // alert("Files are being uploaded...");
    try {
      const res = await fetch("http://localhost:8000/pii/upload_pdfs", {
        method: "POST",
        body: formData,
      });
      // setIsNotUploaded(true); // Reset the state to indicate files are uploaded
      setIsUploaded(true); // Set the state to indicate files are uploaded

      const data = await res.json();
      console.log(data);
      setFileDataAsJson(data);

      // alert("Files uploaded successfully!");
      // setIsNotUploaded(false); // Update the state to indicate files are no longer not uploaded
    } catch (err) {
      console.error(err);
      setErrorMessage("Error uploading files");
    } finally {
      setLoading(false); // מסיימים טעינה
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

            {errorMessage ? (
              <div className="alert alert-danger p-4" role="alert">
                <p>{errorMessage}</p>
                <div className="text-center mt-3">
                  <button
                    type="button"
                    // className="btn-close"
                    // className="position-absolute  end-0 m-2"
                    className="btn btn-warning"
                    onClick={() => {
                      setErrorMessage("");
                      setPdfFile(null);
                      setFolderFiles([]);
                    }}
                  >
                    TRY AGAIN
                  </button>
                </div>
              </div>
            ) : loading ? (
              <div style={{ textAlign: "center", margin: "50px 0" }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Processing files... please wait</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-3"
              >
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
FileUp.propTypes = {
  isUploaded: PropTypes.bool.isRequired,
  setIsUploaded: PropTypes.func.isRequired,
  setPdfFile: PropTypes.func.isRequired,
  setFolderFiles: PropTypes.func.isRequired,
  pdfFile: PropTypes.object, // או יותר מדויק: PropTypes.instanceOf(File)
  folderFiles: PropTypes.arrayOf(PropTypes.object),
  setFileDataAsJson: PropTypes.func.isRequired,
};
export default FileUp;
