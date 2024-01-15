import { AxiosError } from "axios";
import { UserProfile } from "../models";
import axios from "axios";
import { cookies } from "../utils";

export const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `https://chatvia-server.vercel.app/api`
      : `http://localhost:5000/api`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    const user: UserProfile = cookies.getCookie("user");

    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);
