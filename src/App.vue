
<template>
  <div class="wrapper">
    <TopBar></TopBar>
    <router-view></router-view>
    <Footer></Footer>
    <Loading></Loading>
    <CanvasBac></CanvasBac>
    <AirPlane></AirPlane>
  </div>
</template>

<script setup lang="ts">
import TopBar from "./components/BrotherComponent/TopBar.vue"
import Footer from "./components/BrotherComponent/Footer.vue";
import Loading from "./components/BrotherComponent/Loading.vue";
import CanvasBac from './components/BrotherComponent/CanvasBac.vue'
import AirPlane from './components/BrotherComponent/AirPlane.vue'
</script>



<style>
</style>
