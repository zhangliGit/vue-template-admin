<template>
  <div class="device-list page-layout qui-fx-ver">
    <div class="top-btn-group">
      <a-button icon="plus" @click="addUserList(false, '新增图标')" class="add-btn">新增</a-button>
    </div>
    <submit-form
      ref="form"
      @submit-form="submit"
      :title="title"
      v-model="formUser"
      :form-data="formData"
    >
      <div slot="upload">
        <div class="qui-fx">
          <div v-if="url" style="margin: 10px 10px 0 0">
            <img
              :src="url"
              style="width: 160px; height: 160px; display: block; background-color:#eee"
              alt
            />
          </div>
          <div style="margin-top: 10px">
            <a href="javascript:;" class="a-upload">
              <input @change="chooseFile($event)" type="file" name id />上传图标
            </a>
          </div>
        </div>
      </div>
    </submit-form>
    <table-list :page-list="pageList" :columns="accountColumns" :table-list="userList">
      <template v-slot:actions="action">
        <a-tooltip placement="topLeft" title="编辑">
          <a-button
            @click="addUserList(true, '编辑图标', action)"
            size="small"
            class="edit-action-btn"
            icon="form"
          ></a-button>
        </a-tooltip>
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
import axios from 'axios'
const formData = [
  {
    value: 'iconDes',
    initValue: '',
    type: 'input',
    label: '图标说明',
    placeholder: '请输入图标说明'
  },
  {
    value: 'iconSize',
    initValue: '',
    type: 'input',
    label: '尺寸',
    placeholder: '请输入图标尺寸'
  },
  {
    type: 'upload',
    label: '上传图像'
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
    title: '图片描述',
    width: '20%',
    dataIndex: 'iconDes'
  },
  {
    title: '尺寸',
    width: '20%',
    dataIndex: 'iconSize'
  },
  {
    title: '路径',
    width: '20%',
    dataIndex: 'iconUrl'
  },
  {
    title: '底照',
    dataIndex: 'iconUrl',
    width: '20%',
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
  name: 'MiniIcon',
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
      url: '',
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
    ...mapActions('home', ['getMini', 'updateMini', 'addMini']),
    // 上传图片
    chooseFile(event) {
      const file = event.target.files[0]
      const pathProd = '/usr/local/nginx/html/mini-img/'
      const paramProd = new FormData()
      paramProd.append('file', file)
      paramProd.append('uploadPath', pathProd)
      const pathTest = '/usr/local/openresty/nginx/html/mini-img/'
      const paramTest = new FormData()
      paramTest.append('file', file)
      paramTest.append('uploadPath', pathTest)
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      axios.post(`http://canpointtest.com:8090/file/upload-file`, paramTest, config).then(response => {
        this.url = `http://canpointtest.com/mini-img/${file.name}`
        this.$message.success('上传成功')
      })
      axios.post(`http://canpointlive.com:8090/file/upload-file`, paramProd, config).then(response => {
        this.url = `http://canpointtest.com/mini-img/${file.name}`
        this.$message.success('上传成功')
      })
    },
    async showList() {
      const res = await this.getMini({
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
        this.actionFun = 'updateMini'
        this.url = item.record.iconUrl
        this.formData = this.$tools.fillForm(formData, item.record)
      } else {
        this.actionFun = 'addMini'
        this.url = ''
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
          ...values,
          iconUrl: this.url
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
