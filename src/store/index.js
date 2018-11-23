import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Certifier from './modules/certifier'

export default new Vuex.Store({
  modules: {
    Certifier
  }
})
