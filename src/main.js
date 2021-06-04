import Vue from 'vue'
import App from './App.vue'
import "@aws-amplify/ui-vue";
import { Amplify, Hub } from 'aws-amplify';
import awsconfig from './aws-exports'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import router from './router'
import Vuex from 'vuex'
import { DataStore } from '@aws-amplify/datastore';

awsconfig.oauth.redirectSignIn = `${window.location.origin}`;
awsconfig.oauth.redirectSignOut = `${window.location.origin}`;

//when a new sign-in is detected clear the local data
//so we can pull the new users data
Hub.listen('auth', async (data) => {  
  if (data.payload.event === 'signIn') {
    await DataStore.clear();
  }
});

Amplify.configure(awsconfig)

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    develop: Vue.config.devtools ?? false,
    feedbackMsg: "",
    feedbackToast: null,
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
