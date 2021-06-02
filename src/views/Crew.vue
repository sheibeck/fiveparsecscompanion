<template>
  <div>
    <button type="button" class="btn btn-success btn-sm mx-1" @click="createCrewMember()">Add Member <i class="fas fa-plus"></i></button>
    {{crew}}    
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
      crew: null
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
        let currentCrew = JSON.parse(JSON.stringify(crews[0]))
        let members = await DataStore.query(CrewMember, c => c.crewID === currentCrew.id);        
        currentCrew.CrewMembers = members;      
        this.crew = currentCrew;
      }    
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
</style>
