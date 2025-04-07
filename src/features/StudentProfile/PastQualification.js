import React, { useState, useEffect, useRef } from "react";
import Services from "../../services/Services";
import "./PastQualification.css";
import { useAuth } from "../../context/AuthContext";
import SuccessModal from "../../components/FeedbackComponents/Sucess/SuccessModal";
import FileUpload from "../../components/File/FileUpload";
import ViewFile from "../../components/File/ViewFile";
import SelectInput from "../../components/FormInput/SelectInput";
import AgGridTable from "../../components/FormInput/AgGridTable";
import ConfirmationModal from "../../components/FeedbackComponents/Confirmation/ConfirmationModal";
// import ViewFileWithHandler from "../../components/File/ViewFileWithHandler";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FaTrash, FaEye } from "react-icons/fa";

const PastQualification = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    qualificationLevel: "",
    stream: "",
    completed: "Completed",
    instituteState: "",
    instituteDistrict: "",
    instituteTaluka: "",
    instituteName: "",
    course: "",
    boardUniversity: "",
    mode: "",
    admissionYear: "",
    passingYear: "",
    result: "",
    percentage: "",
    attempts: "",
    marksheetFile: null,
  });
  const [qualifications, setQualifications] = useState([]);
  const [statusOptions, setStatusOptions] = useState([
    { _id: "completed", name: "Completed", value: "Completed" },
    { _id: "pursuing", name: "Pursuing", value: "Pursuing" },
  ]);
  const [resultsOptions, setResultsOptions] = useState([
    { _id: "pass", name: "Pass", value: "Pass" },
    { _id: "first-class", name: "First Class", value: "First Class" },
    { _id: "distinction", name: "Distinction", value: "Distinction" },
  ]);
  const [selectedQualificationLevel, setSelectedQualificationLevel] =
    useState(null);
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedBoardUniversity, setSelectedBoardUniversity] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [selectedAdmissionYear, setSelectedAdmissionYear] = useState("");
  const [selectedPassingYear, setSelectedPassingYear] = useState("");
  const [selectedResult, setSelectedResult] = useState("");
  const [selectedPercentage, setSelectedPercentage] = useState("");
  const [selectedAttempts, setSelectedAttempts] = useState("");
  const [selectedMarksheetFile, setSelectedMarksheetFile] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");

  const [qualificationLevels, setQualificationLevels] = useState([]);
  const [streams, setStreams] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [boards, setBoards] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileKey, setFileKey] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState("Completed");
  const [modes, setModes] = useState([
    { _id: "regular", name: "Regular", value: "Regular" },
    { _id: "distance", name: "Distance", value: "Distance" },
  ]);

  // Add state for success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState({
    heading: "",
    description: "",
  });

  // Add new states for AG Grid
  const [gridReady, setGridReady] = useState(false);
  const gridRef = useRef();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedFileTag, setSelectedFileTag] = useState(null);

  // Add new error state for specific form fields
  const [fieldErrors, setFieldErrors] = useState({});

  const columnDefs = [
    { field: "qualificationLevel.name", headerName: "Qualification" },
    { field: "stream.name", headerName: "Stream" },
    { field: "completed", headerName: "Status" },
    { field: "instituteName.name", headerName: "Institute" },
    { field: "boardUniversity.name", headerName: "Board/University" },
    { field: "mode", headerName: "Mode" },
    { field: "passingYear", headerName: "Passing Year" },
    { field: "percentage", headerName: "Percentage" },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button onClick={() => handleViewMarksheet(params.data)}>
            <FaEye />
          </button>
          <button onClick={() => handleDeleteClick(params.data)}>
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true,
  };

  useEffect(() => {
    if (user?.email) {
      fetchQualifications();
    }
  }, [user?.email]);

  useEffect(() => {
    if (fileKey)
      setFormData((prevState) => ({
        ...prevState,
        marksheetFile: fileKey,
      }));
  }, [fileKey]);

  const fetchQualifications = async () => {
    try {
      setLoading(true);
      const response = await Services.getPastQualifications(user.email);
      if (response.data.success) {
        setQualifications(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching qualifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (qualification) => {
    setSelectedQualification(qualification);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async (qualification) => {
    try {
      setLoading(true);
      console.log("Deleting qualification with params:", {
        userId: user.email,
        qualificationId: qualification.qualificationLevel._id,
      });
      if (!qualification.qualificationLevel._id) {
        return;
      }

      const deleteObject = {
        userId: user.email,
        qualificationId: qualification.qualificationLevel._id,
      };
      const response = await Services.deletePastQualification(deleteObject);

      if (response.data.success) {
        await fetchQualifications();
      }
    } catch (error) {
      console.error("Error deleting qualification:", error);
    } finally {
      setShowConfirmModal(false);
      setSelectedQualification(null);
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setSelectedQualification(null);
  };

  const handleViewMarksheet = (qualification) => {
    const tag = `${qualification.qualificationLevel.name}-${qualification.stream.name}-${qualification.boardUniversity.name}`;
    setSelectedFileTag(tag);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedFileTag(null);
  };

  const handleQualificationChange = async (e) => {
    const value = e.target.value;
    setSelectedQualificationLevel(value);
    setFormData((prev) => ({ ...prev, qualificationLevel: value }));

    try {
      setLoading(true);
      const response = await Services.getStreams(value);
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to fetch streams");
      }
      setStreams(response?.data?.data || []);
      setFieldErrors((prev) => ({ ...prev, qualificationLevel: null }));
    } catch (error) {
      setError(`Error loading streams: ${error.message}`);
      setStreams([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStreamChange = async (e) => {
    const value = e.target.value;
    if (!value) return;
    setSelectedStream(value);
    setFormData((prev) => ({ ...prev, stream: value }));
    try {
      const response = await Services.getCoursesByLevelStream(value);
      setCourses(response?.data?.data || []);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInstituteChange = async (e) => {
    const { name, value } = e.target;
    setSelectedInstitute(value);
    setFormData((prev) => ({ ...prev, instituteName: value }));
    // try {
    //   const response = await Services.getCourses(value);
    //   setCourses(response?.data?.data || []);
    // } catch (error) {
    //   setError(error.message);
    // }
  };
  const handleInstituteStateChange = async (e) => {
    const value = e.target.value;
    setSelectedState(value);
    setFormData((prev) => ({ ...prev, instituteState: value }));

    try {
      const response = await Services.getDistricts(value);
      setDistricts(response?.data?.data || []);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleInstituteDistrictChange = async (e) => {
    const value = e.target.value;
    setSelectedDistrict(value);
    setFormData((prev) => ({ ...prev, instituteDistrict: value }));

    try {
      const response = await Services.getTalukas(value);
      setTalukas(response?.data?.data || []);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleInstituteTalukaChange = async (e) => {
    const value = e.target.value;
    setSelectedTaluka(value);
    setFormData((prev) => ({ ...prev, instituteTaluka: value }));

    try {
      const response = await Services.getInstitutes(value);
      setInstitutes(response?.data?.data || []);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setSelectedStatus(value);
    setFormData((prev) => ({ ...prev, completed: value }));
  };

  const handleBoardUniversityChange = (e) => {
    const { name, value } = e.target;
    setSelectedBoardUniversity(value);
    setFormData((prev) => ({ ...prev, boardUniversity: value }));
  };

  const handleModeChange = (e) => {
    const { name, value } = e.target;
    setSelectedMode(value);
    setFormData((prev) => ({ ...prev, mode: value }));
  };

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setSelectedCourse(value);
    setFormData((prev) => ({ ...prev, course: value }));
  };
  const handleResultChange = (e) => {
    const value = e.target.value;
    setSelectedResult(value);
    setFormData((prev) => ({ ...prev, result: value }));
  };

  const fetchQualificationLevels = async () => {
    const response = await Services.getQualificationLevels();
    setQualificationLevels(response?.data?.data || []);
  };
  useEffect(() => {
    fetchQualificationLevels();
  }, []);
  const fetchStates = async () => {
    try {
      const response = await Services.getStates();
      console.log(response?.data?.data);
      setStates(response?.data?.data || []);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchStates();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await Services.getBoards();
      console.log(response);
      setBoards(response?.data?.data || []);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchBoards();
  }, []);
  let tag = null;
  if (selectedQualificationLevel && selectedStream && selectedBoardUniversity) {
    tag = `${formData.qualificationLevel}-${formData.stream}-${formData.boardUniversity}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      const requiredFields = {
        qualificationLevel: "Qualification Level",
        stream: "Stream",
        instituteState: "Institute State",
        instituteDistrict: "Institute District",
        instituteName: "Institute Name",
        boardUniversity: "Board/University",
        mode: "Mode of Study",
        admissionYear: "Admission Year",
        passingYear: "Passing Year",
        result: "Result",
        percentage: "Percentage",
        attempts: "Number of Attempts",
      };

      const errors = {};
      Object.entries(requiredFields).forEach(([field, label]) => {
        if (!formData[field]) {
          errors[field] = `${label} is required`;
        }
      });

      // Validate percentage range
      if (
        formData.percentage &&
        (formData.percentage < 0 || formData.percentage > 100)
      ) {
        errors.percentage = "Percentage must be between 0 and 100";
      }

      // Validate admission and passing years
      const currentYear = new Date().getFullYear();
      if (
        formData.admissionYear &&
        (formData.admissionYear < 1900 || formData.admissionYear > currentYear)
      ) {
        errors.admissionYear = `Admission year must be between 1900 and ${currentYear}`;
      }
      if (
        formData.passingYear &&
        (formData.passingYear < formData.admissionYear ||
          formData.passingYear > currentYear)
      ) {
        errors.passingYear = `Passing year must be between admission year and ${currentYear}`;
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setError("Please correct the errors in the form");
        return;
      }

      setLoading(true);
      setFormData((prev) => ({ ...prev, marksheetFile: fileKey }));

      const submitData = {
        ...formData,
        userId: user.email,
      };

      const response = await Services.submitPastQualification(submitData);

      if (response.data.success) {
        setSuccessData({
          heading: "Success!",
          description:
            "Past qualification details have been successfully saved.",
        });
        setShowSuccessModal(true);
        await fetchQualifications();
        // Clear form and errors after successful submission
        setFieldErrors({});
        setError(null);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while saving qualification";
      setError(errorMessage);
      console.error("Error submitting past qualification:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  // Grid ready handler
  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="section-container">
      <h2>Past Qualification</h2>

      <div className="form-grid">
        <div className="form-group">
          <SelectInput
            label="Qualification Level"
            options={qualificationLevels}
            value={selectedQualificationLevel}
            onChange={handleQualificationChange}
            required
            error={fieldErrors.qualificationLevel}
          />
          {fieldErrors.qualificationLevel && (
            <span className="error-text">{fieldErrors.qualificationLevel}</span>
          )}
        </div>

        <div className="form-group">
          <SelectInput
            label="Stream"
            options={streams}
            value={selectedStream}
            onChange={handleStreamChange}
            required
            disabled={!selectedQualificationLevel}
          />
        </div>

        <div className="form-group">
          <SelectInput
            label="Status"
            options={statusOptions}
            value={selectedStatus}
            onChange={handleStatusChange}
            required
          />
        </div>

        {/* Location fields */}
        <div className="form-group">
          <SelectInput
            label="Institute State"
            options={states}
            value={selectedState}
            onChange={handleInstituteStateChange}
            required
          />
        </div>

        <div className="form-group">
          <SelectInput
            label="Institute District"
            options={districts}
            value={selectedDistrict}
            onChange={handleInstituteDistrictChange}
            required
            disabled={!selectedState}
          />
        </div>

        <div className="form-group">
          <SelectInput
            label="Institute Taluka"
            options={talukas}
            value={selectedTaluka}
            onChange={handleInstituteTalukaChange}
            required
            disabled={!selectedDistrict}
          />
        </div>

        <div className="form-group">
          <SelectInput
            label="Institute Name"
            options={institutes}
            value={selectedInstitute}
            onChange={handleInstituteChange}
            required
            disabled={!selectedTaluka}
          />
        </div>
        <div className="form-group">
          <SelectInput
            label="Course"
            options={courses}
            value={selectedCourse}
            onChange={handleCourseChange}
            required
            disabled={!selectedInstitute}
          />
        </div>

        <div className="form-group">
          <SelectInput
            label="Board/University"
            options={boards}
            value={selectedBoardUniversity}
            onChange={handleBoardUniversityChange}
            required
          />
        </div>

        <div className="form-group">
          <SelectInput
            label="Mode of Study"
            options={modes}
            value={selectedMode}
            onChange={handleModeChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Admission Year</label>
          <input
            type="number"
            name="admissionYear"
            value={formData.admissionYear}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
            required
          />
        </div>

        <div className="form-group">
          <label>Passing Year</label>
          <input
            type="number"
            name="passingYear"
            value={formData.passingYear}
            onChange={handleChange}
            min={formData.admissionYear || "1900"}
            max={new Date().getFullYear()}
            required
          />
        </div>

        <div className="form-group">
          <SelectInput
            label="Result"
            options={resultsOptions}
            value={selectedResult}
            onChange={handleResultChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Percentage</label>
          <input
            type="number"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Number of Attempts</label>
          <input
            type="number"
            name="attempts"
            value={formData.attempts}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
      </div>

      {tag && (
        <div className="file-upload-section">
          <h3>Marksheet Upload</h3>
          <div className="upload-container">
            <FileUpload tag={tag} setFileKey={setFileKey} />
          </div>
          <div className="view-container">
            <ViewFile tag={tag} />
          </div>
        </div>
      )}

      {error && (
        <div
          className="error-message"
          style={{
            marginTop: "10px",
            color: "red",
            padding: "10px",
            backgroundColor: "#ffe6e6",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
      <div style={{ marginTop: "20px" }}>
        <h3>Qualification History</h3>
        <div className="table-container">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <table className="qualifications-table">
              <thead>
                <tr>
                  <th>Qualification</th>
                  <th>Stream</th>
                  <th>Institute</th>
                  <th>Board/University</th>
                  <th>Mode</th>
                  <th>Passing Year</th>
                  <th>Percentage</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {qualifications.map((qual) => (
                  <tr key={qual._id}>
                    <td>{qual.qualificationLevel?.name}</td>
                    <td>{qual.stream?.name}</td>
                    <td>{qual.instituteName?.name}</td>
                    <td>{qual.boardUniversity?.name}</td>
                    <td>{qual.mode}</td>
                    <td>{qual.passingYear}</td>
                    <td>{qual.percentage}%</td>
                    <td>
                      <div className="action-buttons">
                        <ViewFile
                          tag={`${qual.qualificationLevel._id}-${qual.stream._id}-${qual.boardUniversity._id}`}
                        />
                        <button
                          onClick={() => handleDeleteClick(qual)}
                          className="delete-btn"
                          title="Delete"
                          disabled={loading}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && qualifications.length === 0 && (
            <div className="no-data">No qualifications found</div>
          )}
        </div>
      </div>
      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal onClose={handleCloseSuccessModal} data={successData} />
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmationModal
          title="Delete Qualification"
          message={`Are you sure you want to delete ${selectedQualification?.qualificationLevel?.name} qualification?`}
          onConfirm={handleConfirmDelete(selectedQualification)}
          onCancel={handleCancelDelete}
        />
      )}

      {/* {showViewModal && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleCloseViewModal}>Close</button>
            <ViewFile tag={selectedFileTag} />
          </div>
        </div>
      )} */}
    </div>
  );
};
export default PastQualification;
