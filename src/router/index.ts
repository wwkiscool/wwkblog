import { createRouter,createWebHashHistory,RouteRecordRaw ,createWebHistory } from "vue-router";
import BlogIndex from '../components/MainPage/BlogIndex.vue';

import BlogDetail from '@/components/MainPage/BlogDetail.vue';
// import MessageBoard from '@/components/MainPage/MessageBoard.vue';
// import FriendUrl from '@/components/MainPage/FriendUrl.vue';
// import TimeLine from '@/components/MainPage/TimeLine.vue';
// import AboutMe from '@/components/MainPage/AboutMe.vue';
// import analytics from '@/components/MainPage/analytics.vue';
const routes:Array<RouteRecordRaw> = [
    {
        path:'/',
        name:"BlogIndex",
        component:BlogIndex
    },
    //  {
    //     path: '/BlogDetail',
    //     name: 'BlogDetail',
    //     component: BlogDetail
    //   },
    //    {
    //     path: '/MessageBoard',
    //     name: 'MessageBoard',
    //     component: MessageBoard
    //   }, {
    //     path: '/FriendUrl',
    //     name: 'FriendUrl',
    //     component: FriendUrl
    //   }, {
    //     path:'/TimeLine',
    //     name:'TimeLine',
    //     component:TimeLine
    //   }, {
    //     path:'/AboutMe',
    //     name:'AboutMe',
    //     component:AboutMe
    //   },{
    //     path:'/analytics',
    //     name:'analytics',
    //     component:analytics
    //   }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router