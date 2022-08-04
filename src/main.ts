import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import CommonFunction from './utils/utils'
import './assets/css/base.css'

const app = createApp(App)
app.use(CommonFunction)

app.use(router).mount('#app')
