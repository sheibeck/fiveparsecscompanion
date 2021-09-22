<template>  
  <!-- Worlds -->
  <div class="accordion" id="accordionWorlds">
    <div class="accordion-item d-print-none">
      <h2 class="accordion-header d-flex" id="headingWorlds">
        <button type="button" class="btn btn-primary btn-sm mx-1 d-print-none" @click="addWorld()">Add <i class="fas fa-plus"></i></button>
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWorlds" aria-expanded="false" aria-controls="collapseWorlds">              
          Worlds (Tracked Worlds: {{worlds.length}})
        </button>
      </h2>
    </div>    
    <h5 class="d-none d-print-block worldrecordsheet mb-1">World Record Sheet</h5>
    <div id="collapseWorlds" class="accordion-collapse collapse p-1" aria-labelledby="headingWorlds" data-bs-parent="#accordionWorlds">
      <div class="accordion-body d-flex flex-wrap p-1">
        <div class="border border-1 p-1 col-12 col-md-6 d-flex flex-column my-1" :class="{ 'bg-leader': world.current_location }" v-for="world in worlds" :key="world.id">
          <div class="d-flex rounded h5 px-1 mb-0">
            {{world.name}}
            <div class="ms-4 small ms-auto">
              <label class="form-check-label small p-0">
                Current Location
              </label>
              <input :disabled="!isEditingWorld(world.id)" v-model="world.current_location" class="form-check-input" type="checkbox" value="" />                  
            </div>
          </div>
          <div class="d-flex">
            <div class="d-flex flex-column flex-md-row flex-fill">
              <div class="d-flex flex-column">
                <div class="" :class="{ 'd-none': !isEditingWorld(world.id) }">
                  <div class="form-text">Name</div>
                  <input v-model="world.name" type="text" class="form-control" placeholder="" />                                     
                </div>                                      

                <div class="form-check ms-4">
                  <input :disabled="!isEditingWorld(world.id)" v-model="world.licensing_required" class="form-check-input" type="checkbox" value="" />
                  <label class="form-check-label small" for="kia">
                    Licensing Required
                  </label>
                </div>

                <div class="form-check ms-4">
                  <input :disabled="!isEditingWorld(world.id) || !world.licensing_required" v-model="world.license_obtained" class="form-check-input" type="checkbox" value="" />
                  <label class="form-check-label small" for="kia">
                    License Obtained
                  </label>
                </div>                  
                
              </div>

              <div class="d-flex flex-fill border border-1 flex-fill">
                <div class="flex-column flex-fill">
                  <label class="form-text small">Traits</label>
                  <textarea v-model="world.traits" class="form-control" :class="{ 'd-none': !isEditingWorld(world.id) }" placeholder=""></textarea>
                  <span :class="{ 'd-none': isEditingWorld(world.id) }">: {{world.traits}}</span>
                </div>
              </div>

              <div class="d-flex flex-fill border border-1 flex-fill">
                <div class="flex-column flex-fill">
                  <label class="form-text small">Notes</label>
                  <textarea v-model="world.notes" class="form-control" :class="{ 'd-none': !isEditingWorld(world.id) }" placeholder=""></textarea>
                  <span :class="{ 'd-none': isEditingWorld(world.id) }">: {{world.notes}}</span>
                </div>
              </div>
                          
            </div>

            
            <div class="d-flex flex-column flex-fill border border-1">
              <div class="flex-column flex-fill">
                <label class="form-text small">Invading Force</label>
                <textarea v-model="world.invading_forces" class="form-control" :class="{ 'd-none': !isEditingWorld(world.id) }" placeholder=""></textarea>
                <span :class="{ 'd-none': isEditingWorld(world.id) }">: {{world.invading_forces}}</span>
              </div>

              <div class="flex-column flex-fill border border-1">
                <label class="form-text small">War Progress</label>
                <textarea v-model="world.war_progress" class="form-control" :class="{ 'd-none': !isEditingWorld(world.id) }" placeholder=""></textarea>
                <span :class="{ 'd-none': isEditingWorld(world.id) }">{{world.war_progress}}</span>
              </div>
            </div>              
          </div>

          <div class="d-flex d-flex flex-fill">
            <div class="d-flex flex-column flex-fill">
              <h6 class="p-1 rounded bg-light">Patrons Known ({{world.patrons_known.patrons.length}})
                <button type="button" :class="{ 'd-none': !isEditingWorld(world.id) }" class="btn btn-primary btn-sm d-print-none py-0 m-0" @click="addPatronToWorld(world.id)"><i class="fas fa-plus"></i></button>
              </h6>
              <div class="d-flex flex-column flex-fill border border-1" v-for="patron in world.patrons_known.patrons" :key="patron.id">                    
                <div class="d-flex">
                  <div class="d-flex">                        
                    <i :class="{ 'd-none': !isEditingWorld(world.id) }" class="fas fa-dice pe-auto" @click="patron.name = randomName('name')"></i>
                    <div class="form-text">Name</div>
                    <span :class="{ 'd-none': isEditingWorld(world.id) }">: {{patron.name}}</span>
                  </div>                        
                  <input :class="{ 'd-none': !isEditingWorld(world.id) }" v-model="patron.name" type="text" class="form-control" placeholder="" />
                  <button :class="{ 'd-none': !isEditingWorld(world.id) }" type="button" class="ms-auto btn btn-danger btn-sm mx-1" @click="removePatronFromWorld(world.id, patron.id)"><i class="fas fa-trash"></i></button>
                </div>    
                <div class="d-flex">
                  <div class="d-flex">
                    <i :class="{ 'd-none': !isEditingWorld(world.id) }" class="fas fa-dice pe-auto" @click="patron.type = rollOnTable('patron')"></i>
                    <div class="form-text">Type</div>
                    <span :class="{ 'd-none': isEditingWorld(world.id) }">: {{patron.type}}</span>
                  </div>                        
                  <input :class="{ 'd-none': !isEditingWorld(world.id) }" v-model="patron.type" type="text" class="form-control" placeholder="" />
                </div>    

                <div class="d-flex flex-fill flex-column border border-1">
                  <label class="form-text small">Benefit</label>
                  <textarea v-model="patron.benefit" class="form-control" :class="{ 'd-none': !isEditingWorld(world.id) }" placeholder=""></textarea>
                  <span :class="{ 'd-none': isEditingWorld(world.id) }">{{patron.benefit}}</span>
                </div>
              </div>              
            </div>

            <div class="d-flex flex-column flex-fill">
              <h6 class="p-1 rounded bg-light">Rivals Known ({{world.rivals_known.rivals.length}})
                <button type="button" :class="{ 'd-none': !isEditingWorld(world.id) }" class="btn btn-primary btn-sm d-print-none py-0 m-0" @click="addRivalToWorld(world.id)"><i class="fas fa-plus"></i></button>
              </h6>                  
              <div class="d-flex flex-column flex-fill border border-1" v-for="rival in world.rivals_known.rivals" :key="rival.id">
                <div class="d-flex">
                  <div class="d-flex">                        
                    <i :class="{ 'd-none': !isEditingWorld(world.id) }" class="fas fa-dice pe-auto" @click="rival.name = randomName('name')"></i>
                    <div class="form-text">Name</div>
                    <span :class="{ 'd-none': isEditingWorld(world.id) }">: {{rival.name}} </span>
                  </div>                        
                  <input :class="{ 'd-none': !isEditingWorld(world.id) }" v-model="rival.name" type="text" class="form-control" placeholder="" />
                  <button type="button" :class="{ 'd-none': !isEditingWorld(world.id) }" class="ms-auto btn btn-danger btn-sm mx-1" @click="removeRivalFromWorld(world.id, rival.id)"><i class="fas fa-trash"></i></button>
                </div>    
                <div class="d-flex">
                  <div class="d-flex">
                    <i :class="{ 'd-none': !isEditingWorld(world.id) }" class="fas fa-dice pe-auto" @click="rival.type = getRivalType()"></i>
                    <div class="form-text">Type</div>
                    <span :class="{ 'd-none': isEditingWorld(world.id) }">: {{rival.type}}</span>
                  </div>                        
                  <input :class="{ 'd-none': !isEditingWorld(world.id) }" v-model="rival.type" type="text" class="form-control" placeholder="" />                                     
                </div>    

                <div class="d-flex flex-column flex-fill border border-1">
                  <label class="form-text small">Notes</label>
                  <textarea v-model="rival.notes" class="form-control" :class="{ 'd-none': !isEditingWorld(world.id) }" placeholder=""></textarea>
                  <span :class="{ 'd-none': isEditingWorld(world.id) }">{{rival.notes}}</span>
                </div>
              </div>              
            </div>
          </div>

          <div class="d-flex d-print-none">
            <button v-if="isEditingWorld(world.id)" type="button" class="btn btn-primary btn-sm mx-1" @click="saveWorld(world.id)">Save <i class="fas fa-save"></i></button>
            <button v-if="!isEditingWorld(world.id)" type="button" class="btn btn-primary btn-sm mx-1" @click="toggleWorldEdit(world.id)">Edit <i class="fas fa-pen"></i></button>
            <button type="button" class="ms-auto btn btn-danger btn-sm mx-1" @click="removeWorld(world.id)">Delete <i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
      
</template>

<script>
import { DataStore } from '@aws-amplify/datastore';
import { FPFHTables } from '../js/tables.js';
import { World } from '../models';

var shortid = require('shortid');

export default {
  name: 'WorldEdit', 
  props: {
    worlds: Array
  },
  components: {    
  },
  created() {
    this.$parent.$on('doprint', this.saveAllWorlds);
  },
  data() {
    return {            
      worldEdit: [],   
    }
  },  
  tables: new FPFHTables(),
  computed : {   
    crewId : function() {       
      return this.$route.params.id;
    },
    username: function() {
      return this.$store.state.user.username;
    }  
  },
  methods: {        
    isOwner: function(itemOwner) {
      return this.username === itemOwner;
    },       
    rollOnTable: function(table) {      
      this.$root.showUserMsg(`Rolled on table ${table}`);
      return this.$options.tables.GetTableResult(table);     
    }, 
    randomName: function(table) {      
      switch(table) {
        case "shipname":
          return this.$options.tables.RandomShipName(table);      
        default: 
          return this.$options.tables.RandomName(table);      
      }
    },      
    toggleWorldEdit: function(worldId) {
      if (this.worldEdit.includes(worldId)) {
        this.worldEdit = this.worldEdit.filter(item => item !== worldId)
      } else {
        this.worldEdit.push(worldId);
      }
    },
    isEditingWorld: function(worldId) {
      return this.worldEdit.includes(worldId);
    },
    async removeWorld(id) {
      if (!confirm("Are you sure you want to delete this world?")) return;

      const modelToDelete = await DataStore.query(World, id);
      DataStore.delete(modelToDelete);
      this.$emit("fetchworlds");
      
      this.$root.showUserMsg(`Removed world.`);
    },
    
    //add a patron
    async addPatronToWorld(id)
    {
      const patronType = this.rollOnTable("patron");
      let modelToAdd = { "id": shortid.generate(), "name": "", "type": patronType, "benefit": "", "notes": "" };
      let world = this.worlds.find(w => w.id === id);
      world.patrons_known.patrons.push(modelToAdd);
    },
    //remove patron
    removePatronFromWorld(worldId, id)
    {      
      if (!confirm("Are you sure you want to delete this patron?")) return;
      let world = this.worlds.find(w => w.id === worldId);
      world.patrons_known.patrons = world.patrons_known.patrons.filter( r => r.id !== id);      
    },

    //add a rival
    async addRivalToWorld(id)
    {
      const rivalType = this.getRivalType();
      let modelToAdd = { "id": shortid.generate(), "name": "", "type": rivalType, "notes": "" };
      let world = this.worlds.find(w => w.id === id);
      world.rivals_known.rivals.push(modelToAdd);
    },
    //remove rival
    removeRivalFromWorld(worldId, id)
    {      
      if (!confirm("Are you sure you want to delete this rival?")) return;
      let world = this.worlds.find(w => w.id === worldId);
      world.rivals_known.rivals = world.rivals_known.rivals.filter( r => r.id !== id);
    },

    getRivalType() {
      const roll = this.$options.tables.GetFullTableResult('enemyencountercategory');
      return roll.find(x => x.table == "unknownrival").result;
    },

    async addWorld() {
      const name = this.$options.tables.RandomName("name");
      const world = await DataStore.save(
          new World({
          "user": this.username,
          "name": name,        
          "crewID": this.crewId,
          "patrons_known":  "{\"patrons\":[]}",
          "rivals_known":  "{\"rivals\":[]}",
          "licensing_required": false,
          "license_obtained": false,
          "invading_forces": "",
          "war_progress": "",		
          "notes": "",
          "traits": "",
          "current_location": false,
        })
      );
      console.log(world);
      this.$root.showUserMsg(`Discovered planet ${name}`);   
      this.$emit("fetchworlds"); 
    },

    async saveWorld(id) {
      let CURRENT = await DataStore.query(World, id);
      let UPDATED = this.worlds.find( w => w.id === id);
            
      await DataStore.save(World.copyOf(CURRENT, item => {    
          item.name = UPDATED.name,
          item.patrons_known = JSON.stringify(UPDATED.patrons_known),
          item.rivals_known = JSON.stringify(UPDATED.rivals_known),         
          item.license_obtained = UPDATED.license_obtained,
          item.licensing_required = UPDATED.licensing_required,
          item.invading_forces = UPDATED.invading_forces,
          item.war_progress = UPDATED.war_progress,
          item.traits = UPDATED.traits,
          item.notes = UPDATED.notes,
          item.current_location = UPDATED.current_location
        }));      

      this.$root.showUserMsg(`World ${UPDATED.name} saved`);
      this.toggleWorldEdit(id);
    },

    saveAllWorlds() {      
      this.worldEdit.forEach( (id) => {
        this.saveWorld(id);
      });              
    }
  }
}
</script>

<style scoped> 

</style>
