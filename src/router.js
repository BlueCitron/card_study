import Vue from 'vue'
import Router from 'vue-router'

import store from './store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import(/* webpackChunkName: "about" */ './views/Study.vue')
    },
    {
      path: '/study',
      name: 'ChooseType',
      component: () => import(/* webpackChunkName: "about" */ './views/study/ChooseType.vue'),
    },
    {
      path: '/study/:type',
      name: 'ChooseCategory',
      component: () => import(/* webpackChunkName: "about" */ './views/study/ChooseCategory.vue'),
      beforeEnter (to, from, next) {
        store.dispatch('FETCH_CATEGORIES')
        next()
      }
    },
    {
      path: '/study/:type/:id',
      name: 'ChooseBox',
      component: () => import(/* webpackChunkName: "about" */ './views/study/ChooseBox.vue'),
    },
    {
      path: '/study/:type/:id/:box',
      name: 'Study',
      component: () => import(/* webpackChunkName: "about" */ './views/study/Study.vue'),
    },

    {
      path: '*',
      redirect: '/',
    }
  ]
})
