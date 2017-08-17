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
                        <div class="mony">{{Txdata.amount}}元</div>
                    </div>
                    <div class="txtime">{{Txdata.time}}</div>
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
                                   {{Txdata.time}}
                                </div>
                            </li>
                            <li class="list" v-if="Txdata.status == 1">
                                <div class="list-title-success">
                                    提现成功
                                </div>
                                <div class="list-time-success">
                                   {{Txdata.time}}
                                </div>
                                <span>
                                    <i class="icon-money"></i>
                                </span>
                            </li>
                            <li class="list list-error" v-if="Txdata.status == 2">
                                <div class="list-title-error">
                                    {{Txdata.title_1}}
                                </div>
                                <div class="list-time-error">
                                  {{Txdata.title_2}}
                                </div>
                                <span>
                                    <i class="icon-money"></i>
                                </span>
                            </li>
                            <li class="list list-check" v-if="Txdata.status == 0">
                                <div class="list-title-check">
                                    {{Txdata.title_1}}
                                </div>
                                <div class="list-time-check">
                                  {{Txdata.title_2}}
                                </div>
                                <span>
                                    <i class="icon-money"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="button" v-if="Txdata.status == 0">
                    <button class="canel">取消提现</button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {getTixiandetail} from 'api/seller'
    export default {
        data(){
            return {
                success:false,
                error:false,
                check:true,
                Txdata:'',
            }
        },
        computed:{
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
            },
            _getTixiandetail(){
                getTixiandetail(this.seller.id).then((res)=>{
                    if(res.flag ==='1'){
                        this.Txdata=res.data
                    }
                })
            }
        },
        created(){
            this._getId()
            this._getTixiandetail()

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
                        .list-title-success
                            color:#2f8aff
                            position:relative
                            top:50px
                        .list-time-success
                            color:#666
                            position:relative
                            top:52px
                            font-size:14px
                        .list-title-error
                            color:#ff5e70
                            position:relative
                            top:50px
                        .list-time-error
                            color:#666
                            position:relative
                            top:52px
                            font-size:14px
                        .list-title-check
                            color:#666
                            position:relative
                            top:50px
                        .list-time-check
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
                    .list-error
                        span
                            .icon-money
                                color:#ff5e70
                                font-size:28px
                                // background:#fff
                                border-radius:50%
                                display:inline-block
                                font-weight:bold
                    .list-check
                        span
                            .icon-money
                                color:#999
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
                    .list-check::after
                        content: " "
                        position: absolute
                        left: 10px
                        top: 0;
                        width: 1px
                        height: 100%
                        border-right: 3px solid #999
                        color: #999
                        transform-origin: 100% 0
                        transform: scaleX(.5)
            .button
                text-align:center
                margin-top:60px
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