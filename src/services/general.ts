import axios from "axios";

const moviesBaseUrl = import.meta.env.VITE_DUMMY_MOVIES_URL;

export const getCustomVideos = async () => {
  try {
    const response = await axios.get(`${moviesBaseUrl}/v4/anime?type=movie`);
    if (response.data) {
      return response.data.data;
    }
    return response;
  } catch (err) {
    console.error("Error while getting Videos:", err);
    return null;
  }
};
