import { createStore } from "vuex";

interface state {
    loading: boolean,
    EmotionShow: boolean,
    // 顶部导航栏
    Active: number,
    OpenMobileMenu: boolean, //移动端菜单详情伸开、关闭
    // 留言组件
    MessageText: string,
    // Tip组件
    Tips: {
        Show: boolean,
        Title: string
    }
}

const state: state = {
    loading: false,
    EmotionShow: false,
    // 顶部导航栏
    Active: 0,
    OpenMobileMenu: false, //移动端菜单详情伸开、关闭
    // 留言组件
    MessageText: '',
    // Tip组件
    Tips: {
        Show: false,
        Title: ''
    }
}

const mutations = {
    ChangeLoading(state:state,value:boolean) {
        state.loading = value;
    }
}
const store = createStore({
    state,
    mutations
});
export default store