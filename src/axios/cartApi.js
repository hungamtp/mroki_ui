import axiosClient from "./axiosClient";

const cartApi = {
  getCart(customerId) {
    const url = `user/cart/${customerId}`;
    return axiosClient.get(url);
  },

  addToCart(customerId, product) {
    const url = `user/cart/${customerId}`;
    return axiosClient.post(url, product);
  },

  getCartIcon(customerId) {
    const url = `user/cart?customerId=${customerId}`;
    return axiosClient.get(url);
  },
};

export default cartApi;
