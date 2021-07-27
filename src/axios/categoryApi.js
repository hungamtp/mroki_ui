import axiosClient from "./axiosClient";

const categoryApi = {
  getCategory() {
    const url = `user/category/`;
    return axiosClient.get(url);
  },
  getAllSubCategory() {
    const url = "user/category/sub";
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

  deleteCategory(id) {
    const url = `admin/category/${id}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
