/**
 * @description 全局的功能函数
 */

import Vue from 'vue'
import autoImg from '@a/img/auto_app.png'
import axios from 'axios'
const vm = new Vue({})

const Tools = {
  // 根据时间戳获取日期
  getDate(t) {
    const d = new Date(t)
    const time =
      d.getFullYear() +
      '-' +
      (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
      '-' +
      (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
      ' ' +
      (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
      ':' +
      (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
      ':' +
      (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
    return time
  },
  // 根据日期获取时间撮
  getDateTime(date) {
    return new Date(date.replace(/-/g, '/'))
  },
  // 设置table滚动高度
  setScroll(id) {
    if (document.getElementById(id)) {
      return document.getElementById(id).offsetHeight - 40
    }
  },
  // 延迟处理方法
  goNext: fn => {
    setTimeout(() => {
      fn()
    }, 1200)
  },
  // 删除提示
  delTip(title = '确定删除吗?', fn) {
    vm.$Modal.confirm({
      title,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        fn()
      }
    })
  },
  // 表单回填
  fillForm(autoForm, record) {
    return autoForm.map(item => {
      var initValue
      initValue = record[item.value] || ''
      if (parseInt(record[item.value]) === 0) {
        initValue = 0
      }
      if (item.type === 'rangeTime') {
        initValue = [record.startTime, record.endTime]
      }
      if (item.type === 'checkbox') {
        initValue = Array.isArray(initValue) ? initValue : initValue.split(',')
      }
      return {
        ...item,
        initValue: initValue
      }
    })
  },
  // 获取性别
  getSex(text) {
    const sex = parseInt(text)
    if (sex === 1) {
      return '男'
    } else if (sex === 2) {
      return '女'
    } else {
      return '未知'
    }
  },
  // 加载图片错误处理
  errorImg(event, img) {
    event.target.src = img || autoImg
  },
  chooseNewFile(event, cb) {
    const file = event.target.files[0]
    const pathProd = '/usr/local/nginx/html/canpoint-site/upload_img/'
    const paramProd = new FormData()
    paramProd.append('file', file)
    paramProd.append('uploadPath', pathProd)
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    axios.post(`http://canpointlive.com:8090/file/upload-file`, paramProd, config).then(response => {
      if (response.status === 200) {
        cb(response.data.url)
      } else {
        alert('上传失败')
      }
    })
  }
}

export default Tools
