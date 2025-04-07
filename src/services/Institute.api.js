import HttpInterceptor from "./HttpInterceptor";
import { INSTITUTE } from "./APIURLs";

const apiServiceBased = HttpInterceptor();

export default {
    addInstitute: async (data)=>{
      return apiServiceBased.post(`${INSTITUTE}`,data);  
    },
  getInstitutesByTalukaId: async (talukaId) => {
    console.log(talukaId);
    return apiServiceBased.get(`${INSTITUTE}/by-taluka/${talukaId}`);
  },
};
