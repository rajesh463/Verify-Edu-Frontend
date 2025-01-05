import HttpInterceptor from "./HttpInterceptor";
const uploadToAwsS3 = async (url, file, setUploadProgress) => {
  const apiService = HttpInterceptor();

  const onUploadProgress = (progressEvent) => {
    if (progressEvent.total) {
      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setUploadProgress(progress); // Update upload progress state
    }
  };

  try {
    const response = await apiService.put(
      url,
      file, // Directly pass the file without wrapping in FormData
      { "Content-Type": file.type }, // Include correct Content-Type
      onUploadProgress,
      true // Exclude Authorization header
    );
    return response;
  } catch (error) {
    console.error("File upload failed:", error);
    throw error;
  }
};
export default uploadToAwsS3;
