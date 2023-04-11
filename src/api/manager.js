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
export function selectAll(current,size,order,match) {
  return axios.post('/bbs/post/getPostByPage', {
    current,
    size,
    order,
    match
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

//获取待审核的评论
export function getComment() {
  return axios.get('/audit/comment/getAll', {
    params: {
    }
  })
}

//删除帖子
export function delPaper(id,status,statusInfo) {
  return axios.post('/bbs/post/setStatus', {
    id,
    status,
    statusInfo
  })
}

//取消删除帖子
export function cancelDelPaper(id,status) {
  return axios.post('/bbs/post/setStatus', {
    id,
    status,
  })
}

//获取某个时间之后的某种分类的纸条数量
export function getAllPaperNumber(type,sinceDate) {
  return axios.get('/bbs/statistics/post/getPostCount', {
    params: {
      type,
      sinceDate
    }
  })
}

//禁言
export function banOne(id) {
  return axios.post('/bbs/banSomebody/'+id)
}

//置顶
export function setTop(id) {
  return axios.post('/bbs/post/pin/'+id)
}

//取消置顶
export function unTop() {
  return axios.post('/bbs/post/unpin')
}

//获取轮播图列表
export function getcarouselList() {
  return axios.get('/toolbox/banner/getAllBanners')
}