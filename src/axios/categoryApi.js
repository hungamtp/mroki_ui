import axiosClient from "./axiosClient";

const categoryApi = {
  getCategory() {
    const url = `user/category/`;
    return axiosClient.get(url);
  },
};

export default categoryApi;
