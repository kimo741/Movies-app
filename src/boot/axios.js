import Vue from "vue";
import axios from "axios";
import { Cookies } from "quasar";
let headers = {
  header: {
    "Content-Type":
      "multipart/form-data; charset=utf-8; boundary=" +
      Math.random().toString().substr(2),
    "Access-Control-Allow-Origin": "*",
  },
  processData: false,
  contentType: false,
};

const server = "https://test-api.storexweb.com/";
const api = axios.create({
  baseURL: server + "api",
  withCredentials: false,
  headers,
});

var tokin = Cookies.get("token");
api.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers["Authorization"] = `Bearer ${tokin}`;
  return config;
});
Vue.prototype.$axios = api;
export { axios, api };
