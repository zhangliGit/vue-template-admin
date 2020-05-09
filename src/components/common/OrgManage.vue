<template>
  <div class="qui-fx-f1" id="tableList">
    <submit-form ref="form" @submit-form="submitForm" :title="title" v-model="formStatus" :form-data="formData">
    </submit-form>
    <a-skeleton style="padding: 0 15px;" v-if="orgData.length === 0 && !noData" active :paragraph="{rows: 10}" />
    <no-data v-if="noData" msg="暂无组织机构~">
      <a-button type="primary" slot="btn" @click="addOrg(false, {})">添加机构</a-button>
    </no-data>
    <a-table
      v-if="orgData.length !== 0"
      :defaultExpandAllRows="autoDown"
      :pagination="false"
      :columns="columns"
      :dataSource="orgData"
      style="background-color: #fff"
      :scroll="{y: this.$tools.setScroll('tableList')}"
      :rowKey="(record) => record.id">
      <template slot="actions" slot-scope="record">
        <a-tooltip placement="topLeft" title="新增子级">
          <a-button size="small" class="add-action-btn" icon="plus" @click="addOrg(false, record)"></a-button>
        </a-tooltip>
        <a-tooltip placement="topLeft" title="编辑">
          <a-button size="small" class="edit-action-btn" icon="form" @click="addOrg(true, record)"></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="del(record)">
          <template slot="title">
            您确定删除吗?
          </template>
          <a-tooltip placement="topLeft" title="删除">
            <a-button v-if="record.parentId" size="small" class="del-action-btn" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </a-table>
  </div>

</template>
<script>
import NoData from './NoData'
import $ajax from '@u/ajax-serve'
import { mapState } from 'vuex'
import hostEnv from '@config/host-env'
import SubmitForm from './SubmitForm'
import { Switch, Tooltip } from 'ant-design-vue'
export {
  default as FormOutline
}
  from '@ant-design/icons/lib/outline/FormOutline'
export {
  default as DeleteOutline
}
  from '@ant-design/icons/lib/outline/DeleteOutline'
const formData = [
  {
    value: 'name',
    initValue: '',
    type: 'input',
    label: '机构名称',
    placeholder: '请输入组织机构名称'
  },
  {
    value: 'code',
    initValue: '',
    type: 'input',
    label: '机构编码',
    placeholder: '请输入组织机构编码'
  },
  {
    value: 'remark',
    initValue: '',
    type: 'input',
    label: '备注',
    required: false,
    placeholder: '请输入备注'
  }
  // {
  //   value: 'status',
  //   initValue: true,
  //   list: [
  //     {
  //       key: true,
  //       val: '启用'
  //     },
  //     {
  //       key: false,
  //       val: '禁用'
  //     }
  //   ],
  //   type: 'radio',
  //   label: '是否启用',
  //   placeholder: '请选择是否启用'
  // }
]
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    width: '25%'
  },
  // {
  //   title: '状态',
  //   dataIndex: 'valid',
  //   width: '12%',
  //   scopedSlots: { customRender: 'valid' }
  // },
  {
    title: '备注',
    dataIndex: 'remark',
    width: '20%'
  },
  {
    title: '创建日期',
    dataIndex: 'createTime',
    width: '15%',
    customRender: (text) => {
      const d = new Date(text)
      return d.getFullYear() + '-' + ((d.getMonth() + 1) > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
    }
  },
  {
    title: '操作',
    width: '30%',
    scopedSlots: { customRender: 'actions' }
  }
]

export default {
  name: 'OrgManage',
  components: {
    ASwitch: Switch,
    ATooltip: Tooltip,
    SubmitForm,
    NoData
  },
  computed: {
    ...mapState('home', [
      'schoolCode'
    ])
  },
  data () {
    return {
      noData: false,
      autoDown: true,
      title: '组织机构',
      orgData: [],
      columns,
      formData,
      formStatus: false
    }
  },
  async mounted () {
    /**
     * @description 获取组织机构根节点
     */
    this.showList()
  },
  methods: {
    async showList () {
      const res = await $ajax.get({
        url: `${hostEnv.lz_user_center}/school/org/getSchoolRoot/${this.schoolCode}`
      })
      if (res.data === null || res.data.length === 0) {
        this.noData = true
        return
      } else {
        this.noData = false
      }
      this.orgData = this.newOrgData([res.data])
    },
    // 深层递归
    newOrgData (data) {
      data.forEach(item => {
        item.children = item.orgChilds || null
        if (item.orgChilds && item.orgChilds.length > 0) {
          this.newOrgData(item.orgChilds)
        }
      })
      return data
    },
    addOrg (type, record) {
      this.isEdit = type
      this.formStatus = true
      if (type) {
        this.id = record.id
        this.parentId = record.parentId || ''
        this.formData = this.$tools.fillForm(formData, record)
        if (!record.parentId) {
          // this.formData[1].disabled = true
          this.formData.splice(1, 1)
        }
      } else {
        this.formData = formData
        this.parentId = record.id || ''
      }
    },
    async submitForm (values) {
      try {
        const params = {
          schoolCode: this.schoolCode,
          valid: 1,
          ...values,
          parentId: this.parentId
        }
        if (this.isEdit) {
          params.id = this.id
          await $ajax.post({
            url: `${hostEnv.lz_user_center}/school/org/update`,
            params: params
          })
        } else {
          await $ajax.post({
            url: `${hostEnv.lz_user_center}/school/org/add`,
            params: params
          })
        }
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.$refs.form.reset()
          this.showList()
        })
      } catch (err) {
        this.$refs.form.error()
      }
    },
    async del (record) {
      await $ajax.get({
        url: `${hostEnv.lz_user_center}/school/org/delete/${record.id}`
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showList()
      })
    }
  }
}
</script>
