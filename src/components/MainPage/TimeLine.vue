<template>
  <transition name="Fade" mode="out-in">
    <div>
      <div class="TimeFixedBac"></div>
      <div class="FriendUrlBac">
        <div class="FriendUrlTitle TimeLIneTitle">
          <div class="FriendUrlTitleText" style="margin-bottom: 2rem;color:black;">时间轴</div>
          <div class="FriendUrlTitleSummary">梦每个人都有，但不是每个人都能一步一步的跟着时间往前走</div>
          <div class="FriendUrlTitleSummary">我是个自律性不好的人，希望能守住初心</div>
          <div class="FriendUrlTitleSummary">一步一个脚印的，不畏惧，不空想</div>
          <div class="FriendUrlTitleSummary">坚持住，往前走</div>
          <div class="FriendUrlTitleSummary">共勉</div>
        </div>
      </div>
      <div class="UrlCardList TimeLineCardList">
        <div v-for="(Item, Index) in TimeLineList" v-bind:key="Index">
          <div class="TimeLineTr" v-if="Index % 2 == 0">
            <div class="TimeLineTdLeft"></div>
            <div class="TimeLineTdCenter"></div>
            <div class="TimeLineTdRight">
              <div class="BubbleRight">
                <span class="TimeLineTime">{{ Item['CreateDate'] }}</span>{{ Item['TextContent'] }}
              </div>
            </div>
          </div>
          <div class="TimeLineTr" v-if="Index % 2 != 0">
            <div class="TimeLineTdLeft">
              <div class="Bubble">
                <span class="TimeLineTime">{{ Item['CreateDate'] }}</span>{{ Item['TextContent'] }}
              </div>
            </div>
            <div class="TimeLineTdCenter"></div>
            <div class="TimeLineTdRight"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { GetTimeLineRead } from "../../apis/index"
const Store = useStore()
let TimeLineList = ref([]);
Store.commit("ChangeActive", 2);
const GetTimeLineList = async () => {
  let { status, data } = await GetTimeLineRead()
  if (status == 0) {
    data.forEach((element: { CreateDate: string | any[]; }) => {
      if (element.CreateDate) {
        element.CreateDate = element.CreateDate.slice(0, 10);
      }
    });

    TimeLineList.value = data
  } else {
    // 失败
  }
}
GetTimeLineList()
</script>

<style scoped lang="less">
@import '../../static/css/FriendUrl';

/*移动端*/
@media only screen and (max-device-width: 768px) {
  .TimeLineTr {
    .myflex(center);
    position: relative;
    margin: 0 1rem;
  }

  .TimeFixedBac {
    width: 100%;
    height: 95vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    background-attachment: fixed;
    background: url(../../static/img/TimeLineBack.jpg) no-repeat 50% #cef;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .FriendUrlBac {
    height: 85vh;
    background: transparent;
    z-index: 100;
  }

  .TimeLIneTitle {
    margin-top: 10vh;
  }
}

/*PC端*/
@media only screen and (min-device-width: 768px) {
  .TimeLineTr {
    .myflex(center);
    position: relative;
  }

  .TimeFixedBac {
    width: 100%;
    height: 95vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    background-attachment: fixed;
    background: url(../../static/img/TimeLineBack.jpg) no-repeat 50% #cef;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .FriendUrlBac {
    height: 83vh;
    background: transparent;
    z-index: 100;
  }

  .TimeLIneTitle {
    margin-top: 12vh
  }
}

.TimeFixedBac:before {
  /*background-color: rgba(0, 0, 0, 0.2);*/
  /*background-color: rgba(0, 0, 0, 0.06);*/
  /*background-color: #ffffff;*/
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.FriendUrlTitleSummary {
  /*color: @FontColorWhite;*/
  color: black;
  font-size: 1rem;
  font-family: Helvetica, STHeiti STXihei, Microsoft JhengHei, Microsoft YaHei, Tohoma, Arial;
  margin-top: 1rem;
}

.TimeLineTdLeft {
  flex: 1;
  padding-right: 2rem;
  position: relative;
}

.TimeLineTdCenter {
  width: 2px;
  height: 100%;
  background-color: @ThemeColor;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
}

.TimeLineTdRight {
  padding-left: 2rem;
  flex: 1;
}

.Bubble {
  margin-right: 1rem;
  margin: 1rem 0;
  position: relative;
  background-color: @fore_color;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid @ThemeColor;
}

.Bubble:before {
  content: "";
  border: 8px solid transparent;
  width: 0;
  height: 0;
  display: inline-block;
  border-left: 8px solid @ThemeColor;

  right: -16px;
  position: absolute;
  top: 1.3rem;
}

.Bubble:after {
  content: "";
  width: 1rem;
  height: 1rem;
  display: inline-block;
  background-color: @ThemeColor;
  border-radius: 100%;
  border: 0.25rem solid @fore_color;

  position: absolute;
  right: -2.90rem;
  top: 1rem;
  z-index: 1000;
}

.BubbleRight {
  margin-right: 1rem;
  margin: 1rem 0;
  position: relative;
  background-color: @fore_color;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid @ThemeColor;
}

.BubbleRight:before {
  content: "";
  border: 8px solid transparent;
  width: 0;
  height: 0;
  display: inline-block;
  border-right: 8px solid @ThemeColor;
  left: -16px;
  position: absolute;
  top: 1.3rem;
}

.BubbleRight:after {
  content: "";
  width: 1rem;
  height: 1rem;
  display: inline-block;
  background-color: @fore_color;
  border-radius: 100%;
  border: 0.2rem solid @ThemeColor;

  position: absolute;
  left: -2.7rem;
  top: 1rem;

  z-index: 1000;
}

.TimeLineTime {
  color: @ThemeColor;
  margin-right: 1rem;
}
</style>
