// eslint-disable-next-line
import { BasicLayout, RouteView } from '../layouts'
const Home = resolve => require(['../views/Home.vue'], resolve)
const UserManage = resolve => require(['../views/UserManage.vue'], resolve)
const Interface = resolve => require(['../views/Interface.vue'], resolve)
const ProtalMobile = resolve => require(['../views/ProtalMobile.vue'], resolve)
const ProtalWeb = resolve => require(['../views/ProtalWeb.vue'], resolve)
const IconManage = resolve => require(['../views/IconManage.vue'], resolve)

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '发布预览'
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '发布预览',
          icon: 'eye'
        }
      },
      {
        path: '/userManage',
        name: 'userManage',
        component: UserManage,
        meta: {
          title: '账号管理',
          icon: 'bank'
        }
      },
      {
        path: '/interface',
        name: 'interface',
        component: Interface,
        meta: {
          title: '异常接口',
          icon: 'bank'
        }
      },
      {
        path: '/protal-mobile',
        name: 'protal-mobile',
        component: ProtalMobile,
        meta: {
          title: '云平台移动端',
          icon: 'bank'
        }
      },
      {
        path: '/protal-web',
        name: 'protal-web',
        component: ProtalWeb,
        meta: {
          title: '云平台web端',
          icon: 'bank'
        }
      },
      {
        path: '/icon-manage',
        name: 'icon-manage',
        component: IconManage,
        meta: {
          title: '移动端图标',
          icon: 'bank'
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
