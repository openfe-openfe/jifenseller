<template>
    <transition name="slide">
        <div class="record">
            <div class="header" v-if="phoneType == 'Android'">
				<div class="back" @click="back()"><i class="icon-back"></i>返回</div>
				<h1 class="title">验证记录</h1>
		     </div>
             <div class="header-ios" v-if="phoneType == 'iOS'">
				<div class="back" @click="back()"><i class="icon-back"></i>返回</div>
				<h1 class="title">验证记录</h1>
		     </div>
             <loading v-show="reflsh" title="释放即可刷新"></loading>
             <div class="record-container">
                <scroll class="record-list" 
                    ref="scroll"
                    @scroll="scroll"
                    @scrollToEnd="loadMore"
                    :pullup="pullup"
                    :pulldown="pulldown"
                    @pulldown="reflash"
                    :listenScroll="listenScroll"
                    :probeType="3"
                    :data="record">
                    <div v-bind:style="stylesheet">
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
import storage from 'best-storage'
import {getPhoneType} from 'common/js/util'
export default {
        data(){
            return {
                record:[],
                hasMore:true,
                pullup:true,
                pulldown:true,
                listenScroll:true,
                page:'',
                phoneType:'',
                scrollY: -1,
                reflsh:true,
                stylesheet:{
                    minHeight:'0px'
                }
            }
        },
        created(){
            this._getRecrod()
            this.phoneType=getPhoneType()
            /*计算窗口高度 */
            this.stylesheet.minHeight = (document.documentElement.clientHeight - 40)+'px'
        },
        mounted(){
            console.log(window.location)
        },
        methods:{
            back(){
                this.$router.back()
            },
            _getRecrod(){
                const sid=storage.get('sid')
                const user_account=storage.get('user_account')
                this.page = 1
                getRecord(sid,user_account,this.page).then((res)=>{
                    if(res.flag == '1'){
                        this.record = res.data || []
                        // console.log(this.record)
                        this._checkMore(res.data,res)
                        this.reflsh=false
                    }else{
                        this._checkMore(res.data,res)
                        this.reflsh=false
                    }
                })
            },
            loadMore(){
                if (!this.hasMore) {
                        return
                }
                const sid = storage.get('sid')
                const user_account=storage.get('user_account')
                this.page++
                getRecord(sid,user_account,this.page).then((res) => {
                    if(res.flag =='1'){
                        this.record = this.record.concat(res.data)
                        this._checkMore(res.data)
                }else{
                    this._checkMore(res.data,res)
                }
        	})
	  },
            _checkMore(data,res){
                const data2 = data
                // console.log(data2.length)
                console.log(res.flag)
                this.reflsh = false
                if(!data2.length || res.page.page == '1' || res.flag == '0'){
                    
                    this.hasMore = false
                }
            },
            reflash(){
                this._getRecrod()
            },
            scroll(pos) {
                // console.log(pos)
                this.scrollY = pos.y
                if(this.scrollY<0){
                    this.reflsh=false
                }else{
                    // console.log(123)
                    this.reflsh=true
                    /*定时器执行 */
                    setTimeout(()=>{
                        this.reflsh=false
                    },1000)
                }
	        },
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
        .header-ios
            display:flex
            height:64px
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
                line-height:64px
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