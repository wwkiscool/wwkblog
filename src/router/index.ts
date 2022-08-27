import { createRouter,createWebHashHistory,RouteRecordRaw ,createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
const routes = [
  {
    path:"/",
    name:"首页",
    component:defineAsyncComponent( () => import('@/components/MainPage/Home.vue'))
  },
    {
        path:'/BlogIndex',
        name:"BlogIndex",
        component: defineAsyncComponent( () => import('@/components/MainPage/BlogIndex.vue'))
    },
     {
        path: '/BlogDetail',
        name: 'BlogDetail',
        component:  defineAsyncComponent( () => import('@/components/MainPage/BlogDetail.vue'))
      },
       {
        path: '/MessageBoard',
        name: 'MessageBoard',
        component:  defineAsyncComponent( () => import('@/components/MainPage/MessageBoard.vue'))
      },
      //  {
    //     path: '/FriendUrl',
    //     name: 'FriendUrl',
    //     component: FriendUrl
    //   }
     {
       path:'/TimeLine',
        name:'TimeLine',
        component: defineAsyncComponent( () => import('@/components/MainPage/TimeLine.vue'))
      }, 
    {
        path:'/AboutMe',
        name:'AboutMe',
        component: defineAsyncComponent( () => import('@/components/MainPage/AboutMe.vue'))
      }
    // ,{
    //     path:'/analytics',
    //     name:'analytics',
    //     component:analytics
    //   }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router