<template>
<div class="container"><slot /></div>
</template>
<script setup lang="ts"></script>
<style scoped lang="less">
.container {
    width: 90%;
    max-width: 1800px;
    margin: auto;
    @media screen  and ( max-width:600px ) {
        .container {
            width: auto;
            margin-right:10px;
            margin-left:10px;
        }
    }
}
</style>