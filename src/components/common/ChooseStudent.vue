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
    <a-row type="flex" justify="end" style="margin-bottom: 15px; margin-right: 215px">
      <a-col>
        <span>姓名/学号：</span>
        <a-input v-model="keyword" style="width: 120px;margin-right: 10px" placeholder="请输入关键字" />
        <a-button type="primary" @click="getStudentList(false)">查询</a-button>
      </a-col>
    </a-row>
    <div class="choose-user qui-fx" >
      <grade-tree @select="select"></grade-tree>
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
          @change-page="getStudentList(false)"></page-num>
      </div>
      <div class="user-box qui-fx-ver">
        <div class="title qui-fx-jsb">
          <span>已选择</span>
          <span>{{ totalList.length }}人</span>
        </div>
        <div class="qui-fx-f1" style="overflow: auto">
          <ul>
            <li v-for="(item, index) in totalList" :key="item.id" class="qui-fx-jsb">
              <span>{{ item.userName }}</span>
              <a-tag @click="delUser(item.id, index)" color="#f50">删除</a-tag>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import PageNum from './PageNum'
import TableList from './TableList'
import $ajax from '@u/ajax-serve'
import { mapState } from 'vuex'
import GradeTree from './GradeTree'
import hostEnv from '@config/host-env'
const columns = [
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
    title: '性别',
    dataIndex: 'sex',
    width: '15%',
    customRender: (text) => {
      return parseInt(text) === 1 ? '男' : '女'
    }
  },
  {
    title: '学号',
    dataIndex: 'workNo',
    width: '20%'
  },
  {
    title: '照片',
    dataIndex: 'photoUrl',
    width: '30%',
    scopedSlots: {
      customRender: 'photoPic'
    }
  }
]
export default {
  name: 'ChooseStudent',
  components: {
    PageNum,
    TableList,
    GradeTree
  },
  props: {
    bindObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    chooseType: {
      type: String,
      default: ''
    },
    isAll: {
      type: Boolean,
      default: false
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
    ...mapState('home', [
      'schoolCode'
    ]),
    status: {
      get () {
        return this.value
      },
      set () {
        this.$emit('input', false)
      }
    }
  },
  async mounted () {
    if (this.chooseType === 'attendance') {
      const res = await $ajax.get({
        url: `${hostEnv.lz_attendance}/attendance/group/bind/user/query`,
        params: {
          attendanceUserId: this.bindObj.id
        }
      })
      const users = res.data
      users.forEach(item => {
        this.chooseList.push(item.userCode)
        this.totalList.push({
          id: item.userCode,
          userCode: item.userCode,
          userName: item.userName
        })
      })
      this.getStudentList(true)
    } else if (this.chooseType === 'door') {
      const res = await $ajax.post({
        url: `${hostEnv.zx_door}/setting/rule/user/list`,
        params: {
          pageNum: 1,
          pageSize: 500,
          ruleGroupCode: this.bindObj.ruleGroupCode,
          schoolCode: this.bindObj.schoolCode,
          userGroupCode: this.bindObj.userGroupCode
        }
      })
      const users = res.data.list
      users.forEach(item => {
        this.chooseList.push(item.userCode)
        this.totalList.push({
          id: item.id,
          userCode: item.userCode,
          userName: item.userName
        })
      })
      this.getStudentList(true)
    } else {
      this.getStudentList()
    }
  },
  data () {
    return {
      confirmLoading: false,
      chooseList: [],
      pageList: {
        page: 1,
        size: 20
      },
      keyword: '',
      total: 0,
      columns,
      userList: [],
      totalList: []
    }
  },
  methods: {
    async select (obj) {
      this.treeObj = obj
      if (this.chooseType) {
        this.getStudentList(true)
      } else {
        this.getStudentList(false)
      }
    },
    async getStudentList (type = false) {
      const res = await $ajax.post({
        url: `${hostEnv.lz_user_center}/userinfo/student/user/queryStudentInfoList`,
        params: {
          keyword: this.keyword,
          schoolCode: this.schoolCode,
          gradeId: this.treeObj.gradeCode,
          classId: this.treeObj.classCode,
          schoolYearId: this.treeObj.schoolYearId,
          ...this.pageList
        }
      })
      this.userList = res.data.list.map(item => {
        return {
          ...item,
          id: type ? item.userCode : item.id
        }
      })
      this.total = res.data.total
    },
    reset () {
      this.confirmLoading = false
      this.$emit('input', false)
    },
    error () {
      this.confirmLoading = false
    },
    delUser (id, index) {
      this.totalList.splice(index, 1)
      this.chooseList.splice(this.chooseList.indexOf(id), 1)
    },
    selectAll (item, type) {
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
        this.totalList.push({
          id: item.id,
          userCode: item.userCode,
          userName: item.userName
        })
      } else {
        const index = this.totalList.findIndex(list => list.id === item.id)
        this.totalList.splice(index, 1)
      }
    },
    submitOk () {
      if (this.totalList.length === 0 && this.bindId === -1) {
        this.$message.warning('请选择人员')
        return
      }
      this.confirmLoading = true
      this.$emit('submit', this.totalList)
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
