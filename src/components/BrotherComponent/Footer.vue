<template>
    <footer class="Footer">
        <div>版权所有 @2020-2022保留所有权利  <span class="RecordNo">
            备案号
        </span></div>
        <div>Base on express + MongoDB + Vue</div>
    </footer>
</template>

<style scoped lang="less">
    @import '../../static/css/base.less';
    /*pc端*/
    @media only screen and (min-device-width : 768px) {
        .Footer{
            text-align: center;
            background-color: @TranslucentWhitleBackg;
            color: @FontColorGray;
            padding: 2rem 1rem 1.6rem;
            margin-top: 1rem;
        }
        .RecordNo{
            margin-left: 0.8rem;
        }
        .Footer :nth-child(1){
            margin-bottom: 1rem;
        }
    }

    /*移动端*/
    @media only screen and (max-device-width : 768px) {
        .Footer{
            text-align: center;
            background-color: @fore_color;
            color: @footerColor;
            padding: 1.5rem;
            margin-top: 1rem;
        }
        .RecordNo{
            display: inline-block;
            margin-top: 0.3rem;
            margin-bottom: 0.3rem;
        }
    }

</style>