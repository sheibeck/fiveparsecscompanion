<template>
  <div>
    <h1>3. Battle (Pg.87)</h1>

    <div class="d-flex">
      <label class="pe-2">Battle Type:</label>
      <div class="form-check pe-2" v-for="btype in battleTypes" :key="btype">
        <input class="form-check-input" :checked="battleType===btype" type="radio" name="battleType" :id="`battle${btype}`" @change="readyForBattle()" v-model="battleType" :value="btype">
        <label class="form-check-label" for="battlePatron">
          {{btype}}
        </label>
      </div>    
    </div>

    <div class="row row-cols-1"> 
      
      <div class="col">
        <div class="card">

          <p class="card-text">            
            <ul class="list-group">
              <li v-for="(item, idx) in tableResults" :key="item.key" class="d-flex list-group-item" :class="{'bg-light': idx%2 == 0}">
                <i class="fas fa-dice me-1 mt-1 d-print-none" @click="rollOnTable(item.key)"></i>
                <div class="col-4">                  
                  <span class="">{{item.label}}</span>
                </div>
                <div class="col">
                  <label class="">{{item.result}}</label>
                </div>
              </li>
            </ul>
          </p>

            <!--
          <div class="card-header bg-light border-success">
            <h5>
              {{item.label}}
              <i class="fas fa-dice me-1 mt-1 d-print-none" @click="rollOnTable(item.key)"></i>
            </h5>
          </div>
          <div class="card-body">
            <p class="card-text">              
              {{item.result}}
            </p>
          </div>
          -->
        </div>
      </div>

    </div>  
</div>
   
</template>

<script>
import { FPFHTables } from '../js/tables.js';

export default {
  name: 'Battle',  
  components: {    
  },
  mounted() {
    this.readyForBattle();
  }, 
  data() {
    return {
      battleTypes: [
        "patron",             
        "rival",
        "quest",
        "opportunity",
        "invasion",
      ],
      battleType: "patron",
      tableResults: [
        {          
          key: "deploymentconditions",
          label: "1. Deployment Conditions (Pg. 88)",
          result: "",
        },
        {          
          key: "notablesights",
          label: "2. Notable Sights (Pg. 89)",
          result: "",
        },
        {          
          key: "missionobjective",
          label: "3. Mission Objective (Pg. 89)",
          result: "",
        }
      ]
    }        
  },  
  tables: new FPFHTables(),
  computed : {    
    username: function() {
      return this.$store.state.user.username;
    },   
  },
  methods: {
    rollOnTable(table) {        
      const tableResult = this.$options.tables.GetFullTableResult(table);
      let result = tableResult[0];
      switch(this.battleType) {
        case "opportunity":
          if (table === "missionobjective")
            result = tableResult[1]
          else 
            result = tableResult[0]
          break;

        case "rival":
          result = tableResult[1];
          break;

        case "quest":
          result = tableResult[2];
          break;
      }
      result = result.result;
              
      switch(table) {
        case "notablesights":
          if (this.battleType === "invasion") {
            result = "None";
          }
          break;
        case "missionobjective":
          if (this.battleType !== "patron" && this.battleType !== "opportunity" && this.battleType !== "quest") {
            result = "Fight Off";
          }
          break;
      }

      this.tableResults.find( t => t.key === table).result = result;

      this.$root.showUserMsg(`Rolled on ${table}`);
    },
    readyForBattle() {
      this.rollOnTable("deploymentconditions");
      this.rollOnTable("notablesights");
      this.rollOnTable("missionobjective");
    }
  }
}
</script>

<style scoped>
  label {
    font-weight: 700;
  }  

  .col { 
    page-break-inside: avoid;
  }

  input[type=number] {
    text-align: center;
  }  
</style>
