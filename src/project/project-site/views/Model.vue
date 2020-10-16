<template>
  <div class="model page-layout qui-fx-ver u-scroll-y">
    <div class="title">业务模式</div>
    <div class="about u-fx">
      <div class="u-fx-f1">
        <quill-editor
          style="width: 100%; height:250px"
          v-model="ywOne"
          ref="myQuillEditor"
          :options="quillOption"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event, 'content')"
        ></quill-editor>
      </div>
      <div class="u-fx-f1" style="margin-left: 20px">
        <quill-editor
          style="width: 100%; height: 250px"
          v-model="ywTwo"
          ref="myQuillEditor1"
          :options="quillOption"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event, 'content1')"
        ></quill-editor>
      </div>
    </div>
    <div class="title" style="margin-top: 40px">合作模式</div>
    <div class="about u-fx">
      <div class="u-fx-f1">
        <quill-editor
          style="width: 100%; height:250px"
          v-model="hzOne"
          ref="myQuillEditor"
          :options="quillOption"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event, 'content')"
        ></quill-editor>
      </div>
      <div class="u-fx-f1" style="margin-left: 20px">
        <quill-editor
          style="width: 100%; height: 250px"
          v-model="hzTwo"
          ref="myQuillEditor1"
          :options="quillOption"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event, 'content1')"
        ></quill-editor>
      </div>
    </div>
    <div style="margin:50px 0">
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
  name: 'About',
  components: {
    quillEditor
  },
  data() {
    return {
      quillOption: quillConfig,
      detail: {},
      ywOne: '',
      ywTwo: '',
      hzOne: '',
      hzTwo: ''
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
        type: 'model'
      })
      if (res.data.length > 0) {
        this.edit = true
        this.actionFun = 'updateAbout'
        this._id = res.data[0]._id
        this.ywOne = res.data[0].ywOne
        this.ywTwo = res.data[0].ywTwo
        this.hzOne = res.data[0].hzOne
        this.hzTwo = res.data[0].hzTwo
      } else {
        this.edit = false
        this.actionFun = 'addAbout'
      }
    },
    async _save() {
      const params = {
        ywOne: this.ywOne,
        ywTwo: this.ywTwo,
        hzOne: this.hzOne,
        hzTwo: this.hzTwo,
        type: 'model',
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
.model {
  padding: 10px 20px;
  .title {
    font-weight: bold;
    padding: 10px 0;
  }
}
</style>
