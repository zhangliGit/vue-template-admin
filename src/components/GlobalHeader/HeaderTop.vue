<template>
  <div class="header-top">
    <submit-form ref="form" @submit-form="submitForm" title="修改密码" v-model="formStatus" :form-data="formData">
    </submit-form>
    <a-row type="flex" justify="space-between">
      <a-col style="font-size: 18px">
        <a-icon
          style="vertical-align: -0.15em; cursor: pointer; padding-right: 15px"
          :type="slideTag ? 'menu-unfold' : 'menu-fold'"
          @click="toggle"
        />
        <span class="select-box">
          <span>{{ loginInfo.systemName }}</span>
        </span>
      </a-col>
      <a-col>
        <a-dropdown>
          <div class="qui-fx-ac user-block">
            <span>{{ loginInfo.userName }}</span>
            <div class="user-icon">
              <img :src="userPic" alt="" />
            </div>
          </div>
          <a-menu slot="overlay" style="background-color: #31384b; min-width: 120px">
            <a-menu-item @click="loginOut" key="3" style="color: #999">注销</a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import SubmitForm from '@c/SubmitForm'
import userPic from '../../assets/img/user-icon.png'
import hostEnv from '@config/host-env'
const formData = [
  {
    value: 'oldPassword',
    initValue: '',
    type: 'input',
    label: '旧密码',
    placeholder: '请输入旧密码'
  },
  {
    value: 'newPassword',
    initValue: '',
    type: 'input',
    password: true,
    label: '新密码',
    placeholder: '请输入新密码'
  },
  {
    value: 'confirmPassword',
    initValue: '',
    password: true,
    type: 'input',
    label: '确认新密码',
    placeholder: '请再次输入新密码'
  }
]
export default {
  name: 'HeaderTop',
  props: {},
  components: {
    SubmitForm
  },
  computed: {
    ...mapState('home', ['slideTag', 'loginInfo'])
  },
  data() {
    return {
      userPic,
      formStatus: false,
      formData
    }
  },
  async mounted() {},
  methods: {
    changePass() {
      this.formStatus = true
    },
    submitForm({ oldPassword, newPassword, confirmPassword }) {
      if (newPassword !== confirmPassword) {
        this.$message.warning('两次输入的新密码不一致')
      }
    },
    toggle() {
      const tag = !this.slideTag
      this.$emit('toggle', tag)
    },
    loginOut() {}
  }
}
</script>

<style lang="less" scoped>
.header-top {
  height: @head-h;
  padding: 0 10px;
  line-height: @head-h;
  color: @head-fff;
  width: 100%;
  background-color: @head-color;
}
.select-box {
  font-size: 16px;
  padding: 0 15px 0 15px;
  display: inline-block;
  height: 28px;
  line-height: 28px;
  border-radius: 20px;
  background-color: #31384b;
  span {
    padding-right: 10px;
  }
}
.user-block {
  height: 30px;
  margin-top: 10px;
}
.user-icon {
  width: 30px;
  height: 30px;
  margin: 0 10px;
  background-color: #ccc;
  overflow: hidden;
  border-radius: 100%;
  img {
    width: 30px;
    height: 30px;
    display: block;
  }
}
</style>
