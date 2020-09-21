// eslint-disable-next-line
import { BasicLayout, RouteView } from '../layouts'
const Home = resolve => require(['../views/Home.vue'], resolve)
const VideoList = resolve => require(['../views/VideoList.vue'], resolve)
const CaseList = resolve => require(['../views/CaseList.vue'], resolve)
const NewsList = resolve => require(['../views/NewsList.vue'], resolve)
const SolutionList = resolve => require(['../views/SolutionList.vue'], resolve)
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '首页',
          icon: 'eye'
        }
      },
      {
        path: '/video-list',
        name: 'video-list',
        component: VideoList,
        meta: {
          title: '视频专区',
          icon: 'laptop'
        }
      },
      {
        path: '/solution-list',
        name: 'solution-list',
        component: SolutionList,
        meta: {
          title: '解决方案',
          icon: 'laptop'
        }
      },
      {
        path: '/case-list',
        name: 'case-list',
        component: CaseList,
        meta: {
          title: '客户案例',
          icon: 'laptop'
        }
      },
      {
        path: '/news-list',
        name: 'news-list',
        component: NewsList,
        meta: {
          title: '新闻资讯',
          icon: 'laptop'
        }
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
