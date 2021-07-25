import axiosClient from "./axiosClient";

const categoryApi = {
  getCategory() {
    const url = `user/category/`;
    return axiosClient.get(url);
  },
  getAllSubCategory() {
    const url = "admin/category";
    return axiosClient.get(url);
  },
  getParentCategory() {
    const url = "user/category";
    return axiosClient.get(url);
  },
  addCategory(category) {
    const url = "admin/category";
    return axiosClient.post(url, category);
  },
};

export default categoryApi;
