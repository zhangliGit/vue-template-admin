<template>
  <div class="device-list page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-tooltip>
          <template slot="title">
            导出前请先进行搜索操作，然后在导出所需要的结果~
          </template>
          <a-button icon="export" class="export-all-btn" @click="exportFile">导出</a-button>
        </a-tooltip>
      </div>
    </search-form>
    <table-list :page-list="pageList" :columns="totalColumns" :table-list="totalList">
      <template v-slot:other2="other2">
        <a-tag color="#87d068">{{ parseInt(other2.record.inNum) }}</a-tag>
      </template>
      <template v-slot:other3="other3">
        <a-tag color="#ccc">{{ parseInt(other3.record.outNum) }}</a-tag>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import hostEnv from '@config/host-env'
import $tools from '@u/tools'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
const searchLabel = [
  {
    value: 'userName', // 表单属性
    type: 'input', // 表单类型
    label: '姓名', // 表单label值
    placeholder: '请输入姓名' // 表单默认值(非必选字段)
  },
  {
    value: 'rangeTime', // 日期区间
    type: 'rangeTime',
    label: '统计日期'
  }
]
const totalColumns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '20%'
  },
  {
    title: '统计时间',
    dataIndex: 'statisticTime',
    width: '30%',
    customRender: text => {
      return $tools.getDate(text)
    }
  },
  {
    title: '进次数',
    width: '20%',
    scopedSlots: {
      customRender: 'other2'
    }
  },
  {
    title: '出次数',
    width: '20%',
    scopedSlots: {
      customRender: 'other3'
    }
  }
]
export default {
  name: 'UserTotal',
  components: {
    SearchForm,
    TableList,
    PageNum
  },
  computed: {
    ...mapState('home', ['currentOrg'])
  },
  data() {
    return {
      title: '',
      total: 0,
      searchLabel,
      totalColumns,
      searchText: {
        userName: '',
        startTime: this.$tools.getDate(new Date().getTime()).substr(0, 10),
        endTime: this.$tools.getDate(new Date().getTime()).substr(0, 10)
      },
      pageList: {
        page: 1,
        size: 20
      },
      totalList: []
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['queryUser']),
    exportFile() {
      const { startTime, endTime } = this.searchText
      const orgCode = this.currentOrg.orgCode
      const url = `${hostEnv.wxz_guiyang}/statistic/info/exportUserStatisticInfos?&startTime=${startTime}&endTime=${endTime}&orgCode=${orgCode}`
      console.log(url)
      window.open(url)
    },
    async showList() {
      const res = await this.queryUser({
        orgCode: this.currentOrg.orgCode,
        ...this.pageList,
        ...this.searchText
      })
      this.totalList = res.data.list
      this.total = res.data.total
    },
    searchForm(values) {
      this.pageList.page = 1
      this.searchText.userName = values.userName
      if (values.rangeTime) {
        this.searchText.startTime = values.rangeTime[0]
        this.searchText.endTime = values.rangeTime[1]
      } else {
        const time = this.$tools.getDate(new Date().getTime()).substr(0, 10)
        this.searchText.startTime = time
        this.searchText.endTime = time
      }
      this.showList()
    }
  }
}
</script>

<style lang="less" scoped></style>
