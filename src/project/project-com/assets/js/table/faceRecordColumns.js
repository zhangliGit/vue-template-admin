import Tools from '@u/tools'
const faceRecordColumns = [
  {
    title: '序号',
    scopedSlots: {
      customRender: 'index'
    },
    width: '5%'
  }, {
    title: '姓名',
    dataIndex: 'userName',
    width: '5%'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: '5%',
    customRender: (text) => {
      return Tools.getSex(text)
    }
  },
  {
    title: '人员类型',
    dataIndex: 'personType',
    width: '8%',
    customRender: (text) => {
      if (text === '1') {
        return '超级管理员'
      } else if (text === '2') {
        return '管理员'
      } else if (text === '') {
        return '学生'
      } else if (text === '4') {
        return '教职工'
      } else if (text === '16') {
        return '家长'
      } else if (text === '32') {
        return '访客'
      } else {
        return '陌生人'
      }
    }
  },
  {
    title: '进出标识',
    dataIndex: 'inOrOut',
    width: '6%',
    customRender: (text) => {
      if (text === 1) {
        return '进'
      } else {
        return '出'
      }
    }
  },
  {
    title: '记录类型',
    dataIndex: 'recordType',
    width: '6%',
    customRender: (text) => {
      if (text === 1) {
        return '识别服务'
      } else {
        return '面板及'
      }
    }
  },
  {
    title: '设备名称',
    dataIndex: 'deviceName',
    width: '8%'
  },
  {
    title: 'IP地址',
    dataIndex: 'ipAddress',
    width: '7%'
  },
  {
    title: '抓拍位置',
    dataIndex: 'snapSite',
    width: '8%'
  },
  {
    title: '控制组',
    dataIndex: 'controlGroupName',
    width: '8%'
  },
  {
    title: '通过时间',
    dataIndex: 'recordTime',
    width: '10%',
    customRender: (text) => {
      return Tools.getDate(text)
    }
  },
  {
    title: '底库照片',
    dataIndex: 'photoSrc',
    width: '12%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '抓拍照片',
    dataIndex: 'snapSrc',
    width: '12%',
    scopedSlots: {
      customRender: 'snapPic'
    }
  }
]
export default faceRecordColumns
