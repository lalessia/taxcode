import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import TaxCode from '@/components/TaxCode'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TaxCode',
      component: TaxCode
    }
  ]
})
