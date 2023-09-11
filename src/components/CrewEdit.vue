<template>  
  <!-- crew members -->
  <div class="accordion" id="accordionMembers">
    <div class="accordion-item d-print-none">
      <h2 class="accordion-header d-flex" id="headingMembers">
        <button type="button" class="btn btn-primary btn-sm mx-1 d-print-none" @click="addCrewMember()">Add <i class="fas fa-plus"></i></button>        
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMembers" aria-expanded="true" aria-controls="collapseMembers">            
          Crew Members (Active members: {{crewMembers.filter( c => c.kia !== true ).length}})          
        </button>        
      </h2>
    </div>

    <div id="collapseMembers" class="accordion-collapse collapse show" aria-labelledby="headingMembers" data-bs-parent="#accordionMembers">
      <div class="accordion-body d-flex flex-wrap p-1">          
        <div class="border border-1 p-1 col-12 col-md-6 d-flex flex-column my-1" :class="{ 'bg-dead': member.kia, 'bg-leader': member.leader, 'bg-sick': member.sick_bay }" v-for="member in crewMembers" :key="member.id">
          <div class="d-flex rounded h5 px-1 mb-0">
            {{member.name}}
            <div class="d-flex small ms-auto">
              <div class="form-check">
                <input :disabled="!isEditingCrew(member.id)" v-model="member.leader" class="form-check-input" type="checkbox" value="" />
                <label class="form-check-label small" for="leader">
                  Leader
                </label>
              </div>
              <div class="form-check ms-4">
                <input :disabled="!isEditingCrew(member.id)" v-model="member.sick_bay" class="form-check-input" type="checkbox" value="" />
                <label class="form-check-label small" for="sickbay">
                  Sick Bay
                </label>
              </div>
              <div class="form-check ms-4">
                <input :disabled="!isEditingCrew(member.id)" v-model="member.kia" class="form-check-input" type="checkbox" value="" />
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
                <div class="d-flex" :class="{ 'd-none': !isEditingCrew(member.id) }">
                  <i :class="{ 'd-none': !isEditingCrew(member.id) }" class="fas fa-dice pe-auto" @click="member.name = randomName('name')"></i>
                  <div class="form-text">Name</div>
                  <span :class="{ 'd-none': isEditingCrew(member.id) }">: {{member.name}}</span>
                </div>                        
                <input :class="{ 'd-none': !isEditingCrew(member.id) }" v-model="member.name" type="text" class="form-control" placeholder="" />
              
                <div class="d-print-none flex-fill">
                  <div class="d-flex">
                    <i :class="{ 'd-none': !isEditingCrew(member.id) }" class="fas fa-dice pe-auto" @click="member.species = rollOnTable('crewtype')"></i>
                    <div class="form-text">Species</div>
                    <span :class="{ 'd-none': isEditingCrew(member.id) }">: {{member.species}}</span>
                  </div>                        
                  <input :class="{ 'd-none': !isEditingCrew(member.id) }" v-model="member.species" type="text" class="form-control" placeholder="" /> 
                </div>
                <div class="d-none d-print-block">
                  <span v-if="member.species">{{member.species}}</span>
                  <span v-if="member.background">, {{member.background}}</span>
                  <span v-if="member.motivation">, {{member.motivation}}</span>
                  <span v-if="member.class">, {{member.class}}</span>
                </div>
              </div>

              <div class="d-flex flex-column d-print-none">
                <div class="">
                  <div class="d-flex">
                    <i :class="{ 'd-none': !isEditingCrew(member.id) }" class="fas fa-dice pe-auto" @click="member.background = rollOnTable('background')"></i>
                    <div class="form-text">Background</div>
                    <span :class="{ 'd-none': isEditingCrew(member.id) }">: {{member.background}}</span>
                  </div>                        
                  <input v-model="member.background" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                                                
                </div>
                <div class="">
                  <div class="">
                    <div class="d-flex">
                      <i :class="{ 'd-none': !isEditingCrew(member.id) }" class="fas fa-dice pe-auto" @click="member.motivation = rollOnTable('motivation')"></i>
                      <div class="form-text">Motivation</div>
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">: {{member.motivation}}</span>
                    </div>                      
                  </div>
                  <input v-model="member.motivation" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                            
                </div>
                <div class="">
                  <div class="">
                    <div class="d-flex">
                      <i :class="{ 'd-none': !isEditingCrew(member.id) }" class="fas fa-dice pe-auto" @click="member.class = rollOnTable('class')"></i>
                      <div class="form-text">Class</div>
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">: {{member.class}}</span>
                    </div>                     
                  </div>
                  <input v-model="member.class" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                            
                </div>
              </div>
            </div>

            <!-- attributes -->
            <div class="flex-wrap flex-shrink-1 attributes" :class="{ 'd-flex': !isEditingCrew(member.id) }">
              <div class="text-center">                        
                <div class="form-text">Reactions</div>
                <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': isEditingCrew(member.id) }">{{member.reactions}}</span>
                <input v-model.number="member.reactions" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                        
              </div>
              <div class="ms-1 text-center">                        
                <div class="form-text">Speed</div>
                <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': isEditingCrew(member.id) }"> {{member.speed}}</span>                      
                <input v-model.number="member.speed" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                    
              </div>
              <div class="ms-1 text-center">                        
                <div class="form-text">Combat</div>
                <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': isEditingCrew(member.id) }">{{member.combat}}</span>                        
                <input v-model.number="member.combat" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
              </div>
              <div class="ms-1 text-center">
                <div class="form-text">Toughness</div>
                <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': isEditingCrew(member.id) }">{{member.toughness}}</span>                      
                <input v-model.number="member.toughness" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                    
              </div>
              <div class="ms-1 text-center">
                <div class="form-text">Savvy</div>
                <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': isEditingCrew(member.id) }">{{member.savvy}}</span>                        
                <input v-model.number="member.savvy" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                    
              </div>
            </div>
          </div>

          <div class="d-flex flex-wrap flex-md-nowrap flex-fill" :class="{ 'flex-column': isEditingCrew(member.id) }">
            <div class="d-flex flex-column flex-grow-1">  
              <table class="table small mb-auto">
                <thead>
                  <tr>
                    <th scope="" width="33%">
                      <div class="d-flex">
                        Weapon
                        <button type="button" :class="{ 'd-none': !isEditingCrew(member.id) }" class="btn btn-primary btn-sm d-print-none py-0 m-0" @click="addWeaponToCrew(member.id)">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </th>
                    <th scope="col" width="">Rng</th>
                    <th scope="col" width="">Shot</th>
                    <th scope="col" width="">Dam</th>
                    <th scope="col">Traits/Mods</th>
                    <th scope="col" width=""> </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="weapon in member.weapons.weapons" :key="weapon.id">
                    <td th scope="row">
                      <input v-model="weapon.name" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" @change="addWeaponEntry($event, member, weapon.id)" />
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">{{weapon.name}}</span>
                    </td>
                    <td>
                      <input v-model="weapon.range" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">{{weapon.range}}</span>
                    </td>
                    <td>
                      <input v-model="weapon.shots" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">{{weapon.shots}}</span>
                    </td>
                    <td>
                      <input v-model="weapon.damage" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">{{weapon.damage}}</span>
                    </td>
                    <td>
                      <input v-model="weapon.traits" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">{{weapon.traits}}</span>
                    </td>
                    <td>
                      <button type="button" :class="{ 'd-none': !isEditingCrew(member.id) }" class="btn btn-danger btn-sm d-print-none py-0 m-0" @click="removeWeaponFromCrew(weapon.id, member.id)"><i class="fas fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>                 
            </div>
            
            <div class="d-flex flex-column flex-fill">
              <div class="h-50">
                <div class="form-text">Gear/Gadgets</div>            
                <p class="card-text">
                  <textarea v-model="member.gear" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder=""></textarea>
                  <span :class="{ 'd-none': isEditingCrew(member.id) }">{{formattedText(member.gear)}}</span>
                </p>
              </div>
              <div class="h-50 mt-2">
                <div class="form-text">Notes</div>
                <p class="card-text">
                  <textarea v-model="member.notes" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder=""></textarea>
                  <span :class="{ 'd-none': isEditingCrew(member.id) }">{{formattedText(member.notes)}}</span>
                </p>
              </div>
            </div>

            <div class="d-flex flex-column flex-shrink-1">
              <div class="ms-1 text-center">                        
                <div class="form-text">Luck</div>
                <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': isEditingCrew(member.id) }">{{member.luck}}</span>                        
                <input v-model.number="member.luck" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                    
              </div>
              <div class="ms-1 text-center">                        
                <div class="form-text">XP</div>
                <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': isEditingCrew(member.id) }">{{member.xp}}</span>                      
                <input v-model.number="member.xp" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />                    
              </div>
            </div>
            
          </div>             
        
          <div class="d-flex d-print-none">
            <button v-if="isEditingCrew(member.id)" type="button" class="btn btn-primary btn-sm mx-1" @click="saveCrewMember(member.id)">Save <i class="fas fa-save"></i></button>
            <button v-if="!isEditingCrew(member.id)" type="button" class="btn btn-primary btn-sm mx-1" @click="toggleCrewEdit(member.id)">Edit <i class="fas fa-pen"></i></button>
            <button type="button" class="ms-auto btn btn-danger btn-sm mx-1" @click="removeCrewMember(member.id)">Delete <i class="fas fa-trash"></i></button>
          </div>          
        </div>            
      </div>
    </div>
  </div>
      
</template>

<script>
import { DataStore } from '@aws-amplify/datastore';
import { CrewMember } from '../models';
import { FPFHTables } from '../js/tables.js';

var shortid = require('shortid');

export default {
  name: 'CrewEdit', 
  props: {
    crewMembers: Array
  },
  components: {    
  },
  created() {
    this.$parent.$on('doprint', this.saveAllCrewMembers);
  },
  data() {
    return {            
      crewEdit: []     
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
    toggleCrewEdit: function(crewId) {
      if (this.crewEdit.includes(crewId)) {
        this.crewEdit = this.crewEdit.filter(item => item !== crewId)
      } else {
        this.crewEdit.push(crewId);
      }
    },
    isEditingCrew: function(crewId) {
      return this.crewEdit.includes(crewId);
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
    async addCrewMember() {
      const restrictedBackgrounds = ["Peaceful, High-Tech Colony", "Wealthy Merchant Family", "Tech Guild", "Comfortable Megacity Class", "Bureaucrat"];
      const name = this.randomName("name");
      const species = this.$options.tables.GetTableResult("crewtype");
      let background = this.$options.tables.GetTableResult("background");
      let motivation = this.$options.tables.GetTableResult("motivation");
      let crewClass = crewClass = this.$options.tables.GetTableResult("class");

      switch(species) 
      {
        case "Bot":
        case "Assault Bot":      
          background = "";
          motivation = "";
          crewClass = "";
        break;

        case "De-conerted":
          motivation = "Revenge";
          break;
          
        case "Unity Agent":
          motivation = "Order";
          break;

        case "Mysterious Past":
          background += `,${this.$options.tables.GetTableResult("background")}`;
          break;

        case "Hulker":
          switch(crewClass) {
            case "Technician":
            case "Scientist":
            case "Hacker":
              crewClass = "Primitive";
              break;
          }
          break;

        case "Genetic Uplift":
          while (restrictedBackgrounds.includes(background)) {
            background = this.$options.tables.GetTableResult("background");
          }
          break;

        case "Mutant":
          background = "Lower Megacity Class";
          break;

        case "Manipulator":
          background = "Bureaucrat";
          break;

        case "Primitive":
          background = "Primitive OR Regressed World";
          break;

        case "Feeler":
          motivation += `,${this.$options.tables.GetTableResult("motivation")}`;
          break;

        case "Emo-suppressed":
          motivation = "Survival";
          break;
      }
      
      await DataStore.save(
          new CrewMember({
          "user": this.username,
          "name": name,
          "species": species,
          "reactions": 0,
          "speed": 0,
          "combat": 0,
          "toughness": 0,
          "savvy": 0,
          "luck": 0,
          "gear": "",
          "notes": "",
          "weapons": "{\"weapons\":[]}",
          "xp": 0,
          "kia": false,
          "leader": false,
          "sick_bay": false,
          "background": background,
          "motivation": motivation,
          "class": crewClass,
          "crewID": this.crewId
        })
      );
      this.$root.showUserMsg(`Added ${name} to crew`);
      this.$emit("fetchcrewmembers");
    },
    addWeaponEntry(e, member, weaponId) {      
      const entry = e.target.value;      
      //try to find the weapon entry in the weapon table
      const weaponStats = this.getSpecificTableEntry("weapons", entry.trim());
      const weapon = member.weapons.weapons.find( w => w.id === weaponId);
      if (weaponStats) {
        weapon.name = weaponStats.name;
        weapon.range = weaponStats.range;
        weapon.shots = weaponStats.shots;
        weapon.damage = weaponStats.damage;
        weapon.traits = weaponStats.traits;
      }      
    },    
    getSpecificTableEntry(key, label, subentry) {      
      const entry = this.$options.tables.tables[key].tables[subentry ?? "default"].find(w => w.label.toLowerCase() === label.toLowerCase());
      if (entry && entry.description) {
        return JSON.parse(entry.description);
      }
      else {
        return null;
      }
    },
    async addWeaponToCrew(id)
    {
      let modelWeapon = { "id": shortid.generate(), "name": "", "range": "", "shots": "0", "damage": "0", "traits": "" };
      let crewMember = this.crewMembers.find(m => m.id === id);
      crewMember.weapons.weapons.push(modelWeapon);
    },

    async removeWeaponFromCrew(id, crewId)
    {      
      if (!confirm("Are you sure you want to delete this weapon?")) return;
      let crewMember = this.crewMembers.find(m => m.id === crewId);
      crewMember.weapons.weapons = crewMember.weapons.weapons.filter( w => w.id !== id);

      this.$root.showUserMsg(`Removed weapon`);
    },

    async saveCrewMember(id) {
      let CURRENT_MEMBER = await DataStore.query(CrewMember, id);
      let UPDATED_MEMBER = this.crewMembers.find( m => m.id === id);
            
      await DataStore.save(CrewMember.copyOf(CURRENT_MEMBER, item => {        
        //item.id = UPDATED_MEMBER.id,
        //item.createdAt = UPDATED_MEMBER.createdAt,
        //item.updatedAt = UPDATED_MEMBER.updatedAt,
        //item.crewID = UPDATED_MEMBER.crewID,
        item.name = UPDATED_MEMBER.name,
        item.species = UPDATED_MEMBER.species,
        item.reactions = UPDATED_MEMBER.reactions,
        item.speed = UPDATED_MEMBER.speed,
        item.combat = UPDATED_MEMBER.combat,
        item.toughness = UPDATED_MEMBER.toughness,
        item.savvy = UPDATED_MEMBER.savvy,
        item.luck = UPDATED_MEMBER.luck,
        item.gear = UPDATED_MEMBER.gear,
        item.notes = UPDATED_MEMBER.notes,
        item.weapons = JSON.stringify(UPDATED_MEMBER.weapons),
        item.xp = UPDATED_MEMBER.xp,
        item.kia = UPDATED_MEMBER.kia,
        item.leader = UPDATED_MEMBER.leader,        
        item.background = UPDATED_MEMBER.background,
        item.motivation = UPDATED_MEMBER.motivation,
        item["class"] = UPDATED_MEMBER.class,
        item.sick_bay = UPDATED_MEMBER.sick_bay               
      }));      

      this.$root.showUserMsg(`Crew member ${UPDATED_MEMBER.name} saved`);
      this.toggleCrewEdit(id);
    },   

    async removeCrewMember(id) {
      if (!confirm("Are you sure you want to delete this crew member?")) return;

      const modelToDelete = await DataStore.query(CrewMember, id);
      DataStore.delete(modelToDelete);
      
      this.$emit("fetchcrewmembers");
      
      this.$root.showUserMsg(`Removed crew member`);
    },
   
    saveAllCrewMembers() {      
      this.crewEdit.forEach( (id) => {
        this.saveCrewMember(id);
      });              
    },

    formattedText(text) {
      // Replace LF (line feed) and CR (carriage return) with <br/>
      return text.value.replace(/(\r\n|\n|\r)/g, '<br/>');
    }
  }
}
</script>

<style scoped> 

</style>
