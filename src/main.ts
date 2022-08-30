import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store/index"
import CommonFunction from './utils/utils'
import './assets/css/base.less'
import './static/iconfont/iconfont.css'
import Particles from 'particles.vue3'
import funny from "./utils/funny";
// import UILibrary from './ui-library/index.js'
// import Container from './components/SonComponent/Container.vue'

funny.init();
router.beforeEach((to:any,from,next) => {  
    let title:string = to.meta.title;
    funny.setTitle(title);
    next()
})


const app = createApp(App)
app.use(CommonFunction)
app.use(store)
app.use(Particles)
// app.component('Container',Container)


app.use(router).mount('#app')
