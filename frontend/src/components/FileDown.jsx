import PropTypes from "prop-types";
import Papa from "papaparse";
import FileShowCover from "./FileShowCover";
import FileShow from "./FileShow";
import { useState } from "react";
function FileDown({
  setIsUploaded,
  pdfFile,
  folderFiles,
  setIsShow,
  isShow,
  fileDataAsJson,
}) {
  const [IsShowCovered, setIsShowCovered] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const downloadAsCsv = () => {
    // Perform action 1
    let flattened = [];

    fileDataAsJson.pii_detected.forEach((fileObj) => {
      Object.keys(fileObj).forEach((fileName) => {
        const entries = fileObj[fileName];
        flattened = flattened.concat(entries);
      });
    });
    console.log("Downloading as CSV: ", fileDataAsJson);
    const csv = Papa.unparse(flattened);
    console.log("CSV data:", csv);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    let baseName = "results";
    if (flattened.length > 0 && flattened[0].file_name) {
      console.log("Flattened data:", flattened);
      baseName = flattened[0].file_name.replace(/\.[^/.]+$/, "");
    }
    a.download = `${baseName}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    console.log("CSV downloaded successfully");
  };
  const downloadAsJson = () => {
    const jsonData = JSON.stringify(fileDataAsJson, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    let baseName = "results";
    if (
      fileDataAsJson &&
      fileDataAsJson.pii_detected &&
      fileDataAsJson.pii_detected.length > 0
    ) {
      const firstObj = fileDataAsJson.pii_detected[0];
      const fileName = Object.keys(firstObj)[0];

      baseName = fileName.replace(/\.pdf$/i, "");
    }
    a.href = url;
    a.download = `${baseName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const showTheFile = () => {
    setIsShow(true);
    console.log("showing the file in the browser");
  };
  const rewriteDownload = async (event) => {
    event.preventDefault();
    const firstObj = fileDataAsJson.pii_detected[0];
    const fileName = Object.keys(firstObj)[0];
    const piiResult = firstObj[fileName];
    console.log(fileName);
    console.log(piiResult);
    // const formData = new FormData();

    // formData.append("file_name", fileName);
    // formData.append("pii_result", JSON.stringify(piiResult));

    // if (folderFiles && folderFiles.length > 0) {
    //   folderFiles.forEach((file) => {
    //     formData.append("files", file);
    //   });
    // }

    const currentUserId = localStorage.getItem("user_id");

    try {
      const res = await fetch("http://localhost:8000/pii/rewrite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUserId,
          file_name: fileName,
          pii_result: piiResult,
        }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFile.name.replace(/\.pdf$/i, "_rewritten.pdf");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
      console.log("PDF rewritten and downloaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error rewriting files", err.message);
    }
  };
  const rewriteShow = async (event) => {
    event.preventDefault();
    const firstObj = fileDataAsJson.pii_detected[0];
    const fileName = Object.keys(firstObj)[0];
    const piiResult = firstObj[fileName];
    console.log(fileName);
    console.log(piiResult);

    const currentUserId = localStorage.getItem("user_id");

    try {
      const res = await fetch("http://localhost:8000/pii/rewrite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUserId,
          file_name: fileName,
          pii_result: piiResult,
        }),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      // const blob = await res.blob();
      // const url = URL.createObjectURL(blob);
      // window.open(url, "_blank");
      // URL.revokeObjectURL(url);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      setPdfUrl(url);
      setIsShowCovered(true);
      console.log("PDF rewritten and shown successfully!");
    } catch (err) {
      console.error(err);
      alert("Error rewriting files", err.message);
    }
  };

  return (
    <>
      {!isShow && !IsShowCovered && (
        <>
          <div className="container mt-5">
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h5>Files processed successfully! </h5>
              <button
                onClick={() => {
                  setIsUploaded(false); // Reset the upload state
                  localStorage.removeItem("isUploaded"); // איפוס ב־localStorage
                }}
                className=" btn-primary mt-3"
              >
                Upload Another File
              </button>
            </div>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h5>Here is your options! </h5>
              <div className="d-flex gap-3 align-items-cente  justify-content-center mt-3">
                <button className="btn-primary" onClick={downloadAsCsv}>
                  Download Results as csv
                </button>
                <button className=" btn-primary" onClick={downloadAsJson}>
                  Download Results as json
                </button>
                <button className=" btn-primary" onClick={showTheFile}>
                  Show Results in the browser
                </button>
                <button className=" btn-primary" onClick={rewriteDownload}>
                  Cover PII in the files and download them
                </button>
                <button className=" btn-primary" onClick={rewriteShow}>
                  Cover PII in the files and show them in the browser
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {isShow && !IsShowCovered && (
        <FileShow
          setIsShow={setIsShow}
          isShow={isShow}
          pdfFile={pdfFile}
          folderFiles={folderFiles}
        />
      )}
      {IsShowCovered && pdfUrl && (
        <FileShowCover
          setIsShowCovered={setIsShowCovered}
          pdfUrl={pdfUrl}
          setPdfUrl={setPdfUrl}
          setIsShow={setIsShow}
        />
      )}
    </>
  );
}
FileDown.propTypes = {
  pdfFile: PropTypes.object, // או יותר מדויק: PropTypes.instanceOf(File)
  folderFiles: PropTypes.arrayOf(PropTypes.object),
  setIsUploaded: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
  isShow: PropTypes.bool.isRequired,
  setPdfFile: PropTypes.func.isRequired,
  setFolderFiles: PropTypes.func.isRequired,
  isUploaded: PropTypes.bool.isRequired,
  fileDataAsJson: PropTypes.object.isRequired,
};
export default FileDown;
