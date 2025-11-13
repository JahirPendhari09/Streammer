import axios from "axios";
import { LOADING, ERROR, LOGIN_USER_SUCCESS, REGISTER_USER_SUCCESS } from "../redux/actionTypes";

const baseUrl = process.env.SERVER_URL || 'http://localhost:8080';

interface LoginData {
    email: string,
    password: string
}
interface RegisterData {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export const loginUser =  (data: LoginData) => async (dispatch: any) => {
    try{
        dispatch({type: LOADING})
        const response = await axios.post(`${baseUrl}/auth/login`, data)
        dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data})
        return response.data
        
    }catch(err) {
        console.error("Error while logging in: ", err);
        dispatch({type: ERROR, })
        return null
    }
}

export const registerUser =  (data: RegisterData) => async (dispatch: any) => {
    try{
        dispatch({type: LOADING})
        const response = await axios.post(`${baseUrl}/auth/register`, data)
        dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data})
        return response.data
        
    }catch(err) {
        console.error("Error while register new user: ", err);
        dispatch({type: ERROR, })
        return null
    }
}