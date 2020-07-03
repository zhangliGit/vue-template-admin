<template>
  <div class="error-list page-layout qui-fx-ver">
    <a-tabs v-model="autokey">
      <a-tab-pane key="0" tab="内网环境"> </a-tab-pane>
      <a-tab-pane key="1" tab="外网测试环境"> </a-tab-pane>
      <a-tab-pane key="2" tab="生产环境"> </a-tab-pane>
    </a-tabs>
    <div class="qui-fx-f1 qui-fx">
      <table-list :page-list="pageList" :columns="versionColumns" :table-list="versionList">
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
          <a-tag @click="publisher(action.record)" v-if="action.record.env === 1" color="#87d068">
            发布生产环境
          </a-tag>
        </template>
      </table-list>
    </div>
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
    title: '版本信息',
    width: '25%',
    dataIndex: 'des'
  },
  {
    title: '发布日期',
    width: '15%',
    scopedSlots: {
      customRender: 'other2'
    }
  },
  {
    title: '操作',
    width: '15%',
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
  watch: {
    autokey: {
      handler(n) {
        this.showList()
      },
      immediate: true
    }
  },
  computed: {
    ...mapState('home', [])
  },
  data() {
    return {
      autokey: '0',
      versionColumns,
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      versionList: []
    }
  },
  mounted() {},
  methods: {
    ...mapActions('home', ['getVersionApi', 'delVersionApi', 'publishApi']),
    getName(ip) {
      return ipList.find(item => item.ip === ip).name || '未知'
    },
    // 发布正式环境
    async publisher(item) {
      try {
        await this.publishApi({
          ...item
        })
        this.$message.success('发布成功')
        this.$tools.goNext(() => {
          this.showList()
        })
      } catch (err) {
        this.$message.warning('发布失败')
      }
    },
    async showList() {
      const res = await this.getVersionApi({
        ...this.pageList,
        env: this.autokey,
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
