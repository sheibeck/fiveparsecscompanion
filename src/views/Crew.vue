<template>
  <div v-if="crew">    
    <div class="d-md-flex justify">
      <!-- crew log -->      
      <div class="d-flex flex-column flex-fill m-1 border border-2 p-1">
        <h4 class="p-1 rounded d-print-none border">Crew Log</h4>
        <div class="d-flex">
          <div class="d-flex flex-fill me-auto">
            <label for="crewName" class="form-text small">Crew Name</label>
            <input v-model="crew.name" type="text" class="form-control" :class="{ 'd-none': !editing }" id="crewName" placeholder="Crew Name" />
            <span :class="{ 'd-none': editing }">: {{crew.name}}</span>
          </div> 
          <div class="d-flex flex-shrink-1 me-auto">
            <label for="crewStoryPoints" class="form-text small">Story Point</label>
            <input v-model.number="crew.story_points" type="number" class="form-control" :class="{ 'd-none': !editing }" id="crewStoryPoints" placeholder="0" />
            <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.story_points}}</span>
          </div>
        </div>
        <div class="d-flex">
          <div class="d-flex me-auto flex-shrink-1">
            <label for="campaignTurn" class="form-text small">Turn</label>
            <input v-model.number="crew.campaign_turn" type="number" class="form-control" :class="{ 'd-none': !editing }" id="campaignTurn" placeholder="" />
            <span :class="{ 'd-none': editing }">: {{crew.campaign_turn}}</span>
          </div>
          <div class="d-flex me-auto">
            <label for="campaignDifficulty" class="form-text small">Difficulty</label>
            <input v-model="crew.campaign_difficulty" type="text" class="form-control" :class="{ 'd-none': !editing }" id="campaignDifficulty" placeholder="" />
            <span :class="{ 'd-none': editing }">: {{crew.campaign_difficulty}}</span>
          </div>
          <div class="d-flex w-50 me-auto">
            <label for="campaignVictory" class="form-text small">Victory</label>
            <input v-model="crew.campaign_victory" type="text" class="form-control" :class="{ 'd-none': !editing }" id="campaignVictory" placeholder="" />
            <span :class="{ 'd-none': editing }">: {{crew.campaign_victory}}</span>
          </div>
        </div>
        <div class="d-flex">
          <div class="flex-column flex-fill">
            <label for="crewNotes" class="form-text small">Notes</label>
            <textarea v-model="crew.notes" class="form-control" :class="{ 'd-none': !editing }" id="crewNotes" placeholder=""></textarea>
            <span :class="{ 'd-none': editing }">: {{crew.notes}}</span>
          </div>
        </div>
        
      </div>

      <!-- stash -->
      <div class="d-flex flex-column flex-fill m-1  border border-2 p-1">        
          <h4 class="p-1 rounded d-print-none">Stash</h4>
          <div class="d-flex">
            <div class="d-flex flex-fill flex-column w-100">
              <label for="crewStash" class="form-text small">Stash</label>
              <textarea v-model.number="crew.stash" class="form-control" :class="{ 'd-none': !editing }" id="crewStash" placeholder="" rows="7"></textarea>
              <span :class="{ 'd-none': editing }">{{crew.stash}}</span>       
            </div>
          
            <div class="d-flex flex-column flex-shrink-1">
              <div class="d-flex flex-column  text-center">
                <label for="crewCredits" class="form-text small">Credits</label>
                <input v-model.number="crew.credits" type="number" class="form-control" :class="{ 'd-none': !editing }" id="crewCredits" placeholder="0" />
                <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.credits}}</span>      
              </div> 
              <div class="d-flex flex-column text-center">
                <label for="crewPatrons" class="form-text small">Patrons</label>
                <input v-model.number="crew.patrons" type="number" class="form-control" :class="{ 'd-none': !editing }" id="crewPatrons" placeholder="0" />
                <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.patrons}}</span>
              </div>
              <div class="d-flex flex-column text-center">
                <label for="crewRivals" class="form-text small">Rivals</label>
                <input v-model.number="crew.rivals" type="number" class="form-control" :class="{ 'd-none': !editing }" id="crewRivals" placeholder="0" />
                <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.rivals}}</span>
              </div>
            </div>
          </div>  
        
      </div>

      <!-- ship details -->          
      <div class="d-flex flex-column flex-fill m-1 border border-2 p-1">      
        <h4 class="p-1 rounded d-print-none">Ship Details</h4>
        <div class="d-flex">
          <div class="d-flex flex-fill me-auto">
            <label for="shipName" class="form-text small">Ship Name</label>
            <input v-model="crew.ship_name" type="text" class="form-control" :class="{ 'd-none': !editing }"  id="shipName" placeholder="" />
            <span :class="{ 'd-none': editing }">: {{crew.ship_name}}</span>
          </div> 
          <div class="d-flex flex-nowrap flex-shrink-1 me-auto">
            <label for="shipHull" class="form-text small">Hull</label>
            <input v-model.number="crew.ship_hull_points" type="number" class="form-control" :class="{ 'd-none': !editing }" id="shipHull" placeholder="0" />
            <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.ship_hull_points}}</span>
          </div>
          <div class="d-flex flex-nowrap flex-shrink-1 me-auto">
            <label for="shipDebt" class="form-text small">Debt</label>
            <input v-model.number="crew.ship_debt" type="number" class="form-control" :class="{ 'd-none': !editing }" id="shipDebt" placeholder="0" />
            <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.ship_debt}}</span>
          </div>
        </div>

        <div class="d-flex h-100">
          <div class="d-flex w-100 me-auto">
            <label for="shipTraits" class="form-text small">Traits</label>
            <textarea v-model="crew.ship_traits" class="form-control" id="shipTraits" :class="{ 'd-none': !editing }" placeholder=""></textarea>
            <span :class="{ 'd-none': editing }">: {{crew.ship_traits}}</span>
          </div>
          <div class="d-flex w-100 me-auto">
            <label for="shipUpgrades" class="form-text small">Upgrades</label>
            <textarea v-model="crew.ship_upgrades" class="form-control" id="shipUpgrades" :class="{ 'd-none': !editing }" placeholder=""></textarea>
            <span :class="{ 'd-none': editing }">: {{crew.ship_upgrades}}</span>
          </div>
        </div>
      
        <div class="d-flex">
          <div class="d-flex me-auto flex-fill">
            <label for="crewStoryTrack" class="form-text small">Story Track</label>
            <input v-model="crew.story_track" type="text" class="form-control" id="crewStoryTrack" :class="{ 'd-none': !editing }" placeholder="" />
            <span :class="{ 'd-none': editing }">: {{crew.story_track}}</span>
          </div>
          <div class="d-flex flex-shrink-1 me-auto">
            <label for="crewEvent" class="form-text small">Event</label>
            <input v-model.number="crew.event" type="number" class="form-control" id="crewEvent" :class="{ 'd-none': !editing }" placeholder="" />
            <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.event}}</span>
          </div>
          <div class="d-flex flex-shrink-1 me-auto">
            <label for="crewClock" class="form-text small">Clock</label>
            <input v-model.number="crew.clock" type="number" class="form-control" id="crewClock" :class="{ 'd-none': !editing }" placeholder="" />
            <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.clock}}</span>
          </div>
          <div class="d-flex flex-shrink-1 me-auto">
            <label for="crewRumors" class="form-text small">Rumors</label>
            <input v-model.number="crew.quest_rumors" type="number" class="form-control" id="crewClock" :class="{ 'd-none': !editing }" placeholder="" />
            <span class="border border-3 px-2 ms-1 rounded" :class="{ 'd-none': editing }">{{crew.quest_rumors}}</span>
          </div>
        </div>
        
      </div>
    </div>

    <div class="row mt-1  d-print-none">
      <div class="d-flex">
        <button v-if="editing" type="button" class="btn btn-primary btn-sm mx-1" @click="saveCrew()">Save Crew Log <i class="fas fa-save"></i></button>
        <button v-if="!editing" type="button" class="btn btn-primary btn-sm mx-1" @click="toggleEdit()">Edit Crew Log <i class="fas fa-pencil"></i></button>        
        <button type="button" class="ms-auto btn btn-danger btn-sm mx-1" @click="removeCrew()">Delete Crew Log <i class="fas fa-trash"></i></button>
      </div>
    </div>

    <div class="row mt-2">

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
            <div class="border border-1 p-1 col-12 col-md-6 p-1" :class="{ 'bg-dead': member.kia, 'bg-leader': member.leader, 'bg-sick': member.sick_bay }" v-for="member in crewMembers" :key="member.id">                           
              <div class="d-flex flex-wrap flex-md-nowrap">
                <!--name -->
                <div class="w-100">
                  <div class="d-flex w-100">
                    <div class="d-flex">
                      <i :class="{ 'd-none': !isEditingCrew(member.id) }" class="fas fa-dice pe-auto" @click="member.name = rollOnTable('name')"></i>
                      <div class="form-text">Name</div>
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">: {{member.name}}</span>
                    </div>                        
                    <input :class="{ 'd-none': !isEditingCrew(member.id) }" v-model="member.name" type="text" class="form-control" placeholder="" />
                  
                    <div class="d-flex ms-2">
                      <i :class="{ 'd-none': !isEditingCrew(member.id) }" class="fas fa-dice pe-auto" @click="member.species = rollOnTable('crewtype')"></i>
                      <div class="form-text">Species</div>
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">: {{member.species}}</span>
                    </div>                        
                    <input :class="{ 'd-none': !isEditingCrew(member.id) }" v-model="member.species" type="text" class="form-control" placeholder="" /> 
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
                <div class="d-flex flex-wrap flex-shrink-1 attributes">
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

              <div class="d-flex flex-wrap flex-md-nowrap">
                <div class="d-flex w-auto align-items-start flex-column">                  
                  <table class="table small mb-auto">
                    <thead>
                      <tr>
                        <th scope="" width="25%">
                          Weapon
                          <button type="button" :class="{ 'd-none': !isEditingCrew(member.id) }" class="btn btn-primary btn-sm d-print-none py-0 m-0" @click="addWeaponToCrew(member.id)"><i class="fas fa-plus"></i></button>                              
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
                          <input v-model="weapon.name" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
                          <span :class="{ 'd-none': isEditingCrew(member.id) }">{{weapon.name}}</span>
                        </td>
                        <td>
                          <input v-model="weapon.range" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
                          <span :class="{ 'd-none': isEditingCrew(member.id) }">{{weapon.range}}</span>
                        </td>
                        <td>
                          <input v-model="weapon.shots" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
                          <span :class="{ 'd-none': isEditingCrew(member.id) }">{{weapon.shots}}</span>
                        </td>
                        <td>
                          <input v-model="weapon.damage" type="number" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder="" />
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
                
                <div class="d-flex flex-column w-auto me-auto">
                  <div class="h-50">
                    <div class="form-text">Gear/Gadgets</div>            
                    <p class="card-text">
                      <textarea v-model="member.gear" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder=""></textarea>
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">{{member.gear}}</span>
                    </p>
                  </div>
                  <div class="h-50">
                    <div class="form-text">Notes</div>
                    <p class="card-text">
                      <textarea v-model="member.notes" type="text" class="form-control" :class="{ 'd-none': !isEditingCrew(member.id) }" placeholder=""></textarea>
                      <span :class="{ 'd-none': isEditingCrew(member.id) }">{{member.notes}}</span>
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
                                         
              <div class="d-flex justify-content-end">
               
                  <div class="form-check">
                    <input :disabled="!isEditingCrew(member.id)" v-model="member.leader" class="form-check-input" type="checkbox" value="" id="leader">
                    <label class="form-check-label small" for="leader">
                      Leader
                    </label>
                  </div>
                  <div class="form-check ms-4">
                    <input :disabled="!isEditingCrew(member.id)" v-model="member.sick_bay" class="form-check-input" type="checkbox" value="" id="sickbay" checked>
                    <label class="form-check-label small" for="sickbay">
                      Sick Bay
                    </label>
                  </div>
                  <div class="form-check ms-4">
                    <input :disabled="!isEditingCrew(member.id)" v-model="member.kia" class="form-check-input" type="checkbox" value="" id="kia" checked>
                    <label class="form-check-label small" for="kia">
                      KIA
                    </label>
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

      <!-- worlds -->
      <div class="accordion" id="accordionWorlds">
        <div class="accordion-item d-print-none">
          <h2 class="accordion-header d-flex" id="headingWorlds">
            <button type="button" class="btn btn-primary btn-sm mx-1 d-print-none" @click="addWorld()">Add <i class="fas fa-plus"></i></button>
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWorlds" aria-expanded="false" aria-controls="collapseWorlds">              
              Worlds
            </button>
          </h2>
        </div>
      
        <div id="collapseWorlds" class="accordion-collapse collapse" aria-labelledby="headingWorlds" data-bs-parent="#accordionWorlds">
          <div class="accordion-body">
            <div class="card">
              <div class="card-body">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
</div>
   
</template>

<script>
import { DataStore } from '@aws-amplify/datastore';
import { Crew } from '../models';
import { CrewMember } from '../models';
import { FPFHTables } from '../js/tables.js';

var shortid = require('shortid');

export default {
  name: 'Crew',  
  components: {    
  },
  mounted() {    
    this.fetchCrew();    
  }, 
  data() {
    return {
      crew: null,      
      crewMembers: [],      
      editing: false,
      crewEdit: [],
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
    toggleEdit: function() {
      this.editing = !this.editing;
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
      if (table != "name") {
        this.$root.showUserMsg(`Rolled on table ${table}`);
        return this.$options.tables.GetTableResult(table);
      } else {
        return this.$options.tables.RandomName(table);
      }
    },    
    async fetchCrew() {
      const crew = await DataStore.query(Crew, this.crewId);      
      this.crew = JSON.parse(JSON.stringify(crew));      

      this.fetchCrewMembers();      
    },

    async fetchCrewMembers() {
      const crewMembers = await DataStore.query(CrewMember, c => c.crewID("eq", this.crewId));      
      this.crewMembers = JSON.parse(JSON.stringify(crewMembers));
      //handle weapons
      for(var m = 0; m < this.crewMembers.length; m++) {
        this.crewMembers[m].weapons = JSON.parse(this.crewMembers[m].weapons);
      }      
    },

    async saveCrew() {      
      let UPDATED_CREW = this.crew;
      const CURRENT_CREW = await DataStore.query(Crew, this.crewId);
      await DataStore.save(Crew.copyOf(CURRENT_CREW, item => {        
        item.id = UPDATED_CREW.id,
        item.user = UPDATED_CREW.user,
        item.name = UPDATED_CREW.name,
        item.notes =UPDATED_CREW.notes,
        item.story_points = UPDATED_CREW.story_points,
        item.stash = UPDATED_CREW.stash,
        item.credits = UPDATED_CREW.credits,
        item.patrons = UPDATED_CREW.patrons,
        item.rivals = UPDATED_CREW.rivals,
        item.ship_name = UPDATED_CREW.ship_name,
        item.ship_hull_points = UPDATED_CREW.ship_hull_points,
        item.ship_debt = UPDATED_CREW.ship_debt,
        item.ship_traits = UPDATED_CREW.ship_traits,
        item.ship_upgrades = UPDATED_CREW.ship_upgrades,
        item.story_track = UPDATED_CREW.story_track,
        item.event = UPDATED_CREW.event,
        item.clock = UPDATED_CREW.clock,
        item.quest_rumors = UPDATED_CREW.quest_rumors,
        item.CrewMembers = UPDATED_CREW.CrewMembers,
        item.campaign_turn = UPDATED_CREW.campaign_turn,
        item.campaign_difficulty = UPDATED_CREW.campaign_difficulty,
        item.campaign_victory = UPDATED_CREW.campaign_victory,
        item.createdAt = UPDATED_CREW.createdAt,
        item.updatedAt = UPDATED_CREW.updatedAt
      }));

      this.$root.showUserMsg(`Crew log saved`);
      this.toggleEdit();
    },   

    async addCrewMember() {
      const restrictedBackgrounds = ["Peaceful, High-Tech Colony", "Wealthy Merchant Family", "Tech Guild", "Comfortable Megacity Class", "Bureaucrat"];
      const name = this.$options.tables.RandomName("name");
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
      this.fetchCrewMembers();      
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
        item.id = UPDATED_MEMBER.id,
        item.createdAt = UPDATED_MEMBER.createdAt,
        item.updatedAt = UPDATED_MEMBER.updatedAt,
        item.crewID = UPDATED_MEMBER.crewID,
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
      this.fetchCrewMembers();
      
      this.$root.showUserMsg(`Removed crew member`);
    },

    async removeCrew() {
      if (!confirm("Are you sure you want to delete the entire crew?")) return;

      const modelToDelete = await DataStore.query(Crew, this.crewId)
      await DataStore.delete(modelToDelete);
      
      this.$root.showUserMsg(`Removed crew`);

      this.$router.push('/');
    },

    async addWorld() {

    }
  }
}
</script>

<style scoped>
  label {        
    padding-bottom: 0px;
    margin-bottom: 0px;
  }

  h4, .h4 {
    background-color: #ccc;
  }

  .bg-dead {
    background-color: #fff0f0 !important;
  }

  .bg-leader {
    background-color: #f0f0ff;
  }

  .bg-sick {
    background-color: #f8ffde;
  }

  .form-control {
    padding: 1px;
  }

  .form-text {
    margin-top: 0px;
    font-size: 1em;
    font-style: italic;
  }

  input[type=number] {
    text-align: center;
  }

  .w-md-50 {
    width: 50% !important;
  }

  @media (max-width: 991.98px) {
    .w-md-50 {
      width: 100% !important;
    }
  }

  @media print
  {
    div.crewmember { 
      page-break-inside: avoid;
    }

    #accordionWorlds {
      page-break-before: always;
    }

    #accordionMembers {
      font-size: .7em !important;
    }

    .attributes {
        flex-wrap: unset !important;
    }
    
  }
</style>
