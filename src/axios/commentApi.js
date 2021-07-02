import axiosClient from "./axiosClient";

const commentApi = {
  getAll(productId, page) {
    const url = "user/comment/" + productId + "page=" + page;
    return axiosClient.get(url);
  },

  comment(comment, productId, customerId) {
    const url =
      "user/comment?productId=" + productId + "&customerId=" + customerId;
    return axiosClient.delete(url, comment);
  },
};

export default commentApi;
