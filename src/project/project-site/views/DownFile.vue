<template>
  <div class="device-list page-layout qui-fx-ver">
    <div class="top-btn-group">
      <a-button icon="plus" @click="_addVideo(false, '新增资料')" class="add-btn">新增资料</a-button>
    </div>
    <submit-form ref="form" @submit-form="submit" :title="title" v-model="formUser" :form-data="formData">
      <div slot="upload">
        <div class="qui-fx">
          <div v-if="pic" style="margin: 10px 10px 0 0">
            <img :src="pic" style="width: 300px; height: 200px; display: block" alt />
          </div>
          <div style="margin-top: 10px">
            <a href="javascript:;" class="a-upload">
              <input @change="chooseFile($event, 'pic')" type="file" name id />上传封面图
            </a>
          </div>
        </div>
        <div class="qui-fx">
          <div v-if="url" style="margin: 10px 10px 0 0">
            {{ url }}
          </div>
          <div style="margin-top: 10px">
            <a href="javascript:;" class="a-upload">
              <input @change="chooseFile($event, 'url')" type="file" name id />上传附件
            </a>
          </div>
        </div>
      </div>
    </submit-form>
    <table-list :page-list="pageList" :columns="accountColumns" :table-list="userList">
      <template v-slot:other1="other1">
        {{ other1.record.url }}
      </template>
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑">
          <a-button
            @click="_addVideo(true, '编辑资料', action)"
            size="small"
            class="edit-action-btn"
            icon="form"
          ></a-button>
        </a-tooltip>
        <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="_delVideo(action)">
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
const formData = [
  {
    value: 'title',
    initValue: '',
    type: 'input',
    label: '标题',
    placeholder: '请输入标题'
  },
  {
    value: 'levelTitle',
    initValue: '',
    type: 'input',
    label: '副标题',
    placeholder: '请输入副标题'
  },
  {
    type: 'upload',
    label: '上传附件'
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
    title: '标题',
    width: '30%',
    dataIndex: 'title'
  },
  {
    title: '副标题',
    width: '20%',
    dataIndex: 'levelTitle'
  },
  {
    title: '附件路径',
    width: '20%',
    scopedSlots: {
      customRender: 'other1'
    }
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
  name: 'DownFile',
  components: {
    SearchForm,
    TableList,
    PageNum,
    SubmitForm
  },
  data() {
    return {
      pic: '',
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
    ...mapActions('home', ['addDownFile', 'updateDownFile', 'delDownFile', 'getDownFile']),
    // 上传图片
    chooseFile(event, tag) {
      this.$tools.chooseNewFile(event, data => {
        this[tag] = data
      })
    },
    // 删除账号
    async _delVideo(action) {
      await this.delDownFile({
        _id: action.record._id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showList()
      })
    },
    async showList() {
      const res = await this.getDownFile({
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
    _addVideo(type, title, item) {
      this.isEdit = type
      this.title = title
      if (type) {
        this._id = item.record._id
        this.actionFun = 'updateDownFile'
        this.url = item.record.url
        this.pic = item.record.pic
        this.formData = this.$tools.fillForm(formData, item.record)
      } else {
        this.url = ''
        this.pic = ''
        this.actionFun = 'addDownFile'
        this.formData = formData
      }
      this.formUser = true
    },
    async submit(values) {
      if (!this.url || !this.pic) {
        this.$refs.form.error()
        this.$message.warning('请上传附件')
        return
      }
      try {
        if (this.isEdit) {
          values._id = this._id
        }
        await this[this.actionFun]({
          ...values,
          url: this.url,
          pic: this.pic,
          createTime: new Date().getTime()
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
