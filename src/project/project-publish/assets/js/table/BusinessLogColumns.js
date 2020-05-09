import Tools from '@u/tools'
const BusinessLogColumns = [
  {
    title: '序号',
    scopedSlots: {
      customRender: 'index'
    },
    width: '5%'
  }, {
    title: '姓名',
    dataIndex: 'userName',
    width: '6%'
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
    title: '设备名称',
    dataIndex: 'deviceName',
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
    width: '11%'
  },
  {
    title: '进出标识',
    dataIndex: 'inOrOut',
    width: '7%',
    customRender: (text) => {
      if (text === 1) {
        return '进'
      } else {
        return '出'
      }
    }
  },
  {
    title: '通过时间',
    dataIndex: 'recordTime',
    width: '8%',
    customRender: (text) => {
      return Tools.getDate(text)
    }
  },
  {
    title: '底库照片',
    dataIndex: 'photoSrc',
    width: '10%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '抓拍照片',
    dataIndex: 'snapSrc',
    width: '10%',
    scopedSlots: {
      customRender: 'snapPic'
    }
  },
  {
    title: '状态',
    dataIndex: 'succMark',
    width: '5%',
    customRender: (text) => {
      if (text === 1) {
        return '成功'
      } else {
        return '失败'
      }
    }
  },
  {
    title: '操作',
    key: 'action',
    width: '10%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default BusinessLogColumns
