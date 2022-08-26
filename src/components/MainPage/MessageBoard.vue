<template>
  <transition name="Fade" mode="out-in">
    <div style="position: relative">
      <div class="MessageBoardCover" @click="CloseMessageSubmit">
        <div :class="OpenMessageSubmitValue ? 'WriteMessageFrameFadeIn' : 'WriteMessageFrameFadeOut'">
          <div class="WriteMessageFrameLeft">
            <img src="../../static/img/DefaultHeadIcon.jpg">
            <div>欢迎你来</div>
          </div>
          <div style="flex: 1">
            <div
              :class="OpenTextAreaCover ? 'WriteMessageFrameContent' : 'WriteMessageFrameContent WriteMessageFrameContentColorBorder'">
              <!--阻止触发CloseMessageSubmit-->
              <textarea ref="LeaveMessageTextArea" placeholder="输入留言" v-model="MessageText" @click.stop="">
              </textarea>
              <span class="EmotionButton" @click="OpenEmotions()">
                <i class="iconfont icon-face IconfontSize"></i>
              </span>
              <!--需阻止冒泡，否则会冒泡到最上层，触发CloseMessageSubmit方法。该方法逻辑与此处方法操作相反-->
              <div class="TextAreaCover" @click.stop="OpenMessageSubmit()" v-if="OpenTextAreaCover">来都来啦，留个脚印吧</div>
            </div>
            <div class="OpenMessageSubmit">
              <div class="LeaveMessageName">
                <!--阻止触发CloseMessageSubmit-->
                <input placeholder="输入你的大名或昵称" v-model="MessageLeaveName" @click.stop="">
              </div>
              <div class="OpenMessageSubmitButton" @click="MessageSubmit()">提交</div>
            </div>
          </div>
        </div>
      </div>

      <div class="BlogIndexContent">
        <div class="BlogFlex">
          <div class="BlogIndexContentLeft"
            style="background-color:#ffffff;margin-top: 1rem;border:1px solid #e9e9e9;border-radius: 3px">
            <div class="CommentList">
              <div class="CommentItem" v-for="(item, i) in MessageList" v-bind:key="i">
                <div class="CommentItemIcon">
                  <!--如果用户名是sunq，直接展示我的专属头像。如果不是sunq，展示库里存的本条数据的头像，如果数据里该字段为空，展示默认头像-->
                  <img :src="getIconAdress(item['iconNo'])" v-if="item['MessageLeaveName'] != 'sunq'">
                  <img src="../../static/img/ZhihuIcon.jpg" v-if="item['MessageLeaveName'] == 'sunq'">
                </div>
                <div class="CommentItemContent">
                  <div>{{ item['MessageLeaveName'] }}
                    <span v-if="item['LocationCityName'] && item['LocationCityName']['length'] > 0">
                      <i class='iconfont icon-buoumaotubiao23 LocationIconfont'></i>{{ item['LocationCityName'] }}
                    </span>
                  </div>
                  <div class="ArticleCommentText" v-html="item['MessageText']"></div>
                  <div class="DateAnswer">
                    <div class="DateAnswerLeft">{{ item['MessageLeaveDate'] }}</div>
                    <div class="DateAnswerRight" @click="AnswerMessage(item['MessageLeaveName'])">回复
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="NoDataHint" v-if="MessageList.length == 0">暂无数据</div>
            <div class="MessageBoardListBottom" v-if="AticleBottom">你滑到我底线啦</div>
          </div>
          <div class="BlogIndexContentRight" style="border:1px solid #e9e9e9;border-radius: 3px">
            <div class="Module" style="padding: 0 0 0.5rem;background-color: transparent">
              <div class="GitPart" @mouseenter="setButtonAnimate(true)" @mouseleave="setButtonAnimate(false)">
                <div class="TopBackBlack"></div>
                <div class="GitPic">
                  <img src="../../static/img/ZhihuIcon.jpg">
                </div>
                <div class="GitBack">
                  <i class="iconfont TopBackBlackGit icon-github1"></i>
                </div>
                <div class="Content">
                  <div class="GitName">Github</div>
                  <a class="BlueButton" :class="buttonAnimate ? 'open_animate' : ''" href="https://github.com/SunQQQ"
                    target="_blank" @click="readCode()">博客源码</a>
                  <div class="BlogStatistic">
                    <div class="BlogStatisticItem">
                      <div class="BlogStatisticItemNum">17</div>
                      <div class="BlogStatisticItemText AboutMeGitData">Followers</div>
                    </div>
                    <div class="BlogStatisticItem">
                      <div class="BlogStatisticItemNum">75</div>
                      <div class="BlogStatisticItemText AboutMeGitData">Star</div>
                    </div>
                    <div class="BlogStatisticItem">
                      <div class="BlogStatisticItemNum">17</div>
                      <div class="BlogStatisticItemText AboutMeGitData">Repositories</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="BigBlock AboutMeMarginTop">
                <div class="TitleFontLine">Contacts</div>
                <div class="BlogStatistic" style="border-top: none;padding-bottom: 0">
                  <div class="BlogStatisticItem">
                    <a href="https://github.com/SunQQQ" target="_blank" @click="contact('github')">
                      <i class="iconfont icon-github AboutMeIcon" style="color:#948aec"></i>
                    </a>
                  </div>
                  <div class="BlogStatisticItem">
                    <a href="https://www.zhihu.com/people/s-q-51-44-23/activities" target="_blank"
                      @click="contact('知乎')">
                      <i class="iconfont icon-zhihu AboutMeIcon" style="color:#3dbd7d"></i>
                    </a>
                  </div>
                  <div class="BlogStatisticItem">
                    <a href="https://blog.csdn.net/sun_qqq" target="_blank" @click="contact('csdn')">
                      <i class="iconfont icon-CN_csdnnet AboutMeIcon" style="color:#f78e3d"></i>
                    </a>
                  </div>
                  <div class="BlogStatisticItem">
                    <i class="iconfont icon-youxiang AboutMeIcon" style="color:#49a9ee"></i>
                  </div>
                  <div class="BlogStatisticItem">
                    <a href="https://music.163.com/#/user/home?id=386558098" target="_blank" @click="contact('网易云')">
                      <i class="iconfont AboutMeIcon icon-CN_NetEasemusic" style="color:#f46e65"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination v-on:PaginationToParent="ValueByPagition" ref="Pagi"></Pagination>
      </div>
      <!--回复留言弹框PageActive-->
      <div style="position:fixed;top: 0;bottom: 0;left:0;right:0;z-index: 1000" v-if="MessageAnswerFrame">
        <div class="MessageBoxWrapper" @click="CloseAnswerMessage()"></div>
        <div class="WriteMessageFrameFadeIn" style="position:fixed;top: 0;bottom: 0;left:0;right:0;z-index: 1000">
          <div class="WriteMessageFrameLeft">
            <img src="../../static/img/DefaultHeadIcon.jpg">
            <div>回复留言</div>
          </div>
          <div style="flex: 1;position: relative">
            <div class="WriteMessageFrameContent WriteMessageFrameContentColorBorder">
              <textarea ref="AnswerMessageContentDom" placeholder="输入留言" v-model="MessageText"></textarea>
              <span class="EmotionButton" @click="OpenEmotions()">
                <i class="iconfont icon-face IconfontSize"></i>
              </span>
            </div>
            <div class="OpenMessageSubmit">
              <div class="LeaveMessageName">
                <input placeholder="输入你的大名或昵称" v-model="MessageLeaveName">
              </div>
              <div class="OpenMessageSubmitButton" @click="MessageSubmit()">提交</div>
            </div>
            <div class="CloseAnswerMessage" @click="CloseAnswerMessage()">
              <i class="iconfont icon-fork IconfontSize"></i>
            </div>
          </div>
        </div>
      </div>
      <Emotion ref="EmotionB" @AppendInputValue="AppendMessageText"></Emotion>
      <Tips></Tips>
    </div>
  </transition>
</template>
<script lang="ts" setup>
// import Emotion from "../../components/SonCompnent/Emotion.vue"
import { ref, computed, defineAsyncComponent, type DefineComponent, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { GetMessageRead, MessageCreate } from "../../apis/index"
import Tips from "../../components/BrotherComponent/Tips.vue"
const Pagination = defineAsyncComponent<DefineComponent>(
  () => import('../SonCompnent/Pagination.vue') as any
)
const Emotion = defineAsyncComponent<DefineComponent>(
  () => import('../SonCompnent/Emotion.vue') as any
)
const LeaveMessageTextArea = ref();
const AnswerMessageContentDom = ref();
const Pagi = ref();
const store = useStore();
const { proxy }: any = getCurrentInstance()
store.commit("ChangeActive", 1)
let MessageText = computed({
  get() {
    return store.state.MessageText;
  },
  set(Value) {
    store.commit('ChangeMessageText', Value);
  }
})

let OpenTextAreaCover = ref(true);// textarea遮层
let OpenMessageSubmitValue = ref(false); // 提交按钮显示
let IconAdress = ref(`../../static/img/default_headicon_${Math.round(Math.random() * 3)}.jpg`) // 默认头像
let MessageLeaveName = ref('')
let MessageList = ref([]) // 留言列表
let MessageLeaveDate = ref('') // 写留言的时间
let MessageAnswerFrame = ref(false)//回复留言弹框
let FadeAnimate = ref(false)// 弹框显隐动画
let AticleBottom = ref(false)// 文章底线
let buttonAnimate = ref(false) // 博客入口按钮动画



const MessageRead = async () => {
  try {
    let data = {
      PagnationData: {
        Skip: 0,
        Limit: 8
      }
    }
    let res = await GetMessageRead(data);
    console.log(res);
    if (res.status == 0) {
      MessageList.value = res.data;
    }
  } catch (error) {

  }
}
const CloseMessageSubmit = () => {
  // 隐藏textarea的遮层
  OpenTextAreaCover.value = true;
  //隐藏提交按钮
  OpenMessageSubmitValue.value = false;
}
const OpenEmotions = () => {
  store.commit('ChangeEmotionShow', true)
}
const OpenMessageSubmit = () => {
  // 隐藏textarea的遮层
  OpenTextAreaCover.value = false;
  //显示提交按钮
  OpenMessageSubmitValue.value = true;
  LeaveMessageTextArea.value.focus();
  // 填写缓存中的游客名
  let LocalCommonUser = proxy.GetLocalStorage('wwkblog')
  if (LocalCommonUser.toString() != '{}') {
    MessageLeaveName.value = LocalCommonUser.ArticleCommentNickName;
  }

}
const MessageSubmit = async () => {
  // 提交留言
  console.log("1", store.getters.GetMessageText, MessageLeaveName.value);

  if (store.getters.GetMessageText && MessageLeaveName.value) {
    let MatchedMessageText = proxy.MatchEmotion(store.getters.GetMessageText),
      iconNo = proxy.GetLocalStorage('wwkBlog').ArticleCommentIcon ? proxy.GetLocalStorage('SunqBlog').ArticleCommentIcon : Math.round(Math.random() * 4);
    let data = {
      MessageText: MatchedMessageText,
      MessageLeaveName: MessageLeaveName.value,
      MessageLeaveDate: new Date(),
      LocationCityName: '武汉',
      iconNo: iconNo
    }
    let res = await MessageCreate(data);
    if (res.status == 0) {
      store.commit('ChangeTip', {
        Show: true,
        Title: '留言成功'
      });
      // 清空留言框
      store.commit('CleanMessageText');

      // 存储用户名到本地
      proxy.SetLocalStorage('SunqBlog', {
        Key: 'ArticleCommentNickName',
        Value: MessageLeaveName.value
      });
      // 存储用户的随机头像放到本地
      proxy.SetLocalStorage('SunqBlog', {
        Key: 'ArticleCommentIcon',
        Value: iconNo
      });
      // 刷新留言列表
      MessageRead();

      // 如果是回复留言，关闭留言弹框
      MessageAnswerFrame.value = false;
      // 初始TextArea框遮盖
      OpenTextAreaCover.value = true;
    } else {
      store.commit('ChangeTip', {
        Show: true,
        Title: '留言失败'
      });
    }
  } else {
    store.commit('ChangeTip', {
      Show: true,
      Title: '昵称和留言不能为空呦'
    });
  }

}

const getIconAdress = (val: number): string => {
  let url = new URL(`../../static/img/default_headicon_${val}.jpeg`, import.meta.url).href
  return url
}
const AnswerMessage = (val: string) => { }
const setButtonAnimate = (val: boolean) => {// 设置按钮动画的开始与停止
  buttonAnimate.value = val
}
const readCode = () => { }
const contact = (val: string) => { }
const ValueByPagition = async (SelectPage: number) => {  // 上滑加载更多

  let data = {
    PagnationData: {
      Skip: SelectPage * 8,
      Limit: 8
    }
  }
  let res = await GetMessageRead(data);
  if (res.status == 0) {
    res.data.forEach(function (Item:{MessageLeaveDate:string}) {
      Item.MessageLeaveDate = proxy.$DateFormat(Item.MessageLeaveDate);
    });
    MessageList.value = MessageList.value.concat(res.data);
    if(res.data.length != 8) {
      AticleBottom.value = true;
      Pagi.value.SetUpdate(false);
    } else {
      Pagi.value.SetUpdate(true);
    }
  } 
}
const CloseAnswerMessage = () => {
  FadeAnimate.value = false;
  store.commit('CleanMessageText')
  setTimeout(() => {
    MessageAnswerFrame.value = false;
  }, 200);
}
const AppendMessageText = () => {
  // 光标聚焦
  // console.log('MessageTextarea', MessageTextarea);
  // MessageTextarea.value.focus();
  if (MessageAnswerFrame.value) {
    AnswerMessageContentDom.value.focus()
  } else {
    LeaveMessageTextArea.value.focus()
  }

}
MessageRead();
</script>
<style scoped lang="less">
@import "../../static/css/AboutMe";
@import "../../static/css/BlogIndex";
@import "../../static/css/BlogDetail";

/*pc端*/
@media only screen and (min-device-width: 768px) {
  .WriteMessageFrameFadeIn {
    background-color: @fore_color;
    width: 42rem;
    margin: auto;
    .myflex(start);
    position: absolute;
    left: 0;
    right: 0;
    top: 30vh;
    padding: 1.5rem 1.5rem 2rem 1rem;
    animation: FadeIn 0.2s linear;
    animation-fill-mode: forwards;

    overflow: hidden;
  }

  .WriteMessageFrameFadeOut {
    background-color: @fore_color;
    width: 42rem;
    margin: auto;
    .myflex(start);
    position: absolute;
    left: 0;
    right: 0;
    top: 14rem;
    padding: 1.5rem 1.5rem 2rem 1rem;
    animation: FadeOut 0.2s linear;
    animation-fill-mode: forwards;
    /*animation-delay: 1s;*/
    overflow: hidden;
  }

  .MessageBoardCover {
    width: 100%;
    height: 95vh;
    position: relative;
    background: url(../../static/img/MessageBoardCover2.jpg) no-repeat 50% #cef;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .MessageBoardListBottom {
    background-color: @fore_color;
    padding: 1rem;
    text-align: center;
    border: 1px solid @BorderColor;
    border-top: none;
    font-size: 1rem;
  }
}

/*移动端*/
@media only screen and (max-device-width: 768px) {
  .WriteMessageFrameFadeIn {
    background-color: @fore_color;
    margin: auto 1rem;
    .myflex(start);
    position: absolute;
    left: 0;
    right: 0;
    top: 30vh;
    padding: 1.5rem 1.5rem 1.5rem 1rem;
    animation: FadeIn 0.2s linear;
    animation-fill-mode: forwards;

    overflow: hidden;
  }

  .WriteMessageFrameFadeOut {
    background-color: @fore_color;
    margin: auto 1rem;
    .myflex(start);
    position: absolute;
    left: 0;
    right: 0;
    top: 30vh;
    padding: 1.5rem 1.5rem 2rem 1rem;

    animation: FadeOut 0.2s linear;
    animation-fill-mode: forwards;
    overflow: hidden;
  }

  .MessageBoardCover {
    width: 100%;
    height: 95vh;
    position: relative;
    background: url(../../static/img/MessageBoardCover2.jpg) no-repeat 50% #cef;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .MessageBoardListBottom {
    margin: 1rem 0;
    text-align: center;
    font-size: 0.8rem;
    color: @FontColorGrayDeep;
    border: 1px solid @back_color;
  }
}

@keyframes FadeIn {
  0% {
    transform: scale(0.9);
    height: 4.5rem;
  }

  20% {
    transform: scale(0.925);
    height: 5rem;
  }

  60% {
    transform: scale(0.95);
    height: 6rem;
  }

  80% {
    transform: scale(0.975);
    height: 7rem;
  }

  100% {
    transform: scale(1);
    height: 7.5rem;
  }
}

@keyframes FadeOut {
  0% {
    transform: scale(0.9);
    height: 7.5rem;
  }

  20% {
    transform: scale(0.925);
    height: 7rem;
  }

  60% {
    transform: scale(0.95);
    height: 6rem;
  }

  80% {
    transform: scale(0.975);
    height: 5rem;
  }

  100% {
    transform: scale(1);
    height: 4.5rem;
  }
}

.WriteMessageFrameLeft {
  width: 4rem;
  text-align: center;
  margin-right: 0.5rem;
  font-size: 0.8rem;
}

.WriteMessageFrameLeft img {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 5px;
}

.WriteMessageFrameContent {
  flex: 1;
  height: 4.5rem;
  /*line-height: 4.5rem;*/
  position: relative;
  padding: 0.5rem 0 0 0.5rem;
  border: 1px solid @BorderColor;
}

.WriteMessageFrameContentColorBorder {
  border: 1px solid @ThemeColor;
}

.WriteMessageFrameContent textarea {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: none;
  outline: none;
}

.OpenMessageSubmit {
  .myflex(center);
  margin-top: 1.4rem;

  animation: MessageSubmitDiv .3s linear;
  animation-fill-mode: forwards;
}


@keyframes MessageSubmitDiv {
  0% {
    transform: translateY(-1rem);
  }

  20% {
    transform: translateY(-0.8rem);
  }

  40% {
    transform: translateY(-0.6rem);
  }

  60% {
    transform: translateY(-0.4rem);
  }

  80% {
    transform: translateY(-0.2rem);
  }

  100% {
    transform: translateY(0rem);
  }
}

.LeaveMessageName {
  flex: 1;
}

.LeaveMessageName input {
  width: 8rem;
  height: 1.5rem;
  border: 1px solid @ThemeColor;
}

.OpenMessageSubmitButton {
  background-color: @ThemeColor;
  padding: 0.3rem 1rem;
  color: @FontColorWhite;
  width: 2rem;
  font-size: 0.8rem;
  border-radius: 2px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}

.EmotionButton {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  cursor: pointer;
}

.TextAreaCover {
  position: absolute;
  left: 0;
  top: 0;
  height: 5rem;
  line-height: 5rem;
  width: 100%;
  box-sizing: border-box;
  padding-left: 1rem;
  background-color: @fore_color;
}

.MessageBoxWrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  opacity: .6;
  filter: opacity(60);
  background-color: #000;
  transition: all 0s ease 0s;
  transform: translate3d(0px, 0px, 0px);
}

.CloseAnswerMessage {
  position: absolute;
  right: -1rem;
  top: -1rem;
  cursor: pointer;
}
</style>