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

    // S3 upload with pre-signed URL typically returns a 200 status with no content
    // We'll consider any 2xx status as success
    if (response && response.status >= 200 && response.status < 300) {
      return true; // Return true to indicate successful upload
    }

    return false; // Return false if status is not in 2xx range
  } catch (error) {
    console.error("File upload failed:", error);
    throw error;
  }
};
export default uploadToAwsS3;
