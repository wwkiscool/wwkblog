<template>
  <transition name="Fade" mode="out-in">
    <div>
      <div class="TopBarHeight"></div>
      <div class="ArticleDetailHeader">
        <img :src="Article['ArticleCover']" />
        <div class="HeaderContent" v-if="!Article['ArticleCover']">
          <span>{{ Article["Title"] }}</span>
          <span>{{ Article["Summary"] }}</span>
        </div>
      </div>

      <div class="ArticleDetailContent">
        <div class="ArticleDetailContentTab">
          <transition name="Fade" mode="out-in">
            <img src="../../static/img/BlogDetailSkele_PC.jpg" class="BlogDetailSkeletonScreenPC"
              v-show="BlogDetailSkeletonScreen" />
          </transition>

          <img src="../../static/img/BlogDetailSkele_Mobile.jpg" class="BlogDetailSkeletonScreenMobile"
            v-show="BlogDetailSkeletonScreen" />

          <h1>{{ Article["Title"] }}</h1>
          <div class="ArticleCreateTime">
            发布时间：{{ Article["CreateDate"] }}
          </div>
          <!-- <div class="markdown-body" v-html="Article['Content']">{{ Article['Content'] }}</div> -->
          <div class="markdown-body" v-html="Article['Content']"></div>
        </div>
      </div>
      <div class="ArticleDetailContent" style="margin-top: 1rem" v-if="ArticleCommentList.length > 0">
        <div class="ArticleDetailContentTab" style="padding: 1rem;min-height: unset">
          <div class="ArticleDetailComment">
            <div class="CommentList">
              <div class="CommentItem" v-for="(item, i) in ArticleCommentList" v-bind:key="i"
                if="ArticleCommentList.length != 0">
                <div class="CommentItemIcon">
                  <img src="../../static/img/DefaultHeadIcon.jpg" v-if="item['ArticleCommentNickName'] != 'sunq'">
                  <img src="../../static/img/ZhihuIcon.jpg" v-if="item['ArticleCommentNickName'] == 'sunq'">
                </div>
                <div class="CommentItemContent">
                  <div class="ArticleCommentNickName">
                    {{ item['ArticleCommentNickName'] }}
                    <span v-if="item['LocationCityName'] && item['LocationCityName']['length'] > 0">
                      <i class='iconfont icon-buoumaotubiao23 LocationIconfont'></i>{{
                          item['LocationCityName']
                      }}
                    </span>
                  </div>
                  <div class="ArticleCommentText" v-html="item['ArticleCommentText']">
                  </div>
                  <div class="DateAnswer">
                    <div class="DateAnswerLeft">{{ item['ArticleCommentDate'] }}</div>
                    <div class="DateAnswerRight" @click="AnswerComment(item['ArticleCommentNickName'])">
                      回复
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ArticleDetailContent" style="margin-top: 1rem">
        <div class="ArticleDetailContentTab" style="padding: 1rem;min-height: unset">
          <div class="ArticleDetailCommentFirstLine">
            <div class="UserHeadIcon">
              <img src="../../static/img/DefaultHeadIcon.jpg">
            </div>
            <div class="CommentUserInfo">
              <input placeholder="昵称（必填）" v-model="ArticleCommentNickName" />
              <input placeholder="邮箱（可以不填哦）" v-model="ArticleCommentEmail" />
              <input placeholder="网址（可以不填哦）" v-model="ArticleCommentUrl" />
            </div>
          </div>
          <div class="ArticleDetailCommentContent">
            <textarea v-model="MessageText" ref="MessageTextarea" placeholder="欢迎评论吖，鼓励和板砖我都认真听取哦"></textarea>
            <span class="EmotionButton" @click="OpenEmotions()">
              <i class="iconfont icon-face IconfontSize"></i>
            </span>
          </div>
          <div class="CommentSubmitLine">
            <div class="CommentSubmitButton" @click="CommentSubmit()">评论</div>
          </div>
        </div>
      </div>

      <Emotion ref="EmotionB" @AppendInputValue="AppendMessageText"></Emotion>
      <Tips></Tips>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, toRefs, getCurrentInstance } from "vue";
import { getArticleOne, GetCommentList } from "../../apis/index";
import { useRoute } from "vue-router";
import { marked } from 'marked';
import { useStore } from "vuex";
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css';
import Emotion from "../../components/SonCompnent/Emotion.vue"
import Tips from "../../components/BrotherComponent/Tips.vue"

interface _Article {
  ArticleCover: string;
  ArticleTag: string;
  CommentNum: number;
  Content: string;
  CreateDate: string;
  Summary: string;
  Title: string;
  Token: string;
  articleReadNum: number;
  order: string;
  _id: string;
}
const Article = ref({
  ArticleCover: '',
  ArticleTag: '',
  CommentNum: "",
  Content: '',
  CreateDate: '',
  Summary: '',
  Title: '',
  Token: '',
  articleReadNum: "",
  order: '',
  _id: '',
})
const route = useRoute(); // 路由对象
const { proxy }: any = getCurrentInstance()
console.log("toute", route);

let ArticleCommentNickName = ref("");
let ArticleCommentEmail = ref("");
let ArticleCommentUrl = ref("");
let ArticleCommentDate = ref("");
let ArticleCommentList = ref([]);
let BlogDetailSkeletonScreen = ref(true);
const store = useStore();
let MessageText = computed({
  get() {
    return store.state.MessageText;
  },
  set(Value) {
    store.commit('ChangeMessageText', Value);
  }
})
const MessageTextarea = ref();
const EmotionB = ref();
const _marked = new marked.Renderer()
marked.setOptions({
  renderer: _marked, // 这是必填项
  gfm: true,	// 启动类似于Github样式的Markdown语法
  pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
  sanitize: false, // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）
  // 高亮的语法规范
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext'
    return hljs.highlight(code, { language }).value
  },
})

const _getArticleOne = async () => {
  try {
    let res = await getArticleOne({ _id: route.query._id });
    if (res.status == 0) {
      BlogDetailSkeletonScreen.value = false;
      res.data[0].CreateDate = proxy.$DateFormat(res.data[0].CreateDate)
      res.data[0].Content = marked(res.data[0].Content)
      Article.value = res.data[0];
      // Article.value.Content = res.data[0].Content;
    }
  } catch (error) { }
};

const AnswerComment = (val: string) => {
  console.log(111);

  store.commit('ChangeMessageText', '@' + val + ':');
  MessageTextarea.value.focus();
}
const OpenEmotions = () => {
  console.log("EmotionB", EmotionB);

  EmotionB.value.OpenEmotion(true);
}
const CommentSubmit = () => {
  //提交评论
  /**
   * 1.先获取定位
   * 2.刷新评论列表
   * 3.修改评论量
   * 4.将用户的昵称存在浏览器
   */
  if (!ArticleCommentNickName.value) {
    store.commit('ChangeTip', {
      Show: true,
      Title: '昵称和留言不能为空呦！'
    });
    return;
  }
  
}

const AppendMessageText = () => {
  // 光标聚焦
  console.log('MessageTextarea', MessageTextarea);
  MessageTextarea.value.focus();

}
const _GetCommentList = async () => {
  try {
    let res = await GetCommentList({ ArticleId: route.query._id })
    if (res.status == 0) {
      ArticleCommentList.value = res.data;
    }
  } catch (error) {

  }
}
_getArticleOne();


_GetCommentList();
<style scoped lang = "less" >
@import "../../static/css/BlogDetail";
</style>
