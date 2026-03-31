import axios, { AxiosError, type AxiosResponse } from "axios";
import { queryClient } from "../main";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

function axiosFulfilled(e: AxiosResponse) {
  return e;
}
function axiosRejected(e: AxiosError) {
  if (e.response) {
    if (e.response.status === 401) {
      console.log(e.response.data);
      queryClient.setQueryData(["user"], null);

      return Promise.reject(e.response.data);
    }
    if (e.response.status === 404) {
      return Promise.reject(e.response.data);
    }
    if (e.response.status === 500) {
      return Promise.reject(e.response.data);
    }
    if (e.response.status === 409) {
      return Promise.reject(e.response.data);
    }
    if (e.response.status === 400) {
      return Promise.reject(e.response.data);
    }

    return Promise.reject(e.response);
  }
  return Promise.reject("Something went wrong!!!");
}
api.interceptors.response.use(axiosFulfilled, axiosRejected);
