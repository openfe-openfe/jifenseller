<template>
    <transition name="slide">
        <div class="itemList">
            <div class="header">
				<div class="back"><i @click="back()" class="icon-back"></i>返回</div>
				<h1 class="title">详情</h1>
		    </div>
            <div></div>
        </div>
    </transition>
</template>
<script>
    export default {
        methods:{
            back(){
                this.$router.back()
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .itemList
        position: fixed
        top: 0
        bottom: 0
        z-index: 100
        width: 100%
        background: #fff
        &.slide-enter-active, &.slide-leave-active
            transition: all 0.3s
        &.slide-enter, &.slide-leave-to
            transform: translate3d(100%, 0, 0)
        .header
            display:flex
            height:44px
            width:100%
            align-items:center
            color:#000
            font-size:16px
            position:relative
            background: #fff
            .back
                position:relative
                left:6px
                color:#06c1ae
            .back .icon-back
                font-size:20px;
            .title
                position: absolute
                left: 20%
                width: 60%
                text-overflow: ellipsis
                overflow: hidden
                white-space: nowrap
                text-align: center
                font-size: 18px
                line-height:44px
</style>