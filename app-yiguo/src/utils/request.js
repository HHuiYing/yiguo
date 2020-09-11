import axios from "axios"

const baseURL = process.env.NODE_ENV === 'development' ? "http://120.24.62.247:2003" : "http://120.24.62.247:2003"
const request = axios.create({
    baseURL: baseURL + "/api",
    withCredentials: true
})

export default request