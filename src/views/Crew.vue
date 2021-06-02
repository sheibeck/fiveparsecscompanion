<template>
  <div>    
    <div v-if="crew" class="row mt-2">
      <!-- crew log -->      
      <div class="col col-12 col-md-4 mt-2 mt-md-0">
        <h4 class="bg-secondary p-1 rounded">Crew Log</h4>
        <div class="row">
          <div class="col col-9">
            <label for="crewName" class="form-label small">Crew Name</label>
            <input v-model="crew.name" type="text" class="form-control" id="crewName" placeholder="Crew Name" />        
          </div> 
          <div class="col">
            <label for="crewStoryPoints" class="form-label small">Story</label>
            <input v-model="crew.story_points" type="number" class="form-control" id="crewStoryPoints" placeholder="0" />        
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="crewNotes" class="form-label small">Notes</label>
            <textarea v-model="crew.notes" class="form-control" id="crewNotes" placeholder="Notes" rows="4"></textarea>        
          </div>
        </div>
      </div>

      <!-- stash -->
      <div class="col col-12 col-md-4 mt-2 mt-md-0">
        <h4 class="bg-secondary p-1 rounded">Stash</h4>
        <div class="row">
          <div class="col col-9">
            <label for="crewStash" class="form-label small">Stash</label>
            <textarea v-model="crew.stash" class="form-control" id="crewStash" placeholder="Stash" rows="7"></textarea>        
          </div>
        
          <div class="col">
            <div class="">
              <label for="crewCredits" class="form-label small">Credits</label>
              <input v-model="crew.credits" type="number" class="form-control" id="crewCredits" placeholder="0" />        
            </div> 
            <div class="">
              <label for="crewPatrons" class="form-label small">Patrons</label>
              <input v-model="crew.patrons" type="number" class="form-control" id="crewPatrons" placeholder="0" />
            </div>
            <div class="">
              <label for="crewRivals" class="form-label small">Rivals</label>
              <input v-model="crew.patrons" type="number" class="form-control" id="crewRivals" placeholder="0" />
            </div>
          </div>

        </div>        
      </div>

      <!-- ship details -->          
      <div class="col col-12 col-md-4 mb-2 mt-2 mt-md-0">
        <h4 class="bg-secondary p-1 rounded">Ship Details</h4>
        <div class="row">
          <div class="col col-6">
            <label for="shipName" class="form-label small">Ship Name</label>
            <input v-model="crew.ship_name" type="text" class="form-control" id="shipName" placeholder="Ship Name" />
          </div> 
          <div class="col">
            <label for="shipHull" class="form-label small">Hull</label>
            <input v-model="crew.ship_hull" type="number" class="form-control" id="shipHull" placeholder="0" />        
          </div>
          <div class="col">
            <label for="shipDebt" class="form-label small">Debt</label>
            <input v-model="crew.ship_debt" type="number" class="form-control" id="shipDebt" placeholder="0" />
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

    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-primary btn-sm mx-1" @click="saveCrew()">Save <i class="fas fa-save"></i></button>
        <button type="button" class="btn btn-secondary btn-sm mx-1" @click="createCrewMember()">Add Member <i class="fas fa-plus"></i></button>
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
      currentCrew: null
    }
  },
  computed : {   
    crewId : function() {       
      return this.$route.params.id;
    }
  },
  methods: {   
    async fetchCrew() {
      const crews = await DataStore.query(Crew, c => c.user("eq", this.$store.state.user.username).id("eq", this.crewId ));

      if (crews.length > 0) {
        this.currentCrew = crews[0];
        let currentCrew = JSON.parse(JSON.stringify(this.currentCrew))
        let members = await DataStore.query(CrewMember, c => c.crewID === currentCrew.id);        
        currentCrew.CrewMembers = members;      
        this.crew = currentCrew;
      }    
    },

    async saveCrew() {
      /* Models in DataStore are immutable. To update a record you must use the copyOf function
      to apply updates to the item’s fields rather than mutating the instance directly */
      let UPDATED_CREW = this.crew;      
      var result = await DataStore.save(Crew.copyOf(this.currentCrew, item => {        
        for (const key of Object.keys(UPDATED_CREW)) {
          try {
            if (item[key]) {
              if (typeof item[key] === "number") {
                item[key] = parseInt(UPDATED_CREW[key]);
              }
              else {
                item[key] = UPDATED_CREW[key];
              }
            }
          } catch (e) {
            console.error("Error saving crew", e);
          }
        }
      }));
      console.log(result);
    },   

    async createCrewMember() {
      await DataStore.save(
          new CrewMember({
          "user": this.$store.state.user.username,
          "name": "Bob Dobbs",
          "species": "Human",         
          "crewID": this.crewId
        })
      );
      this.fetchCrew();    
    },   
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
</style>
