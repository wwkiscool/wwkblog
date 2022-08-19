<template>
<div>敬请期待</div>
</template>
<script lang="ts" setup>
import { ref} from "vue";
import { useStore } from "vuex";

const store = useStore();
store.commit('ChangeActive',4)


</script>