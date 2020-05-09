<template>
  <div class="device-list page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left"></div>
      <div slot="right"></div>
    </search-form>
    <table-list :page-list="pageList" :columns="controlGroupColumns" :table-list="controlGroupList">
      <template v-slot:other1="other1">
        <a-tag :color="other1.record.inOrOut == 1 ? '#87d068' : '#ccc'">{{
          other1.record.inOrOut == 1 ? '进' : '出'
        }}</a-tag>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
const searchLabel = [
  {
    value: 'userName',
    type: 'input',
    label: '人员姓名',
    placeholder: '请输入姓名'
  }
]
const controlGroupColumns = [
  {
    title: '序号',
    scopedSlots: {
      customRender: 'index'
    },
    width: '6%'
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '8%'
  },
  {
    title: '性别',
    width: '8%',
    customRender: text => {
      if (text == 1) {
        return '男'
      } else {
        return '女'
      }
    }
  },
  {
    title: '出入类型',
    width: '8%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '设备名称',
    dataIndex: 'deviceName',
    width: '15%'
  },
  {
    title: '设备位置',
    dataIndex: 'deviceSite',
    width: '15%'
  },
  {
    title: '设备IP',
    dataIndex: 'deviceIp',
    width: '10%'
  },
  {
    title: '通过时间',
    dataIndex: 'recordTime',
    width: '10%'
  },
  {
    title: '底照',
    width: '10%',
    dataIndex: 'bottomPhoto',
    scopedSlots: {
      customRender: 'photoPic'
    }
  },
  {
    title: '抓怕',
    width: '10%',
    dataIndex: 'snapPhoto',
    scopedSlots: {
      customRender: 'snapPic'
    }
  }
]
export default {
  name: 'DoorManage',
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
      formStatus: false,
      controlGroupColumns,
      searchText: {
        userName: '',
        userCode: ''
      },
      pageList: {
        page: 1,
        size: 20
      },
      controlGroupList: []
    }
  },
  async mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getRecordList']),
    async showList() {
      const res = await this.getRecordList({
        ...this.pageList,
        orgCode: this.currentOrg.orgCode,
        ...this.searchText
      })
      this.controlGroupList = res.data.list || []
      this.total = res.data.total
    },
    searchForm(values) {
      this.pageList.page = 1
      this.searchText = values
      this.showList()
    }
  }
}
</script>

<style lang="less" scoped></style>
