<template>
  <div class="error-list page-layout qui-fx-ver">
    <a-drawer
      @close="detailTag = false"
      width="400"
      title="详情"
      placement="right"
      :closable="false"
      :visible="detailTag"
    >
      <div style="line-height: 25px">
        <div>参数:</div>
        <div>
          {{ detailInfo.params }}
        </div>
        <div>访问人姓名：{{ detailInfo.userName }}</div>
        <div>机构编码：{{ detailInfo.schoolCode }}</div>
      </div>
    </a-drawer>
    <table-list :page-list="pageList" :columns="errorColumns" :table-list="errorList">
      <template v-slot:other1="other1">
        <a-tag :color="other1.record.platform === 1 ? '#2db7f5' : '#87d068'">
          {{ other1.record.platform === 1 ? '移动端' : 'pc端' }}
        </a-tag>
      </template>
      <template v-slot:other2="other2">
        {{ $tools.getDate(other2.record.createTime) }}
      </template>
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="详情">
          <a-button size="small" class="detail-action-btn" icon="ellipsis" @click="goDetail(action.record)"></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del(action.record)">
          <template slot="title">
            您确定删除吗?
          </template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
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
    width: '5%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '接口路径',
    dataIndex: 'url',
    width: '25%'
  },
  {
    title: '平台',
    width: '10%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '错误信息',
    width: '25%',
    dataIndex: 'message'
  },
  {
    title: '机构名称',
    dataIndex: 'schoolName',
    width: '15%'
  },
  {
    title: '访问日期',
    width: '10%',
    scopedSlots: {
      customRender: 'other2'
    }
  },
  {
    title: '操作',
    width: '10%',
    scopedSlots: {
      customRender: 'action'
    }
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
      detailInfo: {},
      detailTag: false,
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
    ...mapActions('home', ['getErrorApi', 'updateErrorApi']),
    goDetail(item) {
      this.detailTag = true
      this.detailInfo = item
    },
    async showList() {
      const res = await this.getErrorApi({
        ...this.pageList,
        status: 0
      })
      this.errorList = res.data
      this.total = res.total
    },
    async del(item) {
      await this.updateErrorApi({
        _id: item._id,
        status: 1
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showList()
      })
    },
    searchForm(values) {
      this.pageList.page = 1
      this.showList()
    }
  }
}
</script>

<style lang="less" scoped></style>
