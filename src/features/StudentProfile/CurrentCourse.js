import React, { useState, useEffect } from "react";
import Services from "../../services/Services";
import "./PastQualification.css";
import { useAuth } from "../../context/AuthContext";
import SuccessModal from "../../components/FeedbackComponents/Sucess/SuccessModal";
import FileUpload from "../../components/File/FileUpload";
import ViewFile from "../../components/File/ViewFile";
import SelectInput from "../../components/FormInput/SelectInput";
import ConfirmationModal from "../../components/FeedbackComponents/Confirmation/ConfirmationModal";
import { FaTrash, FaEye } from "react-icons/fa";

const CurrentCourse = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    qualificationLevel: "",
    stream: "",
    completed: "Pursuing",
    state: "",
    district: "",
    taluka: "",
    institute: "",
    course: "",
    boardUniversity: "",
    yearOfStudy: "",
    result: "",
    percentage: "",
    marksheetFile: null,
  });

  const [statusOptions] = useState([
    { _id: "Completed", name: "Completed", value: "Completed" },
    { _id: "Pursuing", name: "Pursuing", value: "Pursuing" },
  ]);

  const [resultsOptions] = useState([
    { _id: "pass", name: "Pass", value: "Pass" },
    { _id: "first-class", name: "First Class", value: "First Class" },
    { _id: "distinction", name: "Distinction", value: "Distinction" },
  ]);

  const [yearOfStudyOptions] = useState([
    { _id: "First Year", name: "First Year", value: "First Year" },
    { _id: "Second Year", name: "Second Year", value: "Second Year" },
    { _id: "Third Year", name: "Third Year", value: "Third Year" },
    { _id: "Fourth Year", name: "Fourth Year", value: "Fourth Year" },
  ]);

  // State variables for form fields
  const [selectedQualificationLevel, setSelectedQualificationLevel] =
    useState(null);
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [selectedBoardUniversity, setSelectedBoardUniversity] = useState("");
  const [selectedYearOfStudy, setSelectedYearOfStudy] = useState("");
  const [selectedResult, setSelectedResult] = useState("");
  const [selectedPercentage, setSelectedPercentage] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [tag, setTag] = useState("");

  // Data lists
  const [qualificationLevels, setQualificationLevels] = useState([]);
  const [streams, setStreams] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [boards, setBoards] = useState([]);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileKey, setFileKey] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Pursuing");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState({
    heading: "",
    description: "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCourseData, setSelectedCourseData] = useState(null);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (user?.email) {
      fetchCurrentCourses();
      fetchQualificationLevels();
      fetchStates();
      fetchBoards();
    }
  }, [user?.email]);

  // Fetch functions
  const fetchCurrentCourses = async () => {
    try {
      setLoading(true);
      const response = await Services.getCurrentCourses(user.email);
      if (response.data) {
        setCurrentCourses(response.data);
      }
    } catch (error) {
      setError("Error fetching current courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchQualificationLevels = async () => {
    try {
      setLoading(true);
      const response = await Services.getQualificationLevels();
      if (response.data.success) {
        setQualificationLevels(response.data.data);
      }
    } catch (error) {
      setError("Error fetching qualification levels");
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await Services.getStates();
      if (response.data.success) {
        setStates(response.data.data);
      }
    } catch (error) {
      setError("Error fetching states");
    }
  };

  const fetchBoards = async () => {
    try {
      const response = await Services.getBoards();
      if (response.data.success) {
        setBoards(response.data.data);
      }
    } catch (error) {
      setError("Error fetching boards");
    }
  };

  const handleQualificationChange = async (e) => {
    const value = e.target.value;
    setSelectedQualificationLevel(value);
    setFormData((prev) => ({ ...prev, qualificationLevel: value }));

    try {
      const response = await Services.getStreams(value);
      if (response.data.success) {
        setStreams(response.data.data);
      }
    } catch (error) {
      setError("Error fetching streams");
    }
  };

  const handleInstituteStateChange = async (e) => {
    const value = e.target.value;
    setSelectedState(value);
    setFormData((prev) => ({ ...prev, state: value }));

    try {
      const response = await Services.getDistricts(value);
      if (response.data.success) {
        setDistricts(response.data.data);
      }
    } catch (error) {
      setError("Error fetching districts");
    }
  };

  const handleInstituteDistrictChange = async (e) => {
    const value = e.target.value;
    setSelectedDistrict(value);
    setFormData((prev) => ({ ...prev, district: value }));

    try {
      const response = await Services.getTalukas(value);
      if (response.data.success) {
        setTalukas(response.data.data);
      }
    } catch (error) {
      setError("Error fetching talukas");
    }
  };

  const handleInstituteTalukaChange = async (e) => {
    const value = e.target.value;
    setSelectedTaluka(value);
    setFormData((prev) => ({ ...prev, taluka: value }));

    try {
      const response = await Services.getInstitutes(value);
      if (response.data.success) {
        setInstitutes(response.data.data);
      }
    } catch (error) {
      setError("Error fetching institutes");
    }
  };

  const handleDeleteClick = (course) => {
    // handleConfirmDelete(course);
    setSelectedCourseData(course);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async (course) => {
    try {
      setLoading(true);
      const formData = {
        userId: user.email,
        yearOfStudy: course.yearOfStudy,
        qualificationLevel: course.qualificationLevel._id,
        stream: course.stream._id,
        course: course.course._id,
      };
      console.log(formData);
      const response = await Services.deleteCurrentCourse(formData);
      if (response.data.success) {
        setSuccessData({
          heading: "Success!",
          description: "Course deleted successfully.",
        });
        setShowSuccessModal(true);
        await fetchCurrentCourses();
      }
    } catch (error) {
      setError("Error deleting course");
    } finally {
      setShowConfirmModal(false);
      setSelectedCourseData(null);
      setLoading(false);
      fetchCurrentCourses();
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);

    setSelectedCourseData(null);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  // Handle changes
  const handleStatusChange = (e) => {
    const value = e.target.value;
    console.log(value);
    setSelectedStatus(value);
    setFormData((prev) => ({ ...prev, completed: value }));
  };

  const handleYearOfStudyChange = (e) => {
    const value = e.target.value;
    setSelectedYearOfStudy(value);
    setFormData((prev) => ({ ...prev, yearOfStudy: value }));
  };

  const handleStreamChange = async (e) => {
    const value = e.target.value;
    setSelectedStream(value);
    setFormData((prev) => ({ ...prev, stream: value }));

    try {
      const response = await Services.getCoursesByLevelStream(value);
      if (response.data.success) {
        setCourses(response.data.data);
      }
    } catch (error) {
      setError("Error fetching courses");
    }
  };

  const handleResultChange = (e) => {
    const value = e.target.value;
    setSelectedResult(value);
    setFormData((prev) => ({ ...prev, result: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewMarksheet = (course) => {
    if (course.marksheetFile) {
      window.open(course.marksheetFile, "_blank");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const requiredFields = {
        qualificationLevel: "Qualification Level",
        stream: "Stream",
        yearOfStudy: "Year of Study",
        state: "State",
        district: "District",
        institute: "Institute Name",
        boardUniversity: "Board/University",
      };

      // Add result and percentage to required fields if status is Completed
      if (formData.completed === "Completed") {
        requiredFields.result = "Result";
        requiredFields.percentage = "Percentage";
      }

      const errors = {};
      Object.entries(requiredFields).forEach(([field, label]) => {
        if (!formData[field]) {
          errors[field] = `${label} is required`;
        }
      });

      if (formData.completed === "Completed") {
        if (
          formData.percentage &&
          (formData.percentage < 0 || formData.percentage > 100)
        ) {
          errors.percentage = "Percentage must be between 0 and 100";
        }
        if (!fileKey) {
          errors.marksheetFile = "Marksheet is required for completed courses";
        }
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }

      setLoading(true);
      const submitData = {
        ...formData,
        userId: user.email,
        marksheetFile: fileKey,
      };

      const response = await Services.submitCurrentCourse(
        user.email,
        submitData
      );

      if (response.data.success) {
        setSuccessData({
          heading: "Success!",
          description: "Current course details have been successfully saved.",
        });
        setShowSuccessModal(true);
        await fetchCurrentCourses();
        setFieldErrors({});
        setError(null);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while saving the course"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      selectedQualificationLevel &&
      selectedStream &&
      selectedBoardUniversity
    ) {
      const yearWithoutSpaces = formData.yearOfStudy.replace(/\s+/g, "");
      setTag(
        `${formData.qualificationLevel}-${formData.stream}-${formData.course}-${yearWithoutSpaces}`
      );
    }
  }, [
    selectedQualificationLevel,
    selectedStream,
    selectedBoardUniversity,
    formData.yearOfStudy,
  ]);

  return (
    <div className="section-container">
      <h2>Current Course</h2>

      <div className="form-grid">
        {/* Qualification Level */}
        <div className="form-group">
          <SelectInput
            label="Qualification Level"
            options={qualificationLevels}
            value={selectedQualificationLevel}
            onChange={handleQualificationChange}
            required
            error={fieldErrors.qualificationLevel}
          />
        </div>

        {/* Stream */}
        <div className="form-group">
          <SelectInput
            label="Stream"
            options={streams}
            value={selectedStream}
            onChange={handleStreamChange}
            required
            error={fieldErrors.stream}
            disabled={!selectedQualificationLevel}
          />
        </div>

        {/* Course */}
        <div className="form-group">
          <SelectInput
            label="Course"
            options={courses}
            value={selectedCourse}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedCourse(value);
              setFormData((prev) => ({ ...prev, course: value }));
            }}
            required
            error={fieldErrors.course}
            disabled={!selectedStream}
          />
        </div>

        {/* State */}
        <div className="form-group">
          <SelectInput
            label="State"
            options={states}
            value={selectedState}
            onChange={handleInstituteStateChange}
            required
            error={fieldErrors.state}
          />
        </div>

        {/* District */}
        <div className="form-group">
          <SelectInput
            label="District"
            options={districts}
            value={selectedDistrict}
            onChange={handleInstituteDistrictChange}
            required
            error={fieldErrors.district}
            disabled={!selectedState}
          />
        </div>

        {/* Taluka */}
        <div className="form-group">
          <SelectInput
            label="Taluka"
            options={talukas}
            value={selectedTaluka}
            onChange={handleInstituteTalukaChange}
            required
            error={fieldErrors.taluka}
            disabled={!selectedDistrict}
          />
        </div>

        {/* Institute */}
        <div className="form-group">
          <SelectInput
            label="Institute Name"
            options={institutes}
            value={selectedInstitute}
            onChange={(e) => {
              setSelectedInstitute(e.target.value);
              setFormData((prev) => ({
                ...prev,
                institute: e.target.value,
              }));
            }}
            required
            error={fieldErrors.institute}
            disabled={!selectedTaluka}
          />
        </div>

        {/* Board/University */}
        <div className="form-group">
          <SelectInput
            label="Board/University"
            options={boards}
            value={selectedBoardUniversity}
            onChange={(e) => {
              setSelectedBoardUniversity(e.target.value);
              setFormData((prev) => ({
                ...prev,
                boardUniversity: e.target.value,
              }));
            }}
            required
            error={fieldErrors.boardUniversity}
          />
        </div>

        {/* Year of Study */}
        <div className="form-group">
          <SelectInput
            label="Year of Study"
            options={yearOfStudyOptions}
            value={selectedYearOfStudy}
            onChange={handleYearOfStudyChange}
            required
            error={fieldErrors.yearOfStudy}
          />
        </div>

        {/* Status */}
        <div className="form-group">
          <SelectInput
            label="Status"
            options={statusOptions}
            value={selectedStatus}
            onChange={handleStatusChange}
            required
            error={fieldErrors.completed}
          />
        </div>

        {/* Result fields (only shown if status is Completed) */}
        {selectedStatus === "Completed" && (
          <>
            <div className="form-group">
              <SelectInput
                label="Result"
                options={resultsOptions}
                value={selectedResult}
                onChange={handleResultChange}
                required
                error={fieldErrors.result}
              />
            </div>

            <div className="form-group">
              <label>
                Percentage
                {fieldErrors.percentage && (
                  <span className="error-text">* {fieldErrors.percentage}</span>
                )}
              </label>
              <input
                type="number"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.01"
                required
                className={fieldErrors.percentage ? "error-input" : ""}
              />
            </div>

            {/* File Upload Section */}

            <div className="file-upload-section">
              <h3>Marksheet Upload</h3>
              {fieldErrors.marksheetFile && (
                <div className="error-text">{fieldErrors.marksheetFile}</div>
              )}
              <div className="upload-container">
                {tag && (
                  <FileUpload
                    tag={tag}
                    setFileKey={setFileKey}
                    required={true}
                  />
                )}
              </div>
              {fileKey && (
                <div className="view-container">
                  <ViewFile tag={tag} />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Submit button */}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>

      {/* Current Courses Table */}
      <div className="qualifications-list">
        <h3>Current Courses</h3>
        <div className="table-container">
          <table className="qualifications-table">
            <thead>
              <tr>
                <th>Qualification</th>
                <th>Stream</th>
                <th>Course</th>
                <th>Year of Study</th>
                <th>Institute</th>
                <th>Board/University</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses && currentCourses.length > 0 ? (
                currentCourses.map((course) => {
                  // console.log("Rendering course:", course); // Debug log
                  return (
                    <tr key={course._id}>
                      <td>{course.qualificationLevel?.name || "-"}</td>
                      <td>{course.stream?.name || "-"}</td>
                      <td>{course.course?.name || "-"}</td>
                      <td>{course.yearOfStudy || "-"}</td>
                      <td>{course.institute?.name || "-"}</td>
                      <td>{course.boardUniversity?.name || "-"}</td>
                      <td>{course.completed || "-"}</td>
                      <td>
                        <div className="action-buttons">
                          {course.completed === "Completed" &&
                            course.marksheetFile && (
                              <ViewFile
                                tag={`${course.qualificationLevel._id}-${
                                  course.stream._id
                                }-${
                                  course.course._id
                                }-${course.yearOfStudy.replace(/\s+/g, "")}`}
                              />
                            )}
                          <button
                            onClick={() => handleDeleteClick(course)}
                            className="delete-btn"
                            disabled={loading}
                            title="Delete Course"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    No current courses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showSuccessModal && (
        <SuccessModal onClose={handleCloseSuccessModal} data={successData} />
      )}

      {showConfirmModal && (
        <ConfirmationModal
          title="Delete Course"
          message={`Are you sure you want to delete this course?`}
          onConfirm={() => handleConfirmDelete(selectedCourseData)}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default CurrentCourse;
