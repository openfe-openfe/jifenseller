<template>
    <transition name="slide">
        <div class="verification">
              <div class="header" v-if="phoneType == 'Android'">
				<div class="back" @click="back()"><i class="icon-back"></i>返回</div>
				<h1 class="title">扫码核销</h1>
		     </div>
             <div class="header-ios" v-if="phoneType == 'iOS'">
				<div class="back" @click="back()"><i class="icon-back"></i>返回</div>
				<h1 class="title">扫码核销</h1>
		     </div>
             <h2 class="kehexiao" v-if="codeData.status=='0'">{{codeData.tips}}</h2>
             <h2 class="yihexiao" v-if="codeData.status=='1'">{{codeData.tips}}</h2>
             <h2 class="yiguoqi" v-if="codeData.status=='3'">{{codeData.tips}}</h2>
             <div class="goods">
                    <img :src="codeData.logo"/>
                    <div class="goods-content">
                        <div class="goods-name">商品:{{codeData.name}}</div>
                        <div class="goods-price">价格:{{codeData.price}}元 <span class="jifen">{{codeData.jifen}}积分</span></div>
                    </div>
                    <div class="goods-back" @click="showConfirm"><i class="icon-right"></i></div>
             </div>
             <div class="dh-list">
                <div class="dingdan">
                    <div class="dingdannum">订单号</div>
                    <div class="dingdancode">{{codeData.orderno}}</div>
                </div>
                <div class="quanhao">
                    <div class="quanhaonum">券号</div>
                    <div class="quanhaocode">{{codeData.code}}</div>
                </div>
                <div class="bar"></div>
                <div class="youxiaoqi">
                    <div class="youxiaoqi">有效期</div>
                    <div class="youxiaoqi">{{codeData.youxiaoqi}}</div>
                </div>
             </div>
             <div class="button" v-if="codeData.status=='0'">
                <button @click.stop="selectIs()" v-if="disabled==false">确认核销</button>
                <button class="disa" v-if="disabled==true" >确认核销</button>
                <button class="canel" @click.stop="back()">取消</button>
             </div>
             <div class="button" v-if="codeData.status=='1'">
                <button @click="back()">返回</button>
             </div>
             <div class="button" v-if="codeData.status=='3'">
                <button @click="back()">返回</button>
             </div>
              <confirm ref="confirm" :title="codeData.content" confirmBtnText="清空"></confirm>
        </div>
    </transition>
</template>

<script>
  import Confirm from 'base/confirm/confirm'
  import {mapGetters} from 'vuex'
  import storage from 'best-storage'
  import {getIs} from 'api/seller'
  import {getPhoneType} from 'common/js/util'
    export default {
        props: {
            placeholder: {
                type: String,
                default: '￥请输入提现金额'
            }
        },
        data(){
            return {
                codeData:[],
                phoneType:'',
                disabled:false,
                title:'<h1>123</h1>'
            }
        },
        computed:{
            ...mapGetters([
                'verfiy'
            ])
        },
        created(){
            this.getCodeData()
            this.phoneType=getPhoneType()
        },
        methods:{
            back(){
                this.$router.back()
            },
            showConfirm(){
                this.$refs.confirm.show()
            },
            getCodeData(){
                this.codeData=this.verfiy
            },
            selectIs(){
                this.disabled=true
                setTimeout(()=>{
                    this.disabled=false
                },1000)
                const validate = this.verfiy.validate
                const user_account= this.verfiy.useraccount
                const seller_wv=storage.get('seller_wv')
                const code=this.verfiy.code
                const sid=this.verfiy.sid
                const time=this.verfiy.time
                getIs(validate,user_account,seller_wv,code,time,sid).then((res)=>{
                    if(res.flag==='1'){
                        alert('验证成功')
                        this.$router.push({
          		            path: `/seller`
    		            })
                    }else{
                        alert(res.msg)
                        this.$router.push({
          		            path: `/seller`
    		            })
                    }
                })
            }
        },
        components: {
            Confirm,
        }
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
        .kehexiao
            height:50px
            background:#ff7108
            color:#fff
            line-height:50px
            padding-left:10px
        .yihexiao
            height:50px
            background:#06c1ae
            color:#fff
            line-height:50px
            padding-left:10px
        .yiguoqi
            height:50px
            background:#999
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
                top:30px
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
            .disa
                width:100%
                background: #999
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