import axios, {AxiosInstance} from "axios";

const isDev = process.env.NODE_ENV === 'development'

const myAxios: AxiosInstance = axios.create({
    baseURL: isDev ? 'http://localhost:9258/api' : 'http://jy-backend.lg-sp.cn/api',
});

myAxios.defaults.withCredentials = true;

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    console.log('发请求',config)
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    console.log('收响应',response)
    // 未登录跳转到登录页
    if (response?.data?.code === 40100){
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;
