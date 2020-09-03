import axios from 'axios';
// const baseUrl = process.env.NODE_ENV === "production" ? "http://10.3.138.12:2003" : "http://localhost:2003"
const baseUrl = "http://10.3.138.12:2003"
const request = axios.create({
    baseURL: baseUrl + "/api",
    withCredentials: true,
});

export default request;