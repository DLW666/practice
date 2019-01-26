import Vue from 'vue'
import Router from 'vue-router'

import test from '@/components/test.vue'
import Calculator from '@/components/Calculator.vue'
import Shopping from '@/components/Shopping.vue'

Vue.use(Router)

export default new Router({
  routes: [
  	{
    	path:'/',
    	component:test
    },
    {
    	path:'/components/Calculator.vue',
    	component:Calculator
    },
    {
      path:'/components/Shopping.vue',
      component:Shopping
    }
  ]
})
