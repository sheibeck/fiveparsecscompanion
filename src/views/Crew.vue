<template>
  <div v-if="crew">    
    <div class="d-md-flex justify printable page-break">
      <!-- crew log -->      
      <div class="d-flex flex-column flex-fill m-1 border border-2 p-1 col-12 col-md-4">
        <h4 class="p-1 rounded border">Crew Log</h4>
        <div class="d-flex">
          <div class="d-flex flex-fill me-auto">
            <label for="crewName" class="form-text small">Crew Name</label>
            <input v-model="crew.name" type="text" class="form-control" :class="{ 'd-none': !editing }" id="crewName" placeholder="Crew Name" />
            <span :class="{ 'd-none': editing }">: {{crew.name}}</span>
          </div> 
          <div class="d-flex flex-shrink-1 me-auto">
            <label for="crewStoryPoints" class="form-text small">Story Points</label>
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
      <div class="d-flex flex-column flex-fill m-1  border border-2 p-1 col-12 col-md-4">        
          <h4 class="p-1 rounded border">Stash</h4>
          <div class="d-flex">
            <div class="d-flex flex-fill flex-column w-100">
              <label for="crewStash" class="form-text small">Stash</label>
              <textarea v-model="crew.stash" class="form-control" :class="{ 'd-none': !editing }" id="crewStash" placeholder="" rows="7"></textarea>
              <span v-html="formattedText(crew.stash)" :class="{ 'd-none': editing }"></span>       
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
      <div class="d-flex flex-column flex-fill m-1 border border-2 p-1 col-12 col-md-4">      
        <h4 class="p-1 rounded border">Ship Details</h4>
        <div class="d-flex">
          <div class="d-flex flex-fill me-auto">
            <label for="shipName" class="form-text small">
              <i :class="{ 'd-none': !editing }" class="fas fa-dice pe-auto" @click="crew.ship_name = randomName('shipname')" title="Click to roll"></i>
              Ship Name
            </label>
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

        <div class="d-flex">
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
        <button type="button" class="btn btn-secondary btn-sm mx-1" @click="print()">Print <i class="fas fa-print"></i></button>
       
        <div class="pt-2 d-flex">
          <span>Hide on print: </span>
          <div class="ms-3">
            <input v-model="hideSickOnPrint" id="HideSickOnPrint" class="form-check-input" type="checkbox" value="" />
            <label class="form-check-label ms-1 pr-3" for="HideSickOnPrint">
              Sick Bay
            </label>
          </div>
          <div class="ms-3">
            <input v-model="hideKIAOnPrint" id="HideKIAOnPrint" class="form-check-input ml-2 pl-3" type="checkbox" value="" />
            <label class="form-check-label ms-1" for="HideKIAOnPrint">
              KIA
            </label>
          </div>
        </div>
          
        <button type="button" class="ms-auto btn btn-danger btn-sm mx-1" @click="removeCrew()">Delete Crew Log <i class="fas fa-trash"></i></button>        
      </div>
    </div>

    <div class="row mt-2 page-break">
      <!-- crew members -->
      <CrewEdit v-bind:crewMembers="crewMembers" v-on:fetchcrewmembers="fetchCrewMembers" :hideSickOnPrint="hideSickOnPrint" :hideKIAOnPrint="hideKIAOnPrint" ></CrewEdit>
    </div>

    <div class="row mt-2 page-break">
      <!-- worlds -->
      <WorldEdit v-bind:worlds="worlds" v-on:fetchworlds="fetchWorlds"></WorldEdit>
    </div>
</div>
   
</template>

<script>
import { DataStore } from '@aws-amplify/datastore';
import { Crew } from '../models';
import { CrewMember } from '../models';
import { World } from '../models';
import { FPFHTables } from '../js/tables.js';
import CrewEdit from '../components/CrewEdit.vue'
import WorldEdit from '../components/WorldEdit.vue'

export default {
  name: 'Crew', 
  components: {
    CrewEdit,
    WorldEdit,
  },
  mounted() {    
    this.fetchCrew();
  }, 
  data() {
    return {
      crew: null,
      crewMembers: [],
      worlds: [],
      editing: false,  
      hideSickOnPrint: true,
      hideKIAOnPrint: true,
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
    async fetchCrew() {
      const crew = await DataStore.query(Crew, this.crewId);      
      this.crew = JSON.parse(JSON.stringify(crew));      

      this.fetchCrewMembers();
      this.fetchWorlds();
    },

    async fetchCrewMembers() {
      const crewMembers = await DataStore.query(CrewMember, c => c.crewID("eq", this.crewId));      
      this.crewMembers = JSON.parse(JSON.stringify(crewMembers));
      //handle weapons
      for(var m = 0; m < this.crewMembers.length; m++) {
        this.crewMembers[m].weapons = JSON.parse(this.crewMembers[m].weapons);
      }      
    },

    async fetchWorlds() {
      const worlds = await DataStore.query(World, c => c.crewID("eq", this.crewId));      
      this.worlds = JSON.parse(JSON.stringify(worlds));
      //handle patrons and rivals
      for(var m = 0; m < this.worlds.length; m++) {
        this.worlds[m].patrons_known = JSON.parse(this.worlds[m].patrons_known);
        this.worlds[m].rivals_known = JSON.parse(this.worlds[m].rivals_known);
      }      
    },

    async saveCrew() {      
      let UPDATED_CREW = this.crew;
      const CURRENT_CREW = await DataStore.query(Crew, this.crewId);
      await DataStore.save(Crew.copyOf(CURRENT_CREW, item => {                
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
        item.Worlds = UPDATED_CREW.Worlds,
        item.campaign_turn = UPDATED_CREW.campaign_turn,
        item.campaign_difficulty = UPDATED_CREW.campaign_difficulty,
        item.campaign_victory = UPDATED_CREW.campaign_victory        
      }));

      this.$root.showUserMsg(`Crew log saved`);
      this.toggleEdit();
    },   

    async removeCrew() {
      if (!confirm("Are you sure you want to delete the entire crew?")) return;

      const modelToDelete = await DataStore.query(Crew, this.crewId)
      await DataStore.delete(modelToDelete);
      
      this.$root.showUserMsg(`Removed crew`);

      this.$router.push('/');
    },
  

    print() {
      this.$emit('doprint')

      if (this.editing) {
        this.saveCrew();
      }

      setTimeout(function() {window.print();}, 1000);
    },

    formattedText(text) {
      // Replace LF (line feed) and CR (carriage return) with <br/>
      return text.replace(/(\r\n|\n|\r)/g, '<br/>');
    }
  }
}
</script>

<style>
  label {        
    padding-bottom: 0px;
    margin-bottom: 0px;
  }

  h4, .h4
  h5, .h5 {
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
    font-weight: 700;  
  }

  input[type=number] {
    text-align: center;
  }

  .w-md-50 {
    width: 50% !important;
  }

  td,th {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

 
  @media (max-width: 991.98px) {
    .w-md-50 {
      width: 100% !important;
    }
  }

  @media print
  {
    .page-break {
      page-break-before: always;
    }
    
    .crewmember, .printable, .world {
      font-size: .75em !important;
    }

    .crewmember:nth-child(2n+1),
    .world:nth-child(2n+1)  {
      page-break-inside: avoid;
    }

    .crewmember,
    .world {
      page-break-inside: avoid;
      flex-wrap: wrap;
    }

    div {
      float: none !important;
    }  
   
    .attributes {
      flex-wrap: unset !important;
    }      
  }
</style>
