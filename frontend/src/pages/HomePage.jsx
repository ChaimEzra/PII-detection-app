import FileUp from "../components/FileUp";
import FileDown from "../components/FileDown";
import FileShow from "../components/FileShow";
import { useState, useEffect } from "react";
function HomePage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [folderFiles, setFolderFiles] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [fileDataAsJson, setFileDataAsJson] = useState(null);
  const [isUploaded, setIsUploaded] = useState(
    () => localStorage.getItem("isUploaded") === "true"
  );
  useEffect(() => {
    localStorage.setItem("isUploaded", isUploaded);
  }, [isUploaded]);
  // const [isNotUploaded, setIsNotUploaded] = useState(true);
  return (
    <>
      {!isUploaded && (
        <FileUp
          isUploaded={isUploaded}
          setIsUploaded={setIsUploaded}
          setPdfFile={setPdfFile}
          setFolderFiles={setFolderFiles}
          pdfFile={pdfFile}
          folderFiles={folderFiles}
          setFileDataAsJson={setFileDataAsJson}
        />
      )}
      {isUploaded && (
        <FileDown
          setIsUploaded={setIsUploaded}
          pdfFile={pdfFile}
          folderFiles={folderFiles}
          setIsShow={setIsShow}
          isShow={isShow}
          fileDataAsJson={fileDataAsJson}
        />
      )}
      {/* {isShow && <FileShow setIsShow={setIsShow} isShow={isShow} />} */}
    </>
  );
}

export default HomePage;
