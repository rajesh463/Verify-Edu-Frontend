import HttpInterceptor from "./HttpInterceptor";
import { AUTH, FILES } from "./APIURLs";

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
    return apiServiceBased.post(`${FILES}/presinged-url`, {
      filename: fileData.filename,
      contentType: fileData.contentType,
      userId: fileData.userId,
    });
  },
  putFileMetaDataToMongoDb: async (fileData) => {
    return apiServiceBased.post(`${FILES}/save-to-mongo`, {
      filename: fileData.filename,
      contentType: fileData.contentType,
      userId: fileData.userId,
      key: fileData.key,
    });
  },
  getPreSignedUrlToAccess: async (userId, key) => {
    try {
      const response = await apiServiceBased.post(`${FILES}/access`, {
        userId,
        key,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
};
