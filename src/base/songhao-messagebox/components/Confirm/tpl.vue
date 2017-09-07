<template>
    <transition name="messagebox">
        <div v-if="show" class="messagebox">
            <div class="messagebox-popup messagebox-popup-in">
                <div class="messagebox-popup-inner">
                    <div class="messagebox-popup-title" v-if="title">{{title}}</div>
                    <div class="messagebox-popup-text">{{content}}</div>
                </div>
                <div class="messagebox-popup-buttons">
                    <span class="messagebox-popup-button" :style="yesStyle" @click="success">{{yes.text}}</span>
                    <span class="messagebox-popup-button" :style="noStyle" @click="cancel">{{no.text}}</span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import pageChange from '../../mixins'
    export default {
        mixins: [pageChange],
        data () {
            return {
                show: false,
                title: '提示',
                content: '',
                style: {},
                yes: {
                    text: '确定',
                    style: {}
                },
                no: {
                    text: '取消',
                    style: {}
                }
            }
        },
        computed: {
            yesStyle () {
                let o = {};
                for (let key in this.style) {
                    o[key] = this.style[key]
                }
                return Object.assign(o, this.yes.style);
            },
            noStyle () {
                let o = {};
                for (let key in this.style) {
                    o[key] = this.style[key]
                }
                return Object.assign(o, this.no.style);
            }
        },
        methods: {
            success () {
                this.show = false;
            },
            cancel () {
                this.show = false;
            }
        }
    }
</script>