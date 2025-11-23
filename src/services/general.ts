import axios from "axios";

const moviesBaseUrl = import.meta.env.VITE_DUMMY_MOVIES_URL;

const baseUrl =  'http://localhost:8080';


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


export const getGroupChat = async () => {
  const group_name = 'test';
  try {
    const response = await axios.get(`${baseUrl}/chat/messages/${group_name}`);
    return response.data;
  } catch (err) {
    console.error("Error while getting Videos:", err);
    return null;
  }
}