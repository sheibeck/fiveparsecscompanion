<template>
  <div id="app">
    <header class="p-3 bg-dark text-white">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <img src="./assets/logo.png" alt="5 Parsecs Companion" />
          </a>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/" class="nav-link px-2 text-secondary">5 Parsecs Companion</a></li>
            <!--<li><a href="#" class="nav-link px-2 text-white">Features</a></li>
            <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
            <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
            <li><a href="#" class="nav-link px-2 text-white">About</a></li>-->
          </ul>

          <!--<form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
          </form>-->

          <div class="text-end">
            <div v-if="authState !== 'signedin'">You are signed out.</div>
            <div v-if="authState === 'signedin' && user">
              <amplify-authenticator>              
                <amplify-sign-out></amplify-sign-out>
              </amplify-authenticator>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container responsive" v-if="authState === 'signedin' && user">  
      <Crew />
    </div>
    <div v-else>
      <amplify-authenticator>              
        <amplify-sign-out></amplify-sign-out>
      </amplify-authenticator> 
    </div>
  </div>
</template>

<script>
import { onAuthUIStateChange } from '@aws-amplify/ui-components'
import Crew from './components/Crew.vue'

export default {
  name: 'App',
  components: {
    Crew
  },
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    })
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined
    }
  },
  beforeDestroy() {
    this.unsubscribeAuth();
  }
}
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
}
</style>
