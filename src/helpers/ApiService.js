import axios from "axios";
import {servicePath, token} from "../constants/defaultValues";

export const apiClient = axios.create({
    baseURL: servicePath || "http://ams-aaz-backend.herokuapp.com/"
});

apiClient.defaults.headers.common['authorization'] = 'Bearer ' + token;
