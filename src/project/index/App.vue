<template>
  <div class="protal-index">
    <div class="title">平安校园云平台</div>
    <div class="qui-fx-f1 protal-list">
      <div
        v-for="(app, index) in appList"
        :key="index"
        class="box qui-fx-ac-jc"
        @click="goHtml(app.url)"
      >
        <img :src="autoImg" alt />
        {{ app.name }}
      </div>
    </div>
  </div>
</template>
<script>
import autoImg from '@a/img/auto_app.png'
export default {
  name: 'App',
  components: {},
  data() {
    return {
      autoImg,
      appList: [
        {
          id: 0,
          name: '登录',
          url: 'protal-login'
        },
        {
          name: '项目组件',
          url: 'project-com'
        },
        {
          name: '项目发布记录',
          url: 'project-publish'
        },
        {
          name: '官网',
          url: 'project-site'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    goHtml(path) {
      window.location.href = `./${path}.html`
    }
  }
}
</script>

<style lang="less">
.protal-index {
  background: rgb(15, 13, 65);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(50, 50, 190, 1) 0%, rgba(10, 86, 101, 1) 70%);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  .title {
    text-shadow: 0px 0px 3px #ccc;
    height: 150px;
    text-align: center;
    color: #fff;
    letter-spacing: 4px;
    line-height: 120px;
    font-size: 34px;
  }
  .protal-list {
    width: 1020px;
    margin: 0 auto;
  }
  .box {
    transition: all 0.5s ease;
    color: #666;
    float: left;
    margin-top: 20px;
    margin-left: 20px;
    border-right: 1px #ccc solid;
    padding: 50px 0;
    width: 150px;
    height: 150px;
    border-radius: 4px;
    box-shadow: 0px 0px 2px #ccc;
    margin-left: 20px;
    cursor: pointer;
    background: #fff;
    img {
      margin-bottom: 15px;
    }
    &:hover {
      transform: scale(1.1);
      background: #666;
      color: #f5f5f5;
      box-shadow: 0px 0px 6px #ccc;
    }
  }
}
</style>
