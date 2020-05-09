<template>
  <div class="device-list page-layout qui-fx-ver">
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel"></search-form>
    <table-list :page-list="pageList" :columns="totalColumns" :table-list="totalList">
      <template v-slot:other1="other1">{{ other1.record.statisticTime.substr(0, 7) }}</template>
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
import SearchForm from '@c/SearchForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
const searchLabel = [
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
    title: '统计日期',
    width: '30%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '进人数',
    width: '30%',
    scopedSlots: {
      customRender: 'other2'
    }
  },
  {
    title: '出人数',
    width: '30%',
    scopedSlots: {
      customRender: 'other3'
    }
  }
]
export default {
  name: 'DayTotal',
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
    ...mapActions('home', ['queryMonth']),
    async showList() {
      const res = await this.queryMonth({
        orgCode: this.currentOrg.orgCode,
        ...this.pageList,
        ...this.searchText
      })
      this.totalList = res.data.list
      this.total = res.data.total
    },
    searchForm(values) {
      this.pageList.page = 1
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
