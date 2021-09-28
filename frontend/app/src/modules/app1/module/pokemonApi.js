import axios from "axios";
import Vue from "vue";
import Store from "@/services/store";

const api = axios.create({
  baseURL: `https://pokeapi.co/api/v2/`,
});

api.interceptors.request.use(
  (config) => {
    Store.commit("app_setting/loading", true);

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// Response
api.interceptors.response.use(
  (response) => {
    Store.commit("app_setting/loading", false);
    return response;
  },
  (error) => {
    Store.commit("app_setting/loading", false);
    return Promise.reject(error);
  }
);

Vue.prototype.$pokemon = api;
export { api };
