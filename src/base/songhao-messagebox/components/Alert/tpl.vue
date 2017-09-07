<template>
    <transition name="messagebox">
        <div v-if="show" class="messagebox">
            <div class="messagebox-popup messagebox-popup-in">
                <div class="messagebox-popup-inner">
                    <div class="messagebox-popup-title" v-if="title">{{title}}</div>
                    <div class="messagebox-popup-text">{{content}}</div>
                </div>
                <div class="messagebox-popup-buttons">
                    <span class="messagebox-popup-button messagebox-popup-button-bold" :style="btn.style" @click="success">
                        {{btn.text}}
                    </span>
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
                btn: {
                    text: '确定',
                    style: {}
                }
            }
        },
        methods: {
            success () {
                this.show = false;
            }
        }
    }
</script>