<template>  
  <div class="page-break">
    <div v-for="(chunk, idx) in chunkWorlds" :key="idx" class="page-break">
      <div class="d-flex flex-wrap">
        <div class="world border border-1 p-2 d-flex flex-column my-1 w-50" :class="{ 'bg-leader': world.current_location }" v-for="(world) in chunk" :key="world.id">
          <div class="d-flex rounded h5 px-1 mb-0">
            {{world.name}}
            <div class="ms-4 small ms-auto">
              <label class="form-check-label small p-0">
                Current Location
              </label>
              <input v-model="world.current_location" class="form-check-input" type="checkbox" value="" />                  
            </div>
          </div>
          <div class="d-flex">
            <div class="d-flex flex-column flex-md-row flex-fill">
              <div class="d-flex flex-column">             
                <div class="form-check ms-4">
                  <input v-model="world.licensing_required" class="form-check-input" type="checkbox" value="" />
                  <label class="form-check-label small" for="kia">
                    Licensing Required
                  </label>
                </div>

                <div class="form-check ms-4">
                  <input class="form-check-input" type="checkbox" value="" />
                  <label class="form-check-label small" for="kia">
                    License Obtained
                  </label>
                </div>                  
                
              </div>

              <div class="d-flex flex-fill border border-1 flex-fill">
                <div class="flex-column flex-fill">
                  <label class="form-text small">Traits: </label>
                  <span>{{world.traits}}</span>
                </div>
              </div>

              <div class="d-flex flex-fill border border-1 flex-fill">
                <div class="flex-column flex-fill">
                  <label class="form-text small">Notes: </label>                  
                  <span>{{world.notes}}</span>
                </div>
              </div>
                          
            </div>

            
            <div class="d-flex flex-column flex-fill border border-1">
              <div class="flex-column flex-fill">
                <label class="form-text small">Invading Force: </label>
                <span>: {{world.invading_forces}}</span>
              </div>

              <div class="flex-column flex-fill border border-1">
                <label class="form-text small">War Progress: </label>                
                <span>{{world.war_progress}}</span>
              </div>
            </div>              
          </div>

          <div class="d-flex d-flex flex-fill">
            <div class="d-flex flex-column flex-fill">
              <h6 class="p-1 rounded bg-light">
                Patrons Known ({{world.patrons_known.patrons.length}})
              </h6>
              <div class="d-flex flex-column flex-fill border border-1" v-for="patron in world.patrons_known.patrons" :key="patron.id">                    
                <div class="d-flex">
                  <div class="d-flex">                    
                    <div class="form-text">Name: </div>
                    <span>{{patron.name}}</span>
                  </div>                  
                </div>    
                <div class="d-flex">
                  <div class="d-flex">                    
                    <div class="form-text">Type: </div>
                    <span>{{patron.type}}</span>
                  </div>                  
                </div>    

                <div class="d-flex flex-fill flex-column border border-1">
                  <label class="form-text small">Benefit: </label>                 
                  <span>{{patron.benefit}}</span>
                </div>
              </div>              
            </div>

            <div class="d-flex flex-column flex-fill">
              <h6 class="p-1 rounded bg-light">
                Rivals Known ({{world.rivals_known.rivals.length}})                
              </h6>                  
              <div class="d-flex flex-column flex-fill border border-1" v-for="rival in world.rivals_known.rivals" :key="rival.id">
                <div class="d-flex">
                  <div class="d-flex">                    
                    <div class="form-text">Name: </div>
                    <span>{{rival.name}}</span>
                  </div>
                </div>    
                <div class="d-flex">
                  <div class="d-flex">                    
                    <div class="form-text">Type: </div>
                    <span>{{rival.type}}</span>
                  </div>                  
                </div>    

                <div class="d-flex flex-column flex-fill border border-1">
                  <label class="form-text small">Notes: </label>                  
                  <span>{{rival.notes}}</span>
                </div>
              </div>              
            </div>
          </div>
        </div>
      </div>
    </div>    
</div>
      
</template>

<script>
export default {
  name: 'WorldPrint', 
  props: {
    worlds: Array
  },    
  data() {
    return {            
      worldEdit: [],      
    }
  },  
  computed : {   
    worldId : function() {       
      return this.$route.params.id;
    },
    username: function() {
      return this.$store.state.user.username;
    },
    chunkWorlds: function() {
      var chunks = [];
      var i,j,chunk = 6;
           
      //first page is 6
      for (i=0,j=Math.min(this.worlds.length,6); i<j; i+=chunk) {
        chunks.push(this.worlds.slice(i,i+chunk));   
      }
      
      //second and beyond can hold up to 8 crew members
      if (this.worlds.length > 6) {
        chunk = 8;
        for (i=6,j=this.worlds.length; i<this.worlds.length; i+=chunk) {
          chunks.push(this.worlds.slice(i,i+chunk));   
        }
      }
      
      return chunks;
    }  
  },
  methods: {        
    isOwner: function(itemOwner) {
      return this.username === itemOwner;
    }    
  }
}
</script>

<style scoped>
  .page-break {
    page-break-after: always !important;
    break-after: page !important;
  }

  div.block {
    display:block !important;
  }
</style>
