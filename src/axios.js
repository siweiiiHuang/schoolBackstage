import axios from "axios";
const sevice = axios.create({
  // baseURL: "/api",
  // baseURL: "https://quwanxy.com/quwan/admin",
  baseURL: "https://quwanxy.com/quwancopy/admin",
  timeout: 3000,
  headers: { "X-Custom-Header": "foobar" },
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true, // default
});

export default sevice;
