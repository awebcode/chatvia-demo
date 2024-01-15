import { ArrResponse, ObjResponse, UserProfile } from "./../models";

import { axiosClient } from "./axiosClient";

export const authService = {
  signin(params: UserProfile): Promise<UserProfile> {
    return axiosClient.post("/auth/signin", params);
  },

  signup(params: UserProfile): Promise<UserProfile> {
    return axiosClient.post("/auth/signup", params);
  },

  resetPassword(params: UserProfile): Promise<UserProfile> {
    return axiosClient.post("/auth/resetPassword", params);
  },

  getUser(): Promise<ObjResponse<UserProfile>> {
    return axiosClient.get("/auth/getUser");
  },

  getAllUsers(): Promise<ArrResponse<UserProfile>> {
    return axiosClient.get("/auth/users");
  },

  validateUser({ email }: UserProfile): Promise<UserProfile> {
    return axiosClient.post(`/auth/validateUser/${email}`);
  },
};
