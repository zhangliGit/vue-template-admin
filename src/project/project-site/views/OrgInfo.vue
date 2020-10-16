<template>
  <div class="device-list page-layout qui-fx">
    <div class="org-left u-fx-ver">
      <div class="top-btn-group">
        <a-button icon="plus" @click="_addCity(false, '新增城市')" class="add-btn">新增城市</a-button>
      </div>
      <ul class="u-fx-f1" style="overflow-y: scroll">
        <li
          @click="tabChange(item, index)"
          v-for="(item, index) in cityList"
          :key="item._id"
          :class="{'act' : current === index}"
        >{{ item.name }}</li>
      </ul>
    </div>
    <div class="u-fx-f1 u-fx-ver">
      <div class="top-btn-group">
        <a-button icon="plus" @click="_addNews(false, '新增政策')" class="add-btn">新增政策</a-button>
      </div>
      <submit-form
        ref="city"
        @submit-form="submitCity"
        :title="titleCity"
        v-model="formCity"
        :form-data="formCityData"
      ></submit-form>
      <submit-form
        ref="form"
        @submit-form="submit"
        :title="title"
        v-model="formUser"
        :form-data="formData"
      >
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
      <table-list :page-list="pageList" :columns="accountColumns" :table-list="orgInfo">
        <template v-slot:other1="other1">
          <div v-html="other1.record.content.substr(0, 50)"></div>
        </template>
        <template v-slot:actions="action">
          <a-tooltip placement="topLeft" title="编辑">
            <a-button
              @click="_addNews(true, '编辑政策', action)"
              size="small"
              class="edit-action-btn"
              icon="form"
            ></a-button>
          </a-tooltip>
          <a-popconfirm placement="left" okText="确定" cancelText="取消" @confirm="_delNews(action)">
            <template slot="title">您确定删除吗?</template>
            <a-tooltip placement="topLeft" title="删除">
              <a-button size="small" class="del-action-btn" icon="delete"></a-button>
            </a-tooltip>
          </a-popconfirm>
        </template>
      </table-list>
      <page-num v-model="pageList" :total="total" @change-page="showList"></page-num>
    </div>
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
const formCityData = [
  {
    value: 'name',
    initValue: '',
    type: 'input',
    label: '城市名',
    placeholder: '请输入城市名'
  }
]
const formData = [
  {
    value: 'title',
    initValue: '',
    type: 'input',
    label: '政策标题',
    placeholder: '请输入政策标题'
  },
  {
    type: 'other',
    label: '政策内容'
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
    title: '政策标题',
    width: '20%',
    dataIndex: 'title'
  },
  {
    title: '政策内容',
    width: '60%',
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
  name: 'OrgInfo',
  components: {
    SearchForm,
    TableList,
    PageNum,
    SubmitForm,
    quillEditor
  },
  data() {
    return {
      cityList: [],
      titleCity: '',
      formCity: false,
      formCityData,
      infoList: [],
      current: -1,
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
      orgInfo: []
    }
  },
  mounted() {
    this.showList('city')
  },
  methods: {
    ...mapActions('home', ['addOrgInfo', 'updateOrgInfo', 'delOrgInfo', 'getOrgInfo']),
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
    tabChange(item, index) {
      this.current = index
      this.cityId = item._id
      this.showList('info', this.cityId)
    },
    _addCity(type, title, item) {
      this.isEdit = type
      this.titleCity = title
      if (type) {
        this._id = item.record._id
        this.actionFun = 'updateOrgInfo'
        this.formData = this.$tools.fillForm(formData, item.record)
      } else {
        this.actionFun = 'addOrgInfo'
        this.formData = formData
      }
      this.formCity = true
    },
    async submitCity(values) {
      try {
        if (this.isEdit) {
          values._id = this._id
        }
        await this[this.actionFun]({
          ...values,
          type: 'city',
          createTime: new Date().getTime()
        })

        this.$refs.city.reset()
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.showList('city')
        })
      } catch (err) {
        this.$refs.city.error()
      }
    },
    // 删除账号
    async _delNews(action) {
      await this.delOrgInfo({
        _id: action.record._id
      })
      this.$message.success('删除成功')
      this.$tools.goNext(() => {
        this.showList('info')
      })
    },
    async showList(type, id) {
      let params = ''
      if (type) {
        params = {
          ...this.pageList,
          cityId: id
        }
      } else {
        params = {
          page: 1,
          size: 30
        }
      }
      const res = await this.getOrgInfo({
        ...params,
        type
      })
      if (type === 'city') {
        this.cityList = res.data
        this.cityId = res.data ? res.data[0]._id : ''
      } else {
        this.orgInfo = res.data
        this.total = res.total
      }
    },
    _addNews(type, title, item) {
      this._isEdit = type
      this.title = title
      if (type) {
        this.__id = item.record._id
        this.actionFun = 'updateOrgInfo'
        this.content = item.record.content
        this.formData = this.$tools.fillForm(formData, item.record)
      } else {
        this.actionFun = 'addOrgInfo'
        this.content = ''
        this.formData = formData
      }
      this.formUser = true
    },
    async submit(values) {
      if (!this.content) {
        this.$refs.form.error()
        this.$message.warning('请填写内容')
        return
      }
      try {
        if (this._isEdit) {
          values._id = this.__id
        }
        await this[this.actionFun]({
          ...values,
          cityId: this.cityId,
          type: 'info',
          content: this.content,
          createTime: new Date().getTime()
        })

        this.$refs.form.reset()
        this.$message.success('操作成功')
        this.$tools.goNext(() => {
          this.showList('info', this.cityId)
        })
      } catch (err) {
        this.$refs.form.error()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.org-left {
  width: 200px;
  ul {
    li {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px #f5f5f5 solid;
      text-align: center;
      cursor: pointer;
      &.act {
        color: #fff;
        background-color: @u-type-primary;
      }
    }
  }
}
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
