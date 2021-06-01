<template>
  <div>
    <h1>Crew</h1>
    
    <ul id="example-1">
      <li v-for="crew in crewList" :key="crew.id">
        {{ crew.name }}: {{ crew.notes }} <button @click="deleteCrew(crew.id)">Delete</button>
      </li>
    </ul>
    
    <button @click="createCrew">Create Crew</button>     
  </div>
</template>

<script>
//import { ref } from "vue";
import { DataStore } from '@aws-amplify/datastore';
import { Crew } from '../models';

export default {
  name: 'Crew',  
  mounted() {
    this.crewList = this.fetchCrew();
  }, 
  data() {
    return {
      crewList: null,
    }
  },
  methods: {    
    async fetchCrew() {
      const models = await DataStore.query(Crew);
      this.crewList = models;      
    },
    async createCrew() {
      await DataStore.save(
        new Crew({
            "story_points": 1020,
            "notes": "Lorem ipsum dolor sit amet",
            "stash": "Lorem ipsum dolor sit amet",
            "equipment": "Lorem ipsum dolor sit amet",
            "credit": 1020,
            "patrons": 1020,
            "rivals": 1020,
            "story_track": "Lorem ipsum dolor sit amet",
            "event": 1020,
            "clock": 1020,
            "rumors": 1020,
            "CrewMembers": [],
            "name": "Lorem ipsum dolor sit amet"
          })
        );
      this.crewList = this.fetchCrew();
    },
    async deleteCrew(id) {
      const modelToDelete = await DataStore.query(Crew, id);
      DataStore.delete(modelToDelete);
      this.crewList = this.fetchCrew();
    },
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
