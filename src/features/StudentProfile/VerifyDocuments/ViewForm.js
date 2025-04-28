import React, { useState, useEffect } from "react";
import StudentApi from "../../../services/Student.api";
import VerifyApi from "../../../services/Verify.api";
import "./PastQualification.css";
import { useAuth } from "../../../context/AuthContext";
import SuccessModal from "../../../components/FeedbackComponents/Sucess/SuccessModal";
import ErrorModal from "../../../components/FeedbackComponents/Error/ErrorModal";
import ViewFile from "../../../components/File/ViewFile";
import { useParams, useNavigate } from "react-router-dom";

const ViewForm = () => {
  // Add these new states
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  const [verifyAction, setVerifyAction] = useState(null); // 'approve' or 'reject'
  
  const { user } = useAuth();
  const { qualId, studEmail } = useParams();
  const navigate = useNavigate();
  
  const [qualification, setQualification] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState({
    heading: "Verification Request Submitted",
    description: "Your qualification verification request has been submitted successfully.",
  });
  const [errorMessage, setErrorMessage] = useState({
    heading: "Verification Request Failed",
    description: "There was an error submitting your verification request.",
  });

  useEffect(() => {
    const fetchQualification = async () => {
      try {
        setLoading(true);
        const data = {
          qualId: qualId,
          studEmail: studEmail
        }
        const response = await VerifyApi.getInstituteVerificatonByStudentIdandQualficationId(data);
        if (response.data.success) {
          setQualification(response.data.data.qualification);
          console.log("student data: ", response.data.data);
          setComment(response.data.data.comments);
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
  }, [qualId]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const res = await StudentApi.getPersonalInfo(studEmail);
        if (res.data.success) {
          setStudentData(res.data.data);
          
        }
      } catch (error) {
        console.log("error fetching student info: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (studEmail) {
      fetchStudentData();
    }
  }, [studEmail]);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/institute/verify-requests");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleVerifyClick = async (action) => {
    try {
      const response = action === 'approve' 
        ? await VerifyApi.approveVerification(studEmail,qualId, comment,user?._id)
        : await VerifyApi.rejectVerification(studEmail,qualId, comment,user?._id);

      if (response.data.success) {
        setSuccessMessage({
          heading: `Verification ${action === 'approve' ? 'Approved' : 'Rejected'}`,
          description: `The qualification has been ${action === 'approve' ? 'successfully verified' : 'rejected'}.`,
        });
        setShowSuccessModal(true);
        setComment(""); // Clear comment after successful submission
      }
    } catch (error) {
      console.error(`Error ${action}ing verification:`, error);
      setErrorMessage({
        heading: `${action === 'approve' ? 'Approval' : 'Rejection'} Failed`,
        description: `There was an error ${action}ing the verification.`,
      });
      setShowErrorModal(true);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = verifyAction === 'approve' 
        ? await VerifyApi.approveVerification(qualId, comment)
        : await VerifyApi.rejectVerification(qualId, comment);

      if (response.data.success) {
        setSuccessMessage({
          heading: `Verification ${verifyAction === 'approve' ? 'Approved' : 'Rejected'}`,
          description: `The qualification has been ${verifyAction === 'approve' ? 'successfully verified' : 'rejected'}.`,
        });
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error(`Error ${verifyAction}ing verification:`, error);
      setErrorMessage({
        heading: `${verifyAction === 'approve' ? 'Approval' : 'Rejection'} Failed`,
        description: `There was an error ${verifyAction}ing the verification.`,
      });
      setShowErrorModal(true);
    } finally {
      setShowCommentModal(false);
      setComment("");
      setVerifyAction(null);
    }
  };

  // Remove these duplicate functions as they're already defined above
  // const handleCloseSuccessModal = () => {
  //   setShowSuccessModal(false);
  //   navigate("/institute/verify-requests");
  // };
  
  // const handleCloseErrorModal = () => {
  //   setShowErrorModal(false);
  // };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!qualification) {
    return <div className="error">Qualification not found</div>;
  }

  return (
    <div className="section-container">
      <h2>Student Data</h2>

      {studentData && (
        <div className="student-info-section">
          <h3>Student Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input type="text" value={studentData.name || ""} disabled />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={studentData.email || ""} disabled />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="text" value={studentData.mobileNumber || ""} disabled />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="text" value={studentData.dateOfBirth || ""} disabled />
            </div>
          </div>
        </div>
      )}

      <div className="qualification-info-section">
        <h3>Qualification Information</h3>
        <div className="form-grid">
          {[
            { label: "Qualification Level", value: qualification?.qualificationLevel?.name },
            { label: "Stream", value: qualification?.stream?.name },
            { label: "Status", value: qualification?.completed },
            { label: "Institute State", value: qualification?.instituteState?.name },
            { label: "Institute District", value: qualification?.instituteDistrict?.name },
            { label: "Institute Taluka", value: qualification?.instituteTaluka?.name },
            { label: "Institute Name", value: qualification?.instituteName?.name },
            { label: "Course", value: qualification?.course?.name },
            { label: "Board/University", value: qualification?.boardUniversity?.name },
            { label: "Mode of Study", value: qualification?.mode },
            { label: "Admission Year", value: qualification?.admissionYear },
            { label: "Passing Year", value: qualification?.passingYear },
            { label: "Result", value: qualification?.result },
            { label: "Percentage", value: qualification?.percentage },
            { label: "Number of Attempts", value: qualification?.attempts }
          ].map(({ label, value }) => (
            <div className="form-group" key={label}>
              <label>{label}</label>
              <input type="text" value={value || ""} disabled />
            </div>
          ))}
        </div>
      </div>

      <div className="file-upload-section">
        <h3>Marksheet</h3>
        <div className="view-container">
          <ViewFile
            userId={studEmail}
            tag={`${qualification?.qualificationLevel._id}-${qualification?.stream._id}-${qualification?.boardUniversity._id}`}
          />
        </div>
      </div>
      <div className="comment-section">
        <h3>Comment</h3>
        <textarea
          className="comment-textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          disabled
        />
      </div>
      

      {showSuccessModal && (
        <SuccessModal onClose={handleCloseSuccessModal} data={successMessage} />
      )}

      {showErrorModal && (
        <ErrorModal onClose={handleCloseErrorModal} data={errorMessage} />
      )}

      {/* Add Comment Modal */}
      {showCommentModal && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="modal-title">{verifyAction === 'approve' ? 'Approve' : 'Reject'} Qualification</h3>
            <div className="form-group">
              <label>Comment</label>
              <textarea
                className="modal-textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your comments..."
                rows="4"
              />
            </div>
            <div className="modal-footer">
              <button 
                className="modal-button submit-button" 
                onClick={handleCommentSubmit}
              >
                Submit
              </button>
              <button 
                className="modal-button cancel-button"
                onClick={() => {
                  setShowCommentModal(false);
                  setComment("");
                  setVerifyAction(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewForm;
