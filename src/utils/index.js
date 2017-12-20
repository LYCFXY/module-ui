import axios from 'axios'
import qs from 'qs'

/*网络连不上时延迟报错*/
axios.defaults.timeout =  2000;
/*post请求设置请求头*/
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/*拦截器预处理*/
/*请求时的拦截器*/
axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})
/*请求完成后的拦截器*/
axios.interceptors.response.use(response => {
  return response
}, error => {
   // 这里我们把错误信息扶正, 后面就不需要写 catch 了
  return Promise.resolve(error.response)
})

/*请求错误统一处理*/
function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    alert(res.msg)
  }
  /*if (res.data && (!res.data.success)) {
    alert(res.data.error_msg)
  }*/
  return res
}

/*两种请求方式*/
export default {
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: 'http://192.168.191.1:8082/buy',
      url,
      data: qs.stringify(data),
      timeout: 1000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: 'http://192.168.191.1:8082/buy',
      url,
      params, // get 请求时带的参数
      timeout: 1000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
