import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Services from "../../services/Services";
import LoadingSpinner from "../../components/FeedbackComponents/Loading/LoadingSpinner";
import "./Register.css";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");
  const [loadingModel, setLoadingModel] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateFields = () => {
    const newErrors = {};

    if (!formData.email.trim() || formData.email.length <= 0) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoadingModel(true);
      const response = await Services.login(formData);

      if (!response?.data?.token || !response?.data?.user) {
        setErrors("Invalid login response. Please try again.");
        setLoadingModel(false);
        return;
      }

      await login(response.data);
      console.log(response.data.user.role);
      navigateTo(response.data.user.role);
      setLoadingModel(false);
    } catch (error) {
      console.error("Login error:", error);
      setErrors(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setLoadingModel(false);
    }
  };

  const navigateTo = (role) => {
    switch (role) {
      case "ve_student":
        navigate("/student-dashboard");
        break;
      case "ve_institute":
        navigate("/institute-dashboard");
        break;
      case "ve_admin":
        navigate("/admin-dashboard");
        break;
      default:
        setErrors("Invalid user role");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-heading">Login</h2>
        {errors && <p className="error-text general-error">{errors}</p>}

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="E-mail Address"
            value={formData?.email}
            onChange={handleInputChange}
            className={`form-input ${errors?.email ? "error" : ""}`}
          />
          {errors?.email && <p className="error-text">{errors?.email}</p>}
        </div>
        <div className="form-group">
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData?.password}
              onChange={handleInputChange}
              className={`form-input ${errors?.password ? "error" : ""}`}
            />
          </div>
          {errors?.password && <p className="error-text">{errors?.password}</p>}
        </div>

        <button type="submit" className="submit-btn" disabled={loadingModel}>
          {loadingModel ? "Logging in..." : "Login"}
        </button>
        <div className="sign-in-link">
          <p>
            Create an Account?{" "}
            <Link to="/register" className="link">
              Register
            </Link>
          </p>
        </div>
      </form>
      {loadingModel && <LoadingSpinner />}
    </div>
  );
};

export default Login;
