import React, { useState, useEffect } from "react";
import Services from "../../services/Services";
import "./PastQualification.css";
import { useAuth } from "../../context/AuthContext";
import SuccessModal from "../../components/FeedbackComponents/Sucess/SuccessModal";
import FileUpload from "../../components/File/FileUpload";
import ViewFile from "../../components/File/ViewFile";
import SelectInput from "../../components/FormInput/SelectInput";

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

  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchPastQualification = async () => {
      try {
        setLoading(true);
        const response = await Services.getPastQualification(user.email);
        if (response.data.success) {
          const data = response.data.data;

          // Update form data and selected values
          setFormData({
            qualificationLevel: data.qualificationLevel?._id || "",
            stream: data.stream?._id || "",
            completed: data.completed || "Completed",
            instituteState: data.instituteState?._id || "",
            instituteDistrict: data.instituteDistrict?._id || "",
            instituteTaluka: data.instituteTaluka?._id || "",
            instituteName: data.instituteName?._id || "",
            boardUniversity: data.boardUniversity?._id || "",
            mode: data.mode || "Regular",
            admissionYear: data.admissionYear || "",
            passingYear: data.passingYear || "",
            result: data.result || "",
            percentage: data.percentage || "",
            attempts: data.attempts || "",
            marksheetFile: data.marksheetFile || null,
          });

          // Update selected values
          setSelectedQualificationLevel(data.qualificationLevel?._id || "");
          setSelectedStream(data.stream?._id || "");
          setSelectedStatus(data.completed || "Completed");
          setSelectedState(data.instituteState?._id || "");
          setSelectedDistrict(data.instituteDistrict?._id || "");
          setSelectedTaluka(data.instituteTaluka?._id || "");
          setSelectedInstitute(data.instituteName?._id || "");
          setSelectedBoardUniversity(data.boardUniversity?._id || "");
          setSelectedMode(data.mode || "Regular");
          setSelectedAdmissionYear(data.admissionYear || "");
          setSelectedPassingYear(data.passingYear || "");
          setSelectedResult(data.result || "");
          setSelectedPercentage(data.percentage || "");
          setSelectedAttempts(data.attempts || "");

          // Fetch dependent data based on selected values
          if (data.qualificationLevel?._id) {
            const streamsResponse = await Services.getStreams(
              data.qualificationLevel._id
            );
            setStreams(streamsResponse.data.data || []);
          }

          if (data.instituteState?._id) {
            const districtsResponse = await Services.getDistricts(
              data.instituteState._id
            );
            setDistricts(districtsResponse.data.data || []);
          }

          if (data.instituteDistrict?._id) {
            const talukasResponse = await Services.getTalukas(
              data.instituteDistrict._id
            );
            setTalukas(talukasResponse.data.data || []);
          }

          if (data.instituteTaluka?._id) {
            const collegesResponse = await Services.getInstitutes(
              data.instituteTaluka._id
            );
            setInstitutes(collegesResponse.data.data || []);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching past qualification:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchPastQualification();
    }
  }, [user?.email]);

  const handleQualificationChange = async (e) => {
    const value = e.target.value;
    setSelectedQualificationLevel(value);
    setFormData((prev) => ({ ...prev, qualificationLevel: value }));

    try {
      const response = await Services.getStreams(value);
      setStreams(response?.data?.data || []);
    } catch (error) {
      setError(error.message);
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
    try {
      const response = await Services.getCourses(value);
      setCourses(response?.data?.data || []);
    } catch (error) {
      setError(error.message);
    }
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
      setLoading(true);
      const response = await Services.submitPastQualification({
        userId: user.email,
        qualificationLevel: selectedQualificationLevel,
        stream: selectedStream,
        completed: selectedStatus,
        instituteState: selectedState,
        instituteDistrict: selectedDistrict,
        instituteTaluka: selectedTaluka,
        instituteName: selectedInstitute,
        boardUniversity: selectedBoardUniversity,
        mode: selectedMode,
        admissionYear: selectedAdmissionYear,
        passingYear: selectedPassingYear,
        result: selectedResult,
        percentage: selectedPercentage,
        attempts: selectedAttempts,
      });

      if (response.data.success) {
        setSuccessData({
          heading: "Success!",
          description:
            "Past qualification details have been successfully saved.",
        });
        setShowSuccessModal(true);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error submitting past qualification:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
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
          />
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
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Submit"}
      </button>

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal onClose={handleCloseSuccessModal} data={successData} />
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PastQualification;
