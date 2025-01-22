import React, { useState, useEffect } from "react";
import FileUpload from "../../components/File/FileUpload";
import ViewFile from "../../components/File/ViewFile";
import { validatePersonalInfo } from "../../utils/validation";
import SelectInput from "../../components/FormInput/SelectInput";
import Service from "../../services/Services";
import Tag from "../../constant/Tag";
import { useAuth } from "../../context/AuthContext";
import SuccessModal from "../../components/FeedbackComponents/Sucess/SuccessModal";

import "./PersonalInformation.css";

const PersonalInformation = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState({
    aadhaarNumber: "",
    name: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "",
    parentMobileNumber: "",
    maritalStatus: "",
    religion: "",
    casteCategory: "",
    cast: "",
    hasCasteCertificate: "",
    casteCertificateNumber: "",
    issuingDistrict: "",
    issuingAuthority: "",
    issuingDate: "",
    casteCertificateFile: "",
  });
  const [state, setState] = useState({
    aadhaarNumber: "",
    name: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "",
    parentMobileNumber: "",
    maritalStatus: "",
    religion: [],
    casteCategory: [],
    cast: [],
    hasCasteCertificate: "",
    casteCertificateNumber: "",
    issuingDistrict: "",
    issuingAuthority: "",
    issuingDate: "",
    casteCertificateFile: "",
  });
  const genderOptions = [
    { _id: "1", name: "male", value: "Male" },
    { _id: "2", name: "female", value: "Female" },
    { _id: "3", name: "other", value: "Other" },
  ];
  const maritalStatusOptions = [
    { _id: "1", name: "single", value: "Single" },
    { _id: "2", name: "married", value: "Married" },
    { _id: "3", name: "other", value: "Other" },
  ];
  const casteCertificateYesNoOptions = [
    { _id: "1", name: "Yes", value: "Yes" },
    { _id: "2", name: "No", value: "No" },
  ];
  const [selectedCasteCategory, setSelectedCasteCategory] = useState(null);
  const [selectedReligion, setSelectedReligion] = useState(null);
  const [selectedCast, setSelectedCast] = useState(null);
  const [religionOptions, setReligionOptions] = useState([]);
  const [castOptions, setCastOptions] = useState([]);
  const [casteCategoryOptions, setCasteCategoryOptions] = useState([]);
  const [fileKey, setFileKey] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedHasCasteCertificate, setSelectedHasCasteCertificate] =
    useState(0);
  const [modalData, setModalData] = useState({
    heading: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { ...state, userId: user?.email };
      const res = await Service.submitPersonalInfo(formData);

      if (res.status === 200) {
        setModalData({
          heading: "Success!",
          description: "Personal information has been saved successfully.",
        });
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Error submitting personal information:", error);
    }
  };

  const handleChange = (e) => {
    console.log("e.target.name", e.target.name);
    console.log("e.target.value", e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });

    // Handle religion selection
    if (e.target.name === "religion") {
      setSelectedReligion(e.target.value); // Update selectedReligion
    }

    // Handle casteCategory and cast selection
    if (e.target.name === "casteCategory") {
      setSelectedCasteCategory(e.target.value); // Update selectedCasteCategory
    }
    if (e.target.name === "cast") {
      setSelectedCast(e.target.value); // Update selectedCast
    }
    if (e.target.name === "gender") {
      setSelectedGender(e.target.value); // Update selectedGender
    }
    if (e.target.name === "maritalStatus") {
      setSelectedMaritalStatus(e.target.value); // Update selectedMaritalStatus
    }
    if (e.target.name === "hasCasteCertificate") {
      setSelectedHasCasteCertificate(e.target.value); // Update selectedCasteCertificate
    }
  };

  const fetchReligionOptions = async () => {
    const response = await Service.getReligions();
    setReligionOptions(response?.data?.data);
  };

  const fetchCasteCategoryOptions = async () => {
    if (!selectedReligion || selectedReligion === "") return;
    try {
      const response = await Service.getCasteCategoryByReligion(
        selectedReligion
      );
      setCasteCategoryOptions(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching caste category options", error);
    }
  };

  const fetchCasts = async () => {
    if (!selectedCasteCategory) return;
    const response = await Service.getCastByCasteCategory(
      selectedCasteCategory
    );
    setCastOptions(response?.data?.data);
  };

  const fetchPersonalInfo = async () => {
    try {
      if (!user?.email) {
        return alert("User not found");
      }
      const response = await Service.getPersonalInfo(user?.email);

      console.log("response", response);
      if (response.status === 200 && response.data?.data) {
        const data = response.data.data;
        console.log("Hello");
        console.log("data", data.casteCategory._id);
        setState((prevState) => ({
          ...prevState,
          aadhaarNumber: data.aadhaarNumber || "",
          name: data.name || "",
          email: data.email || "",
          mobileNumber: data.mobileNumber || "",
          dateOfBirth: data.dateOfBirth || "",
          gender: data.gender || "",
          parentMobileNumber: data.parentMobileNumber || "",
          maritalStatus: data.maritalStatus || "",
          religion: data.religion._id || "",
          casteCategory: data.casteCategory._id || "",
          cast: data.cast._id || "",
          hasCasteCertificate: data.hasCasteCertificate || "",
          casteCertificateNumber: data.casteCertificateNumber || "",
          issuingDistrict: data.issuingDistrict || "",
          issuingAuthority: data.issuingAuthority || "",
          issuingDate: data.issuingDate || "",
          casteCertificateFile: data.casteCertificateFile || "",
        }));

        // Update selected values
        setSelectedGender(data.gender || null);
        setSelectedMaritalStatus(data.maritalStatus || null);
        setSelectedReligion(data.religion?._id || null);
        setSelectedCasteCategory(data.casteCategory?._id || null);
        setSelectedCast(data.cast?._id || null);
        console.log("heelo");
        console.log("data.hasCasteCertificate", data.hasCasteCertificate);
        setSelectedHasCasteCertificate(data.hasCasteCertificate || 0);

        // Fetch dependent dropdowns if needed
        if (data.religion) {
          await fetchCasteCategoryOptions();
        }
        if (data.casteCategory) {
          await fetchCasts();
        }
      }
    } catch (error) {
      console.error("Error fetching personal information:", error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchPersonalInfo();
    }
  }, [user?.email]);

  useEffect(() => {
    fetchReligionOptions();
  }, []);

  useEffect(() => {
    if (selectedReligion) {
      fetchCasteCategoryOptions();
    }
  }, [selectedReligion]);

  useEffect(() => {
    fetchCasts();
  }, [selectedCasteCategory]);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <div className="personal-info-section">
        <h2>Personal Information</h2>
        <div className="form-group">
          <label>Aadhaar Number</label>
          <input
            type="text"
            name="aadhaarNumber"
            value={state?.aadhaarNumber || ""}
            onChange={handleChange}
            maxLength="12"
            required
          />
          {errors?.aadhaarNumber && (
            <span className="error-message">{errors?.aadhaarNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={state.name || ""}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={state.email || ""}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobileNumber"
            value={state.mobileNumber || ""}
            onChange={handleChange}
            maxLength="10"
            required
          />
          {errors.mobileNumber && (
            <span className="error-message">{errors.mobileNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={state.dateOfBirth || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <SelectInput
            name="gender"
            label="Gender"
            value={selectedGender || ""}
            options={genderOptions}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Parent/Guardian Mobile Number</label>
          <input
            type="tel"
            name="parentMobileNumber"
            value={state.parentMobileNumber || ""}
            onChange={handleChange}
            maxLength="10"
          />
        </div>

        <div className="form-group">
          <SelectInput
            name="maritalStatus"
            label="Marital Status"
            value={selectedMaritalStatus || ""}
            options={maritalStatusOptions}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="religious-data-section">
        <h2>Religious Data</h2>
        <div className="form-group">
          <SelectInput
            name="religion"
            label="Religion"
            value={selectedReligion || ""}
            options={religionOptions}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="caste-section">
        <h2>Caste</h2>
        <div className="form-group">
          <SelectInput
            name="casteCategory"
            label="Caste Category"
            value={selectedCasteCategory || ""}
            options={casteCategoryOptions}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <SelectInput
            name="cast"
            label="Caste"
            value={selectedCast || ""}
            options={castOptions}
            onChange={handleChange}
            required
          />
        </div>

        {state.casteCategory && state.casteCategory !== "general" && (
          <>
            <div className="form-group">
              <label>Do you have a Caste Certificate?</label>
              <SelectInput
                name="hasCasteCertificate"
                label="Caste Certificate"
                value={selectedHasCasteCertificate || ""}
                options={casteCertificateYesNoOptions}
                onChange={handleChange}
                required
              />
            </div>

            {selectedHasCasteCertificate == "1" && (
              <>
                <div className="form-group">
                  <label>Certificate Number</label>
                  <input
                    type="text"
                    name="casteCertificateNumber"
                    value={state.casteCertificateNumber || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Issuing District</label>
                  <input
                    type="text"
                    name="issuingDistrict"
                    value={state.issuingDistrict || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Issuing Authority</label>
                  <input
                    type="text"
                    name="issuingAuthority"
                    value={state.issuingAuthority || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Issuing Date</label>
                  <input
                    type="date"
                    name="issuingDate"
                    value={state.issuingDate || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="file-upload-section">
                  <h3>Caste Certificate</h3>
                  <div className="upload-container">
                    <FileUpload
                      tag={Tag.caste_certificate}
                      setFileKey={setFileKey}
                    />
                  </div>
                  <div className="view-container">
                    <ViewFile tag={Tag.caste_certificate} />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <button type="button" className="submit-btn" onClick={handleSubmit}>
        Save
      </button>

      {showSuccessModal && (
        <SuccessModal onClose={handleCloseModal} data={modalData} />
      )}
    </>
  );
};

export default PersonalInformation;
