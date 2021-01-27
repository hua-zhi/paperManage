import axios from "axios";
import { SHOW_EXCEPTION } from "../store/type.js";
import store from "@/store";
import router from "../router";
// axios默认配置
// axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
//请求地址前缀
axios.interceptors.request.use(
  req => {
    req.headers.Authorization = sessionStorage.getItem("token");
    return req;
  },
  error => {
    return Promise.reject(error);
  }
);
// 200: '服务器成功返回请求的数据。',
// 400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
// 401: '用户没有权限（令牌、用户名、密码错误）。',
// 403: '用户得到授权，但是访问是被禁止的。',
// 500: '服务器发生错误，请检查服务器。',
axios.interceptors.response.use(
  req => {
    const res = req.data;
    console.log(res);
    if (res.code !== 200) {
      if (res.code === 400 || res.code === 401 || res.code === 403) {
        router.push("/login");
        store.commit(SHOW_EXCEPTION, { message: res.message });
      }
      return Promise.reject("error");
    } else {
      // res.code === 200,正常返回数据
      return req;
    }
  },
  error => {
    return Promise.reject(error);
  }
);
export default axios;
