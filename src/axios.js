import axios from "axios";
const sevice = axios.create({
    baseURL: '/api',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

export default sevice;