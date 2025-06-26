import axios from 'axios'
import {config} from "@/config";
import {store} from "@/store";

const instance = axios.create({
  baseURL: config.apiUrl,
})

instance.interceptors.request.use(function (config) {
  const token = store.getState().auth.token?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  return response && response.data ? response.data : response;
}, function (error) {
  console.log(error)
  return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default instance
