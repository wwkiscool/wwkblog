<template>
    <div></div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

let OnScroll = ref(true);
let RefreshCount = 0;
const SetUpdate = (value:boolean) => {
    OnScroll.value = value;
}
defineExpose({SetUpdate})
let emit = defineEmits(['PaginationToParent'])

window && window.addEventListener('scroll', () => {
    let ScrollTop, ClientHeight, ScrollHeight;

    // safari要求 document.body.scrollTop
    ScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    ClientHeight = document.documentElement.clientHeight;
    ScrollHeight = document.documentElement.scrollHeight;

    if (ScrollHeight - ScrollTop - ClientHeight < 130 && OnScroll.value) {
        OnScroll.value = false;
        RefreshCount += 1;
        emit('PaginationToParent', RefreshCount)
        // $emit('PaginationToParent', RefreshCount);
    }
})
</script>

<style scoped lang="less">
@import "../../static/css/base.less";

/*pc端*/
@media only screen and(min-device-width : 768px) {
    .Pagination {
        margin-top: 1rem;
        .myflex(center);
        height: 2.5rem;
        line-height: 2.5rem;
        color: @ThemeColor;
    }
}

/*移动端*/
@media only screen and(max-device-width : 768px) {
    .Pagination {
        margin: 0.5rem 0;
        .myflex(center);
        height: 2.5rem;
        line-height: 2.5rem;
        color: @ThemeColor;
    }
}

.PageNext {
    background-color: @fore_color;
    width: 4rem;
    text-align: center;
    cursor: pointer;
}

.PageNext:hover {
    background-color: @BorderColor;
    color: @FontColorGray
}

.PageNextEnable {
    color: @FontColorGrayDeep;
    cursor: default;
}

.PageNextEnable:hover {
    color: @FontColorGrayDeep;
    background-color: @fore_color;
    cursor: default;
}

.PageTotalNum {
    margin-left: 0.5rem;
}

.PageNum {
    background-color: @fore_color;
    width: 2.5rem;
    text-align: center;
}

.PageNum:hover {
    background-color: @BorderColor;
    cursor: pointer;
    color: @FontColorGray
}

.PageActive {
    background-color: #01aaed;
    color: @FontColorWhite;
    font-size: 1.2rem;
}

.PageActive:hover {
    background-color: #01aaed;
    cursor: default;
    color: @FontColorWhite;
}
</style>
