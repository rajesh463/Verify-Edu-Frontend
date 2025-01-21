import { useState, useEffect } from "react";
import { useForm } from "../context/FormContext";

export const useFormStep = (stepKey, validationFn) => {
  const { state, dispatch, saveFormData } = useForm();
  const [localData, setLocalData] = useState(state[stepKey] || {});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setLocalData(state[stepKey] || {});
  }, [state, stepKey]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setLocalData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (onNext) => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const validationErrors = validationFn(localData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      await saveFormData(stepKey, localData);
      dispatch({
        type: "UPDATE_FORM",
        section: stepKey,
        data: localData,
      });
      onNext();
    } catch (error) {
      setErrors({ submit: error.message || "Failed to save data" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data: localData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setLocalData,
  };
};
