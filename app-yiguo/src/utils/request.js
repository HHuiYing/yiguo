import axios from "axios"

const request = axios.create({
    baseURL: "http://10.3.138.12:2003/api",
    withCredentials: true
})

export default request