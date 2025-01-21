import React, { useState } from "react";
import { useForm } from "../context/FormContext";
import LoadingSpinner from "./LoadingSpinner";

const FormStep = ({ children, stepKey, validationFn, onNext, onPrev }) => {
  const { state, dispatch } = useForm();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const data = state[stepKey] || {};

  const handleChange = (name, value) => {
    dispatch({
      type: "UPDATE_FIELD",
      step: stepKey,
      field: name,
      value: value,
    });
    // Clear errors when user makes changes
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setIsSubmitting(true);

    try {
      console.log("data", data);
      if (validationFn) {
        const validationErrors = validationFn(data);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
      }
      await onNext();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="form-step"
      noValidate // Add this to prevent HTML5 validation
    >
      {errors.submit && <div className="error-message">{errors.submit}</div>}

      {children({
        data,
        handleChange,
        errors,
        isSubmitting,
      })}

      <div className="form-navigation">
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="prev-button"
            disabled={isSubmitting}
          >
            Previous
          </button>
        )}
        {onNext && (
          <button type="submit" className="next-button" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Next"}
          </button>
        )}
      </div>
    </form>
  );
};

export default FormStep;
