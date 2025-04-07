import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Services from "../../services/Services";
import Locations from "../../services/Location.api";
import LoadingSpinner from "../../components/FeedbackComponents/Loading/LoadingSpinner";
import InstituteApi from "../../services/Institute.api";

const InstituteRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    stateId: null,
    districtId: null,
    talukaId: null,
    password: "",
    confirmPassword: "",
  });

  const [allDistrict, setAllDistrict] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allTalukas, setAllTalukas] = useState([]);

  const [errors, setErrors] = useState({});
  const [loadingModel, setLoadingModel] = useState(false);
  const navigate = useNavigate();

  const getStates = async () => {
    setLoadingModel(true);
    try {
      const res = await Locations.getStates();
      setAllStates(res?.data?.data || []);
    } catch (err) {
      setErrors({ general: "Failed to fetch states" });
    } finally {
      setLoadingModel(false);
    }
  };
  const getDistrictByState = async (stateId) => {
    if (!stateId || stateId === "") return;

    setLoadingModel(true);
    try {
      const res = await Locations.getDistrictsByStateId(stateId);
      setAllDistrict(res?.data?.data || []);
    } catch (err) {
      setErrors({ general: "Failed to fetch districts" });
      setAllDistrict([]);
    } finally {
      setLoadingModel(false);
    }
  };

  const getTalukasByDistrict = async (districtId) => {
    setLoadingModel(true);
    try {
      const res = await Locations.getTalukasByDistrictId(districtId);
      setAllTalukas(res?.data?.data || []);
    } catch (err) {
      setErrors({ general: "Failed to fetch talukas" });
    } finally {
      setLoadingModel(false);
    }
  };

  useEffect(() => {
    getStates();
  }, []);

  useEffect(() => {
    if (formData.stateId) {
      getDistrictByState(formData.stateId);
    }
  }, [formData.stateId]);
  useEffect(() => {
    if (formData.districtId) getTalukasByDistrict(formData.districtId);
  }, [formData.districtId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadingModel(true);
      const res = await InstituteApi.addInstitute(formData);
      setLoadingModel(false);
      console.log(res);
      navigate("/login");
    } catch (error) {
      setLoadingModel(false);
      setErrors({ general: "Registration failed. Please try again." });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register Institute</h2>
        {errors.general && <p>{errors.general}</p>}
        <div>
          <input
            type="text"
            name="name"
            placeholder="Institute Name"
            value={formData.name}
            onChange={handleInputChange}
            className={`form-input ${errors.name ? "error" : ""}`}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="E-mail Address"
            value={formData.email}
            onChange={handleInputChange}
            className={`form-input ${errors.email ? "error" : ""}`}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <select
            id="stateSelect"
            name="stateId"
            value={formData?.stateId}
            onChange={handleInputChange}
          >
            <option value={null}>Select State</option>
            {allStates.map((state) => (
              <option key={state._id} value={state._id}>
                {state.name}
              </option>
            ))}
          </select>
          <select
            id="districtSelect"
            name="districtId"
            value={formData?.districtId}
            onChange={handleInputChange}
          >
            <option value={null}>Select District</option>
            {allDistrict.map((dis) => (
              <option key={dis._id} value={dis._id}>
                {dis.name}
              </option>
            ))}
          </select>
          <select
            id="talukaSelect"
            name="talukaId"
            value={formData?.talukaId}
            onChange={handleInputChange}
          >
            <option value={null}>Select Taluka</option>
            {allTalukas.map((tal) => (
              <option key={tal._id} value={tal._id}>
                {tal.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={`form-input ${errors.password ? "error" : ""}`}
            />
          </div>
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`form-input ${errors.password ? "error" : ""}`}
            />
          </div>
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button type="submit">Register</button>
        <div>
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
      {loadingModel && <LoadingSpinner />}
    </div>
  );
};

export default InstituteRegister;
