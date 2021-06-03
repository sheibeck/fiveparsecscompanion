<template>
  <div v-if="crew">    
    <div class="row mt-2">
      <!-- crew log -->      
      <div class="col col-12 col-md-4 mt-2 mt-md-0">
        <h4 class="p-1 rounded">Crew Log</h4>
        <div class="row">
          <div class="col col-9">
            <label for="crewName" class="form-label small">Crew Name</label>
            <input v-model="crew.name" type="text" class="form-control" id="crewName" placeholder="Crew Name" />        
          </div> 
          <div class="col">
            <label for="crewStoryPoints" class="form-label small">Story</label>
            <input v-model.number="crew.story_points" type="number" class="form-control" id="crewStoryPoints" placeholder="0" />        
          </div>
        </div>
         <div class="row">
          <div class="col-3">
            <label for="campaignTurn" class="form-label small">Turn</label>
            <input v-model.number="crew.campaign_turn" type="number" class="form-control" id="campaignTurn" placeholder="Turn" />     
          </div>
          <div class="col-4">
            <label for="campaignDifficulty" class="form-label small">Difficulty</label>
            <input v-model="crew.campaign_difficulty" type="text" class="form-control" id="campaignDifficulty" placeholder="Difficulty" />
          </div>
          <div class="col">
            <label for="campaignVictory" class="form-label small">Victory Condition</label>
            <input v-model="crew.campaign_victory" type="text" class="form-control" id="campaignVictory" placeholder="Victory Condition" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="crewNotes" class="form-label small">Notes</label>
            <textarea v-model="crew.notes" class="form-control" id="crewNotes" placeholder="Notes"></textarea>        
          </div>
        </div>
      </div>

      <!-- stash -->
      <div class="col col-12 col-md-4 mt-2 mt-md-0">
        <h4 class="p-1 rounded">Stash</h4>
        <div class="row">
          <div class="col col-9">
            <label for="crewStash" class="form-label small">Stash</label>
            <textarea v-model.number="crew.stash" class="form-control" id="crewStash" placeholder="Stash" rows="7"></textarea>        
          </div>
        
          <div class="col">
            <div class="">
              <label for="crewCredits" class="form-label small">Credits</label>
              <input v-model.number="crew.credits" type="number" class="form-control" id="crewCredits" placeholder="0" />        
            </div> 
            <div class="">
              <label for="crewPatrons" class="form-label small">Patrons</label>
              <input v-model.number="crew.patrons" type="number" class="form-control" id="crewPatrons" placeholder="0" />
            </div>
            <div class="">
              <label for="crewRivals" class="form-label small">Rivals</label>
              <input v-model.number="crew.rivals" type="number" class="form-control" id="crewRivals" placeholder="0" />
            </div>
          </div>

        </div>        
      </div>

      <!-- ship details -->          
      <div class="col col-12 col-md-4 mb-2 mt-2 mt-md-0">
        <h4 class="p-1 rounded">Ship Details</h4>
        <div class="row">
          <div class="col col-6">
            <label for="shipName" class="form-label small">Ship Name</label>
            <input v-model="crew.ship_name" type="text" class="form-control" id="shipName" placeholder="Ship Name" />
          </div> 
          <div class="col">
            <label for="shipHull" class="form-label small">Hull</label>
            <input v-model.number="crew.ship_hull" type="number" class="form-control" id="shipHull" placeholder="0" />        
          </div>
          <div class="col">
            <label for="shipDebt" class="form-label small">Debt</label>
            <input v-model.number="crew.ship_debt" type="number" class="form-control" id="shipDebt" placeholder="0" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="shipTraits" class="form-label small">Traits</label>
            <textarea v-model="crew.ship_traits" class="form-control" id="shipTraits" placeholder="Traits" rows="4"></textarea>
          </div>
          <div class="col">
            <label for="shipUpgrades" class="form-label small">Upgrades</label>
            <textarea v-model="crew.shipt_upgrades" class="form-control" id="shipUpgrades" placeholder="Upgrades" rows="4"></textarea>
          </div>
        </div>
      </div>

    </div>

    <div class="row mt-1">
      <div class="col d-flex">
        <button type="button" class="btn btn-primary btn-sm mx-1" @click="saveCrew()">Save Crew Log <i class="fas fa-save"></i></button>
        <button type="button" class="btn btn-secondary btn-sm mx-1"> Print Crew <i class="fas fa-print"></i></button>
        <button type="button" class="ms-auto btn btn-danger btn-sm mx-1" @click="removeCrew()">Delete Crew Log <i class="fas fa-trash"></i></button>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col">
        <div class="rounded h4 p-1 p-2 d-flex">
          <div class="mt-1">Crew Members</div>
          <button type="button" class="btn btn-primary btn-sm mx-1" @click="addCrewMember()">Add Member <i class="fas fa-plus"></i></button>
        </div>
        
          <div class="card" v-for="member in crewMembers" :key="member.id">
            <div class="card-body">
              <div class="row">
                <div class="col d-flex">
                  <div class="w-100">
                    <div class="form-text">Name</div>
                    <input v-model="member.name" type="text" class="form-control" placeholder="Name" />                
                  </div>
                  <div class="w-100 ms-1">
                    <div class="form-text">Species/Type</div>
                    <input v-model="member.species" type="text" class="form-control" placeholder="Species" />        
                  </div>
                </div>
                <div class="col d-flex">
                  <div class="">
                    <div class="form-text">Reactions</div>
                    <input v-model.number="member.reactions" type="number" class="form-control" placeholder="Reactions" />
                  </div>
                  <div class="ms-1">
                    <div class="form-text">Speed</div>
                    <input v-model.number="member.speed" type="number" class="form-control" placeholder="Speed" />
                  </div>
                  <div class="ms-1">
                    <div class="form-text">Combat</div>
                    <input v-model.number="member.combat" type="number" class="form-control" placeholder="Combat" />
                  </div>
                  <div class="ms-1">
                    <div class="form-text">Toughness</div>
                    <input v-model.number="member.toughness" type="number" class="form-control" placeholder="Toughness" />
                  </div>
                  <div class="ms-1">
                    <div class="form-text">Savvy</div>
                    <input v-model.number="member.savvy" type="number" class="form-control" placeholder="Savvy" />
                  </div>              
                  <div class="ms-1">
                    <div class="form-text">Luck</div>
                    <input v-model.number="member.luck" type="number" class="form-control" placeholder="Luck" />
                  </div>
                </div>
              </div>

              <div class="row mt-1">
                <div>
                  <div class="form-text">Gear</div>            
                  <p class="card-text"><textarea v-model="member.gear" type="text" class="form-control" placeholder="Gear"></textarea></p>
                </div>
                <div>
                  <div class="form-text">Notes</div>
                  <p class="card-text"><textarea v-model="member.notes" type="text" class="form-control" placeholder="Notes"></textarea></p>                
                </div>
              </div>
            </div>
            <div class="card-footer d-flex">
              <button type="button" class="btn btn-primary btn-sm mx-1" @click="saveCrewMember(member.id)">Save <i class="fas fa-save"></i></button>
              <button type="button" class="ms-auto btn btn-danger btn-sm mx-1" @click="removeCrewMember(member.id)">Delete <i class="fas fa-trash"></i></button>
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
      currentCrew: null,
      crewMembers: [],
      currentCrewMembers: [],
    }
  },
  computed : {   
    crewId : function() {       
      return this.$route.params.id;
    },
    username: function() {
      return this.$store.state.user.username;
    },    
  },
  methods: {   
    isOwner: function(itemOwner) {
      return this.username === itemOwner;
    },
    async fetchCrew() {
      const crew = await DataStore.query(Crew, this.crewId);
      this.currentCrew = crew;
      this.crew = JSON.parse(JSON.stringify(crew));      

      this.fetchCrewMembers();
    },

    async fetchCrewMembers() {
      const crewMembers = await DataStore.query(CrewMember, c => c.crewID("eq", this.crewId));      
      this.currentCrewMembers = crewMembers;
      this.crewMembers = JSON.parse(JSON.stringify(crewMembers));      
    },

    async saveCrew() {      
      let UPDATED_CREW = this.crew;      
      var result = await DataStore.save(Crew.copyOf(this.currentCrew, item => {        
        for (const key of Object.keys(UPDATED_CREW)) {
          try {          
            item[key] = UPDATED_CREW[key];
          } catch (e) {
            console.error("Error saving crew member", e);
          }
        }
      }));
      console.log(result);
    },   

    async addCrewMember() {
      await DataStore.save(
          new CrewMember({
          "user": this.username,
          "name": "New Member",
          "species": "Human",
          "reactions": 0,
          "speed": 0,
          "combat": 0,
          "toughness": 0,
          "savvy": 0,
          "luck": 0,
          "gear": "",
          "notes": "",
          "weapons": [],
          "xp": 0,
          "kia": false,
          "leader": false,
          "crewID": this.crewId
        })
      );     
      this.fetchCrewMembers();  
    },   

    async saveCrewMember(id) {
      let CURRENT_MEMBER = this.currentCrewMembers.filter( m => m.id === id)[0];
      let UPDATED_MEMBER = this.crewMembers.filter( m => m.id === id)[0];
            
      var result = await DataStore.save(CrewMember.copyOf(CURRENT_MEMBER, item => {        
        for (const key of Object.keys(UPDATED_MEMBER)) {
          try {          
            item[key] = UPDATED_MEMBER[key];
          } catch (e) {
            console.error("Error saving crew member", e);
          }
        }
      }));
      console.log(result);
    },   

    async removeCrewMember(id) {
      const modelToDelete = this.currentCrewMembers.filter( m => m.id === id)[0];
      DataStore.delete(modelToDelete);
      this.fetchCrew();
    },

    async removeCrew() {      
      await DataStore.delete(this.currentCrew);
      this.$router.push('/');
    }    
  }
}
</script>

<style scoped>
  label {
    font-style: italic;
    font-weight: 700;
    padding-bottom: 0px;
    margin-bottom: 0px;
  }

  h4, .h4 {
    background-color: #ccc;
  }
</style>
