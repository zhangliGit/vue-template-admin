<template>
  <div class="error-list page-layout qui-fx-ver">
    <search-form @search-form="searchForm" :search-label="searchLabel"> </search-form>
    <table-list :page-list="pageList" :columns="cardColumns" :table-list="cardList">
      <template v-slot:other1="other1">{{ $tools.getDate(other1.record.createTime) }}</template>
      <template v-slot:actions="action">
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del(action.record)">
          <template slot="title">您确定删除吗?</template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
        <a-tag color="#6882da" @click="updateApp(action.record)">更新版本</a-tag>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/TableList'
import SearchForm from '@c/SearchForm'
import PageNum from '@c/PageNum'
const searchLabel = [
  {
    value: 'schoolCode', // 表单属性
    type: 'input', // 表单类型
    label: '学校编码', // 表单label值
    placeholder: '请输入学校编码' // 表单默认值(非必选字段)
  }
]
const cardColumns = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '班牌名称',
    width: '12%',
    dataIndex: 'deviceName'
  },
  {
    title: '班牌SN',
    width: '15%',
    dataIndex: 'deviceSn'
  },
  {
    title: '班牌IP',
    width: '15%',
    dataIndex: 'deviceIp'
  },
  {
    title: '学校编码',
    dataIndex: 'schoolCode',
    width: '15%'
  },
  {
    title: '上线时间',
    width: '15%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '操作',
    width: '20%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: 'OnLine',
  components: {
    TableList,
    PageNum,
    SearchForm
  },
  computed: {},
  data() {
    return {
      searchLabel,
      isSchool: false,
      pageList: {
        page: 1,
        size: 20
      },
      cardColumns,
      total: 0,
      cardList: [],
      wsServer: null
    }
  },
  mounted() {
    this.wsServer = new WebSocket('ws://112.125.89.37:8099')
    this.wsServer.onopen = function() {
      console.log('已连接')
    }
    this.showList()
  },
  beforeDestroy() {
    this.wsServer = null
  },
  methods: {
    ...mapActions('home', ['getOnLineCard', 'delOnLineCard']),
    searchForm(values) {
      this.pageList.page = 1
      if (!values.schoolCode) {
        values = {}
      }
      this.showList(values)
    },
    async showList() {
      const res = await this.getOnLineCard({
        ...this.pageList
      })
      this.cardList = res.data.map(item => {
        return {
          ...item,
          id: item._id
        }
      })
      this.total = res.total
    },
    updateApp(item) {
      const data = {
        type: 'update-one',
        deviceSn: item.deviceSn
      }
      this.wsServer.send(JSON.stringify(data))
    },
    async del(item) {
      try {
        console.log(item)
        await this.delOnLineCard({
          _id: item._id
        })
        this.$message.success('删除成功')
        this.$tools.goNext(() => {
          this.showList()
        })
      } catch (err) {}
    }
  }
}
</script>

<style lang="less" scoped></style>
