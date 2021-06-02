import Vue from 'vue'
import App from './App.vue'
import "@aws-amplify/ui-vue";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import router from './router'
import Vuex from 'vuex'

Amplify.configure(awsconfig)

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    user (state, user) {      
      state.user = user;
    }
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
