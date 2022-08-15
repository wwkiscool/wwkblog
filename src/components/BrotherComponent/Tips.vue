<template>
    <!-- 提示弹层 -->
    <transition name="Fade" mode="out-in">
        <div class="tips" v-show="Tips.Show">
            <div class="tipContent">{{ Tips.Title }}</div>
        </div>
    </transition>
</template>
<script lang="ts" setup>
import { computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();


const Tips = computed({
    get() {
        return store.state.Tips;
    },
    set(Value) {
        store.commit('ChangeTip', Value);
    },
})
const ListenTips = computed(() => store.state.Tips.Show)
watch(ListenTips, (newValue, oldValue) => {
    if (store.state.Tips.Show) {
        setTimeout(() => {
            // 显示两秒后自动关闭
            Tips.value.Show = false;
        }, 2000)
    }
})

</script>

<style scoped lang="less">
@import "../../static/css/base";

.tips {
    position: fixed;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    color: @FontColorWhite;
    height: 3rem;
    line-height: 3rem;
    display: inline-block;
    text-align: center;
}

.tipContent {
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 0 1rem;
}
</style>
