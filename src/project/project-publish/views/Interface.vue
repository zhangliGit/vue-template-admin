<template>
  <div class="error-list page-layout qui-fx-ver">
    <table-list :page-list="pageList" :columns="errorColumns" :table-list="errorList"> </table-list>
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
const errorColumns = [
  {
    title: '序号',
    width: '6%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '接口路径',
    dataIndex: 'url',
    width: '20%'
  },
  {
    title: '参数',
    dataIndex: 'params',
    width: '15%'
  },
  {
    title: '错误信息',
    width: '14%',
    dataIndex: 'message'
  },
  {
    title: '访问人',
    width: '10%',
    dataIndex: 'userName'
  },
  {
    title: '机构名称',
    dataIndex: 'schoolName',
    width: '15%'
  },
  {
    title: '机构编码',
    dataIndex: 'schoolCode',
    width: '10%'
  },
  {
    title: '访问日期',
    dataIndex: 'createTime',
    width: '10%'
  }
]
export default {
  name: 'SchoolManage',
  components: {
    TableList,
    PageNum
  },
  computed: {
    ...mapState('home', [])
  },
  data() {
    return {
      errorColumns,
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      errorList: []
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getErrorApi']),
    async showList() {
      const res = await this.getErrorApi({
        ...this.pageList
      })
      this.errorList = res.data
      this.total = res.total
    },
    searchForm(values) {
      this.pageList.page = 1
      this.showList()
    }
  }
}
</script>

<style lang="less" scoped></style>
