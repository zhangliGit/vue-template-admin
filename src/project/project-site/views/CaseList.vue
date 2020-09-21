<template>
  <div class="device-list page-layout qui-fx-ver">
    <div class="top-btn-group">
      <a-button icon="plus" @click="_addCase(false, '新增案例')" class="add-btn">新增案例</a-button>
    </div>
    <submit-form ref="form" @submit-form="submit" :title="title" v-model="formUser" :form-data="formData">
      <div slot="upload">
        <div class="qui-fx">
          <div v-if="url" style="margin: 10px 10px 0 0">
            <img :src="url" style="width: 300px; height: 200px; display: block" alt />
          </div>
          <div style="margin-top: 10px">
            <a href="javascript:;" class="a-upload">
              <input @change="chooseFile($event)" type="file" name id />上传封面
            </a>
          </div>
        </div>
      </div>
      <div slot="other">
        <quill-editor
          style="width: 100%; height: 400px"
          v-model="content"
          ref="myQuillEditor"
          :options="quillOption"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>
      </div>
    </submit-form>
    <table-list :page-list="pageList" :columns="accountColumns" :table-list="userList">
      <template v-slot:other1="other1">
        <img :src="other1.record.url" style="width: 200px; height: 120px; display:block" alt />
      </template>
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑">
          <a-button
            @click="_addCase(true, '编辑案例', action)"
            size="small"
            class="edit-action-btn"
            icon="form"
          ></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="_delCase(action)">
          <template slot="title">您确定删除吗?</template>
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
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import quillConfig from './quill-config'
const formData = [
  {
    value: 'schoolName',
    initValue: '',
    type: 'input',
    label: '学校名称',
    placeholder: '请输入学校名称'
  },
  {
    value: 'systemName',
    initValue: '',
    type: 'input',
    label: '系统名称',
    placeholder: '请输入系统名称'
  },
  {
    value: 'systemDes',
    initValue: '',
    type: 'input',
    label: '系统描述',
    placeholder: '请输入系统描述'
  },
  {
    type: 'upload',
    label: '上传封面'
  },
  {
    type: 'other',
    label: '案例内容'
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
    title: '学校名称',
    width: '20%',
    dataIndex: 'schoolName'
  },
  {
    title: '系统名称',
    width: '20%',
    dataIndex: 'systemName'
  },
  {
    title: '系统描述',
    width: '20%',
    dataIndex: 'systemDes'
  },
  {
    title: '封面图片',
    width: '20%',
    scopedSlots: {
      customRender: 'other1'
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
  name: 'CaseList',
  components: {
    SearchForm,
    TableList,
    PageNum,
    SubmitForm,
    quillEditor
  },
  data() {
    return {
      quillOption: quillConfig,
      content: '',
      url: '',
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
    ...mapActions('home', ['addCase', 'updateCase', 'delCase', 'getCase']),
    // 富文本编辑器方法
    onEditorFocus(data) {},
    // 获得焦点事件
    onEditorChange(data) {
      this.text = data.text
      this.content = data.html
      this.roundup = data.text.substring(0, 120)
    },
    // 上传图片
    chooseFile(event) {
      this.$tools.chooseNewFile(event, data => {
        this.url = data
      })
    },
    // 删除账号
    async _delCase(action) {
      await this.delCase({
        _id: action.record._id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showList()
      })
    },
    async showList() {
      const res = await this.getCase({
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
    _addCase(type, title, item) {
      this.isEdit = type
      this.title = title
      if (type) {
        this._id = item.record._id
        this.actionFun = 'updateCase'
        this.url = item.record.url
        this.content = item.record.content
        this.formData = this.$tools.fillForm(formData, item.record)
      } else {
        this.actionFun = 'addCase'
        this.content = ''
        this.formData = formData
      }
      this.formUser = true
    },
    async submit(values) {
      if (!this.url || !this.content) {
        this.$refs.form.error()
        this.$message.warning('请上传封面图或填写内容')
        return
      }
      try {
        if (this.isEdit) {
          values._id = this._id
        }
        await this[this.actionFun]({
          ...values,
          url: this.url,
          content: this.content
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

<style lang="less" scoped>
.a-upload {
  margin-right: 20px;
  padding: 0 15px;
  height: 30px;
  line-height: 30px;
  position: relative;
  cursor: pointer;
  color: #888;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  *display: inline;
  *zoom: 1;
}

.a-upload input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}

.a-upload:hover {
  color: #444;
  background: #eee;
  border-color: #ccc;
  text-decoration: none;
}
</style>
