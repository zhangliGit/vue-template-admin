<template>
  <div class="device-list page-layout qui-fx-ver">
    <a-drawer
      :title="orgTitle"
      :width="550"
      v-if="userTag"
      :mask="false"
      placement="right"
      :closable="false"
      :visible="userTag"
      @close="userTag = false"
    >
      <div style="height: 700px" class="qui-fx">
        <table-list :scroll-h="600" :columns="accountColumns" :table-list="accountList">
          <template v-slot:actions="action">
            <a-tooltip placement="topLeft" title="编辑">
              <a-button
                @click="addAccountList(true, '编辑账号', action.record)"
                size="small"
                class="edit-action-btn"
                icon="form"
              ></a-button>
            </a-tooltip>
            <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="delAccountList(action)">
              <template slot="title">
                您确定删除吗?
              </template>
              <a-tooltip placement="topLeft" title="删除">
                <a-button size="small" class="del-action-btn" icon="delete"></a-button>
              </a-tooltip>
            </a-popconfirm>
          </template>
        </table-list>
      </div>
      <div
        :style="{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          borderTop: '1px #f5f5f5 solid',
          padding: '10px 60px',
          textAlign: 'center',
          zIndex: 1
        }"
      >
        <a-button style="width: 200px; height: 40px; line-height: 40px; background: #ccc" @click="userTag = false">
          关闭
        </a-button>
      </div>
      <div
        :style="{
          width: '150px',
          position: 'absolute',
          right: 0,
          top: '2px',
          padding: '10px 40px',
          textAlign: 'center',
          zIndex: 1
        }"
      >
        <a-button type="primary" @click="addAccountList(false, '新增账号')">
          新增账号
        </a-button>
      </div>
    </a-drawer>
    <submit-form
      ref="user"
      @submit-form="submitFormUser"
      :title="titleUser"
      v-model="formUser"
      :form-data="formDataUser"
    ></submit-form>
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
const formDataUser = [
  {
    value: 'accountName',
    initValue: '',
    type: 'input',
    label: '账号名称',
    placeholder: '请输入账号名称'
  },
  {
    value: 'accountPwd',
    initValue: '',
    type: 'input',
    label: '账号密码',
    placeholder: '请输入账号密码'
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
const accountColumns = [
  {
    title: '序号',
    width: '15%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '账号名称',
    width: '30%',
    dataIndex: 'accountName'
  },
  {
    title: '账号密码',
    width: '25%',
    dataIndex: 'accountPwd'
  },
  {
    title: '操作',
    width: '30%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
const orgColumns = [
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
      orgTitle: '',
      userTag: false,
      title: '',
      titleUser: '',
      total: 0,
      searchLabel,
      formStatus: false,
      formUser: false,
      formData,
      formDataUser,
      orgColumns,
      accountColumns,
      searchText: {
        orgName: ''
      },
      pageList: {
        page: 1,
        size: 20
      },
      orgList: [],
      accountList: []
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'addOrg',
      'delOrg',
      'updateOrg',
      'getOrgList',
      'addAccount',
      'getAccountList',
      'delAccount',
      'updateAccount'
    ]),
    // 弹出侧边栏
    showDraw(item) {
      this.userTag = true
      this.orgItem = item
      this.orgTitle = item.orgName + '账号列表'
      this.showAccount(item)
    },
    // 展示账号列表
    async showAccount(item) {
      const res = await this.getAccountList({
        page: 1,
        size: 40,
        orgCode: item.orgCode
      })
      this.accountList = res.data.list || []
    },
    addAccountList(type, title, record) {
      this.titleUser = title
      this.userEdit = type
      if (type) {
        this.userId = record.id
        this.actionFun = 'updateAccount'
        this.formDataUser = this.$tools.fillForm(formDataUser, record)
      } else {
        this.actionFun = 'addAccount'
        this.formDataUser = formDataUser
      }
      this.formUser = true
    },
    // 新增修改账号
    async submitFormUser(values) {
      try {
        if (this.userEdit) {
          values.id = this.userId
        }
        await this[this.actionFun]({
          ...values,
          accountRemark: '',
          orgCode: this.orgItem.orgCode
        })
        this.$refs.user.reset()
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.showAccount(this.orgItem)
        })
      } catch (err) {
        this.$refs.user.error()
      }
    },
    // 删除账号
    async delAccountList(action) {
      await this.delAccount({
        id: action.record.id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showAccount(this.orgItem)
      })
    },
    async showList() {
      const res = await this.getOrgList({
        ...this.pageList,
        ...this.searchText
      })
      this.orgList = res.data.list
      this.total = res.data.total
    },
    addOrgList(type, title, record) {
      this.title = title
      this.isEdit = type
      if (type) {
        this.id = record.id
        this.actionFun = 'updateOrg'
        this.formData = this.$tools.fillForm(formData, record)
        console.log(this.formData)
      } else {
        this.actionFun = 'addOrg'
        this.formData = formData
      }
      this.formStatus = true
    },
    async submitForm(values) {
      try {
        if (this.isEdit) {
          values.id = this.id
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
    async delOrgList(action) {
      await this.delOrg({
        id: action.record.id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showList()
      })
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
