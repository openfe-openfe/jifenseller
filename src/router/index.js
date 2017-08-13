import Vue from 'vue'
import Router from 'vue-router'
import Seller from 'components/seller/seller'

Vue.use(Router)
const ItemList = (resolve) => {
  import('components/itemlist/itemlist').then((module) => {
    resolve(module)
  })
}


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/seller'
    },
    {
      path: '/seller',
      component: Seller,
      children:[
        {
          path: ':id',
          component: ItemList,
        }
      ]
    },
  ]
})
