import axiosClient from "./axiosClient";

const productApi = {
  getAll(page, size, sort, search) {
    const url = `user/product?page=${page}&size=${size}&sort=${sort}&search=isDelete:false${search}`;
    return axiosClient.get(url);
  },
  getAllByName(name, page) {
    const url = `user/product/${name}?page=${page}`;
    return axiosClient.get(url);
  },
  getProductDetail(id) {
    const url = `user/product/${id}`;
    return axiosClient.get(url);
  },

  // admin fuction
  getAllAdminProduct(page, size, sort, search) {
    const url = `admin/product?page=${page}&size=${size}&sort=${sort}&search=isDelete:false${search}`;
    return axiosClient.get(url);
  },

  addProduct(product) {
    const url = "admin/product";
    return axiosClient.post(url, product);
  },

  deleteProduct(productId) {
    const url = `admin/product/${productId}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
