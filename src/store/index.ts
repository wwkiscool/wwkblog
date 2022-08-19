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
const getters = {
  GetMessageText(state:state) {
    return state.MessageText
  }
}

const mutations = {
  // 顶部导航栏
  ChangeActive:function (state:state,value:number) {
    state.Active = value;
  },
    ChangeLoading(state:state,value:boolean) {
        state.loading = value;
    },
    // 表情包组件
    ChangeEmotionShow:function (State:state,Value:boolean) {
        State.EmotionShow = Value;
      },
    // 留言组件
    AppendMessageText (state:state,Value:string) {
        state.MessageText += Value;
      },
      CleanMessageText (state:state) {
        state.MessageText = '';
      },
      ChangeMessageText (state:state,Value:string) {
        state.MessageText = Value;
      },
      // Tips组件
    ChangeTip:function (State:state,Value:{Show:boolean,Title:string}) {
        State.Tips.Show = Value.Show;
        State.Tips.Title = Value.Title;
      },
  
}
const store = createStore({
    state,
    getters,
    mutations
});
export default store