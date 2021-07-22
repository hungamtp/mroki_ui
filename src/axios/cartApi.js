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
};

export default cartApi;
