import axiosClient from "./axiosClient";

const sizeApi = {
  getAllSize(productId) {
    const url = `user/size/${productId}`;
    return axiosClient.get(url);
  },
};

export default sizeApi;
