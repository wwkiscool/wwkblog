
<template>
  <!-- <div class="wrapper">
    <TopBar></TopBar>
    <router-view></router-view>
    <Footer></Footer>
    <Loading></Loading>
    <CanvasBac></CanvasBac>
    <AirPlane></AirPlane>
  </div> -->
    <Navigation></Navigation>
    <div class="view-outer">
      <transition name="view-animate" @beforeLeave="beforeLeave" @afterLeave="afterLeave">
        <router-view class="view-page" />
      </transition>
    </div>

</template>

<script setup lang="ts">
import Navigation from "./components/navigation/index.vue";

import TopBar from "./components/BrotherComponent/TopBar.vue"
import Footer from "./components/BrotherComponent/Footer.vue";
import Loading from "./components/BrotherComponent/Loading.vue";
import CanvasBac from './components/BrotherComponent/CanvasBac.vue'
import AirPlane from './components/BrotherComponent/AirPlane.vue'
function afterLeave() {

}
function getScrollTop(): number | string {
  return Math.max(document.documentElement.scrollTop, document.body.scrollTop)

}
function beforeLeave(node: any) {
  let scrollTop = getScrollTop()
  window.scrollTo(0, 0)
  node.style.position = 'absolute'
  node.style.top = '0px'
  node.style.left = '0px'
  node.style.zIndex = 0
  node.style.width = '100%'
  node.style.height = '100vh'
  node.style.overflow = 'hidden'
  node.scrollTop = scrollTop
}
</script>




<style lang="less">
.container {
  width: 90%;
  max-width: 1800px;
  margin: auto;
}

@media screen and (max-width: 600px) {
  .container {
    width: auto;
    margin-right: 10px;
    margin-left: 10px;
  }
}

html,
body {
  padding: 0;
  margin: 0;
}

body {
  font-size: 14px;
  font-family: PingFang SC, Helvetica neue, Helvetica, Tahoma, lantinghei sc, Microsoft Yahei, sans-serif;
  -webkit-font-smoothing: antialiased;
  background: #21272c;
}

a {
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}

.view-outer {
  min-height: 100vh;
  overflow: hidden;
}

.view-page {
  position: relative;
  background: #dee3e7;
}

.view-animate-enter-active {
  animation: view-in 1.2s ease-in-out;
}

.view-animate-leave-active {
  animation: view-out 1.2s ease-in-out;
  transform-origin: center bottom;
}

@keyframes view-in {
  0% {}
  50% {
    opacity: 0;
    transform: translate(0, 200px);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@keyframes view-out {
  0% {
    transform: scale(1);
  }

  50% {}

  100% {
    transform: scale(0.88)
  }
}
</style>
