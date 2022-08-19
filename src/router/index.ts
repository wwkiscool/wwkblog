import { createRouter,createWebHashHistory,RouteRecordRaw ,createWebHistory } from "vue-router";
import BlogIndex from '../components/MainPage/BlogIndex.vue';

import BlogDetail from '@/components/MainPage/BlogDetail.vue';
// import MessageBoard from '@/components/MainPage/MessageBoard.vue';
// import FriendUrl from '@/components/MainPage/FriendUrl.vue';
// import TimeLine from '@/components/MainPage/TimeLine.vue';
// import AboutMe from '@/components/MainPage/AboutMe.vue';
// import analytics from '@/components/MainPage/analytics.vue';
const routes = [
    {
        path:'/',
        name:"BlogIndex",
        component:() => import('@/components/MainPage/BlogIndex.vue')
    },
     {
        path: '/BlogDetail',
        name: 'BlogDetail',
        component: () => import('@/components/MainPage/BlogDetail.vue')
      },
       {
        path: '/MessageBoard',
        name: 'MessageBoard',
        component: () => import('@/components/MainPage/MessageBoard.vue')
      },
      //  {
    //     path: '/FriendUrl',
    //     name: 'FriendUrl',
    //     component: FriendUrl
    //   }, {
    //     path:'/TimeLine',
    //     name:'TimeLine',
    //     component:TimeLine
    //   }, 
    {
        path:'/AboutMe',
        name:'AboutMe',
        component:() => import('@/components/MainPage/AboutMe.vue')
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