// eslint-disable-next-line
import {
  BasicLayout,
  RouteView 
} from '../layouts'
const Login = resolve => require(['../views/user/Login.vue'], resolve)
const Home = resolve => require(['../views/Home.vue'], resolve)
const SchoolManage = resolve => require(['../views/SchoolManage.vue'], resolve)
const DeviceManage = resolve => require(['../views/DeviceManage.vue'], resolve)
const UserManage = resolve => require(['../views/UserManage.vue'], resolve)
// const AccountManage = resolve => require(['../views/AccountManage.vue'], resolve)
const DoorManage = resolve => require(['../views/DoorManage.vue'], resolve)
const UserTotal = resolve => require(['../views/UserTotal.vue'], resolve)
const DayTotal = resolve => require(['../views/DayTotal.vue'], resolve)
const MonthTotal = resolve => require(['../views/MonthTotal.vue'], resolve)

export const asyncRouterMap = [{
  path: '/home',
  name: 'index',
  component: BasicLayout,
  meta: {
    title: '学校预览'
  },
  redirect: '/home',
  children: [{
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
    path: '/deviceManage',
    name: 'deviceManage',
    component: DeviceManage,
    meta: {
      title: '设备管理',
      icon: 'camera'
    }
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: UserManage,
    meta: {
      title: '人员管理',
      icon: 'team'
    }
  },
  {
    path: '/doorManage',
    name: 'doorManage',
    component: DoorManage,
    meta: {
      title: '门口记录管理',
      icon: 'container'
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
      },
      {
        path: '/dayTotal',
        name: 'dayTotal',
        component: DayTotal,
        meta: {
          title: '按天统计',
          icon: 'bar-chart'
        }
      },
      {
        path: '/monthTotal',
        name: 'monthTotal',
        component: MonthTotal,
        meta: {
          title: '按月统计',
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
const constantRouterMap = [{
  path: '',
  name: 'login',
  component: () => import(/* webpackChunkName: "login" */ '../views/user/Login')
}]

let RouterMap = [...asyncRouterMap, ...constantRouterMap]
if (process.env.NODE_ENV === 'development') {
  RouterMap = [...asyncRouterMap, ...constantRouterMap]
}

export default RouterMap
