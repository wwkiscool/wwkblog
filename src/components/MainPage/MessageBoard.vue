<template>
    <div>
        留言板
    </div>
</template>
<script lang="ts" setup>
import { ref,computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

store.commit("ChangeActive", 1)
</script>