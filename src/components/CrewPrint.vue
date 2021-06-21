<template>  
  <div>
    <div v-for="(chunk, idx) in chunkCrew" :key="idx" class="page-break">
      <div class="d-flex flex-wrap">
        <div class="crewmember border border-1 p-2 d-flex flex-column my-1 w-50" :class="{ 'bg-dead': member.kia, 'bg-leader': member.leader, 'bg-sick': member.sick_bay }" v-for="(member) in chunk" :key="member.id">
          <div class="d-flex rounded h5 px-1 mb-0">
            {{member.name}}
            <div class="d-flex small ms-auto">
              <div class="form-check">
                <input v-model="member.leader" class="form-check-input" type="checkbox" value="" />
                <label class="form-check-label small" for="leader">
                  Leader
                </label>
              </div>
              <div class="form-check ms-4">
                <input v-model="member.sick_bay" class="form-check-input" type="checkbox" value="" />
                <label class="form-check-label small" for="sickbay">
                  Sick Bay
                </label>
              </div>
              <div class="form-check ms-4">
                <input v-model="member.kia" class="form-check-input" type="checkbox" value="" />
                <label class="form-check-label small" for="kia">
                  KIA
                </label>
              </div>               
            </div>
          </div>
          <div class="d-flex flex-wrap flex-md-nowrap">
            <!--name -->
            <div class="flex-fill">
              <div class="d-flex flex-fill flex-wrap">                                                           
                
                  <span v-if="member.species">{{member.species}}</span>
                  <span v-if="member.background">, {{member.background}}</span>
                  <span v-if="member.motivation">, {{member.motivation}}</span>
                  <span v-if="member.class">, {{member.class}}</span>
                
              </div>          
            </div>

            <!-- attributes -->
            <div class="flex-wrap flex-shrink-1 attributes d-flex">
              <div class="text-center">                        
                <div class="form-text">Reactions</div>
                <span class="border border-3 px-2 ms-1 rounded">{{member.reactions}}</span>            
              </div>
              <div class="ms-1 text-center">                        
                <div class="form-text">Speed</div>
                <span class="border border-3 px-2 ms-1 rounded"> {{member.speed}}</span>                           
              </div>
              <div class="ms-1 text-center">                        
                <div class="form-text">Combat</div>
                <span class="border border-3 px-2 ms-1 rounded">{{member.combat}}</span>
              </div>
              <div class="ms-1 text-center">
                <div class="form-text">Toughness</div>
                <span class="border border-3 px-2 ms-1 rounded">{{member.toughness}}</span>                                  
              </div>
              <div class="ms-1 text-center">
                <div class="form-text">Savvy</div>
                <span class="border border-3 px-2 ms-1 rounded">{{member.savvy}}</span>                                                  
              </div>
            </div>
          </div>

          <div class="d-flex flex-wrap flex-md-nowrap flex-fill">
            <div class="d-flex flex-column flex-grow-1">  
              <table class="table small mb-auto">
                <thead>
                  <tr>
                    <th scope="" width="33%">
                      <div class="d-flex">
                        Weapon                    
                      </div>
                    </th>
                    <th scope="col" width="">Rng</th>
                    <th scope="col" width="">Shot</th>
                    <th scope="col" width="">Dam</th>
                    <th scope="col">Traits/Mods</th>                
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="weapon in member.weapons.weapons" :key="weapon.id">
                    <td th scope="row">                  
                      <span>{{weapon.name}}</span>
                    </td>
                    <td>                  
                      <span>{{weapon.range}}</span>
                    </td>
                    <td>                  
                      <span>{{weapon.shots}}</span>
                    </td>
                    <td>                  
                      <span>{{weapon.damage}}</span>
                    </td>
                    <td>                  
                      <span>{{weapon.traits}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>                 
            </div>
            
            <div class="d-flex flex-column flex-fill">
              <div class="h-50">
                <div class="form-text">Gear/Gadgets</div>            
                <p class="card-text">              
                  <span>{{member.gear}}</span>
                </p>
              </div>
              <div class="h-50 mt-2">
                <div class="form-text">Notes</div>
                <p class="card-text">              
                  <span>{{member.notes}}</span>
                </p>
              </div>
            </div>

            <div class="d-flex flex-column flex-shrink-1">
              <div class="ms-1 text-center">                        
                <div class="form-text">Luck</div>
                <span class="border border-3 px-2 ms-1 rounded">{{member.luck}}</span>                                                      
              </div>
              <div class="ms-1 text-center">                        
                <div class="form-text">XP</div>
                <span class="border border-3 px-2 ms-1 rounded">{{member.xp}}</span>                            
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
  name: 'CrewPrint', 
  props: {
    crewMembers: Array
  },    
  data() {
    return {            
      crewEdit: [],      
    }
  },  
  computed : {   
    crewId : function() {       
      return this.$route.params.id;
    },
    username: function() {
      return this.$store.state.user.username;
    },
    chunkCrew: function() {
      var chunks = [];
      var i,j,chunk = 6;
           
      //first page is 6
      for (i=0,j=Math.min(this.crewMembers.length,6); i<j; i+=chunk) {
        chunks.push(this.crewMembers.slice(i,i+chunk));   
      }
      
      //second and beyond can hold up to 8 crew members
      if (this.crewMembers.length > 6) {
        chunk = 8;
        for (i=6,j=this.crewMembers.length; i<this.crewMembers.length; i+=chunk) {
          chunks.push(this.crewMembers.slice(i,i+chunk));   
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
  .print-keep-together {
    page-break-inside: avoid;
  }
  .page-break-clear { 
    clear: both;
  }
  .page-break {
    page-break-after: always !important;
    break-after: page !important;
  }

  .page-break-before {
    page-break-before: always !important;
    break-before: page !important;
  }

  .crewmember {
    font-size: .7em !important;
  }
  
  td {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  div.block {
    display:block !important;
  }
</style>
