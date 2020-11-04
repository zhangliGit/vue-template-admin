// eslint-disable-next-line
import { BasicLayout, RouteView } from '../layouts'
const Home = resolve => require(['../views/Home.vue'], resolve)
const UserManage = resolve => require(['../views/UserManage.vue'], resolve)
const Interface = resolve => require(['../views/Interface.vue'], resolve)
const ProtalMobile = resolve => require(['../views/ProtalMobile.vue'], resolve)
const ProtalWeb = resolve => require(['../views/ProtalWeb.vue'], resolve)
const IconManage = resolve => require(['../views/IconManage.vue'], resolve)
const MiniIcon = resolve => require(['../views/MiniIcon.vue'], resolve)
const AppVersion = resolve => require(['../views/AppVersion.vue'], resolve)
const VersionList = resolve => require(['../views/VersionList.vue'], resolve)
const CardList = resolve => require(['../views/CardList.vue'], resolve)
const OnLine = resolve => require(['../views/OnLine.vue'], resolve)

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '班牌预览'
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '班牌预览',
          icon: 'eye'
        }
      },
      {
        path: '/userManage',
        name: 'userManage',
        component: UserManage,
        meta: {
          title: '账号管理',
          icon: 'team'
        }
      },
      {
        path: '/interface',
        name: 'interface',
        component: Interface,
        meta: {
          title: '异常接口',
          icon: 'alert'
        }
      },
      {
        path: '/protal-mobile',
        name: 'protal-mobile',
        component: ProtalMobile,
        meta: {
          title: '云平台移动端',
          icon: 'tablet'
        }
      },
      {
        path: '/icon-manage',
        name: 'icon-manage',
        component: IconManage,
        meta: {
          title: '移动端图标',
          icon: 'tablet'
        }
      },
      {
        path: '/mini-icon',
        name: 'mini-icon',
        component: MiniIcon,
        meta: {
          title: '小程序图标',
          icon: 'tablet'
        }
      },
      {
        path: '/protal-web',
        name: 'protal-web',
        component: ProtalWeb,
        meta: {
          title: '云平台web端',
          icon: 'laptop'
        }
      },
      {
        path: '/app-version',
        name: 'app-version',
        component: AppVersion,
        meta: {
          title: '班牌客户端',
          icon: 'laptop'
        }
      },
      {
        path: '/app-version/list',
        name: '/version-list',
        component: VersionList,
        meta: {
          title: '版本列表',
          isHide: true
        }
      },
      {
        path: '/card-list',
        name: 'card-list',
        component: CardList,
        meta: {
          title: '班牌列表',
          icon: 'bars'
        }
      },
      {
        path: '/on-line',
        name: 'on -line',
        component: OnLine,
        meta: {
          title: '在线班牌',
          icon: 'loading'
        }
      }
      // {
      //   path: '/',
      //   name: 'totalManage',
      //   component: RouteView,
      //   redirect: '/userTotal',
      //   meta: {
      //     title: '平安校园移动端',
      //     icon: 'pie-chart'
      //   },
      //   children: [
      //     {
      //       path: '/userTotal',
      //       name: 'userTotal',
      //       component: UserTotal,
      //       meta: {
      //         title: '按人员统计',
      //         icon: 'bar-chart'
      //       }
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
const constantRouterMap = [
  // {
  //   path: '',
  //   name: 'login',
  //   component: () => import(/* webpackChunkName: "login" */ '../views/user/Login')
  // }
]

let RouterMap = [...asyncRouterMap, ...constantRouterMap]
if (process.env.NODE_ENV === 'development') {
  RouterMap = [...asyncRouterMap, ...constantRouterMap]
}

export default RouterMap
