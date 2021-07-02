import axiosClient from "./axiosClient";

const productApi = {
  getAll(page) {
    const url = "user/product?page=" + page;
    return axiosClient.get(url);
  },

  getProductDetail(id) {
    const url = "user/product/" + id;
    return axiosClient.delete(url);
  },
};

export default productApi;
