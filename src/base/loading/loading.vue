<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '正在刷新...'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

  .loading
    width: 100%
    text-align: center
    padding-top:0px
    .desc
      line-height: 20px
      font-size: 14px
      color: #000
</style>
