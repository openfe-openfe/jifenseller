<template>
    <transition name="slide">
        <div class="recharge">
            <div class="header" v-if="phoneType == 'Android'">
				<div class="back" @click="back()"><i class="icon-back"></i>返回</div>
				<h1 class="title">充值</h1>
		     </div>
             <div class="header-ios" v-if="phoneType == 'iOS'">
				<div class="back" @click="back()"><i class="icon-back"></i>返回</div>
				<h1 class="title">充值</h1>
		     </div>
             <div class="czmony">
                    <div class="czmonyContain">
                        <div class="title">账户余额</div>
                        <div class="mony">{{ValidateAccount.keyongyue}}元</div>
                    </div>
                    <div class="czname">{{ValidateAccount.seller_name}}</div>
            </div>
            <div class="box">
                <sh-keyboard 
                    placeholder="请输入充值金额"
                    label="充值金额"
                    inter="8"
                    decimal="2"
                    v-model="query"/>
            </div>
             <div class="button">
                <button @click.stop.prevent="pay()" v-if="disabled==false">立即充值</button>
                <button class="disa" v-if="disabled==true" disabled="disabled">立即充值</button>
             </div>
             <div class="shuoming">
                <p>注意:</p>
                <p>1.冻结资金不可提现</p>
                <p>2.到账时间:15个工作日内(视平台而定)</p>
             </div>
        </div>
    </transition>
</template>
<script>
import storage from 'best-storage'
import {getValidateAccount,getPay} from 'api/seller'
import {getPhoneType} from 'common/js/util'
    export default {
        props: {
            placeholder: {
                type: String,
                default: '￥充值金额'
            }
        },
        data(){
            return {
                ValidateAccount:[],
                query: '',
                phoneType:'',
                disabled:true
            }
        },
        created(){
            this._getValidateAccount()
            this.$watch('query', (newQuery) => {
                 // 监听query值的变化
                //  newQuery = (parseFloat(newQuery)).toFixed(2)
                 newQuery = newQuery.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')
                 if(newQuery >=0.01){
                     this.disabled=false
                     this.query = newQuery
                 }else{
                     this.disabled=true
                 }
            })
            this.phoneType=getPhoneType()
        },
        methods:{
            back(){
                this.$router.back()
            },
             _getValidateAccount(){
                //  console.log(123)
                    const sid=storage.get('sid')
                    const seller_wv=storage.get('seller_wv')
                    const token=storage.get('token')
                    getValidateAccount(sid,seller_wv,token).then((res) => {
                        if (res.flag === '1') {
                        this.ValidateAccount = res.data
                        }
                    })
	        },
            pay(){
                const seller_id=storage.get('seller_id')
                const user_account=storage.get('user_account')
                const token=storage.get('token')
                const amount=this.$refs.query.value
                getPay(token,seller_id,amount,user_account).then((res)=>{
                    if(res.flag === '1'){
                        // 跳转微信支付
                        window.location.href = res.data +'&redirect_url=' + encodeURI('http://webapp.icloudcity.cn:7070')
                    }
                })
            },
        },
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .recharge
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
         .czmony
                height:70px
                background: #fff
                display:flex
                flex-direction:column
                // padding-top:10px
                justify-content:center
                padding-left:10px
                padding-right:10px
                margin-top:10px
                .czmonyContain
                    margin-bottom:15px
                    display:flex
                    justify-content:space-between
                    .title
                        // font-weight:lighter
                    .mony
                        // font-weight:lighter
                        color:#ff7108
                .czname
                    color:#666
                    font-size:14px
                    // font-weight:lighter
        .box
            height: 100%
            height: 50px
            padding:10px
            margin-top:10px
            background:#fff
            display:flex
            align-items:center
        .title2
            color:#333
            font-size:12px
            // text-align:center
            margin-top:10px
            padding-left:10px
            color:#999
            p 
                span
                    color:#2f8aff
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
        .shuoming
            padding-left:10px
            font-size:12px
            p
                padding-bottom:5px
                color:#999

</style>