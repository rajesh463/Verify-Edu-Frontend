import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./StudentDashboard.css";
import Services from "../services/Services";
import uploadToAwsS3 from "../services/uploadToAwsS3";

const StudentDashboard = () => {
  const { user } = useAuth();

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [imageUrl, setImageUrl] = useState(""); // New state to store image URL
  const [key, setKey] = useState(
    "uploads/rajeshpokharkar81@gmail.com/1735567660899-Loksatta.png"
  );

  const getPutSingedUrl = async () => {};
  const handleFileChange = (e) => {
    setMessage("");
    setUploadProgress(0);
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file first");
      return;
    }
    console.log(file);

    try {
      const res = await Services.getPreSignedUrlToUpload({
        filename: file.name,
        contentType: file.type,
        userId: user.email,
      });

      console.log(res?.data);
      const { url, key } = res?.data;
      setKey(key);

      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await uploadToAwsS3(url, file, setUploadProgress);

      console.log(uploadResponse);

      if (uploadResponse) {
        setMessage("File uploaded successfully!");
        const resmongo = await Services.putFileMetaDataToMongoDb({
          filename: file.name,
          contentType: file.type,
          key: key,
          userId: user.email,
        });
        if (resmongo.status !== 201) {
          setMessage("Error while storing meta data on mongodb");
        }
      } else {
        setMessage("File upload failed.");
      }
    } catch (error) {
      setMessage("Error during file upload.");
    }
  };

  const handleShow = async () => {
    console.log("handle show");
    try {
      const res = await Services.getPreSignedUrlToAccess(user.email, key);
      console.log(res?.data?.url);

      // Set the image URL to display
      setImageUrl(res?.data?.url);
    } catch (error) {
      setMessage("Error fetching image.");
      console.error(error);
    }
  };

  const handleCloseImage = () => {
    setImageUrl(""); // Close the image by clearing the URL
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name || "Guest"}</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        {message && <p>{message}</p>}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div>
            <p>Uploading: {uploadProgress}%</p>
            <progress value={uploadProgress} max="100"></progress>
          </div>
        )}
        {uploadProgress === 100 && <p>Upload Complete!</p>}
      </div>

      {/* Display the image if URL is available */}
      {imageUrl && (
        <div className="image-container">
          <div className="image-wrapper">
            <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
            <button className="close-button" onClick={handleCloseImage}>
              X
            </button>
          </div>
        </div>
      )}

      <button type="button" onClick={handleShow}>
        View
      </button>
    </div>
  );
};

export default StudentDashboard;
