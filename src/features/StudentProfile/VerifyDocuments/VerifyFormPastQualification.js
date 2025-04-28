import React, { useState, useEffect, useRef } from "react";
import StudentApi from "../../../services/Student.api";
import VerifyApi from "../../../services/Verify.api";
import "../PastQualification.css";
import { useAuth } from "../../../context/AuthContext";
import SuccessModal from "../../../components/FeedbackComponents/Sucess/SuccessModal";
import ErrorModal from "../../../components/FeedbackComponents/Error/ErrorModal";
import FileUpload from "../../../components/File/FileUpload";
import ViewFile from "../../../components/File/ViewFile";
import SelectInput from "../../../components/FormInput/SelectInput";
import ConfirmationModal from "../../../components/FeedbackComponents/Confirmation/ConfirmationModal";
import { useParams, useNavigate } from "react-router-dom";
import { FaTrash, FaEye } from "react-icons/fa";

const VerifyFormPastQualification = () => {
  const { user } = useAuth();
  const { qualId } = useParams();
  const navigate = useNavigate();
  const [qualification, setQualification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState({
    heading: "Verification Request Submitted",
    description:
      "Your qualification verification request has been submitted successfully.",
  });
  const [errorMessage, setErrorMessage] = useState({
    heading: "Verification Request Failed",
    description: "There was an error submitting your verification request.",
  });

  useEffect(() => {
    const fetchQualification = async () => {
      try {
        setLoading(true);
        const response = await StudentApi.getPastQualificationById(qualId);
        if (response.data.success) {
          setQualification(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching qualification:", error);
      } finally {
        setLoading(false);
      }
    };

    if (qualId) {
      fetchQualification();
    }
    console.log(qualId);
  }, [qualId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!qualification) {
    return <div className="error">Qualification not found</div>;
  }

  const onVerify = async () => {
    try {
      if (qualId && qualification?.instituteName?._id) {
        const res = await VerifyApi.VerifyStudentPastQualification({
          qualification,
          instituteId: qualification.instituteName._id,
          studentEmail: user?.email,
        });

        if (res.data.success) {
          setSuccessMessage({
            heading: "Verification Request Submitted",
            description:
              "Your qualification verification request has been submitted successfully.",
          });
          setShowSuccessModal(true);
        } else {
          // Handle API error response
          setErrorMessage({
            heading: "Verification Request Failed",
            description:
              res.data.message ||
              "There was an error submitting your verification request.",
          });
          setShowErrorModal(true);
        }
      } else {
        // Handle missing data error
        setErrorMessage({
          heading: "Verification Request Failed",
          description: "Missing required information. Please try again.",
        });
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error submitting verification request:", error);

      // Handle network or other errors
      setErrorMessage({
        heading: "Verification Request Failed",
        description:
          error.response?.data?.message ||
          "There was an error submitting your verification request. Please try again later.",
      });
      setShowErrorModal(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    // Navigate back to the qualifications list or dashboard
    navigate("/verify-documents");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="section-container">
      <h2>Verify Past Qualification</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>Qualification Level</label>
          <input
            type="text"
            value={qualification?.qualificationLevel?.name || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Stream</label>
          <input
            type="text"
            value={qualification?.stream?.name || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <input type="text" value={qualification?.completed || ""} disabled />
        </div>

        <div className="form-group">
          <label>Institute State</label>
          <input
            type="text"
            value={qualification?.instituteState?.name || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Institute District</label>
          <input
            type="text"
            value={qualification?.instituteDistrict?.name || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Institute Taluka</label>
          <input
            type="text"
            value={qualification?.instituteTaluka?.name || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Institute Name</label>
          <input
            type="text"
            value={qualification?.instituteName?.name || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Course</label>
          <input
            type="text"
            value={qualification?.course?.name || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Board/University</label>
          <input
            type="text"
            value={qualification?.boardUniversity?.name || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Mode of Study</label>
          <input type="text" value={qualification?.mode || ""} disabled />
        </div>

        <div className="form-group">
          <label>Admission Year</label>
          <input
            type="text"
            value={qualification?.admissionYear || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Passing Year</label>
          <input
            type="text"
            value={qualification?.passingYear || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Result</label>
          <input type="text" value={qualification?.result || ""} disabled />
        </div>

        <div className="form-group">
          <label>Percentage</label>
          <input type="text" value={qualification?.percentage || ""} disabled />
        </div>

        <div className="form-group">
          <label>Number of Attempts</label>
          <input type="text" value={qualification?.attempts || ""} disabled />
        </div>
      </div>

      <div className="file-upload-section">
        <h3>Marksheet</h3>
        <div className="view-container">
          <ViewFile
            tag={`${qualification?.qualificationLevel?._id}-${qualification?.stream?._id}-${qualification?.boardUniversity?._id}`}
          />
        </div>
      </div>
      <div>
        <button onClick={onVerify}>Request Verify</button>
      </div>

      {showSuccessModal && (
        <SuccessModal onClose={handleCloseSuccessModal} data={successMessage} />
      )}

      {showErrorModal && (
        <ErrorModal onClose={handleCloseErrorModal} data={errorMessage} />
      )}
    </div>
  );
};

export default VerifyFormPastQualification;
