<template>
  <div class="device-list page-layout qui-fx-ver">
    <a-drawer
      title="详情"
      :width="550"
      v-if="drawTag"
      :mask="false"
      placement="right"
      :closable="false"
      :visible="drawTag"
      @close="drawTag = false"
    >
    </a-drawer>
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
    </submit-form>
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button type="primary" icon="plus" @click="addOrgList(false, '新增机构')">新增机构</a-button>
      </div>
      <div slot="right"></div>
    </search-form>
    <table-list :page-list="pageList" :columns="orgColumns" :table-list="orgList">
      <template v-slot:other1="other1">
        <a-tag :color="other1.record.orgType === '1' ? '#f50' : '#87d068'">{{
          other1.record.orgType === '1' ? '教育局' : '学校'
        }}</a-tag>
      </template>
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="账号列表">
          <a-button @click="showDraw(action.record)" size="small" class="user-action-btn" icon="team"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="编辑">
          <a-button
            @click="addOrgList(true, '编辑机构', action.record)"
            size="small"
            class="edit-action-btn"
            icon="form"
          ></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="delOrgList(action)">
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
import SearchForm from '@c/SearchForm'
import SubmitForm from '@c/SubmitForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
const searchLabel = [
  {
    value: 'orgName',
    type: 'input',
    label: '机构名称',
    placeholder: '请输入名称'
  }
]
const formData = [
  {
    value: 'orgName',
    initValue: '',
    type: 'input',
    label: '机构名称',
    placeholder: '请输入机构名称'
  },
  {
    value: 'orgCode',
    initValue: '',
    type: 'input',
    label: '机构编码',
    placeholder: '请输入机构编码'
  },
  {
    value: 'orgAddress',
    initValue: '',
    type: 'input',
    label: '机构地址',
    placeholder: '请输入机构地址'
  },
  {
    value: 'orgType',
    initValue: '',
    list: [
      {
        key: '1',
        val: '管理局'
      },
      {
        key: '2',
        val: '学校'
      }
    ],
    type: 'radio',
    label: '机构类型',
    placeholder: '请选择机构类型'
  },
  {
    value: 'orgMark',
    initValue: '',
    list: [
      {
        key: '1',
        val: '启用'
      },
      {
        key: '2',
        val: '停用'
      }
    ],
    type: 'radio',
    label: '是否启用',
    placeholder: '请选择是否启用'
  },
  {
    value: 'orgRemark',
    initValue: '',
    required: false,
    type: 'input',
    label: '备注',
    placeholder: '请输入备注'
  }
]
const userColumns = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '机构名称',
    dataIndex: 'orgName',
    width: '15%'
  },
  {
    title: '机构编码',
    dataIndex: 'orgCode',
    width: '12%'
  },
  {
    title: '机构类型',
    width: '10%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '机构地址',
    dataIndex: 'orgAddress',
    width: '25%'
  },
  {
    title: '备注',
    dataIndex: 'orgRemark',
    width: '15%'
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
  name: 'SchoolManage',
  components: {
    SearchForm,
    TableList,
    PageNum,
    SubmitForm
  },
  computed: {
    ...mapState('home', [])
  },
  data() {
    return {
      title: '',
      total: 0,
      drawTag: false,
      searchLabel,
      formStatus: false,
      formData,
      userColumns,
      userDetail: {},
      searchText: {},
      pageList: {
        page: 1,
        size: 20
      },
      userList: []
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getUser', 'addUser', 'delUser', 'updataUser']),
    // 弹出侧边栏
    showDraw(item) {
      this.drawTag = true
      this.userDetail = item
    },
    // 展示账号列表
    async showList(item) {
      const res = await this.getUser({
        ...this.pageList,
        ...this.searchText
      })
      this.userList = res.data || []
    },
    addUserList(type, title, record) {
      this.title = title
      this.isEdit = type
      if (type) {
        this._id = record._id
        this.actionFun = 'updateUser'
        this.formData = this.$tools.fillForm(formData, record)
      } else {
        this.actionFun = 'addUser'
        this.formData = formData
      }
      this.formUser = true
    },
    // 新增修改账号
    async submitFormUser(values) {
      try {
        if (this.isEdit) {
          values._id = this._id
        }
        await this[this.actionFun]({
          ...values
        })
        this.$refs.form.reset()
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.showList()
        })
      } catch (err) {
        this.$refs.form.error()
      }
    },
    // 删除账号
    async delUserList(action) {
      await this.delUser({
        _id: action.record._id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showAccount(this.orgItem)
      })
    },
    // 查询搜索
    searchForm(values) {
      this.pageList.page = 1
      this.searchText = values
      this.showList()
    }
  }
}
</script>

<style lang="less" scoped></style>
