<template>
    <transition name="slide">
        <div class="record">
             <div class="header">
				<div class="back" @click="back()"><i class="icon-back"></i>返回</div>
				<h1 class="title">验证记录</h1>
		     </div>
             <div class="record-container">
                <scroll class="record-list" 
                ref="scroll"
                @scrollToEnd="loadMore"
                :pullup="pullup"
                :data="record">
                    <div>
                        <div class="record-item" v-for="item in record">
                            <div class="item-name">{{item.goodsname}}</div>
                            <div class="item-quanhao">
                                <div class="quanhao-num">券号:</div>
                                <div class="quanhao-code">{{item.code}}</div>
                            </div>
                            <div class="item-dingdan">
                                <div class="dingdan-num">订单号:</div>
                                <div class="dingdan-code">{{item.orderno}}</div>
                            </div>
                            <div class="item-time">
                                <div class="time-num">验证时间:</div>
                                <div class="quatimenhao-code">{{item.validate_time}}</div>
                            </div>
                        </div>
                        <loading v-show="hasMore" title=""></loading>
                    </div>
                </scroll>
             </div>
        </div>
    </transition>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {getRecord} from 'api/seller'
export default {
        data(){
            return {
                record:[],
                hasMore:true,
                pullup:true
            }
        },
        created(){
            this._getRecrod()
        },
        mounted(){
            console.log(window.location)
        },
        methods:{
            back(){
                this.$router.back()
            },
            _getRecrod(){
                const sid='52'
                const user_account='54057460'
                getRecord(sid,user_account).then((res)=>{
                    if(res.flag === '1'){
                        this.record = res.data || []
                        // console.log(this.record)
                        this._checkMore(res.data)
                    }
                })
            },
            loadMore(){
                if (!this.hasMore) {
                        return
                }
                getRecord().then((res) => {
                    if(res.flag ==='1'){
                        this.record = this.record.concat(res.data)
                        this._checkMore(res.data)
                }
        	})
	  },
            _checkMore(data){
                const data2 = data
                // console.log(data2.length)
                if(!data2.length){
                    this.hasMore = false
                }
            }
        },
        components: {
            Scroll,
            Loading
         }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .record
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
        .record-container
            position:fixed
            top:44px
            width:100%
            bottom:0
            .record-list
                height:100%
                overflow:hidden
                .record-item
                    height:100px
                    padding-left:10px
                    padding-right:10px
                    background:#fff
                    margin-bottom:10px
                    display:flex
                    flex-direction:column
                    // align-items:center
                    justify-content:center
                    .item-name
                        font-size:18px
                        color:#333
                        font-weight:600
                        margin-bottom:10px
                    .item-quanhao,.item-dingdan,.item-time
                        display:flex
                        justify-content:space-between
                        color:#666
                        font-size:14px
                        margin-bottom:5px

</style>