<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop  @click="cancel()">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text" v-html="title"></p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      cancel() {
        this.hide()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .confirm
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    background-color: rgba(0, 0, 0, 0.3)
    &.confirm-fade-enter-active
      animation: confirm-fadein 0.3s
      .confirm-content
        animation: confirm-zoom 0.3s
    .confirm-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 999
      width:100%
      .confirm-content
        width: 95%
        margin:0 auto
        border-radius: 6px
        background: #fff
        .text
          padding: 19px 15px
          line-height: 22px
          text-align: center
          font-size: 14px
          color: #000
        .operate
          display: flex
          align-items: center
          text-align: center
          font-size: 14px

  @keyframes confirm-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes confirm-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>