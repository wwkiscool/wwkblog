<template>
  <transition name="Fade" mode="out-in">
    <div>
      <div class="TopBarHeight"></div>
      <div class="BlogIndexContent">
        <div class="BlogFlex">
          <div class="BlogIndexContentLeft">
            <img src="../../static/img/ArticleList.jpg" v-if="DefaultGraph.ArticleListPart"
              class="BlogIndexContentLeftDefaultGraph">
            <div class="ArticleItem" v-for="(item, i) in ArticleList" v-bind:key="i"
              @click="UpdateRouter('BlogDetail', item)">
              <div class="ArticleItemCover" v-if="item['ArticleCover']">
                <img :src="item['ArticleCover']">
              </div>
              <div style="flex: 1">
                <div class="ArticleTitle">
                  <!-- <div class="ArticleTag">{{ item.ArticleTag }}</div> -->
                  <h3 class="ArticleTitleText">{{ item['Title'] }}</h3>
                </div>
                <div class="ArticleContent">
                  {{ item['Summary'] }}
                </div>
                <div class="ArticleFooter">
                  <!--<div class="ArticleFooterItem">发表：{{ item.CreateDate }}</div>
                  <div class="ArticleFooterItem" @click="UpdateRouter('BlogDetail',item._id)">评论：{{ item.CommentNum }}</div>-->
                  <!--<div class="ArticleFooterItem" style="border: none">
                    <i class="iconfont icon-yueduliang iconBlogIndex"></i>1000
                  </div>-->
                  <div class="ArticleFooterItem" style="border: none">
                    <i class="iconfont icon-biaoqian iconBlogIndex"></i>{{ item['ArticleTag'] }}
                  </div>
                  <div class="ArticleFooterItem" style="border: none">
                    <i class="iconfont icon-shijianzhongbiao iconBlogIndex"></i>{{ item['CreateDate'] }}
                  </div>
                  <div class="ArticleFooterItem" style="border: none">
                    <i class="iconfont icon-yueduliang iconBlogIndex"></i>{{ item['articleReadNum'] ? item['articleReadNum'] :
                        0
                    }}
                  </div>
                  <div class="ArticleFooterItem" style="border: none" v-show="item['CommentNum']">
                    <i class="iconfont icon-pinglun iconBlogIndex"></i>{{ item['CommentNum'] }}
                  </div>
                </div>
              </div>
            </div>
            <div class="NoDataHint" v-if="!ArticleList['length']">暂无数据</div>
            <div class="ListBottom" v-if="AticleBottom">你滑到我底线啦</div>
            <Pagination v-on:PaginationToParent="ValueByPagition" ref="Pagi"></Pagination>
          </div>
          <div class="BlogIndexContentRight">
            <div class="Module HotArticleModule">
              <transition name="Fade">
                <img src="../../static/img/HotArticleList.jpg" v-if="DefaultGraph.HotArticlePart">
              </transition>
              <div class="TagListHead">热门博文</div>
              <div class="HotArticle">
                <div class="HotArticleItem" v-for="(Item, Index) in HotArticleList" v-bind:key="Index">
                  <div v-if="Index == 0" @click="UpdateRouter('BlogDetail', Item)">
                    <span style="color:#f44e03;font-size: 15px">No{{ Index + 1 }} </span>{{ Item['Title'] }}
                  </div>
                  <div v-if="Index == 1" @click="UpdateRouter('BlogDetail', Item)">
                    <span style="color:#d41800;font-size: 15px">No{{ Index + 1 }} </span>{{ Item['Title'] }}
                  </div>
                  <div v-if="Index == 2" @click="UpdateRouter('BlogDetail', Item)">
                    <span style="color:#f37e21;font-size: 15px">No{{ Index + 1 }} </span>{{ Item['Title'] }}
                  </div>
                  <div v-if="Index == 3" @click="UpdateRouter('BlogDetail', Item)">
                    <span style="color:#f3212d;font-size: 15px">No{{ Index + 1 }} </span>{{ Item['Title'] }}
                  </div>
                  <div v-if="Index == 4" @click="UpdateRouter('BlogDetail', Item)">
                    <span style="color:#212df3;font-size: 15px">No{{ Index + 1 }} </span>{{ Item['Title'] }}
                  </div>
                  <div v-if="Index > 4" @click="UpdateRouter('BlogDetail', Item)">
                    <span>No{{ Index + 1 }} </span>{{ Item['Title'] }}
                  </div>
                </div>
              </div>
            </div>
            <div class="Module" style="padding: 0 0 0.5rem" @mouseenter="enter(true)" @mouseleave="enter(false)">
              <div class="TopBack"></div>
              <div class="ZhihuIcon">
                <img src="../../static/img/ZhihuIcon.jpg">
              </div>
              <div class="TextCenter">
                小博客
                <a class="BlueButton" :class="buttonAnimate ? 'open_animate' : ''" href="https://github.com/SunQQQ"
                  target="_blank" @click="readCode()">博客源码</a>
              </div>
              <div class="BlogStatistic">
                <div class="BlogStatisticItem">
                  <div class="BlogStatisticItemNum">{{ ArticleNum }}</div>
                  <div class="BlogStatisticItemText">博客文章</div>
                </div>
                <div class="BlogStatisticItem">
                  <div class="BlogStatisticItemNum">{{ CommentNum }}</div>
                  <div class="BlogStatisticItemText">博文评论</div>
                </div>
                <div class="BlogStatisticItem">
                  <div class="BlogStatisticItemNum">{{ LeaveMessageNum }}</div>
                  <div class="BlogStatisticItemText">留言量</div>
                </div>
              </div>
            </div>
            <div class="Module ArticleTagModule">
              <transition name="Fade">
                <img src="../../static/img/Tag.jpg" v-if="DefaultGraph.ArticleTagPart">
              </transition>
              <div class="TagListHead">文章分类<span style="color: #aaa;font-size: 0.8rem">（点击筛选呦）</span></div>
              <div class="TagListTr">
                <div :class="item['TagName'] != TagsActive ? 'TagListTd' : 'TagListTdActive'" v-for="item in Tags"
                  :key="item['id']" @click="GetArticle(item['TagName'])">{{ item['TagName'] }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <Heartfelt></Heartfelt> -->
    </div>
  </transition>
</template>
<script setup lang="ts">
//ts重构
import { GetHotArticle, getTagRed, getArticleRead } from "../../apis/index"
import { ref, toRefs, reactive, defineAsyncComponent, type DefineComponent,getCurrentInstance } from "vue"
import { useRouter } from "vue-router"

//数据初始化 --------start
let DefaultGraph = reactive({
  ArticleListPart: true,
  HotArticlePart: true,
  ArticleTagPart: true
})
let ArticleList = ref([]);// 文章列表
let Tags = ref([]);
const router = useRouter();
let HotArticleList = ref([])
let buttonAnimate = ref(false)
let AticleBottom = ref(false);
let ArticleNum = ref(0);
let LeaveMessageNum = ref(0);
let CommentNum = ref(0);
let TagsActive = ref('')
const instance = getCurrentInstance(); // 获取当前实例  
console.log("instance",instance);
const Pagi = ref();

//数据初始化 --------end
// 子组件 ---------start

const Heartfelt = defineAsyncComponent<DefineComponent>(
  () => import('../SonCompnent/Heartfelt.vue') as any
)
const Pagination = defineAsyncComponent<DefineComponent>(
  () => import('../SonCompnent/Pagination.vue') as any
)

// 子组件 ---------end
//接口 ---------start
let _getArticleList = async () => {
  let res = await GetHotArticle();
  if (res.status == 0) {
    HotArticleList.value = res.data;
    DefaultGraph.HotArticlePart = false;
  }
}

let _getTagRed = async () => {
  try {
    let res = await getTagRed();
    if (res.status == 0) {
      Tags.value = res.data;
      DefaultGraph.ArticleTagPart = false;
    }
    console.log(Tags);

  } catch (error) {
    console.error(error);

  }
}
const GetArticle = async (ArticleTag: string) => {
  try {
    TagsActive.value = ArticleTag
    let data = {
      PagnationData: {
        Skip: 0,
        Limit: 8,
      },
      ArticleTag
    }
    let res = await getArticleRead(data);
    if (res.status == 0) {
      res.data.forEach(function (Item: { CreateDate: string }) {
        Item.CreateDate = Item.CreateDate.slice(0, 10);
      });
      DefaultGraph.ArticleListPart = false;// 隐藏骨架屏
      ArticleList.value = res.data;
      console.log(ArticleList.value);
      
    }

  } catch (error) {

  }
}
_getTagRed() // 初始化标签列表
_getArticleList() //热门文章 
GetArticle('')
//接口 ----------------end

//methods ----------------start

const UpdateRouter = (RouterName: string, articleMessage: { [key:string]:any }) => {
  if (articleMessage._id) { // 还没写暂时注释
    // router.push({
    //   name: RouterName,
    //   query: {
    //     _id: articleMessage._id,
    //     Title: articleMessage.Title,
    //     from: '首页'
    //   }
    // });
  } else {
    // this.bus.$emit('TopBar', {
    //         Active: 1,
    //         MobileMenuActive: 1
    //       });
    router.push({
      name: RouterName
    });
  }
}
console.log("SetUpdate",Pagi);
const ValueByPagition = async (SelectPage:number) => {
  //获取子组件的值
  let data = {
      PagnationData: {
        Skip: SelectPage * 8,
        Limit: 8,
      },
      ArticleTag:TagsActive.value
    }
    let res = await getArticleRead(data);
    if (res.status == 0) {
      res.data.forEach(function (Item: { CreateDate: string }) {
        Item.CreateDate = Item.CreateDate.slice(0, 10);
      });
      // DefaultGraph.ArticleListPart = false;// 隐藏骨架屏
      ArticleList.value = ArticleList.value.concat(res.data);
      if(res.data.length !=8) {
        AticleBottom.value = true;
        // 移除滚动监听
        console.log("value",Pagi.value);
        
        Pagi.value.SetUpdate(false);
      } else {
        // 创建日志\
        Pagi.value.SetUpdate(true);
      }
    }
}
const enter = (status: boolean) => {
  buttonAnimate.value = status;
}
const readCode = () => {
  //创建日志
}


//methods ----------------end


</script>
<style scoped lang="less">
@import "../../static/css/BlogIndex";
</style>
