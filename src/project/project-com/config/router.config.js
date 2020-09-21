// eslint-disable-next-line
import { BasicLayout, RouteView } from '../layouts'
const Home = resolve => require(['../views/Home.vue'], resolve)
const Form = resolve => require(['../views/Form.vue'], resolve)
const Demo = resolve => require(['../views/Demo.vue'], resolve)
const ProjectCom = resolve => require(['../views/ProjectCom.vue'], resolve)

export const asyncRouterMap = [
  {
    path: '/home',
    name: 'index',
    component: BasicLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '公共按钮',
          icon: 'bank'
        }
      },
      {
        path: '/form',
        name: 'form',
        component: Form,
        meta: {
          title: '表单组件',
          icon: 'bank'
        }
      },
      {
        path: '/projectCom',
        name: 'projectCom',
        component: ProjectCom,
        meta: {
          title: '项目组件',
          icon: 'bank'
        }
      },
      {
        path: '/demo',
        name: 'demo',
        component: Demo,
        meta: {
          title: 'vue示例',
          icon: 'bank'
        }
      }
      // {
      //   path: '/totalManage',
      //   name: 'totalManage',
      //   component: RouteView,
      //   redirect: '/userTotal',
      //   meta: {
      //     title: '统计信息管理',
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
  {
    path: '',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/user/Login')
  }
]

let RouterMap = [...asyncRouterMap, ...constantRouterMap]
if (process.env.NODE_ENV === 'development') {
  RouterMap = [...asyncRouterMap, ...constantRouterMap]
}

export default RouterMap
