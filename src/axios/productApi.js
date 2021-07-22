import axiosClient from "./axiosClient";

const productApi = {
  getAll(page, size, sort) {
    const url = `user/product?page=${page}&size=${size}&sort=${sort}`;
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
  getTotalPage() {
    const url = `user/product/totalPage`;
    return axiosClient.get(url);
  },

  getAllAdminProduct(page, size, sort) {
    const url = `admin/product?page=${page}&size=${size}&sort=${sort}`;
    return axiosClient.get(url);
  },
};

export default productApi;
