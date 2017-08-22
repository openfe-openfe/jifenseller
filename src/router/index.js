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

const Verification = (resolve) => {
  import('components/verification/verification').then((module) => {
    resolve(module)
  })
}

const Record = (resolve) => {
  import('components/record/record').then((module) => {
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
      component: Seller
    },
    {
      path: '/sellerdetail',
      component: ItemList
    },
    {
      path: '/enchashment',
      component: Enchashment
    },
    {
      path: '/recharge',
      component: Recharge
    },
    {
      path: '/verification',
      component: Verification
    },
    {
      path: '/record',
      component: Record
    }
  ]
})
