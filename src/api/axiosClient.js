import axios from "axios";
import queryString from "querystring";

// const axiosClient = axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
//     headers: {
//         'content-type': 'application/json',
//     },
//     paramsSerializer: params => queryString.stringify(params),
// });
axios.defaults.baseURL = 'http://13.229.213.34/api/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'

export const axiosClient = {
    get(url, slug = '') {
        return axios.get(`${url}/${slug}`).catch(error => console.log(error))
    },
    query(url) {
        return axios.get(`${url}`).catch(error => console.log(error))
    },
    post(url, params, config) {
        return axios.post(`${url}`, params, config)
    },
    
    put(url, params, config) {
        return axios.put(`${url}`, params, config)
    },
    delete(url, params, config) {
        return axios.delete(`${url}`, params, config)
    },
    saveToken(token, expired) {
        window.localStorage.setItem('access_token', JSON.stringify(token))
    },
    getToken() {
        if (typeof window === 'undefined') {
            return null
        }
        return window.localStorage.getItem('access_token') ? JSON.parse(window.localStorage.getItem('access_token')) : "";
    },
    setHeaderAuth(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    clearToken() {

    }
}


// axiosClient.interceptors.request.use(async (config) => {
//     // Handle token here ...
//     return config;
// })


// axiosClient.interceptors.response.use((response) => {
//     if (response && response.data) {
//         return response.data;
//     }
//     return response;
// }, (error) => {
//     // Handle errors
//     throw error;
// });


export default axiosClient;