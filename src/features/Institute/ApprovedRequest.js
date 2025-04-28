import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import VerifyApi from "../../services/Verify.api";
import { useNavigate } from "react-router-dom";
import "./VerifyDocuments.css";

const ApprovedRequest = () => {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const getVerifications = async () => {
    try {
      setLoading(true);
      const response = await VerifyApi.getInstituteVerificationRequest(
        user?._id,"Verified"
      );
      setVerifications(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching verifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      getVerifications();
    }
  }, [user?._id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const onView = (qualId, studEmail) => {
    console.log(qualId, studEmail)
    if (qualId) navigate(`/institute/view-requests/${qualId}/${studEmail}`);
  };
  return (
    <div className="verify-documents-container">
      <h2 className="verify-documents-title">Verified Verification Requests</h2>
      <div className="verify-documents-table-container">
        <table className="verify-documents-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Email</th>
              <th>Qualification Level</th>
              <th>Stream</th>
              <th>Course</th>
              <th>Institute</th>
              <th>Board/University</th>
              <th>Admission Year</th>
              <th>Passing Year</th>
              <th>Result</th>
              <th>Percentage</th>
              <th>Status</th>
              <th>Request Date</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {verifications.map((verification) => (
              <tr key={verification._id}>
                <td>{verification.student?.name || "N/A"}</td>
                <td>{verification.student?.email || "N/A"}</td>
                <td>
                  {verification.qualification?.qualificationLevel?.name ||
                    "N/A"}
                </td>
                <td>{verification.qualification?.stream?.name || "N/A"}</td>
                <td>{verification.qualification?.course?.name || "N/A"}</td>
                <td>
                  {verification.qualification?.instituteName?.name || "N/A"}
                </td>
                <td>
                  {verification.qualification?.boardUniversity?.name || "N/A"}
                </td>
                <td>{verification.qualification?.admissionYear || "N/A"}</td>
                <td>{verification.qualification?.passingYear || "N/A"}</td>
                <td>{verification.qualification?.result || "N/A"}</td>
                <td>{verification.qualification?.percentage || "N/A"}</td>
                <td>
                  <span
                    className={`status-badge ${verification.status.toLowerCase()}`}
                  >
                    {verification.status}
                  </span>
                </td>
                <td>{new Date(verification.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() =>
                      onView(
                        verification?.qualification?.qualificationLevel?._id,
                        verification.student.email
                      )
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {verifications.length === 0 && (
              <tr>
                <td colSpan="13" className="no-data">
                  No verification requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedRequest;
