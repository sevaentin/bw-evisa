import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueRouter)

import Vuex from 'vuex'

Vue.use(Vuex)

const shipStore = new Vuex.Store({
  state: {
    appNum:''
  },
  mutations: {
   saveAppNum (state, app) {
     state.appNum = app
   }
  },
  actions: {
   saveAppNum (context, app) {
     context.commit('saveAppNum', app)
   }
  },
});

new Vue({
  vuetify,
  router:router,
    store:shipStore,
  render: h => h(App)
}).$mount('#app')
