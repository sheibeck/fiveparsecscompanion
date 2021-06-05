<template>
  <div id="app" class="d-flex flex-column h-100">        
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <img src="./assets/logo.png" alt="5 Parsecs Companion" class="rounded-circle" /> <h4 class="text-secondary mx-2 mt-2">Parsecs Companion</h4>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">           
          </ul>
          <div class="text-end">
            <div v-if="authState !== 'signedin'">You are signed out.</div>
            <div v-if="authState === 'signedin' && user">
              <amplify-authenticator username-alias="email">              
                <amplify-sign-out></amplify-sign-out>
              </amplify-authenticator>
            </div>
          </div>
        </div>
      </div>    
    </nav>    

    <main class="flex-shrink-0">
      <div class="container-fluid">
        <div v-if="authState === 'signedin' && user">  
          <router-view/>
        </div>

        <div v-else>
          <amplify-authenticator username-alias="email">
            <amplify-sign-up
                slot="sign-up"
                username-alias="email"
                :form-fields.prop="formFields"
              ></amplify-sign-up>
            <amplify-sign-out></amplify-sign-out>
          </amplify-authenticator> 
        </div>
      </div>
    </main>

    <footer class="footer mt-auto py-3 bg-light">
      <div class="container">
        <span class="text-muted">This is not an official 5PFH app.</span>
        <div class="position-fixed bottom-0 end-0 p-2" style="z-index: 5">
          <div id="userFeedback" class="toast fade hide bg-success text-white d-flex" role="alert" aria-live="polite" aria-atomic="true">        
            <div class="toast-body" id="feedbackMsg">
              {{this.$store.state.feedbackMsg}}          
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>     
    </footer>

  </div>
</template>

<script>
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Toast } from 'bootstrap';

export default {
  name: 'App',  
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {      
      this.authState = authState;
      this.user = authData;
      this.$store.commit('user', authData);
    })
  },
  mounted() {    
    var feedbackToastEl = document.getElementById('userFeedback');
    var feedbackToast = new Toast(feedbackToastEl);
    this.$store.state.feedbackToast = feedbackToast;     
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
      formFields: [
        {
          type: 'email',
          label: 'Email Address',
          placeholder: 'Email Address',
          inputProps: { required: true, autocomplete: 'email' },
        },
        {
          type: 'password',
          label: 'Password',
          placeholder: 'Password',
          inputProps: { required: true, autocomplete: 'new-password' },
        }      
      ]
    }
  },
  beforeDestroy() {
    this.unsubscribeAuth();
    this.$store.commit('user', null);
  }
}
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
}

main {
  padding-bottom: 60px;
}

footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;  
  color: white;
  text-align: center;  
}

</style>
