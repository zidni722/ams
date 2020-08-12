import axios from "axios"

export const apiClient = axios.create({
    baseURL: process.env.API_BASE_URL || "http://ams-aaz-backend.herokuapp.com/"
})
