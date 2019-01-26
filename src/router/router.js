import Vue from 'vue'
import Router from 'vue-router'

import ShoppingIndex from '@/components/Shopping_index.vue'
import ShoppingCar from '@/components/Shopping_car.vue'
import ShoppingUser from '@/components/Shopping_user.vue'
import ShoppingDetails from '@/components/Shopping_details.vue'
import ShoppingSearch from '@/components/Shopping_search.vue'

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path:'/',
      name:'ShoppingIndex',
      component:ShoppingIndex
    },
    {
      path:'/components/Shopping_car.vue',
      name:'ShoppingCar',
      component:ShoppingCar
    },
    {
      path:'/components/Shopping_user.vue',
      name:'ShoppingUser',
      component:ShoppingUser
    },
    {
      path:'/components/Shopping_details.vue',
      name:'ShoppingDetails',
      component:ShoppingDetails
    },
    {
      path:'/component/Shopping_search.vue',
      name:'ShoppingSearch',
      component:ShoppingSearch
    }
  ]
})
