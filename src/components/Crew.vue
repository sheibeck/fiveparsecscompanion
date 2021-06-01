<template>
  <div>
    <h1>Crew</h1>
    

    <div v-for="crew in crewList" :key="crew.pk" class="d-flex flex-row bd-highlight mb-3">
      <div>
        <strong>Name:</strong> {{crew.name}} ({{crew.pk}})  
        <ul v-for="member in crewMembers" :key="member.name" class="d-flex flex-row bd-highlight mb-3">
          <li>
            {{member.name}}  
          </li>
        </ul>
      </div>
    </div>
   
    
    <button type="button" class="btn btn-success" @click="createCrew">Create Crew</button>
    <button type="button" class="btn btn-success" @click="createCrewMember">Create Member</button>
    <button type="button" class="btn btn-danger" @click="refreshCrew">Refresh</button>
  </div>
</template>

<script>
import { DataStore } from '@aws-amplify/datastore';
import { Crew } from '../models';

export default {
  name: 'Crew',  
  mounted() {
    this.fetchCrew();
    this.fetchCrewMembers();
  }, 
  data() {
    return {
      crewList: [],
      crewMembers: [],
    }
  },
  methods: {    
    async fetchCrew() {
      const models = await DataStore.query(Crew, c => c.record_type("eq", "CREW").pk("eq", "USER#test12346789@testemailtestemail.com"));
      this.crewList = models;      
    },
     async fetchCrewMembers() { 
      const members = await DataStore.query(Crew, c => c.record_type("eq", "CREWMEMBER").sk("eq","CREW#abc123"));
      this.crewMembers = members;      
    },
    async createCrew() {
      await DataStore.save(
          new Crew({
          "story_points": 1,
          "notes": "A crew of peeps.",
          "stash": "Some weapons in the stash",
          "credits": 8,
          "patrons": 1,
          "rivals": 1,
          "rumors": 1,
          "name": "Cool Crew",
          "pk": "USER#test12346789@testemailtestemail.com",
          "sk": "CREW#abc123",          
          "record_type": "CREW",
          "user": "test12346789@testemailtestemail.com",
        })
      );
      this.fetchCrew();
    },
    async createCrewMember() {
      await DataStore.save(
          new Crew({         
          "notes": "In it for the money",          
          "name": "Bob Dobbs",
          "pk": "USER#test12346789@testemailtestemail.com",
          "sk": "CREW#abc123",
          "record_type": "CREWMEMBER",
          "user": "test12346789@testemailtestemail.com",
          "species": "Human",
          "reaction": 2,
          "speed": 4,
          "combat": 0,
          "toughness": 3,
          "savvy": 2,
          "luck": 1,
          "xp": 0,
          "gear": "Stim pack"         
        })
      );
      this.fetchCrewMembers();       
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
