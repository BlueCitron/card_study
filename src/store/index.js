import Vue from 'vue'
import Vuex from 'vuex'

import * as card from './card'
import * as category from './category'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    card,
    category,
  },
  state: {
    drawer: true,
    type: '',
    category: '',
  },
  mutations: {
    SET_TYPE (state, data) {
      state.type = data
    },
    SET_CATEGORY (state, data) {
      state.category = data
    },
  },
})
