import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Services from "../../services/Services";
import "./ViewFile.css";

const ViewFile = ({ tag }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const handleShow = async () => {
    try {
      setLoading(true);
      setMessage("");
      const res = await Services.getPreSignedUrlToAccess(user.email, tag);
      console.log(res);
      if (res?.data?.url) {
        // Open in new window with native viewer
        window.open(res.data.url, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      setMessage("Unable to load file. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(tag);
  return (
    <>
      <button className="view-button" onClick={handleShow} disabled={loading}>
        {loading ? <span className="loading-spinner"></span> : <>View</>}
      </button>

      {message && <div className="error-message">{message}</div>}
    </>
  );
};

export default ViewFile;
