<template>
  <div class="device-list page-layout qui-fx-ver">
    <div class="top-btn-group">
      <a-button icon="plus" @click="addUserList(false, '新增用户')" class="add-btn">新增</a-button>
    </div>
    <submit-form ref="form" @submit-form="submit" :title="title" v-model="formUser" :form-data="formData"></submit-form>
    <table-list :page-list="pageList" :columns="accountColumns" :table-list="userList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑">
          <a-button
            @click="addUserList(true, '编辑用户', action)"
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
    <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
import SubmitForm from '@c/SubmitForm'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
const formData = [
  {
    value: 'userName',
    initValue: '',
    type: 'input',
    label: '姓名',
    placeholder: '请输入中文姓名'
  },
  {
    value: 'accountName',
    initValue: '',
    type: 'input',
    label: '账号',
    placeholder: '请输入账号'
  },
  {
    value: 'accountPwd',
    initValue: '',
    type: 'input',
    label: '账号密码',
    placeholder: '请输入密码'
  }
]
const accountColumns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    width: '20%',
    dataIndex: 'userName'
  },
  {
    title: '账号',
    width: '20%',
    dataIndex: 'accountName'
  },
  {
    title: '密码',
    width: '20%',
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
export default {
  name: 'UserManage',
  components: {
    SearchForm,
    TableList,
    PageNum,
    SubmitForm
  },
  data() {
    return {
      title: '',
      total: 0,
      formUser: false,
      formData,
      accountColumns,
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
    ...mapActions('home', ['addUserApi', 'updateUserApi', 'delUserApi', 'getUserApi']),
    // 删除账号
    async delAccountList(action) {
      await this.delUserApi({
        _id: action.record._id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showList()
      })
    },
    async showList() {
      const res = await this.getUserApi({
        ...this.pageList
      })
      this.userList = res.data.map(item => {
        return {
          ...item,
          id: item._id
        }
      })
      this.total = res.total
    },
    addUserList(type, title, item) {
      this.isEdit = type
      this.title = title
      if (type) {
        this._id = item.record._id
        this.actionFun = 'updateUserApi'
        this.formData = this.$tools.fillForm(formData, item.record)
      } else {
        this.actionFun = 'addUserApi'
        this.formData = formData
      }
      this.formUser = true
    },
    async submit(values) {
      try {
        if (this.isEdit) {
          values._id = this._id
        }
        console.log(values)
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
    }
  }
}
</script>

<style lang="less" scoped></style>
