import HttpInterceptor from "./HttpInterceptor";
import { DEMOGRAPHICS } from "./APIURLs";

const apiServiceBased = HttpInterceptor();

export default {
  getReligions: async () => {
    return apiServiceBased.get(`${DEMOGRAPHICS}/religions`);
  },
  addReligions: async (data) => {
    return apiServiceBased.post(`${DEMOGRAPHICS}/religions`, data);
  },
  addCasteCategory: async (data) => {
    return apiServiceBased.post(`${DEMOGRAPHICS}/cast-categories`, data);
  },
  getCasteCategorys: async () => {
    return apiServiceBased.get(`${DEMOGRAPHICS}/cast-categories`);
  },
  getCasteCategoryByReligion: async (religionId) => {
    return apiServiceBased.get(`${DEMOGRAPHICS}/cast-categories/${religionId}`);
  },
  addCaste: async (data) => {
    return apiServiceBased.post(`${DEMOGRAPHICS}/castes`, data);
  },
  getCastByCasteCategory: async (casteCategoryId) => {
    return apiServiceBased.get(`${DEMOGRAPHICS}/castes/${casteCategoryId}`);
  },
  getCasts: async () => {
    return apiServiceBased.get(`${DEMOGRAPHICS}/castes`);
  },
};
