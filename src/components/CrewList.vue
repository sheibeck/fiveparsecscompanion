<template>
  <div>
    <h1>
      Crew <button type="button" class="btn btn-success btn-sm mx-1 d-print-none" @click="createCrew">New Crew<i class="fas fa-plus"></i></button>      
      <div v-if="isDev" class="d-print-none">        
        <button type="button" class="btn btn-secondary btn-sm mx-1" @click="listLocalData">List Local Data <i class="fas fa-trash"></i></button>      
        <button type="button" class="btn btn-danger btn-sm mx-1" @click="clearLocalData">Clear Local Data <i class="fas fa-trash"></i></button>         
      </div>
    </h1>
    
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div v-for="crew in crews" :key="crew.id" class="col">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{crew.name}}</h5>
            <ul v-for="member in crewMembers.filter(m => m.crewID === crew.id)" :key="member.id" class="list-group">
              <li class="list-group-item">
                {{member.name}} 
              </li>
            </ul>
            <div class="card-footer d-flex justify-content-center">
              <a :href="'/crew/'+crew.id" class="btn btn-primary btn-sm"> <div class="">Edit Crew <i class="fas fa-pen"></i></div></a>              
            </div>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <div>
              <label>Campaign Turn:</label> {{crew.campaign_turn}}
            </div>
            <div>
              <label>Difficulty:</label> {{crew.campaign_difficulty}}
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

export default {
  name: 'CrewList',  
  mounted() {
    this.fetchCrew();    
  }, 
  data() {
    return {      
      crews: [],
      crewMembers: [],
    }
  },
  computed : {
    username : function() {       
      return this.$store.state.user.username;
    },
    isDev: function() {
      return this.$store.state.develop;
    }
  },
  methods: {
    async fetchCrew() {
      this.crews = await DataStore.query(Crew, c => c.user("eq", this.username));
      this.crewMembers = await DataStore.query(CrewMember, c => c.user("eq", this.username));
    },
    async createCrew() {
      var crew = await DataStore.save(
        new Crew({
          "user": this.username,
          "name": "New Crew",
          "notes": "",
          "story_points": 0,
          "stash": "",
          "credits": 0,
          "patrons": 0,
          "rivals": 0,
          "ship_name": "",
          "ship_hull_points": 0,
          "ship_debt": 0,
          "ship_traits": "",
          "ship_upgrades": "",
          "story_track": "",
          "event": 0,
          "clock": 0,
          "quest_rumors": 0,
          "campaign_turn": 0,
          "campaign_difficulty": "Normal",
          "campaign_victory": "",
          "CrewMembers": []
        })
      );          
      console.log(crew);
      
      this.fetchCrew();
    },    
    async deleteCrew(id) {
      const modelToDelete = await DataStore.query(Crew, id);
      DataStore.delete(modelToDelete);
      this.fetchCrew();
    },  

    async clearLocalData() {      
      await DataStore.stop();
      await DataStore.clear();
      await DataStore.start();
      this.fetchCrew();
    },  

    async listLocalData() {
      const crew = await DataStore.query(Crew);
      console.log(crew);

      const members = await DataStore.query(CrewMember);
      console.log(members);
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
</style>
