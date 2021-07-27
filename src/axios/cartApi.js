import axiosClient from "./axiosClient";

const cartApi = {
  getCart(customerId) {
    const url = `user/cart/${customerId}`;
    return axiosClient.get(url);
  },

  addToCart(userId, product) {
    const url = `user/cart/${userId}`;
    return axiosClient.post(url, product);
  },

  getCartIcon(userId) {
    const url = `user/cart?customerId=${userId}`;
    return axiosClient.get(url);
  },

  deleteProductInCart(productId, size, userId) {
    const url = `user/cart?productId=${productId}&size=${size}&userId=${userId}`;
    axiosClient.delete(url);
  },
};

export default cartApi;
