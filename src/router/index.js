import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Seller = (resolve) => {
  import('components/seller/seller').then((module) => {
    resolve(module)
  })
}

const ItemList = (resolve) => {
  import('components/itemlist/itemlist').then((module) => {
    resolve(module)
  })
}

const Enchashment = (resolve) => {
  import('components/enchashment/enchashment').then((module) => {
    resolve(module)
  })
}

const Recharge = (resolve) => {
  import('components/recharge/recharge').then((module) => {
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
    {
      path: '/enchashment',
      component: Enchashment
    },
    {
      path: '/recharge',
      component: Recharge
    }
  ]
})
