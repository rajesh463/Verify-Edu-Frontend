import HttpInterceptor from "../components/ServiCeProvider/HttpInterceptor";
import { AUTH } from "./APIURLs";

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
};
