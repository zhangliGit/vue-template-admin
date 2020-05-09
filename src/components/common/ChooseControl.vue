<template>
  <a-modal
    width="1200px"
    :title="title"
    v-model="status"
    @ok="submitOk"
    :maskClosable="false"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
  >
    <a-row type="flex" justify="start" style="margin-bottom: 15px;">
      <a-col>
        <span>控制组名称：</span>
        <a-input v-model="keyword" style="width: 120px;margin-right: 20px" placeholder="请输入控制组名称" />
      </a-col>
      <a-col>
        <span>控制组类型：</span>
        <a-select v-model="contorlType" style="width: 120px;margin-right: 20px">
          <a-select-option v-for="(item,i) in typeList" :key="i" :value="item.key">{{ item.val }}</a-select-option>
        </a-select>
      </a-col>
      <a-col>
        <a-button type="primary" @click="getStudentList">查询</a-button>
        <a-button type="default" @click="resetBtn">重置</a-button>
      </a-col>
    </a-row>
    <div class="choose-user qui-fx" >
      <div class="qui-fx-ver qui-fx-f1">
        <table-list
          is-check
          is-zoom
          :scroll-h="500"
          :page-list="pageList"
          v-model="chooseList"
          :columns="columns"
          @clickRow="clickRow"
          @selectAll="selectAll"
          :table-list="userList">
        </table-list>
        <page-num
          :jumper="false"
          v-model="pageList"
          :mar-top="20"
          :mar-bot="0"
          size="small"
          :total="total"
          @change-page="getStudentList"></page-num>
      </div>
      <div class="user-box qui-fx-ver">
        <div class="title qui-fx-jsb">
          <span>已选择</span>
          <span>{{ totalList.length }}个</span>
        </div>
        <div class="qui-fx-f1" style="overflow: auto">
          <ul>
            <li v-for="(item, index) in totalList" :key="item.id" class="qui-fx-jsb">
              <span>{{ item.controlGroupName }}</span>
              <a-tag @click="delUser(item.id, index)" color="#f50">删除</a-tag>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import PageNum from '@c/PageNum'
import TableList from '@c/TableList'
import $ajax from '@u/ajax-serve'
import hostEnv from '@config/host-env'
const columns = [
  {
    title: '序号',
    width: '20%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '控制组名称',
    dataIndex: 'controlGroupName',
    width: '20%'
  },
  {
    title: '控制组编码',
    dataIndex: 'controlGroupCode',
    width: '20%'
  },
  {
    title: '控制组类型',
    dataIndex: 'controlGroupType',
    width: '20%',
    customRender: (text) => {
      return text === 1 ? '进控制组' : text === 2 ? '出控制组' : '数据采集控制组'
    }
  },
  {
    title: '备注',
    dataIndex: 'photoUrl',
    width: '20%'
  }
]
export default {
  name: 'ChooseStudent',
  components: {
    PageNum,
    TableList
  },
  props: {
    isAll: {
      type: Boolean,
      default: false
    },
    schoolCode: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    isRadio: {
      type: Boolean,
      default: false
    },
    isCheck: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    status: {
      get () {
        return this.value
      },
      set () {
        this.$emit('input', false)
      }
    }
  },
  mounted () {
    this.getStudentList()
  },
  data () {
    return {
      confirmLoading: false,
      chooseList: [],
      pageList: {
        page: 1,
        size: 20
      },
      contorlType: '',
      typeList: [
        {
          key: '',
          val: '全部'
        },
        {
          key: 1,
          val: '进控制组'
        },
        {
          key: 2,
          val: '出控制组'
        },
        {
          key: 3,
          val: '数据采集控制组'
        }
      ],
      keyword: '',
      total: 0,
      columns,
      userList: [],
      totalList: []
    }
  },
  methods: {
    async getStudentList () {
      const res = await $ajax.post({
        url: `${hostEnv.wxz_control}/control/group/info/queryControlGroupInfos`,
        params: {
          controlGroupName: this.keyword,
          controlGroupType: this.contorlType,
          schoolCode: this.schoolCode,
          ...this.pageList
        }
      })
      this.userList = res.data.list
      this.total = res.data.total
    },
    reset () {
      this.confirmLoading = false
      this.$emit('input', false)
    },
    resetBtn() {
      this.keyword = ''
      this.contorlType = ''
      this.getStudentList()
    },
    error () {
      this.confirmLoading = false
    },
    delUser (id, index) {
      this.totalList.splice(index, 1)
      this.chooseList.splice(this.chooseList.indexOf(id), 1)
    },
    selectAll (item, type) {
      console.log(item)
      if (type) {
        this.totalList = this.totalList.concat(item)
      } else {
        item.forEach(item => {
          const index = this.totalList.findIndex(list => {
            return list.id === item.id
          })
          this.totalList.splice(index, 1)
        })
      }
    },
    // 监听选中或取消
    clickRow (item, type) {
      if (type) {
        this.totalList.push(item)
      } else {
        const index = this.totalList.findIndex(list => list.id === item.id)
        this.totalList.splice(index, 1)
      }
    },
    submitOk () {
      if (this.totalList.length === 0) {
        this.$message.warning('请选择控制组')
        return
      }
      this.confirmLoading = true
      this.$emit('submit', this.totalList)
      this.reset()
    }
  }
}
</script>

<style lang="less" scoped>
.choose-user {
  height: 600px;
  .org-box {
    width: 200px
  }
  .user-box {
    border: 1px #f5f5f5 solid;
    margin-left: 15px;
    width: 200px;
    .title {
      padding: 0 10px;
      background-color:#f5f5f5;
      height: 41px;
      line-height: 41px;
      border-bottom: 1px #f5f5f5 solid
    }
    li {
      border-bottom: 1px #f5f5f5 solid;
      padding: 6px 0px 6px 8px;
    }
  }
}
</style>
