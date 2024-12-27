import Services from "../../../services/Services";

export const userProfileLoader = async () => {
  try {
    const res = await Services.getProfile(localStorage.getItem("ve-token"));
    return res.data; // Returning the fetched user data
  } catch (error) {
    console.error("Error fetching user profile", error);
    return null; // Return null or fallback data in case of error
  }
};
