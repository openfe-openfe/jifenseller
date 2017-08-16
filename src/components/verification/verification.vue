<template>
    <transition name="slide">
        <div class="verification">
             <div class="header">
				<div class="back" @click="back()"><i class="icon-back"></i>返回</div>
				<h1 class="title">扫码核销</h1>
		     </div>
             <h2>可核销</h2>
             <div class="goods">
                    <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/b80a043c57da31ca37f99c22b53511e3_121_121.jpg"/>
                    <div class="goods-content">
                        <div class="goods-name">商品:红牛一听装</div>
                        <div class="goods-price">价格:0.01元 <span class="jifen">10积分</span></div>
                    </div>
                    <div class="goods-back"><i class="icon-right"></i></div>
             </div>
             <div class="dh-list">
                <div class="dingdan">
                    <div class="dingdannum">订单号</div>
                    <div class="dingdancode">237482374934589</div>
                </div>
                <div class="quanhao">
                    <div class="quanhaonum">券号</div>
                    <div class="quanhaocode">237482374934589</div>
                </div>
                <div class="bar"></div>
                <div class="youxiaoqi">
                    <div class="youxiaoqi">有效期</div>
                    <div class="youxiaoqi">237482374934589</div>
                </div>
             </div>
             <div class="button">
                <button>确认核销</button>
                <button class="canel">取消</button>
             </div>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: '￥请输入提现金额'
            }
        },
        methods:{
            back(){
                this.$router.back()
            },
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .verification
        position: fixed
        top: 0
        bottom: 0
        z-index: 100
        width: 100%
        background: #f5f2f2
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
        h2
            height:50px
            background:#ff7108
            color:#fff
            line-height:50px
            padding-left:10px
        .goods
            display:flex
            height:70px
            background:#fff
            align-items:center
            padding-left:10px
            padding-right:10px
            position:relative
            img
                height:60px
                width:80px
                margin-right:10px
            .goods-content
                .goods-name
                    margin-bottom:10px
                    color:#333
                .goods-price
                    .jifen
                        // display:inline-block
                        width:30px
                        height:30px
                        background: linear-gradient(to left, #ffb857 00%,#ff5d70 100%)
                        border-radius:15px
                        color:#fff
                        font-size:12px
                        padding:2px
            .goods-back
                position:absolute
                right:10px
        .dh-list
            display:flex
            flex-direction:column
            // padding-left:10px
            // padding-right:10px
            margin-top:10px
            background:#fff
            .dingdan,.quanhao,.youxiaoqi
                height:50px
                background:#fff
                display:flex
                align-items:center
                justify-content:space-between
                position:relative
                padding-left:10px
                padding-right:10px
            .dingdan::after
                content: " "
                position: absolute
                left: 0
                bottom: 0
                width: 100%
                height: 1px
                border-bottom: 1px solid #d6d6d6
                color: #d6d6d6
                transform-origin: 0 100%
                transform: scaleY(.5)
                // .dingdancode
          
            .bar
                background:#f5f2f2
                height:10px
        .button
            text-align:center
            margin-top:30px
            margin-bottom:30px
            padding-left:10px
            padding-right:10px
            button
                width:100%
                background: #ff7108
                text-align:center
                height:50px
                margin:0 auto
                border-radius:3px
                color:#fff
                box-shadow: 0 3px 3px rgba(250,0,0,0.1)
            .canel
                 background: #c2c2c2
                 margin-top:20px
                 box-shadow: 0 1px 3px 0 rgba(0,0,0,.14)
</style>