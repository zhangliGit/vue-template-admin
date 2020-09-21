<template>
  <div class="error-list page-layout qui-fx-ver">
    <a-drawer
      width="850px"
      title="关联的学校"
      placement="right"
      :closable="true"
      :visible="isSchool"
      @close="isSchool = false"
    >
      <div class="qui-fx-ac" style="margin-bottom: 20px">
        <a-input v-model="schoolForm.schoolName" placeholder="请输入学校名称" />
        <a-input v-model="schoolForm.schoolCode" style="margin: 0 10px" placeholder="请输入学校编码" />
        <a-input v-model="schoolForm.packageName" style="margin: 0 10px" placeholder="请输入包名" />
        <a-button type="primary" @click="bindSchool">绑定学校</a-button>
      </div>
      <table-list :page-list="pageList" :columns="schoolColumns" :table-list="schoolList">
        <template v-slot:actions="action">
          <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="delSchool(action.record._id)">
            <template slot="title">您确定解绑吗?</template>
            <a-tooltip placement="topLeft" title="解绑学校">
              <a-button size="small" class="del-action-btn" icon="delete"></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </table-list>
    </a-drawer>
    <submit-form
      ref="form"
      @submit-form="submitForm"
      :title="title"
      v-model="formStatus"
      :form-data="formData"
    ></submit-form>
    <div class="top-btn-group">
      <a-button icon="plus" class="add-btn" @click="actionApp(false)">新增版本</a-button>
    </div>
    <table-list :page-list="pageList" :columns="cardColumns" :table-list="appType">
      <template v-slot:other1="other1">{{ $tools.getDate(other1.record.createTime) }}</template>
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="版本记录">
          <a-button
            size="small"
            @click="showVersion(action.record)"
            class="detail-action-btn"
            icon="ellipsis"
          ></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="关联学校">
          <a-button size="small" @click="concatSchool(action.record)" class="user-action-btn" icon="team"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="编辑" @click="actionApp(true, action.record)">
          <a-button size="small" class="edit-action-btn" icon="form"></a-button>
        </a-tooltip>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="appTotal" @change-page="showList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SubmitForm from '@c/SubmitForm'
const formData = [
  {
    value: 'version',
    initValue: '',
    type: 'input',
    label: '版本名称',
    placeholder: '请输入版本名称'
  },
  {
    value: 'versionTag',
    initValue: '',
    type: 'input',
    label: '版本标识',
    placeholder: '请输入版本标识'
  },
  {
    value: 'des',
    initValue: '',
    type: 'input',
    label: '版本功能',
    placeholder: '请输入版本功能'
  },
  {
    value: 'url',
    initValue: '',
    type: 'input',
    label: '路径',
    placeholder: '请输入版本路径'
  }
]
const schoolColumns = [
  {
    title: '序号',
    width: '10%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '学校名称',
    width: '30%',
    dataIndex: 'schoolName'
  },
  {
    title: '学校编码',
    width: '20%',
    dataIndex: 'schoolCode'
  },
  {
    title: '包名',
    width: '25%',
    dataIndex: 'packageName'
  },
  {
    title: '操作',
    width: '10%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]

const cardColumns = [
  {
    title: '序号',
    width: '8%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '版本名称',
    width: '12%',
    dataIndex: 'version'
  },
  {
    title: '版本标识',
    width: '10%',
    dataIndex: 'versionTag'
  },
  {
    title: '版本功能',
    width: '20%',
    dataIndex: 'des'
  },
  {
    title: '路径',
    dataIndex: 'url',
    width: '20%'
  },
  {
    title: '创建日期',
    width: '15%',
    scopedSlots: {
      customRender: 'other1'
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
  name: 'AppVersion',
  components: {
    TableList,
    PageNum,
    SubmitForm
  },
  computed: {
    ...mapState('home', [])
  },
  data() {
    return {
      schoolColumns,
      isVersion: false,
      isSchool: false,
      schoolList: [],
      formData,
      formStatus: false,
      title: '',
      cardColumns,
      pageList: {
        page: 1,
        size: 20
      },
      appTotal: 0,
      appType: [],
      schoolForm: {
        schoolCode: '',
        schoolName: ''
      }
    }
  },
  mounted() {
    this.showList()
  },
  methods: {
    ...mapActions('home', [
      'getCardType',
      'addCardType',
      'updateCardType',
      'delCardType',
      'getCardTypeSchool',
      'addCardTypeSchool',
      'delCardTypeSchool',
      'getCardTypeVersion',
      'addCardTypeVersion',
      'updateCardTypeVersion',
      'delCardTypeVersion'
    ]),
    /**
     * @description 版本列表
     */
    showVersion(item) {
      window.sessionStorage.setItem('cardId', item._id)
      this.$router.push('/app-version/list')
    },
    /**
     * 关联学校
     */
    async bindSchool() {
      if (!this.schoolForm.schoolCode || !this.schoolForm.schoolName || !this.schoolForm.packageName) {
        this.$message.warning('请输入完整信息')
        return
      }
      await this.addCardTypeSchool({
        ...this.schoolForm,
        cardId: this.cardId
      })
      this.$message.success('绑定成功')
      this.schoolForm = {
        schoolCode: '',
        schoolName: ''
      }
      this.$tools.goNext(() => {
        this.searchSchool()
      })
    },
    concatSchool(item) {
      this.cardId = item._id
      this.isSchool = true
      this.searchSchool()
    },
    async searchSchool() {
      const res = await this.getCardTypeSchool({
        page: 1,
        size: 20,
        cardId: this.cardId
      })
      this.schoolList = res.data
    },
    async delSchool(id, index) {
      await this.delCardTypeSchool({
        _id: id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.searchSchool()
      })
    },
    /**
     * @description 新增或编辑版本信息
     */
    actionApp(tag, item) {
      this.isEdit = tag
      this.formStatus = true
      if (tag) {
        this.title = '编辑版本'
        this.formData = this.$tools.fillForm(formData, item)
        this.actionFun = 'updateCardType'
        this.id = item._id
      } else {
        this.formData = formData
        this.actionFun = 'addCardType'
        this.title = '新增版本'
      }
    },
    async submitForm(values) {
      try {
        if (this.isEdit) {
          values._id = this.id
        }
        await this[this.actionFun]({
          ...values,
          createTime: new Date().getTime()
        })
        this.$message.success('操作成功')
        this.$refs.form.reset()
        this.$tools.goNext(() => {
          this.showList()
        })
      } catch (err) {
        this.$refs.form.error()
      }
    },
    async showList() {
      const res = await this.getCardType({
        ...this.pageList
      })
      this.appType = res.data.map(item => {
        return {
          ...item,
          id: item._id
        }
      })
      this.appTotal = res.total
    },
    async del(item) {
      try {
        await this.delCardType({
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
