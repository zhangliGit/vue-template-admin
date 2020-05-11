<template>
  <a-layout class="qui-fx">
    <div :class="['slide-left', { 'slide-left-close': slideTag }]">
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :slide-tag="slideTag"
        :collapsed="collapsed"
      ></side-menu>
    </div>
    <div class="qui-fx-f1 qui-fx qui-fx-ver">
      <header-top @toggle="toggle" :slide-tag="slideTag"></header-top>
      <div class="qui-fx-f1 qui-fx-ver content-bg">
        <route-navigator></route-navigator>
        <route-view />
      </div>
    </div>
  </a-layout>
</template>

<script>
import { mixin, mixinDevice } from '@/utils/mixin'
import { mapState } from 'vuex'
import RouteView from './RouteView'
import SideMenu from '@/components/Menu/SideMenu'
import HeaderTop from '@/components/GlobalHeader/HeaderTop'
import RouteNavigator from '@c/RouteNavigator'
import asyncRouterMap from '../config/router.config.js'

export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    SideMenu,
    HeaderTop,
    RouteNavigator
  },
  data() {
    return {
      isDev: false,
      slideTag: false,
      routeAddress: [],
      allMenu: asyncRouterMap,
      menus: []
    }
  },
  computed: {
    ...mapState('home', ['loginInfo'])
  },
  created() {
    const showMenu = JSON.parse(JSON.stringify(this.allMenu)).find(item => item.path === '/').children
    this.menus = showMenu
    this.collapsed = !this.sidebarOpened
  },
  mounted() {},
  methods: {
    toggle(tag) {
      this.slideTag = !this.slideTag
    }
  }
}
</script>

<style lang="less">
@import url('../../../components/global.less');

/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */
.content-bg {
  padding: 5px 15px 15px;
}
.slide-left {
  transition: width 0.3s ease;
  width: 240px;
  overflow: hidden;
}
.slide-left-close {
  width: 560px;
}
.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
