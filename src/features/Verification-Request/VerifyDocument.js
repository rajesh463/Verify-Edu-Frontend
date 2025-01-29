import React, { useState, useEffect } from "react";
import Services from "../../services/Services";
import { useAuth } from "../../context/AuthContext";

const VerifyDocument = () => {
  const [documents, setDocuments] = useState([]);
  const { user } = useAuth();
  const fetchPassQualification = async () => {
    try {
      const response = await Services.getPastQualification(user?.email);
      console.log(response);
      //   setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching pass qualification documents:", error);
    }
  };
  useEffect(() => {
    fetchPassQualification();
  }, []);
  return (
    <div>
      <h2>VerifyDocument</h2>

      <table>
        <thead>
          <tr>
            <th>Document</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
};

export default VerifyDocument;
