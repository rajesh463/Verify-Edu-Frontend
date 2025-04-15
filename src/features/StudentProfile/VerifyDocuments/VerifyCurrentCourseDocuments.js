import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import StudentApi from "../../../services/Student.api";
import ViewFile from "../../../components/File/ViewFile";
import "./VerifyDocuments.css";
import { useNavigate } from "react-router-dom";

const VerifyCurrentCourseDocuments = () => {
  const [pastqualifications, setPastQualifications] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const getCurrentCourseQualifications = async () => {
    const res = await StudentApi.getCurrentCourseQualificationswithCompleted(
      user?.email
    );
    console.log(res?.data?.data);
    setPastQualifications(res?.data?.data || []);
  };

  useEffect(() => {
    if (user?.email) getCurrentCourseQualifications();
  }, [user?.email]);
  const onVerifyButton = (qualificationId) => {
    navigate(`/verify-documents-form-current-course/${qualificationId}`);
  };
  return (
    <div className="verify-documents-container">
      <h2 className="verify-documents-title">
        Apply Verification for Current-Course Qualification
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
              {/* <th>Mode</th> */}
              <th>Admission Year</th>
              <th>Passing Year</th>
              <th>Result</th>
              <th>Percentage</th>
              {/* <th>Attempts</th> */}
              <th>Marksheet</th>
              <th>Apply Verification</th>
            </tr>
          </thead>
          <tbody>
            {pastqualifications?.map((qualification, index) => (
              <tr key={index}>
                <td>{qualification?.qualificationLevel?.name}</td>
                <td>{qualification?.stream?.name}</td>
                <td>{qualification?.instituteName?.name}</td>
                <td>{qualification?.course?.name}</td>
                <td>{qualification?.boardUniversity?.name}</td>
                {/* <td>{qualification?.mode}</td> */}
                <td>{qualification?.admissionYear}</td>
                <td>{qualification?.passingYear}</td>
                <td>{qualification?.result}</td>
                <td>{qualification?.percentage}</td>
                {/* <td>{qualification?.attempts}</td> */}
                <td>
                  <ViewFile
                    tag={`${qualification?.qualificationLevel._id}-${qualification?.stream._id}-${qualification?.boardUniversity._id}`}
                  />
                </td>
                <td>
                  <button onClick={() => onVerifyButton(qualification?._id)}>
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

export default VerifyCurrentCourseDocuments;
