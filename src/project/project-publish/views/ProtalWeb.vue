<template>
  <div class="error-list page-layout qui-fx-ver">
    <table-list :page-list="pageList" :columns="versionColumns" :table-list="versionList">
      <template v-slot:other1="other1">
        <a-tag :color="other1.record.env === 2 ? '#87d068' : '#ccc'">
          {{ other1.record.env === 1 ? '测试环境' : '生产环境' }}
        </a-tag>
      </template>
      <template v-slot:other2="other2">
        {{ $tools.getDate(other2.record.createTime) }}
      </template>
      <template v-slot:other3="other3">
        {{ getName(other3.record.ip) }}
      </template>
      <template v-slot:actions="action">
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
import ipList from '../assets/js/ip.js'
const versionColumns = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '发布者',
    width: '12%',
    scopedSlots: {
      customRender: 'other3'
    }
  },
  {
    title: 'IP',
    width: '10%',
    dataIndex: 'ip'
  },
  {
    title: '系统名称',
    dataIndex: 'system',
    width: '15%'
  },
  {
    title: '发布环境',
    width: '15%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '版本信息',
    width: '20%',
    dataIndex: 'des'
  },
  {
    title: '发布日期',
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
  name: 'ProtalWeb',
  components: {
    TableList,
    PageNum
  },
  computed: {
    ...mapState('home', [])
  },
  data() {
    return {
      versionColumns,
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      versionList: []
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getVersionApi', 'delVersionApi']),
    getName(ip) {
      return ipList.find(item => item.ip === ip).name || '未知'
    },
    async showList() {
      const res = await this.getVersionApi({
        ...this.pageList,
        platform: 2
      })
      this.versionList = res.data.map(item => {
        return {
          ...item,
          id: item._id
        }
      })
      this.total = res.total
    },
    searchForm(values) {
      this.pageList.page = 1
      this.showList()
    },
    async del(item) {
      try {
        await this.delVersionApi({
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
