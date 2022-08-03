import { createRouter,createWebHashHistory,RouteRecordRaw } from "vue-router";
import BlogIndex from '../components/MainPage/BlogIndex.vue';
const routes:Array<RouteRecordRaw> = [
    {
        path:'/',
        name:"BlogIndex",
        component:BlogIndex
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router