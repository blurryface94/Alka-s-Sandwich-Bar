import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Addsandwich from '@/components/Addsandwich'
import Edit from '@/components/EditSandwich'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-sandwich',
      name: 'Addsandwich',
      component: Addsandwich
    },
    {
      path: 'edit-sandwich/:sandwich_slug',
      name: 'EditSandwich',
      component: Edit
    }
  ]
})
