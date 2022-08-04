# work record;
# Ts 


#### 1.全局挂载 方法  
    --- vue2 ： 在Vue.prototype中挂载 然后在组件的this 中调用
    --- vue3 ： 1. 挂载 app = create(); 2: app.config.globalProperties  在这里面挂载
                2. 使用 方式一 全局挂载的变量 使用 import { getCurrentInstance , ComponentInternalInstance} from "vue"
                        const { proxy }: any = getCurrentInstance()
                        console.log("proxy", proxy.$DateFormat());
                        const { appContext: { config: { globalProperties } } } = getCurrentInstance() as ComponentInternalInstance;

#### 2. * 未知属性  判断类型方式
        * @type:1
        * let obj: { [key:string]:any }= {}
        * @type: 2
        * let obj: Record<string,any>= {}