import React, { createContext, useContext, useReducer } from "react";
import Services from "../services/Services";

const FormContext = createContext();

const initialState = {
  personalInfo: {
    aadhaarNumber: "",
    name: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "",
    applicantFullName: "",
    parentMobileNumber: "",
    maritalStatus: "",
    religion: "",
    casteCategory: "",
    caste: "",
    hasCasteCertificate: "",
    certificateFromAapleSarkar: "",
    casteCertificateNumber: "",
    issuingDistrict: "",
    issuingAuthority: "",
    issuingDate: "",
    casteCertificateFile: null,
  },
  addressInfo: {
    permanentAddress: {
      addressLine1: "",
      addressLine2: "",
      state: "",
      district: "",
      taluka: "",
      village: "",
      pincode: "",
    },
    currentAddress: {
      sameAsPermanent: false,
      addressLine1: "",
      addressLine2: "",
      state: "",
      district: "",
      taluka: "",
      village: "",
      pincode: "",
    },
  },
  qualificationInfo: {
    qualificationLevel: "",
    stream: "",
    completed: "Completed",
    instituteState: "",
    instituteDistrict: "",
    instituteTaluka: "",
    collegeName: "",
    course: "",
    boardUniversity: "",
    mode: "",
    admissionYear: "",
    passingYear: "",
    result: "",
    percentage: "",
    attempts: "",
    marksheetFile: null,
  },
  courseInfo: {
    qualificationLevel: "",
    stream: "",
    instituteState: "",
    instituteDistrict: "",
    instituteTaluka: "",
    collegeName: "",
    course: "",
    admissionYear: "",
  },
  completedSteps: [],
  currentStep: 1,
  isLoading: false,
  error: null,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FORM":
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          ...action.data,
        },
      };
    case "COMPLETE_STEP":
      return {
        ...state,
        completedSteps: [...new Set([...state.completedSteps, action.step])],
        currentStep: state.currentStep + 1,
      };
    case "SET_STEP":
      return {
        ...state,
        currentStep: action.step,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const saveFormData = async (section, data) => {
    dispatch({ type: "SET_LOADING", isLoading: true });
    try {
      let response;
      switch (section) {
        case "personalInfo":
          response = await Services.submitPersonalInfo(data);
          break;
        case "addressInfo":
          response = await Services.submitAddressInfo(data);
          break;
        case "qualificationInfo":
          response = await Services.submitPastQualification(data);
          break;
        case "courseInfo":
          response = await Services.submitCurrentCourse(data);
          break;
        default:
          throw new Error("Invalid section");
      }
      return response.data;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        error: error.message,
      });
      throw error;
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false });
    }
  };

  return (
    <FormContext.Provider value={{ state, dispatch, saveFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
