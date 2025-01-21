import React from "react";
import FormStep from "../../components/FormStep";
import { validateCourseInfo } from "../../utils/validation";
import Services from "../../services/Services";
import FileUpload from "../../components/File/FileUpload";
import ViewFile from "../../components/File/ViewFile";
import "./CurrentCourse.css";
import "./common.css";

const CurrentCourse = ({ onNext, onPrev }) => {
  const [qualificationLevels, setQualificationLevels] = React.useState([]);
  const [streams, setStreams] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [talukas, setTalukas] = React.useState([]);
  const [colleges, setColleges] = React.useState([]);
  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [levelsRes, statesRes] = await Promise.all([
          Services.getQualificationLevels(),
          Services.getStates(),
        ]);
        setQualificationLevels(levelsRes.data);
        setStates(statesRes.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  const handleStateChange = async (stateId) => {
    try {
      const districtsRes = await Services.getDistricts(stateId);
      setDistricts(districtsRes.data);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleDistrictChange = async (districtId) => {
    try {
      const talukasRes = await Services.getTalukas(districtId);
      setTalukas(talukasRes.data);
    } catch (error) {
      console.error("Error fetching talukas:", error);
    }
  };

  const handleTalukaChange = async (talukaId) => {
    try {
      const collegesRes = await Services.getColleges(talukaId);
      setColleges(collegesRes.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  const handleCollegeChange = async (collegeId) => {
    try {
      const coursesRes = await Services.getCourses(collegeId);
      setCourses(coursesRes.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <FormStep
      stepKey="courseInfo"
      validationFn={validateCourseInfo}
      onNext={onNext}
      onPrev={onPrev}
    >
      {({ data, errors, handleChange }) => (
        <>
          <h2>Current Course Details</h2>

          <div className="form-group">
            <label>Qualification Level</label>
            <select
              name="qualificationLevel"
              value={data.qualificationLevel || ""}
              onChange={(e) => {
                handleChange(e);
                const levelId = e.target.value;
                if (levelId) {
                  Services.getStreams(levelId)
                    .then((res) => setStreams(res.data))
                    .catch((err) =>
                      console.error("Error fetching streams:", err)
                    );
                }
              }}
              required
            >
              <option value="">Select Level</option>
              {qualificationLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
            {errors.qualificationLevel && (
              <span className="error-message">{errors.qualificationLevel}</span>
            )}
          </div>

          <div className="form-group">
            <label>Stream</label>
            <select
              name="stream"
              value={data.stream || ""}
              onChange={handleChange}
              required
              disabled={!data.qualificationLevel}
            >
              <option value="">Select Stream</option>
              {streams.map((stream) => (
                <option key={stream.id} value={stream.id}>
                  {stream.name}
                </option>
              ))}
            </select>
            {errors.stream && (
              <span className="error-message">{errors.stream}</span>
            )}
          </div>

          <div className="form-group">
            <label>Institute State</label>
            <select
              name="instituteState"
              value={data.instituteState || ""}
              onChange={(e) => {
                handleChange(e);
                handleStateChange(e.target.value);
              }}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.instituteState && (
              <span className="error-message">{errors.instituteState}</span>
            )}
          </div>

          <div className="form-group">
            <label>Institute District</label>
            <select
              name="instituteDistrict"
              value={data.instituteDistrict || ""}
              onChange={(e) => {
                handleChange(e);
                handleDistrictChange(e.target.value);
              }}
              required
              disabled={!data.instituteState}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.instituteDistrict && (
              <span className="error-message">{errors.instituteDistrict}</span>
            )}
          </div>

          <div className="form-group">
            <label>Institute Taluka</label>
            <select
              name="instituteTaluka"
              value={data.instituteTaluka || ""}
              onChange={(e) => {
                handleChange(e);
                handleTalukaChange(e.target.value);
              }}
              required
              disabled={!data.instituteDistrict}
            >
              <option value="">Select Taluka</option>
              {talukas.map((taluka) => (
                <option key={taluka.id} value={taluka.id}>
                  {taluka.name}
                </option>
              ))}
            </select>
            {errors.instituteTaluka && (
              <span className="error-message">{errors.instituteTaluka}</span>
            )}
          </div>

          <div className="form-group">
            <label>College Name</label>
            <select
              name="collegeName"
              value={data.collegeName || ""}
              onChange={(e) => {
                handleChange(e);
                handleCollegeChange(e.target.value);
              }}
              required
              disabled={!data.instituteTaluka}
            >
              <option value="">Select College</option>
              {colleges.map((college) => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>
            {errors.collegeName && (
              <span className="error-message">{errors.collegeName}</span>
            )}
          </div>

          <div className="form-group">
            <label>Course</label>
            <select
              name="course"
              value={data.course || ""}
              onChange={handleChange}
              required
              disabled={!data.collegeName}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            {errors.course && (
              <span className="error-message">{errors.course}</span>
            )}
          </div>

          <div className="form-group">
            <label>Admission Year</label>
            <input
              type="number"
              name="admissionYear"
              value={data.admissionYear || ""}
              onChange={handleChange}
              min="2000"
              max={new Date().getFullYear()}
              required
            />
            {errors.admissionYear && (
              <span className="error-message">{errors.admissionYear}</span>
            )}
          </div>

          <div className="file-upload-section">
            <h3>Admission Letter</h3>
            <div className="upload-container">
              <FileUpload tag="admission_letter" />
            </div>
            <div className="view-container">
              <ViewFile tag="admission_letter" />
            </div>
          </div>

          <div className="file-upload-section">
            <h3>Fee Receipt</h3>
            <div className="upload-container">
              <FileUpload tag="fee_receipt" />
            </div>
            <div className="view-container">
              <ViewFile tag="fee_receipt" />
            </div>
          </div>

          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}
        </>
      )}
    </FormStep>
  );
};

export default CurrentCourse;
