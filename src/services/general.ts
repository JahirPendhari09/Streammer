import axios from "axios";
import { ERROR, LOADING, SET_JOINED_MEMBERS, SET_NOTIFICATIONS, SET_ONLOAD } from "../redux/actionTypes";

const moviesBaseUrl = import.meta.env.VITE_DUMMY_MOVIES_URL;

const baseUrl =  'http://localhost:8080';


export const getCustomVideos = async () => {
  try {
    const res = await fetch(`${baseUrl}/videos/list`);
    return await res.json();
  } catch (err) {
    console.log("Error fetching videos", err);
    return [];
  }
};


export const getGroupChat = (group_name:string) =>  async( dispatch: any)=> {
  try {
    dispatch({type: LOADING})
    const response = await axios.get(`${baseUrl}/chat/messages/${group_name}`);
    dispatch({type: SET_ONLOAD, payload: response.data})
    return response.data
  } catch (err) {
    console.error("Error while getting Videos:", err);
    dispatch({type: ERROR})
    return null;
  }
}

export const loadJoinedMembers = (group_name:string) =>  async( dispatch: any)=> {
  try {
    dispatch({type: LOADING})
    const response = await axios.get(`${baseUrl}/chat/get-group-people/${group_name}`);
    dispatch({type: SET_JOINED_MEMBERS, payload: response.data})
    return response.data
  } catch (err) {
    console.error("Error while getting Videos:", err);
    dispatch({type: ERROR})
    return null;
  }
}


export const loadUserNotifications = (id:string) =>  async( dispatch: any)=> {
  try {
    dispatch({type: LOADING})
    const response = await axios.get(`${baseUrl}/notification/get/${id}`);
    console.log(response, 'res')
    dispatch({type: SET_NOTIFICATIONS, payload: response.data})
    return response.data
  } catch (err) {
    console.error("Error while getting Videos:", err);
    dispatch({type: ERROR})
    return null;
  }
}