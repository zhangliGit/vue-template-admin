<template>
  <div class="device-list page-layout qui-fx-ver">
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
      <div slot="upload">
        <upload-multi :length="3" v-model="fileList" :fileInfo="fileInfo"></upload-multi>
      </div>
    </submit-form>
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button type="primary" icon="plus" @click="addUserList(false, '新增人员')">新增人员</a-button>
      </div>
      <div slot="right"></div>
    </search-form>
    <table-list is-check :page-list="pageList" :columns="userColumns" :table-list="userList">
      <template v-slot:other1="other1">
        <a-tag :color="other1.record.sex == '1' ? '#f50' : '#87d068'">{{
          other1.record.sex == '1' ? '男' : '女'
        }}</a-tag>
      </template>
      <template v-slot:other2="other2">
        <a-tag :color="other2.record.isMarry == '1' ? '#f50' : '#87d068'">{{
          other2.record.isMarry == '1' ? '已婚' : '未婚'
        }}</a-tag>
      </template>
      <template v-slot:other3="other3">
        <a-tag color="red">{{ jobList.find(item => item.key == other3.record.job).val }}</a-tag>
      </template>
      <template v-slot:other4="other4"> {{ other4.record.workStartTime }} 至 {{ other4.record.workEndTime }} </template>
      <template v-slot:other5="other5">
        <a-tag color="#666" v-for="(enjoy, index) in other5.record.enjoy" :key="index">{{
          enjoyList.find(item => item.key == enjoy).val
        }}</a-tag>
      </template>
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑">
          <a-button
            @click="addUserList(true, '编辑', action.record)"
            size="small"
            class="edit-action-btn"
            icon="form"
          ></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="delUserList(action)">
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
import ChooseUser from '@c/ChooseUser'
import UploadMulti from '@c/UploadMulti'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
const searchLabel = [
  {
    value: 'userName',
    type: 'input',
    label: '人员名称',
    placeholder: '请输入名称'
  }
]
const jobList = [
  {
    key: 1,
    val: 'UI设计师'
  },
  {
    key: 2,
    val: '前端开发工程师'
  },
  {
    key: 3,
    val: 'java开发工程师'
  },
  {
    key: 4,
    val: '测试工程师'
  }
]
const enjoyList = [
  {
    key: 1,
    val: '篮球'
  },
  {
    key: 2,
    val: '足球'
  },
  {
    key: 3,
    val: '羽毛球'
  }
]
const formData = [
  {
    value: 'userName',
    initValue: '',
    type: 'input',
    label: '姓名',
    max: '10',
    placeholder: '请输入用户姓名'
  },
  {
    value: 'sex',
    initValue: '',
    list: [
      {
        key: 1,
        val: '男'
      },
      {
        key: 2,
        val: '女'
      }
    ],
    type: 'radio',
    label: '性别',
    placeholder: '请选择性别'
  },
  {
    value: 'isMarry',
    initValue: '',
    list: [
      {
        key: 1,
        val: '已婚'
      },
      {
        key: 2,
        val: '未婚'
      }
    ],
    type: 'radio',
    label: '是否已婚',
    placeholder: '是否已婚'
  },
  {
    value: 'job',
    initValue: [],
    list: jobList,
    type: 'select',
    label: '职业',
    placeholder: '请选择职业'
  },
  {
    value: 'enjoy',
    initValue: [],
    list: enjoyList,
    type: 'checkbox',
    label: '兴趣爱好',
    placeholder: '请选择兴趣爱好'
  },
  {
    value: 'birthday',
    type: 'singleTime',
    label: '生日',
    initValue: '',
    placeholder: '请选择生日'
  },
  {
    value: 'workTime',
    type: 'rangeTime',
    label: '工作时间',
    initValue: [],
    placeholder: '请选择工作时间'
  },
  {
    type: 'upload',
    label: '上传头像'
  }
]
const userColumns = [
  {
    title: '序号',
    width: '6%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    width: '10%'
  },
  {
    title: '性别',
    width: '8%',
    scopedSlots: {
      customRender: 'other1'
    }
  },
  {
    title: '是否已婚',
    width: '10%',
    scopedSlots: {
      customRender: 'other2'
    }
  },
  {
    title: '职业',
    width: '10%',
    scopedSlots: {
      customRender: 'other3'
    }
  },
  {
    title: '兴趣爱好',
    width: '12%',
    scopedSlots: {
      customRender: 'other5'
    }
  },
  {
    title: '生日',
    dataIndex: 'birthday',
    width: '10%'
  },
  {
    title: '工作时间',
    width: '14%',
    scopedSlots: {
      customRender: 'other4'
    }
  },
  {
    title: '头像',
    dataIndex: 'photo',
    width: '10%',
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
    ChooseUser,
    TableList,
    PageNum,
    SubmitForm,
    UploadMulti
  },
  computed: {
    ...mapState('home', [])
  },
  data() {
    return {
      studentTag: false,
      userTag: false,
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
      fileInfo: {
        url: `http://canpointtest.com:8090/file/upload-file?uploadPath=/opt/canpoint-project-serve/public/upload/`, // 接口地址
        tip: '上传头像',
        h: 120, // 高度
        w: 120 // 宽度
      },
      fileList: [],
      userList: [],
      baseImg: '',
      jobList,
      enjoyList
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', ['getUser', 'addUser', 'delUser', 'updateUser']),
    onChange() {},
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
      this.userList = res.data.map(item => {
        return {
          ...item,
          id: item._id
        }
      })
      this.total = res.total
    },
    addUserList(type, title, record) {
      this.title = title
      this.isEdit = type
      if (type) {
        this._id = record._id
        this.actionFun = 'updateUser'
        if (record.photo) {
          this.fileList = [
            {
              id: 1,
              url: record.photo
            }
          ]
        }
        this.formData = this.$tools.fillForm(formData, record)
      } else {
        this.actionFun = 'addUser'
        this.formData = formData
        this.fileList = []
      }
      this.formStatus = true
    },
    // 新增修改用户
    async submitForm(values) {
      values.workStartTime = values.workTime[0]
      values.workEndTime = values.workTime[1]
      delete values.workTime
      const photo = this.fileList.length === 0 ? '' : this.fileList[0].url
      try {
        if (this.isEdit) {
          values._id = this._id
        }
        await this[this.actionFun]({
          ...values,
          photo
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
    // 删除用户
    async delUserList(action) {
      await this.delUser({
        _id: action.record._id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showList()
      })
    },
    // 查询用户
    searchForm(values) {
      this.pageList.page = 1
      this.searchText = values
      this.showList()
    }
  }
}
</script>

<style lang="less" scoped></style>
