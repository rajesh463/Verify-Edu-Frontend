import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Services from "../../services/Services";
import uploadToAwsS3 from "../../services/uploadToAwsS3";

import "./FileUpload.css";

const FileUpload = ({ tag, setFileKey }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        // 5MB limit
        setMessage("File size should not exceed 5MB");
        e.target.value = null;
        return;
      }
      setFile(selectedFile);
      setMessage("");
      setUploadProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    setIsUploading(true);
    setMessage("");

    try {
      const res = await Services.getPreSignedUrlToUpload({
        filename: file.name,
        contentType: file.type,
        userId: user.email,
        tag: tag,
      });

      const { url, key } = res?.data;
      setFileKey(key);

      const uploadResponse = await uploadToAwsS3(url, file, (progress) => {
        setUploadProgress(Math.round(progress));
      });

      if (uploadResponse) {
        const resmongo = await Services.putFileMetaDataToMongoDb({
          filename: file.name,
          contentType: file.type,
          key: key,
          userId: user.email,
          tag: tag,
        });

        if (resmongo.status === 201) {
          setMessage("File uploaded successfully!");
          setFile(null);
          const fileInput = document.querySelector(`input[name="${tag}"]`);
          if (fileInput) fileInput.value = "";
        } else {
          setMessage("Error while storing meta data");
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Error uploading file. Please try again.");
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        if (uploadProgress === 100) {
          setUploadProgress(0);
        }
      }, 2000);
    }
  };

  return (
    <div className="file-upload">
      <div className="upload-form">
        <div className="file-input-container">
          <input
            type="file"
            onChange={handleFileChange}
            name={tag}
            id={`file-${tag}`}
            className="file-input"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <label htmlFor={`file-${tag}`} className="file-label">
            {file ? file.name : "Choose File"}
          </label>
        </div>

        {file && (
          <button
            type="button"
            className="upload-button"
            disabled={isUploading}
            onClick={handleUpload}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        )}

        {(isUploading || (uploadProgress > 0 && uploadProgress < 100)) && (
          <div className="upload-progress-container">
            <div className="upload-progress-bar">
              <div
                className="upload-progress-fill"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className="upload-progress-text">{uploadProgress}%</div>
          </div>
        )}

        {message && (
          <div
            className={`message ${
              message.includes("Error") || message.includes("exceed")
                ? "error"
                : "success"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
