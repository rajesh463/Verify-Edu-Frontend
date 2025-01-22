import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Services from "../../services/Services";

import "./ViewFile.css";

const ViewFileWithHandler = ({ tag, handleShow }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    setFile(handleShow(tag));
  }, [tag]);

  const handleCloseFile = () => {
    setFileUrl(null);
    setFile(null);
  };
  // console.log("file", tag);
  return (
    <>
      {fileUrl && (
        <div className="modal-container">
          <div className="modal-overlay" onClick={handleCloseFile}></div>
          <div className="modal-content">
            <div className="file-wrapper">
              {loading ? (
                <div className="loading">Loading...</div>
              ) : (
                <>
                  {file?.contentType?.startsWith("image/") ? (
                    <img
                      src={fileUrl}
                      alt="Uploaded"
                      className="uploaded-file"
                      onError={() => setMessage("Error loading image")}
                    />
                  ) : file?.contentType === "application/pdf" ? (
                    <iframe
                      src={fileUrl}
                      title="Uploaded PDF"
                      className="uploaded-file"
                      width="100%"
                      height="600px"
                      onError={() => setMessage("Error loading PDF")}
                    />
                  ) : (
                    <p>File type not supported for preview.</p>
                  )}
                </>
              )}
              <button className="close-button" onClick={handleCloseFile}>
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      <button className="view-button" onClick={handleShow}>
        View File
      </button>

      {message && <div className="error-message">{message}</div>}
    </>
  );
};

export default ViewFileWithHandler;
