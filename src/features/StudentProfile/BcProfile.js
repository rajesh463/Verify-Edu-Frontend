import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BcTransactionApi from '../../services/BcTranscation.api';

const BcProfile = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const { email } = useParams();

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await BcTransactionApi.getStudentRecordsFromBlockchain(email);
                setRecords(response.data.data);
            } catch (error) {
                console.error('Error fetching blockchain records:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecords();
    }, [email]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Blockchain Records</h1>
            {records.map((record, index) => (
                <div key={index} className="bg-white shadow-md rounded p-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">{record.studName}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p><strong>Qualification:</strong> {record.qualificationLevel}</p>
                            <p><strong>Stream:</strong> {record.stream}</p>
                            <p><strong>Institute:</strong> {record.instituteName}</p>
                            <p><strong>Course:</strong> {record.course}</p>
                            <p><strong>Board/University:</strong> {record.boardUniversity}</p>
                        </div>
                        <div>
                            <p><strong>Admission Year:</strong> {record.admissionYear}</p>
                            <p><strong>Passing Year:</strong> {record.passingYear}</p>
                            <p><strong>Percentage:</strong> {record.percentage}%</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BcProfile;