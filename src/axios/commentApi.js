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
};

export default commentApi;
