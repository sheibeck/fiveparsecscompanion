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
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import { Vue as VueIntegration } from "@sentry/integrations";

Sentry.init({
  Vue,
  dsn: "https://0155ea3774174926b6113a83b83f4ae1@o302915.ingest.sentry.io/5803169",
  environment: process.env.NODE_ENV,  
  ignoreErrors: [
    // Random plugins/extensions
    "top.GLOBALS",
    // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
    "originalCreateNotification",
    "canvas.contentDocument",
    "MyApp_RemoveAllHighlights",
    "http://tt.epicplay.com",
    "Can't find variable: ZiteReader",
    "jigsaw is not defined",
    "ComboSearch is not defined",
    "http://loading.retry.widdit.com/",
    "atomicFindClose",
    // Facebook borked
    "fb_xd_fragment",
    // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
    // reduce this. (thanks @acdha)
    // See http://stackoverflow.com/questions/4113268
    "bmi_SafeAddOnload",
    "EBCallBackMessageReceived",
    // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
    "conduitPage",
    "Error: Extension context invalidated.",
    "ResizeObserver loop limit exceeded",
  ],
  denyUrls: [
    // Facebook flakiness
    /graph\.facebook\.com/i,
    // Facebook blocked
    /connect\.facebook\.net\/en_US\/all\.js/i,
    // Woopra flakiness
    /eatdifferent\.com\.woopra-ns\.com/i,
    /static\.woopra\.com\/js\/woopra\.js/i,
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Other plugins
    /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
    /webappstoolbarba\.texthelp\.com\//i,
    /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
  ],
  integrations: [
    new Integrations.BrowserTracing(),
    new VueIntegration({
      Vue,      
      attachProps: true,
      logErrors: true,          
    }),    
  ],  
});

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
  methods : {
    showUserMsg: function(msg) {
      this.$store.state.feedbackMsg = msg;
      this.$store.state.feedbackToast.show();
    }
  },
  render: (h) => h(App)
}).$mount("#app");
