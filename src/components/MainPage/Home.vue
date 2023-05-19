<template>
  <!-- <div class="g-scroll" id="g-scroll"></div>
<div class="g-wrap">
    <div class="g-bg"></div>
    <div class="g-container">
        <div class="g-wegame"></div>
        <div class="g-mask"></div>
        <div class="g-logo"></div>
    </div>
</div> -->
  <div class="index-page">
    <div class="header-banner-outer index-aboutme">
      <div :class="['header-banner', photographyLoaded ? 'zoom-show' : '']" :style="{
        backgroundImage: `url(${photography['imgSrc']})`
      }">
        <!-- <div class="photograghy-author">
					<a :href="photography['htmlSrc']" target="_blank">{{photography['title']}} By:@{{photography.author}}</a>
				</div> -->
        <div class="aboutme-body">
          <div class="container">
            <h2 class="h2">
              <strong>爱战胜不了任何东西，而且万物皆有终结</strong>
            </h2>
            <!-- <h3>xxx</h3>
						<p>97年，前端工程师，全栈开发尝试者</p> -->
          </div>
        </div>

      </div>

    </div>
    <section class="index-about-design">
      <h3>多视图 + 响应式设计</h3>
      <p>配合单页架构营造顺滑体验</p>
      <!-- <div class="links">
						单页组件<a href="http://bh-lay.github.io/lofox/index.html" target="_blank">lofox.js</a>
						<a href="http://bh-lay.github.io/iframer/app.html" target="_blank">iframer</a>
					</div> -->
      <div class="device-cnt">
        <div class="device mobile"><span></span><i></i><i></i></div>
        <div class="device pc"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        <div class="device pad"><i></i><i></i><i></i><i></i></div>
      </div>
    </section>
    <section class="index-about-backend">
      <div class="language">
        <div class="nodeJS-logo"></div>
        <p>NODEJS强力驱动</p>
      </div>
      <div class="frameworks">
        <p>koa mysql</p>
        <p><a href="#" target="_blank">博客源码</a></p>
      </div>
    </section>
    <section class="index-about-footer">
      end
    </section>
  </div>
</template>

<script setup lang="ts" >
import { ref, Ref } from "vue";
import  back from '@/utils/constant/home-back'
interface photoGraphaList {
  title: string,
  author: string,
  imgSrc: string,
  htmlSrc?: string
}
const getImg = (val: number): string => {
  let url = new URL(`../../static/img/home/back${val}.jpg`, import.meta.url).href
  if (val === 1) {
    url = back
  }
  return url
}
let photoGraphaList: Ref<photoGraphaList[]> = ref([
  {
    title: "随处撸码",
    author: "wwk",
    imgSrc: getImg(1)
  }
]);
let photoGraphaIndex: Ref<number> = ref(0);
let photographyLoaded = ref(false);
let photography: Ref<photoGraphaList | any> = ref()
photography.value = photoGraphaList.value[photoGraphaIndex.value]

function loadImg(src: string, callback: any) {
  if (!src) {
    callback && callback();
    return;
  }
  let img = new Image();
  function End() {
    callback && callback();
    callback = null;
  }
  img.onerror = img.onload = End;
  img.src = src;
}
loadImg(photography.value.imgSrc, () => {

  setTimeout(() => {
    photographyLoaded.value = true
  }, 0)
})
</script>

<style scoped lang="less">
@keyframes showup {
  from {
    letter-spacing: -28px;
    filter:blur(10px)
  }
  to {
    letter-spacing: 5px;
    filter: blur(0px);
  }
}
.h2 {
  filter: contrast(30);
  // background-color: #000;
  text-align: center;
  strong {
    animation:  showup 1.67s forwards;
  }
}
@keyframes circle_zoom {
  0% {
    opacity: 0;
    mask-size: 30%;
  }

  40% {
    opacity: 0.6;
    mask-size: 60%;
  }

  100% {
    opacity: 1;
    mask-size: 300%;
  }
}

.index-page .index-aboutme {
  height: 95vh;
  min-height: 600px;
}

.header-banner-outer {
  height: 100%;
  min-height: 200px;
  overflow: hidden;
  background: #eee;

  .header-banner {
    position: relative;
    height: 100%;
    background: no-repeat center center #f4f1ec;
    background-size: auto 100%;
    visibility: hidden;
    background-size: cover;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: url("../../static/img/home/mask.png");
      z-index: 0;
    }
  }

  .zoom-show {
    display: block;
    visibility: visible;
    -webkit-mask-image: url("../../static/img/home/mask-bj.png");
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    -webkit-mask-size: 300%;
    -webkit-animation: circle_zoom 1.2s ease-in;
  }
}

.aboutme-body {
  display: flex;
  align-items: center;
  position: relative;
  height: 80%;
  color: #fff;

  h2 {
    margin: 0;
    padding-left: 10px;
    line-height: 1.5em;
    font-weight: 200;
    font-size: 2em;
  }

  h3 {
    margin: 0;
    padding-left: 10px;
    line-height: 1.5em;
    font-weight: 200;
    font-size: 3em;

    strong {
      font-weight: 500;
    }
  }

  p {
    padding-left: 10px;
    margin: 1.5em 0 1em;
    font-size: 1.1em;
  }
}

.index-about-design {
  position: relative;
  padding-top: 9em;
  line-height: 1.8em;
  text-align: center;
  background: #1f2738;

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: -50px;
    left: 0;
    border-style: solid;
    border-width: 50px 100vw 0 0;
    border-color: transparent #1f2738 transparent;
  }

  h3 {
    margin-bottom: 1em;
    font-size: 2em;
    font-weight: normal;
    letter-spacing: .2em;
    color: #c1c8d7;
  }

  p {
    margin-bottom: 1em;
    font-size: 2em;
    font-weight: normal;
    letter-spacing: .2em;
    color: #a6aec0;
  }

  .device-cnt {
    position: relative;
    height: 190px;
    max-width: 600px;
    margin: 2em auto 0;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      height: 10px;
      left: 10px;
      right: 10px;
      bottom: -10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, .5);
    }

    .device {
      position: absolute;
      bottom: 0;
      border-radius: 8px 8px 0 0;
      background: #afb8ca;
      // border-color: #e0e4eb;
      border-style: solid;
      border-width: 10px 6px 0;
      line-height: 0;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2), 1px 1px 2px rgba(0, 0, 0, .4);

      /** 导航 **/
      &::before {
        content: '';
        display: block;
        height: 10px;
        margin-bottom: 6px;
        background: #fff;
        box-shadow: 0 2px 2px -2px #364463;
      }

      /** 列表项 **/
      i {
        display: inline-block;
        position: relative;
        width: 58px;
        height: 75px;
        background: #fff;
        margin: 0 3px 8px;

        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 62%;
          left: 0;
          top: 0;
          background: #eee;
        }
      }
    }

    .mobile {
      width: 52px;
      height: 88px;
      border-width: 17px 4px 0;
      left: 10px;
      z-index: 1;

      // &::after {
      // 	content: '';
      // 	display: block;
      // 	position: absolute;
      // 	background: #555;
      // 	width: 3px;
      // 	height: 3px;
      // 	top: -13px;
      // 	left: 24px;
      // 	border-radius: 3px;
      // }

      span {
        display: block;
        position: absolute;
        background: #555;
        width: 10px;
        height: 2px;
        top: -7px;
        left: 20px;
        border-radius: 2px;
      }

      i {
        display: block;
        width: auto;
        height: 55px;
        margin-bottom: 4px;
      }
    }

    .pc {
      width: 280px;
      height: 176px;
      left: 50%;
      // margin-left: -146px;
      margin-left: -170px;

      &:before {
        margin-bottom: 10px;
      }
    }

    .pad {
      width: 105px;
      height: 113px;
      right: 10px;
      border-top-width: 17px;

      &::after {
        content: '';
        display: block;
        position: absolute;
        background: #555;
        width: 4px;
        height: 4px;
        top: -11px;
        left: 51px;
        border-radius: 100%;
      }

      i {
        width: 44px;
        height: 55px;
      }
    }
  }
}

.index-about-backend {
  padding: 12em 0 20em;
  line-height: 1.8em;
  text-align: center;
  color: #000;
  background: #fff;

  .nodeJS-logo {
    width: 90px;
    height: 120px;
    margin: 0 auto 1em;
    background: url("../../static/img/home/nodejs-icon.png");
  }

  .language {
    p {
      color: #80bd01;
      margin-bottom: .5em;
      line-height: 50px;
      font-size: 2.6em;
    }
  }

  .frameworks {
    p {
      height: 30px;
      line-height: 30px;

      &:nth-child(1) {
        margin-bottom: .5em;
        font-size: 1.5em;
        color: #2f3746;
      }

      &:nth-child(2) {
        max-width: 400px;
        margin: auto;
        background: #2f3746;
        color: #979eaa;
      }
    }

    a {
      padding-left: .5em;
      color: #accc66;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.index-about-footer {
  background: #fff;
  text-align: center;
  padding: 20px;
}
</style>
<!-- <style scoped lang="less">
//wegame.gtimg.com/g.55555-r.c4663/wegame-home/sc01-logo.52fe03c4.svg

html, body {
    width: 100%;
    height: 100%;
    // overflow: hidden;
}

.g-scroll {
    position: relative;
    width: 100vw;
    height: 500vh;
}

.g-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

body {
    display: grid;
    place-content: center;
}

.g-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    animation-name: scale;
    animation-duration: 10s;
    animation-timeline: box-move;
}

.g-bg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    // background: repeating-linear-gradient(45deg, #000, #000 10px, #fff 10px, #fff 20px);
    background: url(https://wegame.gtimg.com/g.55555-r.c4663/wegame-home/sc02-03.514d7db8.png);
    background-size: 80%;
    background-position: center;
    background-repeat: no-repeat;
}

.g-wegame {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(-75deg, #715633, #2b2522);
    mask: url(//wegame.gtimg.com/g.55555-r.c4663/wegame-home/sc01-logo.52fe03c4.svg), linear-gradient(#fff, #fff);
    mask-repeat: no-repeat;
    mask-position: center center;
    -webkit-mask-composite: xor;
}

.g-mask {
    position: aboslute;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(-75deg, #715633, #2b2522);
    z-index: 2;
    animation-name: reOpacityChange;
    animation-duration: 10s;
    animation-timeline: box-move;
    animation-function-timing: linear;
}

.g-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(calc(-50% - 2px), calc(-50% - 2px));
    width: 448px;
    height: 532px;
    background: url(//wegame.gtimg.com/g.55555-r.c4663/wegame-home/sc01-logo.52fe03c4.svg);
    background-repeat: no-repeat;
    background-position: center center;
    z-index: 3;
    animation-name: reOpacityChange;
    animation-duration: 10s;
    animation-timeline: box-move;
}

@scroll-timeline box-move {
    source: selector("#g-scroll");
    orientation: "vertical";
}
@keyframes reOpacityChange {
    0%,
    50% {
        opacity: 1;
    }
    90% {
        opacity: .2;
    }
    100% {
        opacity: 0;
    }
}

@keyframes scale {
    0% {
        transform: scale(1);
    }
    40% {
        transform: scale(5);
    }
    70% {
        transform: scale(20)
    }
    100% {
        transform: scale(60);
    }
}
</style> -->