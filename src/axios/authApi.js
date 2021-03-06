import axiosClient from "./axiosClient";

const cartApi = {
  login(user) {
    const url = `auth/login`;
    return axiosClient.post(url, user);
  },
  register(user) {
    const url = `auth/signup`;
    return axiosClient.post(url, user);
  },
};

export default cartApi;
