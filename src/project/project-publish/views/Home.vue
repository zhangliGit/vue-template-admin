<template>
  <div class="home page-layout" style="overflow-y:scroll">
    <div @click="goView(view)" class="view-box qui-fx-jc qui-fx-ac" v-for="view in orgList" :key="view.id">
      <img :src="school" class="shcool-img" alt="" />
      {{ view.orgName }}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import school from '../assets/img/school.png'
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      school
    }
  },
  computed: {
    ...mapState('home', ['loginInfo', 'orgList'])
  },
  async mounted() {},
  methods: {
    ...mapActions('home', ['getOrgList']),
    ...mapMutations('home', ['updateState']),
    goView(view) {
      if (process.env.NODE_ENV === 'production') {
        window.open(`/pc-protal/door-record#/?orgCode=${view.orgCode}&orgName=${view.orgName}`)
      } else {
        window.open(`/door-record#/?orgCode=${view.orgCode}&orgName=${view.orgName}`)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.view-box {
  cursor: pointer;
  transition: all ease 0.3s;
  width: 18%;
  height: 140px;
  float: left;
  color: #fff;
  font-size: 24px;
  margin-top: 20px;
  margin-left: 1.66%;
  border-radius: 4px;
  background: rgba(2, 0, 36, 0.8);
  box-shadow: 0px 0px 4px #444;
  &:hover {
    transform: scale(1.1);
  }
  .shcool-img {
    width: 50px;
    height: 50px;
    display: block;
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>
