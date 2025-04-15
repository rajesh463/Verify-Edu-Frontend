import HttpInterceptor from "./HttpInterceptor";
import { VERIFY } from "./APIURLs";

const apiServiceBased = HttpInterceptor();

export default {
  getAllPastQualificationThatAreNotInVerifeidStete: async (userId) => {
    return apiServiceBased.get(`${VERIFY}?userId=${userId}`);
  },
  VerifyStudentPastQualification: async (data) => {
    return apiServiceBased.post(`${VERIFY}`, data);
  },
  getInstituteVerificationRequest: async (instituteId) => {
    return apiServiceBased.get(`${VERIFY}/institute/${instituteId}`);
  },
};
