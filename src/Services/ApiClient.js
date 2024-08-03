import requests from "./httpService";

const ApiClient = {
  getData: async (url) => {
    return await requests.get(url);
  },

  createData: async (url, data) => {
    return await requests.post(url, data);
  },
  putData: async (url, data) => {
    return await requests.put(url, data);
  },

  deleteData: async (url, id) => {
    return await requests.delete(`${url}/${id}`);
  },

  getDataByParam: async (url, param) => {
    return await requests.get(`${url}/${param}`);
  },

  getDataWithPagination: async (url, page = 0, limit = 10) => {
    return await requests.get(`${url}?page=${page}&limit=${limit}`);
  },
};

export default ApiClient;
