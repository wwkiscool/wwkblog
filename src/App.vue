
<template>
<div class="wrapper">
  <TopBar></TopBar>
  <router-view  v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
</div>
</template>

<script setup lang="ts">
import TopBar from "./components/BrotherComponent/TopBar.vue"

</script>



<style>
</style>
