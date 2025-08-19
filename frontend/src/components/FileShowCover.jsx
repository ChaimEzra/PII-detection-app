import PropTypes from "prop-types";

function FileShowCover({ setIsShowCovered, pdfUrl, setIsShow, setPdfUrl }) {
  const handleBack = () => {
    setIsShowCovered(false);
    setPdfUrl(null);
    // setIsShow(false);
  };
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "5px" }}>
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            width="100%"
            height="400px"
            style={{ border: "none" }}
          />
        )}
        {/* {folderFiles && folderFiles.length > 0 && (
          <div style={{ marginTop: "5px", height: "300px" }}>
            {folderFiles.map((file, index) => (
              <iframe
                key={index}
                src={URL.createObjectURL(file)}
                width="100%"
                height="20%"
                style={{ border: "none" }}
                title={file.name}
              />
            ))}
          </div>
        )} */}
        <button onClick={handleBack}>Back</button>
      </div>
    </>
  );
}
FileShowCover.propTypes = {
  pdfFile: PropTypes.object, // או יותר מדויק: PropTypes.instanceOf(File)
  folderFiles: PropTypes.arrayOf(PropTypes.object),
  setIsShow: PropTypes.func.isRequired,
  pdfUrl: PropTypes.string.isRequired,
  setPdfUrl: PropTypes.func.isRequired,
  setIsShowCovered: PropTypes.func.isRequired,
};
export default FileShowCover;
