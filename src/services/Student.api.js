import HttpInterceptor from "./HttpInterceptor";
import { STUDENT } from "./APIURLs";

const apiServiceBased = HttpInterceptor();

export default {
  getPastQualifications: async (userId) => {
    return apiServiceBased.get(
      `${STUDENT}/past-qualifications?userId=${encodeURIComponent(userId)}`
    );
  },
  getCurrentCourseQualifications: async (userId) => {
    return apiServiceBased.get(
      `${STUDENT}/current-course?userId=${encodeURIComponent(userId)}`
    );
  },
  getCurrentCourseQualificationswithCompleted: async (userId) => {
    return apiServiceBased.get(
      `${STUDENT}/current-course/completed?userId=${encodeURIComponent(userId)}`
    );
  },
  deletePastQualification: async (data) => {
    try {
      const response = await apiServiceBased.delete(
        `${STUDENT}/past-qualification`,
        data
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  submitPersonalInfo: async (formData) => {
    return apiServiceBased.post(`${STUDENT}/personal-info`, formData);
  },
  submitAddressInfo: async (formData) => {
    return apiServiceBased.post(`${STUDENT}/address-info`, formData);
  },
  submitPastQualification: async (formData) => {
    return apiServiceBased.post(`${STUDENT}/past-qualification`, formData);
  },
  getPastQualification: async (userId) => {
    return apiServiceBased.get(
      `${STUDENT}/past-qualification?userId=${encodeURIComponent(userId)}`
    );
  },
  submitCurrentCourse: async (formData) => {
    return apiServiceBased.post(`${STUDENT}/current-course`, formData);
  },
  getStudentProfile: async () => {
    return apiServiceBased.get(`${STUDENT}/profile`);
  },
  getPersonalInfo: async (userId) => {
    try {
      console.log("Fetching for userId:", userId);
      const response = await apiServiceBased.get(
        `${STUDENT}/personal-info?userId=${encodeURIComponent(userId)}`
      );
      console.log("Response:", response);
      return response;
    } catch (error) {
      console.error("Error in getPersonalInfo:", error);
      throw error;
    }
  },
  getAddressInfo: async (userId) => {
    try {
      const response = apiServiceBased.get(
        `${STUDENT}/address-info?userId=${encodeURIComponent(userId)}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};
