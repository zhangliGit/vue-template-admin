// eslint-disable-next-line
import { BasicLayout, RouteView } from '../layouts'
const Home = resolve => require(['../views/Home.vue'], resolve)
const SchoolManage = resolve => require(['../views/SchoolManage.vue'], resolve)
const UserTotal = resolve => require(['../views/UserTotal.vue'], resolve)

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '学校预览'
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '学校预览',
          icon: 'eye'
        }
      },
      {
        path: '/schoolManage',
        name: 'schoolManage',
        component: SchoolManage,
        meta: {
          title: '机构管理',
          icon: 'bank'
        }
      },
      {
        path: '/totalManage',
        name: 'totalManage',
        component: RouteView,
        redirect: '/userTotal',
        meta: {
          title: '统计信息管理',
          icon: 'pie-chart'
        },
        children: [
          {
            path: '/userTotal',
            name: 'userTotal',
            component: UserTotal,
            meta: {
              title: '按人员统计',
              icon: 'bar-chart'
            }
          }
        ]
      }
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
