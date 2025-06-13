import axios from 'axios'
import {config} from "@/config.js";

const instance = axios.create({
  baseURL: config.apiUrl,
})

instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response && response.data ? response.data : response;
}, function (error) {
  return error && error.response && error.response.data ? error.response.data() : Promise.reject(error);
});

export default instance
