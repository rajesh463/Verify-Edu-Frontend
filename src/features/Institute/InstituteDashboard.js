import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import VerifyApi from "../../services/Verify.api";
import "./StudentDashboard.css";

const InstituteDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    verified: 0,
    rejected: 0
  });
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      console.log("Fetching dashboard data for user:", user); // Add this log statement to check the user inf
      try {
        setLoading(true);
        if (!user?._id || user._id === 'undefined') {
          setError("Invalid institute ID");
          return;
        }
        const response = await VerifyApi.getVerificationForInstituteDashboard(user._id);
        if (response?.data?.success) {
          const { stats, verifications } = response.data.data;
          setStats({
            total: stats.total || 0,
            pending: stats.pending || 0,
            verified: stats.verified || 0,
            rejected: stats.rejected || 0
          });
          setVerifications(verifications || []);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err?.response?.data?.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchDashboardData();
    }
  }, [user?._id]);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Institute Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card total">
          <h3>Total Requests</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card pending">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
        <div className="stat-card verified">
          <h3>Verified</h3>
          <p>{stats.verified}</p>
        </div>
        <div className="stat-card rejected">
          <h3>Rejected</h3>
          <p>{stats.rejected}</p>
        </div>
      </div>

      {/* Verifications Table */}
      <div className="verifications-table-container">
        <h2>Verification Requests</h2>
        <table className="verifications-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Email</th>
              <th>Qualification</th>
              <th>Stream</th>
              {/* <th>Institute</th>
              <th>Course</th>
              <th>Board/University</th> */}
              <th>Status</th>
              <th>Submitted Date</th>
              <th>Last Updated</th>
              {/* <th>Comments</th> */}
            </tr>
          </thead>
          <tbody>
            {verifications.map((verification, index) => (
              <tr key={verification._id || index} className={`status-${verification.status.toLowerCase()}`}>
                <td>{verification.studentName}</td>
                <td>{verification.studentEmail}</td>
                <td>{verification.qualification?.qualificationLevel?.name || 'N/A'}</td>
                <td>{verification.qualification?.stream?.name || 'N/A'}</td>
                {/* <td>{verification.qualification?.instituteName?.name || 'N/A'}</td>
                <td>{verification.qualification?.course?.name || 'N/A'}</td>
                <td>{verification.qualification?.boardUniversity?.name || 'N/A'}</td> */}
                <td>{verification.status}</td>
                <td>{new Date(verification.createdAt).toLocaleDateString()}</td>
                <td>{new Date(verification.updatedAt).toLocaleDateString()}</td>
                {/* <td>{verification.comments || '-'}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstituteDashboard;
