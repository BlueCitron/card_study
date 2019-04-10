import Vue from 'vue'
import Router from 'vue-router'

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
    },
    {
      path: '/study/:type/:id',
      name: 'ChooseBox',
      component: () => import(/* webpackChunkName: "about" */ './views/study/ChooseBox.vue'),
    },
    {
      path: '/study/:type/:id/:box',
      name: 'ChooseBox',
      component: () => import(/* webpackChunkName: "about" */ './views/study/Study.vue'),
    },

    {
      path: '*',
      redirect: '/',
    }
  ]
})