<template>
  <div class="device-list page-layout qui-fx-ver">
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
      <div slot="upload">
        <img v-if="baseImg" :src="baseImg" alt="" style="width: 120px; height: 140px; display: block">
        <div v-if="!baseImg" class="file-upload" style="margin-top: 6px">
          上传图片
          <input
            type="file"
            id="image"
            @change="toBase64()"
            accept="image/jpeg,image/png,image/jpg">
        </div>
      </div>
    </submit-form>
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button type="primary" icon="plus" @click="addControlGroup(false, '新增人员')">新增人员</a-button>
      </div>
      <div slot="right">
      </div>
    </search-form>
    <table-list
      :page-list="pageList"
      :columns="controlGroupColumns"
      :table-list="controlGroupList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑">
          <a-button @click="addControlGroup(true, '编辑人员', action.record)" size="small" class="edit-action-btn" icon="form"></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="delControlList(action)">
          <template slot="title">
            您确定删除吗?
          </template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SearchForm from '@c/SearchForm'
import SubmitForm from '@c/SubmitForm'
import TableList from '@c/TableList'
import UploadFile from "@c/UploadFile"
import PageNum from '@c/PageNum'
const searchLabel = [
  {
    value: 'userName',
    type: 'input',
    label: '人员名称',
    placeholder: '请输入名称'
  },
  {
    value: 'userCode',
    type: 'input',
    label: '人员编码',
    placeholder: '请输入编码'
  },
]
const formData = [
  {
    value: 'userName',
    initValue: '',
    type: 'input',
    label: '人员名称',
    placeholder: '请输入人员名称'
  },
  {
    value: 'userCode',
    initValue: '',
    type: 'input',
    label: '人员编码',
    placeholder: '请输入人员编码'
  },
  {
		value: 'gender',
		initValue: '',
		list: [
		{
				key: '1',
				val: '男'
		},
		{
				key: '2',
				val: '女'
		}
		],
		type: 'radio',
		label: '性别',
		placeholder: '请选择性别'
	},
  {
    value: 'homeAddress',
    initValue: '',
    type: 'input',
    label: '家庭住址',
    placeholder: '请输入家庭住址'
  },
  {
    value: 'phone',
    initValue: '',
    type: 'input',
    label: '电话号码',
    placeholder: '请输入电话号码',
    regular: 'phone'
  },
  {
    value: 'identityNo',
    initValue: '',
    type: 'input',
    label: '身份证号',
    placeholder: '请输入身份证号'
  },
  {
    value: 'cardNo',
    initValue: '',
    type: 'input',
    label: '卡号',
    placeholder: '请输入卡号'
  },
  {
    type: "upload",
    label: "上传底照",
    required: false
  }
]
const controlGroupColumns = [{
  title: '序号',
  scopedSlots: {
    customRender: 'index'
  },
  width: '6%'
}, {
  title: '姓名',
  dataIndex: 'userName',
  width: '10%'
}, {
  title: '编码',
  dataIndex: 'userCode',
  width: '10%'
},{
  title: '性别',
  dataIndex: 'gender',
  width: '10%',
  customRender: (text) => {
    if (text == 1) {
      return '男'
    } else {
      return '女'
    }
  }
},
{
  title: '家庭地址',
  dataIndex: 'homeAddress',
  width: '12%',
},
{
  title: '电话号码',
  dataIndex: 'phone',
  width: '10%',
},
{
  title: '身份证号',
  dataIndex: 'identityNo',
  width: '10%',
},
{
  title: '卡号',
  dataIndex: 'cardNo',
  width: '10%',
},
{
   title: '底照',
   width: '10%',
   dataIndex: 'bottomPhoto',
   scopedSlots: {
     customRender: 'photoPic'
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
  name: 'UserManage',
  components: {
    SearchForm,
    TableList,
    PageNum,
    SubmitForm,
    UploadFile
  },
  computed: {
    ...mapState('home', [
      'currentOrg'
    ])
  },
  data () {
    return {
      baseImg: '',
      title: '',
      total: 0,
      searchLabel,
      formStatus: false,
      formData,
      controlGroupColumns,
      searchText: {
        userName: '',
      },
      pageList: {
        page: 1,
        size: 20
      },
      controlGroupList: []
    }
  },
  async mounted () {
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'addUser',
      'delUser',
      'getUserList',
      'updateUser',
      'getOrgList'
    ]),
    toBase64 () {
      var file = document.querySelector('input[type=file]').files[0]
      var reader = new FileReader()
      reader.onloadend = () => {
        this.baseImg = reader.result
      }
      if (file) {
        reader.readAsDataURL(file)
      }
    },
    async showList () {
      const res = await this.getUserList({
        ...this.pageList,
        orgCode: this.currentOrg.orgCode,
        ...this.searchText
      })
      this.controlGroupList = res.data.list
      this.total = res.data.total
    },
    addControlGroup (type, title, record) {
      this.title = title
      this.isEdit = type
      if (type) {
        this.id = record.id
        this.actionFun = 'updateUser'
        this.formData = this.$tools.fillForm(formData, record)
      } else {
        this.actionFun = 'addUser'
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
          ...values,
          orgCode: this.currentOrg.orgCode,
          orgName: this.currentOrg.orgName,
          bottomPhoto: this.baseImg
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
    async delControlList (action) {
      try {
        await this.delUser({
          id: action.record.id
        })
        this.$message.success('删除成功')
        this.$tools.goNext(() => {
          this.showList()
        })
      } catch(err){}
    },
    searchForm (values) {
      this.searchText = values
      this.showList()
    }
  }
}
</script>

<style lang="less" scoped>
.file-upload {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
.file-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file-upload:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
</style>
