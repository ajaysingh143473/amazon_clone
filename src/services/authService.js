import axiosInstance from "../apis/axiosInstance"
import { API_END_POINTS } from "../constants/endPoints";

export const signupApi = async (data) =>{
    return await axiosInstance.post(API_END_POINTS.SIGNUP, data);
}

export const signinApi = async (data) =>{
    return await axiosInstance.post(API_END_POINTS.SIGNIN, data);
}

export const forgotPasswordApi = async (data) => {
    return await axiosInstance.post(API_END_POINTS.FORGOT_PASSWORD, data)
}
