// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import fastclick from 'fastclick'
import store from './store'
import {Alert, Confirm, Toast} from 'songhao-vue-messagebox'
// // 样式文件
import 'songhao-vue-messagebox/style.css'
Vue.use(Alert)
Vue.use(Confirm)
Vue.use(Toast)

import shKeyBoard from 'vue-num-keyboard'
import 'vue-num-keyboard/style.css'
Vue.use(shKeyBoard)

Vue.config.productionTip = false
// fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
