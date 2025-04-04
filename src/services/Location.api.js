import HttpInterceptor from "./HttpInterceptor";
import { LOCATION } from "./APIURLs";

const apiServiceBased = HttpInterceptor();

export default {
  getStates: async () => {
    return apiServiceBased.get(`${LOCATION}/states`);
  },
  addStates: async (state) => {
    return apiServiceBased.post(`${LOCATION}/states`, state);
  },
  getDistrictsByStateId: async (stateId) => {
    return apiServiceBased.get(`${LOCATION}/districts/${stateId}`);
  },
  addDistrict: async (district) => {
    return apiServiceBased.post(`${LOCATION}/districts`, district);
  },
  getDistricts: async () => {
    return apiServiceBased.get(`${LOCATION}/districts`);
  },
  addTaluka: async (data) => {
    return apiServiceBased.post(`${LOCATION}/talukas`, data);
  },
  getTalukas: async (districtId) => {
    return apiServiceBased.get(`${LOCATION}/talukas/${districtId}`);
  },
  getTalukas: async () => {
    return apiServiceBased.get(`${LOCATION}/talukas`);
  },
};
