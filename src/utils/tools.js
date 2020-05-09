/**
 * @description 全局的功能函数
 */

import Vue from 'vue'
import autoImg from '@a/img/auto_app.png'
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
  // 审批状态
  getState(text) {
    if (text === '0') {
      return '待审批'
    } else if (text === '1') {
      return '审批通过'
    } else if (text === '2') {
      return '审批不通过'
    } else if (text === '3') {
      return '撤销'
    } else if (text === '4') {
      return '失效'
    }
  },
  // 加载图片错误处理
  errorImg(event, img) {
    event.target.src = img || autoImg
  },
  // 控制组类型
  controlTypeName(type) {
    let name
    switch (parseInt(type)) {
      case 1:
        name = '进控制组'
        break
      case 2:
        name = '出控制组'
        break
      case 3:
        name = '数据采集控制组'
        break
      default:
        name = '暂无类型'
        break
    }
    return name
  },
  // 设备组类型
  deviceTypeName(type) {
    let name
    switch (parseInt(type)) {
      case 1:
        name = '相机'
        break
      case 2:
        name = '面板机'
        break
      case 3:
        name = '其他'
        break
      default:
        name = '其他'
        break
    }
    return name
  },
  // 业务类型类型
  busTypeName(type) {
    let name
    switch (parseInt(type)) {
      case 1:
        name = '数据回写'
        break
      case 2:
        name = '数据效验'
        break
      default:
        name = '其他'
        break
    }
    return name
  }
}

export default Tools