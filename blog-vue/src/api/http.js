import axios from "axios";
// import router from "@/router";
import { /* Notification, */ Loading } from "element-ui";

// 创建axios实例
const service = axios.create({
  baseURL: "/api/",
  timeout: 5000 // 请求超时时间
});

let loading = null;

// request拦截器
service.interceptors.request.use(
  config => {
    loading = Loading.service({
      text: "正在请求中...",
      body: false,
      // spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.2)",
      customClass: "custom-loading"
    });
    return config;
  },
  error => {
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    if (loading) loading.close();
    return response;
  },
  error => {
    if (error.response) {
      console.log(error.response.status);
      if (loading) loading.close();
    }
    // 返回接口返回的错误信息
    return Promise.reject(error.response);
  }
);

export default service;
