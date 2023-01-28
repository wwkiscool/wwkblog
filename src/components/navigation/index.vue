<template>
    <div class="navigation" :class="{
        mini: isScrolling,
        'nav-slidedown': navSlidedown
    }">
        <div class="container">
            <div class="nav-inner">
                <router-link to="/" class="nav-logo">
                    <svg viewBox="150 50 1700 1700" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m1636.55 1484.58a211.6 211.6 0 0 1 -250.18 54.76 801.031 801.031 0 0 0 -775.466 1.51 211.855 211.855 0 0 1 -247.233-55.97 796.437 796.437 0 0 1 -163.671-484.88c0-441.828 358.172-800 800-800s800 358.172 800 800a796.409 796.409 0 0 1 -163.45 484.58zm-636.55-884.58c-220.914 0-400 179.086-400 400s179.086 400 400 400 400-179.09 400-400-179.09-400-400-400z" />
                    </svg>
                    <span>我的博客</span>
                </router-link>
                <div class="nav-list">
                    <button class="nav-more-btn" @click="navSlidedown = !navSlidedown"><i></i><i></i><i></i></button>
                    <div class="nav-mask" @click="navSlidedown = false"></div>
                    <div class="nav-list-body">
                        <router-link to="/" class="index-page">首页</router-link>
                        <router-link v-for="nav in navList" :key="nav['type']" :to="nav['href']" class="sub-page">
                            {{ nav['label'] }}</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, Ref,onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
interface navList {
    label: string,
    href: string,
    type: string
}

const route = useRoute();
let isScrolling = ref(false);
let navList: Ref<navList[]> = ref([
    // {
    //     label:"首页",
    //     href:"/",
    //     type:"blog"
    // },
    {
        label: "博文",
        href: "/BlogIndex",
        type: "blog"
    }, {
        label: "关于",
        href: "/AboutMe",
        type: "about"
    },
    //  {
    //     label: "时间轴",
    //     href: "/TimeLine",
    //     type: "timeline"
    // },
     {
        label: "留言",
        href: "/MessageBoard",
        type: "message"
    }
]);
let navSlidedown = ref(false);
function ajustNavigation() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    isScrolling.value = scrollTop > 50
}
function scrollListener() {
    ajustNavigation()
}
onMounted(() => { // mounted 生命周期
    ajustNavigation();
    window.addEventListener('scroll',scrollListener)
})
onBeforeUnmount(() => {
    // 组件销毁
    window.removeEventListener('scroll', scrollListener)
})

watch(() => route.path, (newPath) => {
    navSlidedown.value = false;
}, { immediate: true })


</script>
<style lang="less" scoped>
@navigation-height : 56px;
@max-mobile-width : 600px;
@pad-portrait-width : 1024px;
@pad-landscape-width : 768px;
// Color variables (appears count calculates by raw css)
@color0: #ffffff; // Appears 6 times
@color1: #007fff; // Appears 3 times

// Width variables (appears count calculates by raw css)
@width1: 100%; // Appears 3 times
@width8: 64%; // Appears 2 times

// Height variables (appears count calculates by raw css)
@height0: @navigation-height; // Appears 3 times



.navigation {
    position: fixed;
    width: 100%;
    height: 56px;
    top: 0;
    left: 0;
    padding-top: 20px;
    z-index: 10000;
    -webkit-transition: 0.6s ease-in-out;
    transition: 0.6s ease-in-out;
}

.navigation .nav-inner {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 56px;
    margin: 0 -10px;
    background: #fff;
}

.navigation .nav-logo {
    height: 56px;
    padding: 0 18px;
    line-height: 56px;
    background: #0d9af2;
}

.navigation .nav-logo svg {
    display: inline-block;
    vertical-align: middle;
    width: 25px;
    height: 25px;
    margin-right: 2px;
    fill: #fff;
}

.navigation .nav-logo span {
    display: inline-block;
    vertical-align: middle;
    line-height: 30px;
    font-weight: bold;
    font-size: 14px;
    color: #fff;
}

.navigation .nav-more-btn {
    display: none;
}

.navigation .nav-list {
    padding-right: 15px;
}

.navigation .nav-list a {
    position: relative;
    display: inline-block;
    width: 80px;
    line-height: 56px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: #2d3339;
    text-decoration: none;
    -webkit-transition: 0.2s;
    transition: 0.2s;
}

.navigation .nav-list a:after {
    content: '';
    position: absolute;
    bottom: 15px;
    left: 18%;
    width: 0;
    height: 1px;
    background: #007fff;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.navigation .nav-list a:hover:after {
    width: 30%;
}

.navigation .nav-list a.sub-page.router-link-active,
.navigation .nav-list a.index-page.router-link-exact-active {
    color: #007fff;
}

.navigation .nav-list a.sub-page.router-link-active:after,
.navigation .nav-list a.index-page.router-link-exact-active:after {
    width: 64%;
}

.navigation.mini {
    padding-top: 0;
    background: #fff;
    -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.063), 0 0 10px rgba(0, 0, 0, 0.125);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.063), 0 0 10px rgba(0, 0, 0, 0.125);
}

@media screen and (max-width: 750px) {
    .navigation .nav-list a {
        width: 60px;
        font-size: 13px;
    }
}

@media screen and (max-width: 600px) {
    .navigation {
        padding-top: 0;
    }

    .navigation .nav-inner {
        margin-left: -10px;
    }

    .navigation .nav-list-body {
        position: absolute;
        top: 60px;
        right: 10px;
        width: 200px;
        background: #fff;
        -webkit-box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1), 1px 1px 2px rgba(0, 0, 0, 0.2);
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1), 1px 1px 2px rgba(0, 0, 0, 0.2);
        -webkit-transition: 0.2s ease-in-out;
        transition: 0.2s ease-in-out;
        visibility: hidden;
        opacity: 0;
    }

    .navigation .nav-list a {
        display: block;
        width: 100%;
    }

    .navigation .nav-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        -webkit-transition: 0.2s ease-in-out;
        transition: 0.2s ease-in-out;
        visibility: hidden;
        opacity: 0;
    }

    .navigation .nav-more-btn {
        position: absolute;
        display: block;
        width: 44px;
        height: 44px;
        top: 7px;
        right: 10px;
        border: none;
        cursor: default;
        background: #fff;
    }

    .navigation .nav-more-btn i {
        display: block;
        position: absolute;
        width: 26px;
        height: 4px;
        left: 9px;
        border-radius: 4px;
        background: #444;
        -webkit-transition: 0.2s ease-in-out;
        transition: 0.2s ease-in-out;
    }

    .navigation .nav-more-btn i:nth-child(1) {
        top: 10px;
    }

    .navigation .nav-more-btn i:nth-child(2) {
        top: 19px;
    }

    .navigation .nav-more-btn i:nth-child(3) {
        top: 28px;
    }

    .nav-slidedown .nav-more-btn i:nth-child(1) {
        -webkit-transform: translateY(9px) rotate(-45deg);
        transform: translateY(9px) rotate(-45deg);
    }

    .nav-slidedown .nav-more-btn i:nth-child(2) {
        opacity: 0;
    }

    .nav-slidedown .nav-more-btn i:nth-child(3) {
        -webkit-transform: translateY(-9px) rotate(45deg);
        transform: translateY(-9px) rotate(45deg);
    }

    .nav-slidedown .nav-list-body,
    .nav-slidedown .nav-mask {
        visibility: visible;
        opacity: 1;
    }
}
</style>