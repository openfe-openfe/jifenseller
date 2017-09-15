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
             <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
                <div class="before-trigger" v-if="beforePullDown">
                    <bubble :y="bubbleY"></bubble>
                </div>
                <div class="after-trigger" v-else>
                    <div v-if="pulling" class="loading">
                        <loading></loading>
                    </div>
                </div>
            </div>
             <div class="record-container" :style="isiOS">
                <scroll class="record-list" 
                    ref="scroll"
                    @scroll="scroll"
                    @scrollToEnd="loadMore"
                    :pullup="pullup"
                    :pullDownRefresh="pullDownRefresh"
					@pullingDown="pullingDown"
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
import Bubble from 'base/bubble/bubble'
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
                },
                pullDownRefresh:{threshold:60,stop:60},
                beforePullDown:true,
                bubbleY: 0,
                bulling:false,
                pullDownStyle: '',
                isiOS:`top:44px`
            }
        },
        created(){
            this.pullDownInitTop = 0
            if(this.record.length === 0){
                this.pullDownRefresh = false
            }
            this._getRecrod()
            this.phoneType=getPhoneType()
            /*计算窗口高度 */
            this.stylesheet.minHeight = (document.documentElement.clientHeight - 40)+'px'
        },
        mounted(){
            if(getPhoneType()=='iOS'){
			    this.isiOS=`top:64px`
		    }
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
            pullingDown(){
                console.log('pulling data')
                this.beforePullDown = false
                this.pulling = true
                this.title="刷新中"
                setTimeout(()=>{
                    this._getRecrod()
                    this.$refs.scroll.finishPullDown()
                     this.beforePullDown = true
                },1000)
		
	        },
            scroll(pos) {
                // console.log(pos)
                if(pos.y<0){
			        this.pullDownRefresh=false
		        }else{
			       this.pullDownRefresh={threshold:60,stop:60}
		        }
                let pullDownPostion=0
                    if(this.phoneType=='iOS'){
                        pullDownPostion = 64
                    }else{
                        pullDownPostion = 44
                    }
                    if (this.beforePullDown) {
                        this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
                        this.pullDownStyle = `top:${Math.min(pos.y + pullDownPostion , pullDownPostion)}px`
                    } else {
                        this.bubbleY = 0
                    }
	        },
        },
        components: {
            Scroll,
            Loading,
            Bubble
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
        .pulldown-wrapper
            position: absolute
            width: 100%
            left: 0
            display: flex
            justify-content center
            align-items center
            transition: all
            .after-trigger
                margin-top: 10px
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