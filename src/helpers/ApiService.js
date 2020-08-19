import axios from "axios";
import {token} from "../constants/defaultValues";

export const apiClient = axios.create({
    baseURL: process.env.API_BASE_URL || "http://ams-aaz-backend.herokuapp.com/"
});

apiClient.defaults.headers.common['authorization'] = 'Bearer ' + token;
