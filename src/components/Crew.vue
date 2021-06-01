<template>
  <div>
    <h1>Crew</h1>
    
    <ul id="example-1">
      <li v-for="crew in crewList" :key="crew.id">
        {{ crew.name }}: {{ crew.notes }} <button @click="deleteCrew(crew.id)">Delete</button>
      </li>
    </ul>
    
    <button @click="createCrew">Create Crew</button>
    <button @click="refreshCrew">Refresh</button>
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
          "credits": 1020,
          "patrons": 1020,
          "rivals": 1020,
          "story_track": "Lorem ipsum dolor sit amet",
          "event": 1020,
          "clock": 1020,
          "rumors": 1020,
          "name": "Lorem ipsum dolor sit amet",
          "pk": "Lorem ipsum dolor sit amet",
          "sk": "Lorem ipsum dolor sit amet",
          "record_type": "Lorem ipsum dolor sit amet",
          "user": "test12346789@testemailtestemail.com",
          "species": "Lorem ipsum dolor sit amet",
          "reaction": 1020,
          "speed": 1020,
          "combat": 1020,
          "toughness": 1020,
          "savvy": 1020,
          "luck": 1020,
          "xp": 1020,
          "gear": "Lorem ipsum dolor sit amet",
          "hull_points": 1020,
          "debt": 1020,
          "traits": "Lorem ipsum dolor sit amet",
          "upgrades": "Lorem ipsum dolor sit amet"
        })
      );
      this.crewList = this.fetchCrew();
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
