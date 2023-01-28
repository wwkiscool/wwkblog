import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
const routes = [
  {
    path: "/",
    name: "首页",
    // component: defineAsyncComponent(() => import('@/components/MainPage/Home.vue')),
    component: () => import('@/components/MainPage/Home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/BlogIndex',
    name: "BlogIndex",
    component: () => import('@/components/MainPage/BlogIndex.vue'),
    meta:{
      title:"博文"
    }
  },
  {
    path: '/BlogDetail',
    name: 'BlogDetail',
    component: () => import('@/components/MainPage/BlogDetail.vue'),
    meta:{
      title:"加载中..."
    }
  },
  {
    path: '/MessageBoard',
    name: 'MessageBoard',
    component: () => import('@/components/MainPage/MessageBoard.vue'),
    meta:{
      title:"留言板"
    }
  },
  //  {
  //     path: '/FriendUrl',
  //     name: 'FriendUrl',
  //     component: FriendUrl
  //   }
  {
    path: '/TimeLine',
    name: 'TimeLine',
    component: () => import('@/components/MainPage/TimeLine.vue'),
    meta:{
      title:"时间线"
    }
  },
  {
    path: '/AboutMe',
    name: 'AboutMe',
    component: () => import('@/components/MainPage/AboutMe.vue'),
    meta:{
      title:"关于我-嘎嘎帅"
    }
  }
  ,{
      path:'/tian',
      name:'tian',
      component:() => import('@/tian-ui/components/demo.vue')
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router