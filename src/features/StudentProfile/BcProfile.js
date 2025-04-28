import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BcTransactionApi from '../../services/BcTranscation.api';
import Services from '../../services/Services';
import './BcProfile.css';

const BcProfile = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fileUrls, setFileUrls] = useState({});
    const { email } = useParams();

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await BcTransactionApi.getStudentRecordsFromBlockchain(email);
                setRecords(response.data.data);
                // Fetch URLs for all marksheets
                response.data.data.forEach(record => {
                    fetchFileUrl(record.marksheetKey);
                });
            } catch (error) {
                console.error('Error fetching blockchain records:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, [email]);

    const fetchFileUrl = async (key) => {
        try {
            const response = await Services.getFileByKey(key);
            if (response.data && response.data.url) {
                setFileUrls(prev => ({
                    ...prev,
                    [key]: response.data.url
                }));
            }
        } catch (error) {
            console.error('Error fetching file URL:', error);
        }
    };

    const handleViewFile = (url) => {
        window.open(url, '_blank');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // Empty state icon
    if (!records || records.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                {/* // Empty state (no records) icon */}
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    {/* <svg className="no-records-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg> */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">No Records Found</h2>
                    <p className="text-gray-600">There are no academic records available for this student.</p>
                </div>
                
                {/* // Blockchain verification icon in header */}
                <div className="verification-badge">
                    {/* <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg> */}
                    <span className="text-green-600 font-medium">Blockchain Verified Records</span>
                </div>
            </div>
        );
    }

    // Main content section icons
    return (
        <div className="profile-container">
            <div className="profile-wrapper">
                <div className="profile-header">
                    <h1 className="profile-title">Academic Records</h1>
                    <h2 className="profile-subtitle">{records[0]?.studName}</h2>
                    <div className="verification-badge">
                        {/* <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg> */}
                        
                        <span className="text-green-600 font-medium">Blockchain Verified Records</span>
                    </div>
                </div>

                <div className="records-container">
                    {records.map((record, index) => (
                        <div key={index} className="record-card">
                            <div className="record-header">
                                <h3 className="record-number">Record #{index + 1}</h3>
                                <span className="qualification-badge">
                                    {record.qualificationLevel}
                                </span>
                            </div>

                            <div className="record-content">
                                <div className="info-grid">
                                    {/* Academic Information */}
                                    <div className="info-section">
                                        <h4 className="section-header">
                                            <svg className="section-icon w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2L2 19h20L12 2zm0 3l7.5 13h-15L12 5z"/>
                                            </svg>
                                            Academic Details
                                        </h4>
                                        <div className="info-list">
                                            <div className="info-item">
                                                <span className="info-label">Stream</span>
                                                <span className="info-value">{record.stream}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Course</span>
                                                <span className="info-value">{record.course}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Institution Details */}
                                    <div className="info-section">
                                        <h4 className="section-header">
                                            <svg className="section-icon w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 3L1 9l11 6l11-6L12 3zm0 15l-8-4.5v3L12 21l8-4.5v-3L12 18z"/>
                                            </svg>
                                            Institution Details
                                        </h4>
                                        <div className="info-list">
                                            <div className="info-item">
                                                <span className="info-label">Institute</span>
                                                <span className="info-value">{record.instituteName}</span>
                                            </div>
                                            <div className="info-item">
                                                <span className="info-label">Board/University</span>
                                                <span className="info-value">{record.boardUniversity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="metrics-container">
                                    <div className="metrics-grid">
                                        <div className="metric-item">
                                            <p className="metric-label">Admission Year</p>
                                            <p className="metric-value">{record.admissionYear}</p>
                                        </div>
                                        <div className="metric-item">
                                            <p className="metric-label">Passing Year</p>
                                            <p className="metric-value">{record.passingYear}</p>
                                        </div>
                                        <div className="metric-item">
                                            <p className="metric-label">Percentage</p>
                                            <p className="metric-value percentage-value">{record.percentage}%</p>
                                        </div>
                                    </div>
                                </div>

                                {fileUrls[record.marksheetKey] && (
                                    <div className="flex justify-end">
                                        <button 
                                            onClick={() => handleViewFile(fileUrls[record.marksheetKey])}
                                            className="view-button"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            View Marksheet
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BcProfile;