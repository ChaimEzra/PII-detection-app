// import PropTypes from "prop-types";

// function FileShow({ setIsUploaded, pdfFile, folderFiles, setIsShow }) {
//   const handleBack = () => {
//     setIsShow(false);
//     console.log("Going back to upload page" + pdfFile.name + folderFiles.name);
//   };
//   return (
//     <>
//       <div style={{ textAlign: "center", marginTop: "5px" }}>
//         {pdfFile && (
//           <iframe
//             src={URL.createObjectURL(pdfFile)}
//             width="100%"
//             height="100px"
//             style={{ border: "none" }}
//           />
//         )}
//         {folderFiles && folderFiles.length > 0 && (
//           <div style={{ marginTop: "5px", height: "300px" }}>
//             {folderFiles.map((file, index) => (
//               <iframe
//                 key={index}
//                 src={URL.createObjectURL(file)}
//                 width="100%"
//                 height="20%"
//                 style={{ border: "none" }}
//                 title={file.name}
//               />
//             ))}
//           </div>
//         )}
//         <button onClick={handleBack}>Back</button>
//       </div>
//     </>
//   );
// }
// FileShow.propTypes = {
//   pdfFile: PropTypes.object, // או יותר מדויק: PropTypes.instanceOf(File)
//   folderFiles: PropTypes.arrayOf(PropTypes.object),
//   setIsShow: PropTypes.func.isRequired,
// };
// export default FileShow;
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
function FileShow({ pdfFile, folderFiles, setIsShow }) {
  const [urls, setUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let newUrls = [];
    if (pdfFile) {
      newUrls.push({ name: pdfFile.name, url: URL.createObjectURL(pdfFile) });
    }
    if (folderFiles && folderFiles.length > 0) {
      newUrls = newUrls.concat(
        folderFiles.map((f) => ({
          name: f.name,
          url: URL.createObjectURL(f),
        }))
      );
    }
    setUrls(newUrls);

    // ניקוי ה־blob urls כשעוזבים
    return () => {
      newUrls.forEach((u) => URL.revokeObjectURL(u.url));
    };
  }, [pdfFile, folderFiles]);

  const handleBack = () => {
    setIsShow(false);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : urls.length - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev < urls.length - 1 ? prev + 1 : 0));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5px" }}>
      {urls.length > 0 && (
        <>
          <iframe
            src={urls[currentIndex].url}
            width="100%"
            height="400px"
            style={{ border: "none" }}
            title={urls[currentIndex].name}
          />
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {urls.length > 1 && (
              <div>
                <button onClick={goPrev}>⬅ Prev</button>
                <span style={{ margin: "0 10px" }}>
                  {currentIndex + 1} / {urls.length}
                </span>
                <button onClick={goNext}>Next ➡</button>
              </div>
            )}
            <button onClick={handleBack}>Back</button>
          </div>
        </>
      )}
      {/* <div></div> */}
    </div>
  );
}
FileShow.propTypes = {
  pdfFile: PropTypes.object, // או יותר מדויק: PropTypes.instanceOf(File)
  folderFiles: PropTypes.arrayOf(PropTypes.object),
  setIsShow: PropTypes.func.isRequired,
};
export default FileShow;
