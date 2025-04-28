import HttpInterceptor from "./HttpInterceptor";
import { BCTRANSACTION } from "./APIURLs";

const apiServiceBased = HttpInterceptor();

export default {
  getStudentRecordsFromBlockchain: (studEmail) => {
    return apiServiceBased.get(`${BCTRANSACTION}/student/${studEmail}`); 
  }
};
