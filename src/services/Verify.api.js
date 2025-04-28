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
  getInstituteVerificationRequest: async (instituteId,status) => {
    return apiServiceBased.get(`${VERIFY}/institute/${instituteId}/${status}`);
  },
  getInstituteVerificatonByStudentIdandQualficationId: async (data)=> {
    return apiServiceBased.get(`${VERIFY}/student/${data.studEmail}/qualification/${data.qualId}`); 
  },
  approveVerification: (studEmail, qualId, comment,instituteId) => {
    return apiServiceBased.post(`${VERIFY}/approve/student/${studEmail}/qualification/${qualId}`, { comment, instituteId});
  },

  rejectVerification: (studEmail, qualId, comment, instituteId) => {
    return apiServiceBased.post(`${VERIFY}/reject/student/${studEmail}/qualification/${qualId}`, { comment, instituteId });
  },
  getVerificationForStudentDashboard: (userId) => {
    return apiServiceBased.get(`${VERIFY}/student/data/${userId}`); 
  },
  getVerificationForStudent: (userId) => {
    return apiServiceBased.get(`${VERIFY}/student/${userId}`); 
  },
  getVerificationForInstituteDashboard: (instituteId) => {
   
    return apiServiceBased.get(`${VERIFY}/institute/data?instituteId=${instituteId}`);
  },
};
