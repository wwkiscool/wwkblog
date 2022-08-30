import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
const routes = [
  {
    path: "/",
    name: "首页",
    component: defineAsyncComponent(() => import('@/components/MainPage/Home.vue')),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/BlogIndex',
    name: "BlogIndex",
    component: defineAsyncComponent(() => import('@/components/MainPage/BlogIndex.vue')),
    meta:{
      title:"博文"
    }
  },
  {
    path: '/BlogDetail',
    name: 'BlogDetail',
    component: defineAsyncComponent(() => import('@/components/MainPage/BlogDetail.vue')),
    meta:{
      title:"加载中..."
    }
  },
  {
    path: '/MessageBoard',
    name: 'MessageBoard',
    component: defineAsyncComponent(() => import('@/components/MainPage/MessageBoard.vue')),
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
    component: defineAsyncComponent(() => import('@/components/MainPage/TimeLine.vue')),
    meta:{
      title:"时间线"
    }
  },
  {
    path: '/AboutMe',
    name: 'AboutMe',
    component: defineAsyncComponent(() => import('@/components/MainPage/AboutMe.vue')),
    meta:{
      title:"关于我-嘎嘎帅"
    }
  }
  // ,{
  //     path:'/analytics',
  //     name:'analytics',
  //     component:analytics
  //   }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router