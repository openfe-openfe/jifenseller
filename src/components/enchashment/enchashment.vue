<template>
    <transition name="slide">
        <div class="enchashment">
             <div class="header">
				<div class="back" @click="back()"><i class="icon-back"></i>返回</div>
				<h1 class="title">提现</h1>
		     </div>
             <div class="txInput">
                <input ref="query" v-model="query" class="box" :placeholder="placeholder" type="number"/>
             </div>
             <div class="title2">可提现账户余额:{{ValidateAccount.keyongyue}}元,当前账户余额:{{ValidateAccount.zongjine}}元</div>
             <div class="button">
                <button @click="submit()">提交</button>
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
import {getApply} from 'api/seller'
import {getValidateAccount} from 'api/seller'
    export default {
        props: {
            placeholder: {
                type: String,
                default: '￥请输入提现金额'
            }
        },
         data() {
            return {
                query: '',
                ValidateAccount:[]
            }
         },
         created(){
             this._getValidateAccount()
         },
        methods:{
            back(){
                this.$router.back()
            },
             _getValidateAccount(){
                 	const sid='52'
                    const seller_wv='54057460'
                    const token='B26711E76E9CADC91EDAE1F949828BEA'
                getValidateAccount(sid,seller_wv,token).then((res) => {
                    if (res.flag === '1') {
                        this.ValidateAccount = res.data
                    }
                })
	        },
            submit(){
            //    console.log(this.$refs.query.value)
                    const token='B26711E76E9CADC91EDAE1F949828BEA'
                    const seller_id='52'
                    const amount=this.$refs.query.value
                    const user_account='54057460'
                    getApply(token,seller_id,amount,user_account).then((res)=>{
                        if(res.flag === '1'){
                            // 提现成功，进入提现详情页面

                        }
                    })
            }
        },
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .enchashment
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
        .txInput
            display:flex
            background:#fff
            height:50px
            width:100%
            margin-top:10px
            .box
                flex: 1
                margin: 0 5px
                line-height: 18px
                background: #fff
                color: #666
                font-size: 14px
                text-align:center
                padding-left:10px
                &::placeholder
                    color: #999
        .title2
            color:#333
            font-size:12px
            text-align:center
            margin-top:10px
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
        .shuoming
            padding-left:10px
            font-size:12px
            p
                padding-bottom:5px
                color:#999

</style>