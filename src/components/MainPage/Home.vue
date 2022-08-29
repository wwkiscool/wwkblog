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
						<h2>
							你好！
							<br>我是
							<strong>wwk</strong>
						</h2>
						<h3>你是谁？</h3>
						<p>97年，前端工程师，全栈开发尝试者</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" >
import { ref, Ref } from "vue";
interface photoGraphaList {
	title: string,
	author: string,
	imgSrc: string,
	htmlSrc?: string
}
const getImg = (val: number): string => {
	let url = new URL(`../../static/img/home/back${val}.jpg`, import.meta.url).href
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
	}, 1500)
})
</script>

<style scoped lang="less">
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