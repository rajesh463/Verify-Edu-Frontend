import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import VerifyApi from "../../../services/Verify.api";
import StudentApi from "../../../services/Student.api";
import ViewFile from "../../../components/File/ViewFile";
import "./VerifyDocuments.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VerifyPastQualificatonDocuments = () => {
  const [pastqualifications, setPastQualifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const getPastQualifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await StudentApi.getPastQualificationsToVerify(user?.email);
      setPastQualifications(res?.data?.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch qualifications");
      console.error("Error fetching qualifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) getPastQualifications();
  }, [user?.email]);

  const onVerifyButton = (qualId) => {
    try {
      if (!qualId) {
        throw new Error("Qualification ID is required");
      }
      navigate(`/verify-documents-form-past-qualification/${qualId}`);
    } catch (err) {
      console.error("Error navigating to verification form:", err);
      // You could add a toast notification here if you have one
    }
  };

  if (loading) {
    return (
      <div className="verify-documents-container">
        <div className="loading-message">Loading qualifications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="verify-documents-container">
        <div className="error-message">
          {error}
          <button onClick={getPastQualifications} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!pastqualifications.length) {
    return (
      <div className="verify-documents-container">
        <h2 className="verify-documents-title">
          Apply Verification for Past Qualification
        </h2>
        <div className="no-data-message">
          No qualifications available for verification
        </div>
      </div>
    );
  }

  return (
    <div className="verify-documents-container">
      <h2 className="verify-documents-title">
        Apply Verification for Past Qualification
      </h2>
      <div className="verify-documents-table-container">
        <table className="verify-documents-table">
          <thead>
            <tr>
              <th>Qualification Level</th>
              <th>Stream</th>
              <th>Institute Name</th>
              <th>Course</th>
              <th>Board/University</th>
              <th>Admission Year</th>
              <th>Passing Year</th>
              <th>Percentage</th>
              <th>Apply Verification</th>
            </tr>
          </thead>
          <tbody>
            {pastqualifications.map((qualification, index) => (
              <tr key={index}>
                <td>{qualification?.qualificationLevel?.name || 'N/A'}</td>
                <td>{qualification?.stream?.name || 'N/A'}</td>
                <td>{qualification?.instituteName?.name || 'N/A'}</td>
                <td>{qualification?.course?.name || 'N/A'}</td>
                <td>{qualification?.boardUniversity?.name || 'N/A'}</td>
                <td>{qualification?.admissionYear || 'N/A'}</td>
                <td>{qualification?.passingYear || 'N/A'}</td>
                <td>{qualification?.percentage || 'N/A'}</td>
                <td>
                  <button 
                    onClick={() => onVerifyButton(qualification?._id)}
                    disabled={!qualification?._id}
                    className="verify-button"
                  >
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifyPastQualificatonDocuments;
