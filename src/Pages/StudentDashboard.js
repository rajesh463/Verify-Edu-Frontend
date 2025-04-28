import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import VerifyApi from "../services/Verify.api";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    pending: 0,
    verified: 0,
    rejected: 0
  });
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQualifications = async () => {
      try {
        setLoading(true);
        
        // Fetch all verifications for the student
        const response = await VerifyApi.getVerificationForStudentDashboard(user?.email);
        const verifications = response?.data?.data || [];

        // Calculate stats
        const stats = verifications.reduce((acc, verification) => {
          const status = verification.status.toLowerCase();
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {
          pending: 0,
          verified: 0,
          rejected: 0
        });

        // Update state
        setStats(stats);
        setQualifications(verifications);

      } catch (err) {
        console.error("Error fetching qualifications:", err);
        setError(err?.response?.data?.message || "Failed to fetch qualifications");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchQualifications();
    }
  }, [user?.email]);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Student Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="stats-container">
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

      {/* Qualifications Table */}
      <div className="qualifications-table-container">
        <h2>Qualifications Status</h2>
        <table className="qualifications-table">
          <thead>
            <tr>
              <th>Qualification</th>
              <th>Stream</th>
              <th>Institute</th>
              <th>Status</th>
              <th>Submitted Date</th>
              <th>Last Updated</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {qualifications.map((qual, index) => (
              <tr key={index} className={`status-${qual.status.toLowerCase()}`}>
                <td>{qual.qualification?.qualificationLevel?.name || 'N/A'}</td>
                <td>{qual.qualification?.stream?.name || 'N/A'}</td>
                <td>{qual.qualification?.instituteName?.name || 'N/A'}</td>
                <td>{qual.status}</td>
                <td>{new Date(qual.createdAt).toLocaleDateString()}</td>
                <td>{new Date(qual.updatedAt).toLocaleDateString()}</td>
                <td>{qual.comments || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDashboard;
