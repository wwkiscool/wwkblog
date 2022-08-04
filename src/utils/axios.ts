import axios from "axios";


// let baseURL = "http://localhost:3000" // 切换地址
let baseURL = ""

const service = axios.create({
    baseURL,
    timeout:1000 * 6 * 3,
    withCredentials:true
})

service.interceptors.request.use( //请求拦截器
    config=>{
        console.log("config.url",config.url);
        
        config.url = baseURL+ config.url;
        return config
    },
    error=>{
        return Promise.reject(error)
    }
)
service.interceptors.response.use( // 响应拦截器
    response => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default service