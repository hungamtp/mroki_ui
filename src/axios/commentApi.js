import axiosClient from "./axiosClient";

const commentApi = {
  getAll(productId, page) {
    const url = `user/comment/${productId}`;
    return axiosClient.get(url, page);
  },

  comment(comment, productId, customerId) {
    const url =
      "user/comment?productId=" + productId + "&customerId=" + customerId;
    return axiosClient.delete(url, comment);
  },

  getEverageRate(productId) {
    const url = `user/comment/total/${productId}`;
    return axiosClient.get(url);
  },
  // getCountComment(productId) {
  //   const url = `user/comment/total/${productId}`;
  //   return axiosClient.get(url);
  // },

  getTotalPageComment(productId) {
    const url = `user/comment/count/${productId}`;
    return axiosClient.get(url);
  },
};

export default commentApi;
