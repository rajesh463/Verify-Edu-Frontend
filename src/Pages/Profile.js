import React, { useState } from "react";
import PersonalInformation from "../features/StudentProfile/PersonalInformation";
import AddressInformation from "../features/StudentProfile/AddressInformation";
import PastQualification from "../features/StudentProfile/PastQualification";
import CurrentCourse from "../features/StudentProfile/CurrentCourse";
import "./Profile.css";

const steps = [
  { number: 1, label: "Personal Info" },
  { number: 2, label: "Address" },
  { number: 3, label: "Past Qualification" },
  { number: 4, label: "Current Course" },
];

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber); // Allow user to move to the clicked step
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInformation />;
      case 2:
        return <AddressInformation />;
      case 3:
        return <PastQualification />;
      case 4:
        return <CurrentCourse />;
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <div className="progress-bar">
        <div className="steps">
          <div className="step-connector" />
          {steps.map((step) => (
            <div
              key={step.number}
              className={`step ${currentStep === step.number ? "active" : ""}`}
              onClick={() => handleStepClick(step.number)}
              role="button"
              tabIndex={0}
            >
              <span className="step-number">{step.number}</span>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-wrapper">
        {renderStepContent()}
        <div className="button-group">
          {currentStep > 1 && (
            <button
              className="btn-secondary"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </button>
          )}
          {currentStep < steps.length ? (
            <button
              className="btn-primary"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;
