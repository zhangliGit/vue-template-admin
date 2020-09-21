<template>
  <div class="error-list page-layout qui-fx-ver">
    <submit-form
      ref="version"
      @submit-form="submitVersionForm"
      :title="versionTitle"
      v-model="formVersionStatus"
      :form-data="formVersionData"
    ></submit-form>
    <div class="top-btn-group">
      <a-button icon="plus" class="add-btn" @click="sendVerson(false)">发布新版本</a-button>
    </div>
    <table-list :page-list="pageList" :columns="versionColumns" :table-list="versionList">
      <template v-slot:other2="other2">
        <a-tag :color="parseInt(other2.record.isForceUpdate) === 1 ? '#87d068' : '#999'">
          {{ parseInt(other2.record.isForceUpdate) === 0 ? '否' : '是' }}
        </a-tag>
      </template>
      <template v-slot:other1="other1">{{ $tools.getDate(other1.record.createTime) }}</template>
      <template v-slot:other3="other3">
        <a-tag color="#6882da">{{ other3.record.versionCode }}</a-tag>
      </template>
      <template v-slot:other4="other4">
        <a-tag color="#87d068">{{ other4.record.versionName }}</a-tag>
      </template>
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑" @click="sendVerson(true, action.record)">
          <a-button size="small" class="edit-action-btn" icon="form"></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="delVersion(action.record)">
          <template slot="title">您确定删除吗?</template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </table-list>
    <page-num v-model="pageList" :total="total" @change-page="getVersionList"></page-num>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TableList from '@c/TableList'
import PageNum from '@c/PageNum'
import SubmitForm from '@c/SubmitForm'
const formVersionData = [
  {
    value: 'versionCode',
    initValue: '',
    type: 'input',
    label: '版本号',
    placeholder: '请输入版本号'
  },
  {
    value: 'versionName',
    initValue: '',
    type: 'input',
    label: '版本名称',
    placeholder: '请输入版本名称'
  },
  {
    value: 'downUrl',
    initValue: '',
    type: 'input',
    label: '路径',
    placeholder: '请输入版本路径'
  },
  {
    value: 'packageName',
    initValue: '',
    type: 'input',
    label: '包名',
    placeholder: '请输入包名'
  },
  {
    value: 'updateLog',
    initValue: '',
    type: 'input',
    label: '更新日志',
    placeholder: '请输入更新日志'
  },
  {
    value: 'isForceUpdate',
    initValue: 0,
    list: [
      {
        key: 0,
        val: '否'
      },
      {
        key: 1,
        val: '是'
      }
    ],
    type: 'radio',
    label: '强制更新',
    placeholder: '请选择是否已婚'
  }
]
const versionColumns = [
  {
    title: '序号',
    width: '7%',
    scopedSlots: {
      customRender: 'index'
    }
  },
  {
    title: '版本号',
    width: '7%',
    scopedSlots: {
      customRender: 'other3'
    }
  },
  {
    title: '名称',
    width: '7%',
    scopedSlots: {
      customRender: 'other4'
    }
  },
  {
    title: '包名',
    width: '15%',
    dataIndex: 'packageName'
  },
  {
    title: '下载地址',
    width: '15%',
    dataIndex: 'downUrl'
  },
  {
    title: '版本日志',
    width: '20%',
    dataIndex: 'updateLog'
  },
  {
    title: '强制更新',
    width: '10%',
    scopedSlots: {
      customRender: 'other2'
    }
  },
  {
    title: '创建日期',
    width: '10%',
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
  name: 'VersionList',
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
      isVersion: false,
      versionTitle: '',
      versionColumns,
      formVersionData,
      formVersionStatus: false,
      pageList: {
        page: 1,
        size: 20
      },
      total: 0,
      versionList: []
    }
  },
  mounted() {
    this.getVersionList()
  },
  methods: {
    ...mapActions('home', ['getCardTypeVersion', 'addCardTypeVersion', 'updateCardTypeVersion', 'delCardTypeVersion']),
    async getVersionList() {
      const res = await this.getCardTypeVersion({
        page: 1,
        size: 20,
        cardId: window.sessionStorage.getItem('cardId')
      })
      this.versionList = res.data.map(item => {
        return {
          ...item,
          id: item._id
        }
      })
      this.total = res.total
    },
    /**
     * @des 发布新版本
     */
    sendVerson(tag, item) {
      this.isVersionEdit = tag
      if (tag) {
        this.versionId = item._id
        this.versionTitle = '编辑新版本'
        this.versionFun = 'updateCardTypeVersion'
        this.formVersionData = this.$tools.fillForm(formVersionData, item)
      } else {
        let dataForm
        if (this.versionList.length > 0) {
          dataForm = JSON.parse(JSON.stringify(this.versionList[0]))
          dataForm.updateLog = ''
          this.formVersionData = this.$tools.fillForm(formVersionData, dataForm)
        } else {
          this.formVersionData = formVersionData
        }
        this.versionTitle = '发布新版本'
        this.versionFun = 'addCardTypeVersion'
      }
      this.formVersionStatus = true
    },
    showVersion(item) {
      this.isVersion = true
      this.getVersionList()
    },
    /**
     * @des 新增版本发布记录
     */
    async submitVersionForm(values) {
      if (this.isVersionEdit) {
        values._id = this.versionId
      }
      try {
        await this[this.versionFun]({
          ...values,
          versionCode: parseInt(values.versionCode),
          isForceUpdate: parseInt(values.isForceUpdate),
          createTime: new Date().getTime(),
          cardId: window.sessionStorage.getItem('cardId')
        })
        this.$refs.version.reset()
        this.$message.success('发布成功')
        this.$tools.goNext(() => {
          this.getVersionList()
        })
      } catch (err) {
        this.$refs.version.error()
      }
    },
    async delVersion(item) {
      await this.delCardTypeVersion({
        _id: item._id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.getVersionList()
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
