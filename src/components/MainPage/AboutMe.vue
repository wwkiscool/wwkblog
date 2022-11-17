<template>
  <div class="about-page">敬请期待</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
store.commit("ChangeActive", 4);
</script>
<style lang="less" scoped>
.about-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>