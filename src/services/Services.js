import HttpInterceptor from "./HttpInterceptor";
import {
  AUTH,
  FILES,
  STUDENT,
  LOCATION,
  EDUCATION,
  INSTITUTE,
  DEMOGRAPHICS,
} from "./APIURLs";
import axios from "axios";
// import { API_URL } from "../config";

const apiServiceBased = HttpInterceptor();

export default {
  register: async (formData) => {
    return apiServiceBased.post(`${AUTH}/register`, formData);
  },
  login: async (formData) => {
    return apiServiceBased.post(`${AUTH}/login`, formData);
  },
  getProfile: async () => {
    return apiServiceBased.get(`${AUTH}/profile`);
  },
  getPreSignedUrlToUpload: async (fileData) => {
    console.log(fileData);
    return apiServiceBased.post(`${FILES}/presinged-url`, {
      filename: fileData.filename,
      contentType: fileData.contentType,
      userId: fileData.userId,
      tag: fileData.tag,
    });
  },
  putFileMetaDataToMongoDb: async (fileData) => {
    return apiServiceBased.post(`${FILES}/save-to-mongo`, {
      filename: fileData.filename,
      contentType: fileData.contentType,
      userId: fileData.userId,
      key: fileData.key,
      tag: fileData.tag,
    });
  },
  getPreSignedUrlToAccess: async (userId, tag) => {
    try {
      const response = await apiServiceBased.post(`${FILES}/access`, {
        userId,
        tag,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  getReligions: async () => {
    return apiServiceBased.get(`${DEMOGRAPHICS}/religions`);
  },
  getCasteCategoryByReligion: async (religionId) => {
    return apiServiceBased.get(`${DEMOGRAPHICS}/cast-categories/${religionId}`);
  },
  getCastByCasteCategory: async (casteCategoryId) => {
    return apiServiceBased.get(`${DEMOGRAPHICS}/castes/${casteCategoryId}`);
  },

  getStates: async () => {
    return apiServiceBased.get(`${LOCATION}/states`);
  },
  getDistricts: async (stateId) => {
    return apiServiceBased.get(`${LOCATION}/districts/${stateId}`);
  },
  getTalukas: async (districtId) => {
    return apiServiceBased.get(`${LOCATION}/talukas/${districtId}`);
  },
  getQualificationLevels: async () => {
    return apiServiceBased.get(`${EDUCATION}/qualifications`);
  },
  getStreams: async (qualificationId) => {
    return apiServiceBased.get(`${EDUCATION}/level-streams/${qualificationId}`);
  },
  getInstitutes: async (talukaId) => {
    console.log(talukaId);
    return apiServiceBased.get(`${INSTITUTE}/by-taluka/${talukaId}`);
  },
  getCourses: async (collegeId) => {
    return apiServiceBased.get(`${EDUCATION}/courses/${collegeId}`);
  },
  getBoards: async () => {
    return apiServiceBased.get(`${EDUCATION}/boards`);
  },
  getBoard: async (boardId) => {
    return apiServiceBased.get(`${EDUCATION}/boards/${boardId}`);
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
  getCoursesByLevelStream: async (levelStreamId) => {
    return apiServiceBased.get(
      `${EDUCATION}/courses?levelStreamId=${levelStreamId}`
    );
  },
  getPastQualifications: async (userId) => {
    return apiServiceBased.get(
      `${STUDENT}/past-qualifications?userId=${encodeURIComponent(userId)}`
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
};
