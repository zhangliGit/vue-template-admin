/**
 * @description 封装http请求功能
 * @author zhangli
 */

import axios from 'axios'
import qs from 'qs'
import { Modal, message } from 'ant-design-vue'
import Vue from 'vue'
let loading
message.config({
  maxCount: 1,
  top: '25px',
  duration: 2
})
const vm = new Vue()

// 请求超时时间
axios.defaults.timeout = 15000
axios.defaults.withCredentials = true // 让ajax携带cookie

// 拦截请求
axios.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// 拦截响应
axios.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)

const showToast = (tip = '') => {
  loading = vm.$message.loading('处理中...', 0)
}

// 处理响应结果
function responseRes(res) {
  // 清除加载
  setTimeout(loading, 0)
  return new Promise((resolve, reject) => {
    if (res.code === 200 || res.status === true) {
      resolve(res)
    } else if (res.code === 401) {
      Modal.warning({
        title: '提示',
        okText: '确定',
        content: '认证过期，请重新登录'
      })
    } else {
      Modal.warning({
        title: '提示',
        okText: '确定',
        content: res.message || '数据请求失败, 请联系管理员'
      })
      reject(res.message)
    }
  })
}
const $ajax = {
  async get(obj, tag = true) {
    if (tag) showToast()
    try {
      let res = await axios.get(obj.url, {
        params: obj.params || ''
      })
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err.response.data)
    }
  },
  async postForm(obj, tag = true) {
    if (tag) showToast()
    try {
      let res = await axios.post(obj.url, qs.stringify(obj.params))
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err.response.data)
    }
  },
  async post(obj, tag = true) {
    if (tag) showToast()
    try {
      let res = await axios({
        url: obj.url,
        method: 'post',
        data: obj.params,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err.response.data)
    }
  },
  async postJsonQuery(obj, tag = true) {
    if (tag) showToast()
    let url = obj.url + '?'
    for (const key in obj.params) {
      url += key + '=' + obj.params[key] + '&'
    }
    try {
      let res = await axios({
        url: url,
        method: 'post',
        data: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err.response.data)
    }
  },
  async postQuery(obj, tag = true) {
    if (tag) showToast()
    let url = obj.url + '?'
    for (const key in obj.params) {
      url += key + '=' + obj.params[key] + '&'
    }
    try {
      let res = await axios.post(url, qs.stringify({}))
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err.response.data)
    }
  },
  async del(obj, tag = true) {
    if (tag) showToast()
    try {
      let res = await axios.delete(obj.url, {})
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err.response.data)
    }
  },
  async delQuery(obj, tag = true) {
    if (tag) showToast()
    let url = obj.url + '?'
    for (const key in obj.params) {
      url += key + '=' + obj.params[key] + '&'
    }
    try {
      let res = await axios.delete(url, {})
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err.response.data)
    }
  },
  async put(obj, tag = true) {
    if (tag) showToast()
    try {
      let res = await axios.put(obj.url, qs.stringify(obj.params))
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err.response.data)
    }
  },
  async getWithPara(obj, tag = true) {
    if (tag) showToast()
    try {
      let res = await axios({
        url: obj.url + obj.params,
        method: 'get'
      })
      res = res.data
      return responseRes(res)
    } catch (err) {
      return responseRes(err.response.data)
    }
  }
}

export default $ajax
