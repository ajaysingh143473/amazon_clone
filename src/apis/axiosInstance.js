import axios from 'axios';
import { API_CONFIG } from '../constants/apis';

const axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIME_OUT
});

axiosInstance.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem(API_CONFIG.TOKEN);
        if(token){
            req.headers[API_CONFIG.AUTHORIZATION] = `${API_CONFIG.BEARER} ${token}`;
        }
        return req;
    }
)

axiosInstance.interceptors.response.use(
    response =>{
        if(response.headers[API_CONFIG.AUTHORIZATION] !== undefined){
            localStorage.setItem("token", response.headers[API_CONFIG.AUTHORIZATION]);
        }
        return response;
    },
    error =>{
        //
        return Promise.reject(error);
    }
)

export default axiosInstance;