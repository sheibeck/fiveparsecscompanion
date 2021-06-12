<template>
  <div id="app" class="d-flex flex-column h-100">        
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-print-none">
      <div class="container-fluid">
        <a href="/" class="navbar-brand d-flex">
          <img src="./assets/logo.png" alt="5 Parsecs Companion" class="d-inline-block align-text-top rounded-circle" />
          <div class="ms-2 mt-2">Parsecs Companion</div>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <a class="nav-link" :class="{ 'active': $route.name === 'Home' ||  $route.name === 'Crew' }" aria-current="page" href="/">Crew List</a>
            <li class="nav-item dropdown">              
              <a class="nav-link dropdown-toggle" :class="{ 'active': $route.name !== 'Home' && $route.name !== 'Crew' }" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Campaign Turn
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">                
                <li><a class="dropdown-item" href="/campaign-turn/travel">1. Travel</a></li>
                <li><a class="dropdown-item" href="/campaign-turn/world">2. World</a></li>
                <li><a class="dropdown-item" href="/campaign-turn/battle">3. Battle</a></li>                
                <!--<li><a class="dropdown-item" href="#">4. Post-Battle</a></li>-->
              </ul>
            </li>
            <li class="nav-item dropdown">              
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Resources
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">                
                <li><a class="dropdown-item" href="https://www.modiphius.net/products/five-parsecs-from-home"  target="_blank"><i class="fas fa-book-open"></i> 5 Parsecs From Home</a></li>
                <li><a class="dropdown-item" href="https://discord.gg/vFVmE59" target="_blank"><i class="fab fa-discord"></i> NWG Discord</a></li>                
              </ul>
            </li>
            <a class="nav-link" href="https://github.com/sheibeck/fiveparsecscompanion/issues" target="_blank"><i class="fas fa-bug"></i> Report Issues</a>
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

    <footer class="footer mt-auto py-3 bg-light d-print-none">
      <div class="container">
        <span class="text-muted">This is not an official 5PFH app.</span>
        <div class="position-fixed bottom-0 end-0 p-2" style="z-index: 5">
          <div id="userFeedback" class="toast fade hide text-white d-flex" :class="{ 'bg-success': !$store.state.feedbackMsgType, 'bg-danger': $store.state.feedbackMsgType === 'error' }" role="alert" aria-live="polite" aria-atomic="true">        
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

i {
  cursor: pointer;
}

@media print {
  ::-webkit-input-placeholder { /* WebKit browsers */
      color: transparent;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: transparent;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: transparent;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: transparent;
  } 

  @page
  {
      size:  auto;   /* auto is the initial value */
      margin-left: 0mm;  /* this affects the margin in the printer settings */
      margin-right: 0mm;  /* this affects the margin in the printer settings */
      margin-top: 3mm;
  }

  html
  {      
    margin-left: 0px;  /* this affects the margin on the html before sending to printer */
    margin-right: 0px;
  }

  body
  {
    margin-left: 0mm; /* margin you want for the content */
    margin-right: 0mm; /* margin you want for the content */
  }
}

</style>
