<template>
    <transition name="slide">
        <div class="itemList">
            <div class="header">
				<div class="back" @click="back()" ><i class="icon-back"></i>返回</div>
				<h1 class="title">详情</h1>
		    </div>
            <div class="txcontent">
                <div class="bar"></div>
                <div class="txmony">
                    <div class="txmonyContain">
                        <div class="title">提现金额</div>
                        <div class="mony">238493元</div>
                    </div>
                    <div class="txtime">2017/04/01 9:00</div>
                </div>
                <div class="bar"></div>
                <div class="txprogress">
                    <div class="txpList">
                        <ul>
                            <li class="list">
                                 <span>
                                    <i class="icon-duihao"></i>
                                </span>
                                <div class="list-title">
                                    提现申请已提交,等待处理
                                </div>
                                <div class="list-time">
                                   2017/04/01 9:00
                                </div>
                            </li>
                            <li class="list">
                                <div class="list-title2">
                                    提现申请已提交,等待处理
                                </div>
                                <div class="list-time2">
                                   2017/04/01 9:00
                                </div>
                                <span>
                                    <i class="icon-money"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default {
        computed:{
            id(){
                return this.seller.id
            },
            ...mapGetters([
                'seller'
            ])
        },
        methods:{
            back(){
                this.$router.back()
            },
            _getId(){
                console.log(this.seller.id)
            }
        },
        created(){
            this._getId()
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
                left:10px
                color:#06c1ae
                height:40px
                width:80px
                line-height:40px
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
        .txcontent
            height:100%
            background: #fff
            .bar
                background:#f5f2f2
                height:10px
            .txmony
                height:70px
                background: #fff
                display:flex
                flex-direction:column
                padding-top:10px
                justify-content:center
                padding-left:10px
                padding-right:10px
                .txmonyContain
                    margin-bottom:15px
                    display:flex
                    justify-content:space-between
                    .title
                        // font-weight:lighter
                    .mony
                        // font-weight:lighter
                        color:#ff7108
                .txtime
                    color:#666
                    font-size:14px
                    // font-weight:lighter
            .txprogress
                padding-left:10px
                .txpList
                    margin-top:10px
                    .list
                        height:70px
                        position:relative
                        padding-left:40px
                        display:flex
                        flex-direction:column
                        justify-content:space-between
                        .list-title
                            color:#2f8aff
                            position:relative
                            top:-30px
                        .list-time
                            color:#666
                            position:relative
                            top:-28px
                            font-size:14px
                        .list-title2
                            color:#2f8aff
                            position:relative
                            top:50px
                        .list-time2
                            color:#666
                            position:relative
                            top:52px
                            font-size:14px
                        span
                            // display:inline-block
                            width:20px
                            height:20px
                            background:#fff
                            position:relative
                            left:-40px
                            border-radius:50%
                            // background-position:10px
                            z-index:10
                            .icon-duihao
                                color:#2f8aff
                                font-size:26px
                                // background:#fff
                                border-radius:50%
                                display:inline-block
                                font-weight:bold
                            .icon-money
                                color:#2f8aff
                                font-size:28px
                                // background:#fff
                                border-radius:50%
                                display:inline-block
                                font-weight:bold
                    .list::after
                        content: " "
                        position: absolute
                        left: 10px
                        top: 0;
                        width: 1px
                        height: 100%
                        border-right: 3px solid #2f8aff
                        color: #2f8aff
                        transform-origin: 100% 0
                        transform: scaleX(.5)

</style>