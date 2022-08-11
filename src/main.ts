import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store/index"
import CommonFunction from './utils/utils'
import './assets/css/base.less'
import './static/iconfont/iconfont.css'
import Particles from 'particles.vue3'


const app = createApp(App)
app.use(CommonFunction)
app.use(store)
app.use(Particles)


app.use(router).mount('#app')
