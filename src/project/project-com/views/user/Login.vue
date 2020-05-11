<template>
  <div class="protal-login">
    <div class="protal-logo"></div>
    <div class="protal-dialog">
      <div class="title">组件示例</div>
      <div class="protal-box">
        <a-tabs v-model="autoKey">
          <a-tab-pane tab="登录" key="1">
            <div class="padd">
              <div class="tip-error"><img v-if="tipLogin" :src="tipError" alt="" />{{ tipLogin }}</div>
              <div class="input-text" style="margin-top: 28px">
                <a-input @change="tipLogin = ''" placeholder="请输入账号" v-model="userName">
                  <img slot="addonBefore" src="./img/user.png" alt="" />
                </a-input>
              </div>
              <div class="input-text">
                <a-input type="password" @change="tipLogin = ''" placeholder="请输入密码" v-model="userPass">
                  <img slot="addonBefore" src="./img/pwd.png" alt="" />
                </a-input>
              </div>
              <a-button class="login-btn" type="primary" @click="accountLogin" :loading="loadingOne">{{
                loginText
              }}</a-button>
              <a-row style="margin-top: 30px">
                <a-col :span="12" style="text-align: left">
                  <a-checkbox :checked="isCheck" @change="onChange">记住账号</a-checkbox>
                </a-col>
                <a-col :span="12" style="text-align: right"> </a-col>
              </a-row>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import tipError from './img/tip.png'
export default {
  name: 'App',
  components: {},
  data() {
    return {
      tipError,
      tipLogin: '',
      tipMsg: '',
      userName: 'admin',
      userPass: '123456',
      phoneNum: '',
      phoneCode: '',
      loginText: '登录',
      loadingOne: false,
      loadingTwo: false,
      autoKey: '1',
      yzmTag: false,
      yzmLoad: false,
      yzmText: '获取验证码',
      isCheck: false
    }
  },
  created() {
    document.onkeydown = () => {
      const key = window.event.keyCode
      if (key === 13) {
        if (this.autoKey === '1') {
          this.accountLogin()
        } else {
          this.msgLogin()
        }
      }
    }
  },
  mounted() {
    this.ConfigEnv = process.env.NODE_ENV
    const rememberInfo = window.localStorage.getItem('isRemember')
    if (rememberInfo) {
      this.userName = JSON.parse(rememberInfo).userName
      this.isCheck = true
    } else {
      this.isCheck = false
    }
  },
  methods: {
    changePass(event) {
      this.tipLogin = ''
    },
    async accountLogin() {
      if (this.userName === '') {
        this.tipLogin = '请输入账号'
        return
      }
      if (this.userPass === '') {
        this.tipLogin = '请输入密码'
        return
      }
      this.$router.push('/home')
    },
    onChange(event) {
      this.isCheck = event.target.checked
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes move {
  0% {
    right: -30%;
  }
  100% {
    right: 5%;
  }
}
@keyframes big {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.protal-login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('./img/logo-bg.png') no-repeat 10% 50%;
  background-color: rgb(2, 0, 36);
  background-size: 733px 551px;
  z-index: 99;
  .protal-logo {
    animation: big 1s linear;
    transform: scale(1);
    position: absolute;
    left: 80px;
    top: 50px;
    width: 138px;
    height: 37px;
    z-index: 88;
  }
  /deep/ .ant-tabs-nav-container {
    font-size: 16px !important;
  }
  /deep/ .ant-input {
    height: 38px !important;
  }
  .protal-dialog {
    animation: move 1s ease;
    right: 5%;
    position: absolute;
    z-index: 99;
    top: 25%;
    width: 800px;
    height: 460px;
    text-align: center;
    .title {
      height: 50px;
      color: #fff;
      font-size: 32px;
      font-weight: 600;
      letter-spacing: 6px;
    }
    .padd {
      margin: 0px 30px;
    }
    .input-text {
      padding: 3px;
      margin-top: 25px;
      border-radius: 4px;
    }
    .protal-box {
      border-radius: 10px;
      margin: 30px auto 0 auto;
      width: 440px;
      height: 380px;
      background-color: #fff;
    }
  }
  .tip-error {
    color: #ac2c1d;
    position: absolute;
    margin-top: -30px;
    margin-left: 10px;
    img {
      margin-top: -4px;
      margin-right: 2px;
      width: 24px;
      height: 24px;
    }
  }
  .login-btn {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
    background: linear-gradient(270deg, #4d4cac, #4d4cac);
    height: 45px;
    border-radius: 20px;
    line-height: 45px;
    width: 100%;
    margin-top: 40px;
  }
  .yzm-btn {
    background-color: #4d4cac;
    color: #fff;
    height: 36px;
  }
}
.footer {
  position: fixed;
  height: 40px;
  line-height: 40px;
  z-index: 99;
  bottom: 0px;
  width: 100%;
  left: 0px;
  font-size: 12px;
  color: #999;
  text-align: center;
  a {
    color: #666;
    padding-left: 10px;
  }
}
</style>
