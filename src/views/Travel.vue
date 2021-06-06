<template>
  <div>
    <h1>1. Travel (P.69)</h1>

    <div class="row row-cols-1 row-cols-md-3 rows-cols-lg-4 g-4">      
      <div class="col">
        <div class="card">
          <div class="card-header bg-light border-success">
            <h5>Travel</h5>
          </div>
          <div class="card-body">            
            <ol class="list-group">
              <li class="list-group-item">1. Flee invasion</li>
              <li class="list-group-item">2. Decide whether to travel</li>
              <li class="list-group-item">3. Starship travel event</li>
              <li class="list-group-item">4. New world arrival</li>              
            </ol>
          </div>
        </div>
      </div>
    </div>
      
</div>
   
</template>

<script>
import { FPFHTables } from '../js/tables.js';

export default {
  name: 'Travel',  
  components: {    
  },
  mounted() {
     
  }, 
  data() {
    return {      
    }
  },  
  tables: new FPFHTables(),
  computed : {    
    username: function() {
      return this.$store.state.user.username;
    }  
  },
  methods: {    
  }
}
</script>

<style scoped>
  label {
    font-weight: 700;
  }  

  .col { 
    page-break-inside: avoid;
  }
</style>
