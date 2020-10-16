<template>
  <div class="device-list page-layout qui-fx-ver">
    <div class="about u-fx">
      <div class="u-fx-f1">
        <div class="title">产品优势</div>
        <quill-editor
          style="width: 80%; height:400px"
          v-model="content"
          ref="myQuillEditor"
          :options="quillOption"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event, 'content')"
        ></quill-editor>
      </div>
    </div>
    <div style="margin:50px 20px">
      <a-button type="primary" @click="_save">保存</a-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import quillConfig from './quill-config'
export default {
  name: 'ProductDes',
  components: {
    quillEditor
  },
  data() {
    return {
      quillOption: quillConfig,
      detail: {},
      content: ''
    }
  },
  mounted() {
    this._getAbout()
  },
  methods: {
    ...mapActions('home', ['addAbout', 'updateAbout', 'delAbout', 'getAbout']),
    // 富文本编辑器方法
    onEditorFocus(data) {},
    // 获得焦点事件
    onEditorChange(data, tag) {
      this[tag] = data.html
    },
    async _getAbout() {
      const res = await this.getAbout({
        type: 'product'
      })
      if (res.data.length > 0) {
        this.edit = true
        this.actionFun = 'updateAbout'
        this._id = res.data[0]._id
        this.content = res.data[0].content
        this.content1 = res.data[0].content1
      } else {
        this.edit = false
        this.actionFun = 'addAbout'
      }
    },
    async _save() {
      const params = {
        content: this.content,
        type: 'product',
        createTime: new Date().getTime()
      }
      if (this.edit) {
        params._id = this._id
      }
      try {
        await this[this.actionFun]({ ...params })
        this.$message.success('操作成功')
      } catch (err) {}
    }
  }
}
</script>

<style lang="less" scoped>
.about {
  margin: 20px;
  .title {
    font-weight: bold;
    padding: 10px 0;
  }
}
</style>
