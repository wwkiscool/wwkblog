
<template>
<div>{{content}}</div>
</template>
<script setup>

import { ref,reactive,toRefs } from "vue";
const data = reactive({
    name:"wwk",
    age:25
})

const content = ref('wwk');
const {name,age}  = toRefs(data);
</script>
<style scoped lang="less">
</style>