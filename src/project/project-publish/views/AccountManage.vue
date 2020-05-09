<template>
  <div class="device-list page-layout qui-fx-ver">
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
    </submit-form>
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button type="primary" icon="plus" @click="addAccountList(false, '新增账号')">新增账号</a-button>
      </div>
      <div slot="right">
      </div>
    </search-form>
    <table-list
      :page-list="pageList"
      :columns="accountColumns"
      :table-list="accountList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑">
          <a-button @click="addAccountList(true, '编辑账号', action.record)" size="small" class="edit-action-btn" icon="form"></a-button>
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
    value: 'accountCode',
    initValue: '',
    type: 'input',
    label: '账号编码',
    placeholder: '请输入账号编码'
  },
  {
    value: 'accountName',
    initValue: '',
    type: 'input',
    label: '账号名称',
    placeholder: '请输入账号名称'
  },
  {
    value: 'orgCode',
    initValue: [],
    list: [],
    type: 'select',
    label: '所属机构',
    placeholder: '请选择机构'
  },
  {
    value: 'accountRemark',
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
		width: '10%',
		scopedSlots: {
			customRender: 'index'
		}
	},
	{
		title: '账号编码',
		dataIndex: 'accountCode',
		width: '15%'
	},
	{
		title: '账号名称',
		dataIndex: 'accountName',
		width: '15%'
  },
  {
		title: '账号密码',
		dataIndex: 'accountPwd',
		width: '15%'
  },
  {
		title: '所属机构',
		dataIndex: 'orgName',
		width: '15%'
  },
	{
		title: '操作',
		width: '20%',
		scopedSlots: {
			customRender: 'action'
		}
	}
]
export default {
  name: 'AccountManage',
  components: {
    SearchForm,
    TableList,
    PageNum,
    SubmitForm
  },
  computed: {
    ...mapState('home', [
    ])
  },
  data () {
    return {
      title: '',
      total: 0,
      searchLabel,
      formStatus: false,
      formData,
      accountColumns,
      searchText: {
        orgName: '',
      },
      pageList: {
        page: 1,
        size: 20
      },
      accountList: []
    }
  },
  mounted () {
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'addAccount',
      'delAccount',
      'updateAccount',
      'getAccountList'
    ]),
    async showList () {
      const res = await this.getAccountList({
        ...this.pageList,
        ...this.searchText
      })
      this.accountList = res.data.list
      this.total = res.data.total
    },
    addAccountList (type, title, record) {
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
    async submitForm (values) {
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
    async delAccountList (action) {
      await this.delAccount({
        id: action.record.id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showList()
      })
    },
    searchForm (values) {
			this.pageList.page = 1
      this.searchText = values
      this.showList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
