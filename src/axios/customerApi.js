import axiosClient from "./axiosClient";

const customerApi = {
  getCustomers(page, size, sort, search) {
    const url = `admin/user?page=${page}&size=${size}&sort=${sort}&search=${search}`;
    return axiosClient.get(url);
  },
};

export default customerApi;
