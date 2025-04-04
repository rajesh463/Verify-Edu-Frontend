import HttpInterceptor from "./HttpInterceptor";
import { EDUCATION } from "./APIURLs";

const apiServiceBased = HttpInterceptor();

export default {
  addQualification: async (data) => {
    return apiServiceBased.post(`${EDUCATION}/qualifications`, data);
  },
  getQualifications: async () => {
    return apiServiceBased.get(`${EDUCATION}/qualifications`);
  },
  addLevelStream: async (data) => {
    return apiServiceBased.post(`${EDUCATION}/level-streams`, data);
  },
  getLevelStreams: async () => {
    return apiServiceBased.get(`${EDUCATION}/level-streams`);
  },

  getLevelStreamByQualification: async (qualificationId) => {
    return apiServiceBased.get(`${EDUCATION}/level-streams/${qualificationId}`);
  },
  addCourses: async (data) => {
    return apiServiceBased.post(`${EDUCATION}/courses`, data);
  },
  getCourses: async (collegeId) => {
    return apiServiceBased.get(`${EDUCATION}/courses/${collegeId}`);
  },
  getAllCourses: async () => {
    return apiServiceBased.get(`${EDUCATION}/courses`);
  },
  getBoards: async () => {
    return apiServiceBased.get(`${EDUCATION}/boards`);
  },
  getBoard: async (boardId) => {
    return apiServiceBased.get(`${EDUCATION}/boards/${boardId}`);
  },
  getAllBoards: async () => {
    return apiServiceBased.get(`${EDUCATION}/boards`);
  },
  addBoard: async (data) => {
    return apiServiceBased.post(`${EDUCATION}/boards`, data);
  },
  getCoursesByLevelStream: async (levelStreamId) => {
    return apiServiceBased.get(
      `${EDUCATION}/courses?levelStreamId=${levelStreamId}`
    );
  },
};
