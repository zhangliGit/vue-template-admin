<template>
  <div class="error-list page-layout qui-fx-ver">
    <table-list :columns="cardColumns" :table-list="deveceList">
      <template v-slot:other1="other1">{{ $tools.getDate(other1.record.dateTime) }}</template>
      <template v-slot:other2="other2">
        <a-tag :color="other2.record.deviceStatus === 'ReportOffline' ? '#ccc' : 'green'">
          {{
          other2.record.deviceStatus === 'ReportOffline' ? '离线' : '在线'
          }}
        </a-tag>
      </template>
      <template v-slot:actions="action">
        <a-tag color="#6882da" @click="sendMqtt(action.record)">发布消息</a-tag>
      </template>
    </table-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
import PageNum from '@c/PageNum'
import mqtt from 'mqtt'
const options = {
  connectTimeout: 40000,
  clientId: 'mqtitId-Home',
  username: 'canpoint_mqtt',
  password: 'canpoint2020',
  clean: true
}
const client = mqtt.connect('ws://47.111.232.85:8083/mqtt', options)
const cardColumns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '班牌SN',
    width: '20%',
    dataIndex: 'deviceSn'
  },
  {
    title: '设备状态',
    width: '20%',
    scopedSlots: {
      customRender: 'other2'
    }
  },
  {
    title: '状态变化时间',
    width: '20%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '操作',
    width: '30%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'Home',
  components: {
    TableList,
    PageNum,
    SearchForm
  },
  computed: {},
  data() {
    return {
      pageList: {
        page: 1,
        size: 20
      },
      cardColumns,
      deveceList: []
    }
  },
  mounted() {
    this.mqttMSG()
  },
  beforeDestroy() {
    this.wsServer = null
  },
  methods: {
    ...mapActions('home', ['getOnLineCard', 'delOnLineCard']),
    /**
     * @description 发送指令
     */
    sendMqtt(item) {
      client.publish(`Device/Commands/${item.deviceSn}`, '我是客户端消息', { qos: 1, retain: false })
    },
    mqttMSG() {
      // mqtt连接
      client.on('connect', e => {
        console.log('连接成功:')
        /**
         * @description 订阅主题
         */
        client.subscribe('Device/ReportState/4cedfb743cf89696', { qos: 1 }, error => {
          if (!error) {
            console.log('订阅成功')
          } else {
            console.log('订阅失败')
          }
        })
      })
      // 接收消息处理
      client.on('message', (topic, message) => {
        const msg = JSON.parse(message.toString())
        this.showDevice({
          id: msg.content.deviceSn,
          deviceSn: msg.content.deviceSn,
          dateTime: msg.dateTime,
          deviceStatus: msg.contentType,
          topic: topic
        })
      })
      // 断开发起重连
      client.on('reconnect', error => {
        console.log('正在重连:', error)
      })
      // 链接异常处理
      client.on('error', error => {
        console.log('连接失败:', error)
      })
    },
    async showDevice(item) {
      const currentD = this.deveceList.filter(_item => {
        return item.deviceSn === _item.deviceSn
      })
      if (currentD.length === 0) {
        this.deveceList.unshift(item)
      } else {
        currentD[0].deviceStatus = item.deviceStatus
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
