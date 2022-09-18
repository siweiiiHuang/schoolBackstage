import axios from '~/axios';

//登录
export function login(phone,password,remeber) {
    return axios.get('/base/login', {
        params: {
          phone: phone,
          password: password,
          rememberMe: remeber
        },
    });
}

//检查登录
export function checkLogin() {
  return axios.get('/base/checkLogin', {
      params: {
      }
  });
}

//分页查询全部纸条
export function selectAll(page) {
  return axios.get('/statistics/historyPosts', {
      params: {
        page
      }
  });
}

//获取待审核的纸条列表
export function getTableData(type) {
  return axios.get('/audit/post/getAll', {
    params: {
      type
    }
  })
}

//改变纸条状态
export function changePaperStatus(id,status,pinned) {
  return axios.post('/audit/post/setStatusAndPinned', {
    id,
    status,
    pinned
  })
}

//获取某个时间之后的某种分类的纸条数量
export function getAllPaperNumber(type,sinceDate) {
  return axios.get('/statistics/postCount', {
    params: {
      type,
      sinceDate
    }
  })
}