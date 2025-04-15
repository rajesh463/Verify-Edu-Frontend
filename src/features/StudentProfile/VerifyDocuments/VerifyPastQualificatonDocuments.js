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
  const { user } = useAuth();
  const navigate = useNavigate();
  const getPastQualifications = async () => {
    const res = await StudentApi.getPastQualifications(user?.email);
    // console.log(res?.data?.data?._id);
    setPastQualifications(res?.data?.data || []);
  };

  useEffect(() => {
    if (user?.email) getPastQualifications();
  }, [user?.email]);
  const onVerifyButton = (qualId) => {
    console.log("Hello123", qualId);
    if (qualId) {
      navigate(`/verify-documents-form-past-qualification/${qualId}`);
    }
  };
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

export default VerifyPastQualificatonDocuments;
