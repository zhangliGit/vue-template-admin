import Tools from '@u/tools'
const deviceColumns = [
  {
    title: '序号',
    scopedSlots: {
      customRender: 'index'
    },
    width: '8%'
  }, {
    title: '设备名称',
    dataIndex: 'deviceName',
    width: '12%'
  },
  {
    title: '设备类型',
    dataIndex: 'deviceType',
    width: '10%',
    customRender: (text) => {
      return Tools.deviceTypeName(text)
    }
  },
  {
    title: '设备SN码',
    dataIndex: 'deviceSn',
    width: '10%'
  },
  {
    title: 'IP地址',
    dataIndex: 'deviceIp',
    width: '10%'
  },
  {
    title: '安装位置',
    dataIndex: 'snapSite',
    width: '10%'
  },
  {
    title: '状态',
    dataIndex: 'deviceStatus',
    width: '10%',
    customRender: (text) => {
      return text === 1 ? '在线' : '离线'
    }
  },
  {
    title: '是否属于设备组',
    dataIndex: 'bindStatus',
    width: '15%',
    customRender: (text) => {
      return text === 1 ? '是' : '否'
    }
  },
  {
    title: '操作',
    key: 'action',
    width: '15%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default deviceColumns
