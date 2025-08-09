import type { AxiosInstance } from "axios";
import axios from "axios";

const BASE_API_URL = "http://localhost:8080";

const api: AxiosInstance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    withCredentials: false,
})

export default api;