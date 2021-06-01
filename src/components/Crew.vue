<template>
  <div>
    <h1>
      Crew 
      <button type="button" class="btn btn-success btn-sm mx-1" @click="createCrew">Add Crew <i class="fas fa-plus"></i></button>      
      <button type="button" class="btn btn-danger btn-sm" @click="refreshCrew">Refresh</button>
    </h1>
    
    <div v-for="crew in crewList" :key="crew.id" class="d-flex flex-row bd-highlight mb-3">
      <div>
        <div class="d-flex py-1">
          <div class="align-bottom mt-1">
            <h5>{{crew.name}}</h5>
          </div>
          <button type="button" class="btn btn-primary btn-sm mx-1"> Edit Crew <i class="fas fa-pen"></i></button>
          <button type="button" class="btn btn-secondary btn-sm mx-1"> Print Crew <i class="fas fa-print"></i></button>
          <button type="button" class="btn btn-success btn-sm mx-1" @click="createCrewMember(crew.id)">Add Member <i class="fas fa-plus"></i></button>
        </div>         
        <ul v-for="member in crew.CrewMembers" :key="member.name" class="d-flex flex-col">
          <li>
            {{member.name}} 
            <button type="button" class="btn btn-primary btn-sm mx-1"><i class="fas fa-pen"></i></button>
            <button type="button" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
          </li>
        </ul>
        
      </div>
    </div>
      
  </div>
</template>

<script type="ts">
import { DataStore } from '@aws-amplify/datastore';
import { Crew } from '../models';
import { CrewMember } from '../models';

export default {
  name: 'Crew',  
  mounted() {
    this.fetchCrew();    
  }, 
  data() {
    return {      
      crewList: []      
    }
  },
  computed : {
    username : function() { return this.$parent.$data.user.username; }
  },
  methods: {
    async fetchCrew() {
      const crews = await DataStore.query(Crew, c => c.user("eq", this.username));

      this.crewList = [];
      crews.forEach( async (crew) => { 
        let members = (await DataStore.query(CrewMember)).filter(c => c.crewID === crew.id);
        let crewObj = JSON.parse(JSON.stringify(crew));
        crewObj.CrewMembers = members;
        this.crewList.push(crewObj);
      });      
    },    
    async createCrew() {
      await DataStore.save(
        new Crew({
          "user": this.username,
          "name": "Cool Crew",
          "notes": "Some notes",
          "story_points": 1,
          "stash": "My stash",
          "credits": 10,
          "patrons": 1,
          "rivals": 1,
          "ship_name": "Firefly",
          "ship_hull_points": 30,
          "ship_debt": 20,
          "ship_traits": "Ship traits are",
          "ship_upgrades": "Warp drive",
          "story_track": "",
          "event": 0,
          "clock": 0,
          "quest_rumors": 0,
          "CrewMembers": []
        })
      );          

      this.fetchCrew();
    },
    async createCrewMember(crewId) {
      await DataStore.save(
          new CrewMember({
          "user": this.username,
          "name": "Bob Dobbs",
          "species": "Human",         
          "crewID": crewId
        })
      );
      this.fetchCrew();    
    },
    async deleteCrew(id) {
      const modelToDelete = await DataStore.query(Crew, id);
      DataStore.delete(modelToDelete);
      this.crewList = this.fetchCrew();
    },
    async refreshCrew() {     
      await DataStore.stop(); 
      await DataStore.clear();      
      await DataStore.start();
      this.crewList = this.fetchCrew();
    }
    /*async updateCrew(id) {
      // Models in DataStore are immutable. To update a record you must use the copyOf function
      //  to apply updates to the item’s fields rather than mutating the instance directly
      await DataStore.save(Crew.copyOf(CURRENT_ITEM, item => {
          // Update the values on {item} variable to update DataStore entry
          item.name = "bob"
      }));
      this.crewList = this.fetchCrew();
    }*/
  }
}
</script>

<style scoped>
</style>
