<template>
  <div class="device-list page-layout qui-fx-ver">
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
    </submit-form>
    <search-form is-reset @search-form="searchForm" :search-label="searchLabel">
      <div slot="left">
        <a-button type="primary" icon="plus" @click="addControlGroup(false, '新增设备')">新增设备</a-button>
      </div>
      <div slot="right">
      </div>
    </search-form>
    <table-list
      :page-list="pageList"
      :columns="controlGroupColumns"
      :table-list="controlGroupList">
      <template v-slot:other1="other1">
        <a-tag :color="other1.record.deviceMark == 1 ? '#87d068' : '#ccc'">{{ other1.record.deviceMark == 1 ? '进' : '出'}}</a-tag>
      </template>
      <template v-slot:other2="other2">
        <a-tag :color="other2.record.deviceState == 1 ? '#87d068' : '#ccc'">{{ other2.record.deviceState == 1 ? '在线' : '离线'}}</a-tag>
      </template>
      <template v-slot:other3="other3">
        <a-tag color="#108ee9">{{ other3.record.deviceType == 1 ? '相机' : '面板机'}}</a-tag>
      </template>
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑">
          <a-button @click="addControlGroup(true, '编辑控制组', action.record)" size="small" class="edit-action-btn" icon="form"></a-button>
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
    value: 'deviceName ',
    type: 'input',
    label: '设备名称',
    placeholder: '请输入设备名称'
  }
]
const formData = [
  {
    value: 'deviceName',
    initValue: '',
    type: 'input',
    label: '设备名称',
    placeholder: '请输入设备名称'
  },
  {
    value: 'deviceIp',
    initValue: '',
    type: 'input',
    label: '设备Ip',
    placeholder: '请输入正确的设备Ip',
    regular: 'ip'
  },
  {
    value: 'deviceSite',
    initValue: '',
    type: 'input',
    label: '安装位置',
    placeholder: '请输入设备安装位置'
  },
  {
    value: 'deviceSn',
    initValue: '',
    type: 'input',
    label: '设备SN码',
    placeholder: '请输入设备SN码'
  },
  {
		value: 'deviceMark',
		initValue: '',
		list: [
		{
				key: '1',
				val: '进'
		},
		{
				key: '2',
				val: '出'
		}
		],
		type: 'radio',
		label: '进出标识',
		placeholder: '请选择进出标识'
	},
  {
    value: 'deviceState',
    initValue: '',
		list: [
		{
				key: '1',
				val: '在线'
		},
		{
				key: '2',
				val: '离线'
		}
		],
		type: 'radio',
    label: '设备状态',
    placeholder: '请选择设备状态'
  },
  {
    value: 'deviceType',
    initValue: '',
		list: [
		{
				key: '1',
				val: '相机'
		},
		{
				key: '2',
				val: '面板机'
		}
		],
		type: 'radio',
    label: '设备类型',
    placeholder: '请选择设备类型'
  },
  {
    value: 'deviceRemark',
    initValue: '',
    required: false,
    type: 'input',
    label: '备注',
    placeholder: '请输入备注'
  }
]
const controlGroupColumns = [{
  title: '序号',
  scopedSlots: {
    customRender: 'index'
  },
  width: '6%'
}, {
  title: '设备名称',
  dataIndex: 'deviceName',
  width: '20%'
}, {
  title: '设备IP',
  dataIndex: 'deviceIp',
  width: '10%'
},
{
  title: '安装位置',
  dataIndex: 'deviceSite',
  width: '12%',
},
{
  title: '设备SN码',
  dataIndex: 'deviceSn',
  width: '10%',
},
{
  title: '设备标识',
  width: '10%',
  scopedSlots: {
    customRender: 'other1'
  }
},
{
  title: '设备状态',
  width: '10%',
  scopedSlots: {
    customRender: 'other2'
  }
},
{
  title: '设备类型',
  width: '10%',
  scopedSlots: {
    customRender: 'other3'
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
  name: 'ControlGroup',
  components: {
    SearchForm,
    TableList,
    PageNum,
    SubmitForm
  },
  computed: {
    ...mapState('home', [
      'currentOrg'
    ])
  },
  data () {
    return {
      title: '',
      total: 0,
      searchLabel,
      formStatus: false,
      formData,
      controlGroupColumns,
      searchText: {
        deviceName: '',
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
      'addDevice',
      'delDevice',
      'getDeviceList',
      'updateDevice',
      'getOrgList'
    ]),
    async showList () {
      const res = await this.getDeviceList({
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
        this.actionFun = 'updateDevice'
        this.formData = this.$tools.fillForm(formData, record)
      } else {
        this.actionFun = 'addDevice'
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
          orgName: this.currentOrg.orgName
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
      await this.delDevice({
        id: action.record.id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showList()
      })
    },
    searchForm (values) {
      this.searchText = values
      this.showList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
