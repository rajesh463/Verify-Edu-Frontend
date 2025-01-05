import axios from "axios";

const apiUrl = process.env.REACT_APP_API_BASE_URL;
console.log("Loaded API Base URL:", apiUrl);

const HttpInterceptor = () => {
  const instance = axios.create({ baseURL: apiUrl });

  const defaultHeaders = (excludeAuth = false) => {
    const authToken = localStorage.getItem("ve-token");
    const headers = {
      Accept: "application/json",
    };

    if (!excludeAuth && authToken) {
      headers["Authorization"] = "Bearer " + authToken.replace(/"/g, "");
    }

    return headers;
  };

  const request = async (
    method,
    url,
    data = null,
    customHeaders = {},
    onUploadProgress,
    excludeAuth = false
  ) => {
    const headers = { ...defaultHeaders(excludeAuth), ...customHeaders };
    const source = axios.CancelToken.source();

    const config = {
      method,
      url,
      headers,
      cancelToken: source.token,
      onUploadProgress, // Include onUploadProgress for tracking progress
    };

    if (data) {
      config.data = data;
    }

    try {
      const response = await instance(config);
      return response;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        if (error.response) {
          console.error("Response Error:", error.response.data);
          console.error("Status Code:", error.response.status);
        } else if (error.request) {
          console.error("Request Error:", error.request);
        } else {
          console.error("Error Message:", error.message);
        }
      }
      throw error;
    }
  };

  const get = (url, customHeaders = {}, excludeAuth = false) =>
    request("get", url, null, customHeaders, null, excludeAuth);
  const post = (url, data, customHeaders = {}, excludeAuth = false) =>
    request("post", url, data, customHeaders, null, excludeAuth);
  const put = (
    url,
    data,
    customHeaders = {},
    onUploadProgress = null,
    excludeAuth = false
  ) => request("put", url, data, customHeaders, onUploadProgress, excludeAuth);
  const deleteRequest = (
    url,
    data = null,
    customHeaders = {},
    excludeAuth = false
  ) => request("delete", url, data, customHeaders, null, excludeAuth);

  return { get, post, put, delete: deleteRequest };
};

export default HttpInterceptor;
