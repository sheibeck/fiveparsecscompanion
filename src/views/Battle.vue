<template>
  <div>
    <h1>3. Battle (Pg.87)</h1>

    <div class="d-flex">
      <i class="fas fa-dice me-1 mt-1 d-print-none fa-2x" @click="readyForBattle()"></i>
      <div class="d-flex">        
        <div class="input-group-text me-2">Battle Type</div>
        <div class="form-check pe-2 mt-2" v-for="btype in battleTypes" :key="btype">
          <input class="form-check-input" :checked="battleType===btype" type="radio" name="battleType" :id="`battle${btype}`" @change="readyForBattle()" v-model="battleType" :value="btype">
          <label class="form-check-label" for="battlePatron">
            {{btype}}
          </label>
        </div>
      </div>
      <div class="col-auto ms-2">
        <label class="visually-hidden" for="crewSize">Crew Size</label>
        <div class="input-group">
          <div class="input-group-text col-form-label-sm">Crew Size</div>
          <input type="number" max="6" min="1" class="form-control form-control-sm" id="crewSize" placeholder="Crew Size" v-model.number="crewSize" />
        </div>
      </div>
    </div>

    <div class="row row-cols-1 mt-1"> 
      
      <div class="col">
        <div class="card">

          <p class="card-text">            
            <ul class="list-group">
              <li v-for="(item, idx) in tableResults" :key="item.key" class="d-flex list-group-item" :class="{'bg-light': idx%2 == 0}">
                <i class="fas fa-dice me-1 mt-1 d-print-none" @click="rollOnTable(item)"></i>
                <div class="col-4">                  
                  <span class="">{{item.label}}</span>
                </div>
                <div class="col">
                  <label class="" v-html="item.result"></label>
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
      crewSize: 6,
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
          tableResult: null,
          label: "1. Deployment Conditions (Pg. 88)",
          result: "",
        },
        {          
          key: "notablesights",
          tableResult: null,
          label: "2. Notable Sights (Pg. 89)",
          result: "",
        },
        {          
          key: "missionobjective",
          tableResult: null,
          label: "3. Mission Objective (Pg. 89)",
          result: "",
        },
        {          
          key: "enemyencountercategory",
          tableResult: null,
          label: "4. Determine the Enemy (Pg. 92)",
          result: "",          
        }
      ]
    }        
  },  
  tables: new FPFHTables(),
  AIType: {
    A: "Aggressive",
    C: "Cautious",
    D: "Defensive",
    G: "Guardian",
    R: "Rampage",
    T: "Tactical",
    B: "Beast",
  },
  computed : {    
    username: function() {
      return this.$store.state.user.username;
    },   
  },
  methods: {
    rollOnTable(step) {        
      let table = step.key;      
      step.tableResult = this.$options.tables.GetFullTableResult(table);
      
      switch(table) {
        case "deploymentconditions":
          this.deploymentConditions(step);
          break;        
        case "notablesights":
          this.notableSights(step);
          break;
        case "missionobjective":
          this.missionObjectives(step);
          break;
        case "enemyencountercategory":
          this.determineOpponents(step);
          break;
      }
    },
    rollDice(dice) {
      const roll = this.$options.tables.Roll(dice);      
      return roll;   
    },
    readyForBattle() {
      this.tableResults.forEach( (step) => {
        this.rollOnTable(step, true);
      });
      this.$root.showUserMsg(`Readied for battle!`);
    },
    deploymentConditions(step, silent) {
      let result = step.tableResult[0];
      switch(this.battleType) {
        case "opportunity":         
          result = step.tableResult[0]
          break;

        case "rival":
          result = step.tableResult[1];
          break;

        case "quest":
          result = step.tableResult[2];
          break;
      }
      step.result = result;
      if (!silent) this.$root.showUserMsg(`Re-rolled Deployment Conditions`);
    },
    notableSights(step, silent) {
      let result = "";
      if (this.battleType === "invasion") {
        result = "None";
      } 
      else {
        switch(this.battleType) {
          case "opportunity":
          case "patron":
              result = step.tableResult[0].result;
            break;

          case "rival":
              result = step.tableResult[1].result;
            break;

          case "quest":
              result = step.ableResult[2].result;
            break;
        }
      }
      step.result = result;   
      if (!silent) this.$root.showUserMsg(`Re-rolled Notable Sights`);    
    },
    missionObjectives(step, silent) {
      let result = null;
      if (this.battleType !== "patron" && this.battleType !== "opportunity" && this.battleType !== "quest") {
        result = "Hold the Field";
      }
      else {        
        switch(this.battleType) {
          case "patron":          
            result = step.tableResult[0].result;
            break;

          case "opportunity":
            result = step.tableResult[1].result;
            break;

          case "quest":
            result = step.tableResult[2].result;
            break;
        }
      }
      step.result = result;
      if (!silent) this.$root.showUserMsg(`Re-rolled Mission Objective`);
    },
    getOpponentData(table, idx) {
      return JSON.parse(table.tableResult[idx].desc);
    },
    determineOpponents(step, silent) {
      let result = ""
      let opponentNumber = 0;
      switch(this.battleType) {
        case "patron":           
            result = `${step.tableResult[0]} - ${step.tableResult[1]}`;
            opponentNumber = this.getOpponentData(step, 1).numbers;
          break;

        case "opportunity":           
            result = `${step.tableResult[2]} - ${step.tableResult[3]}`;
            opponentNumber = this.getOpponentData(step, 3).numbers;
          break;       

        case "quest":
            result = `${step.tableResult[4]} - ${step.tableResult[5]}`;
            opponentNumber = this.getOpponentData(step, 5).numbers;
          break;

        case "rival":
            result = `${step.tableResult[6]} - ${step.tableResult[7]}`;
            opponentNumber = this.getOpponentData(step, 7).numbers;
          break;
      }
     
      const dice = `1d6`;
      const roll1 = this.rollDice(dice);
      const roll2 = this.rollDice(dice);
      const maxRoll = Math.max(roll1,roll2);
      const minRoll = Math.max(roll1,roll2);

      let totalOpponents = opponentNumber;
      let crewSize = this.crewSize;      
      if (crewSize === 6) {
        totalOpponents += maxRoll;
      } else if (crewSize === 5) {
        totalOpponents += minRoll;
      } else {
        totalOpponents += roll1        
      }

      let specialists = 0;
      if (totalOpponents >= 3 && totalOpponents <=6) {
        specialists = 1;
      } 
      else if (totalOpponents >= 7) {
        specialists = 2
      }

      let lieutenant = 0;
      if (totalOpponents >= 4) {
        lieutenant = 1;
      }
      
      let unique = 0;
      const rollUnique = this.rollDice(`2d6`);
      if (rollUnique >= 9) {
        unique = 1;
      }      

      const standardOponents = totalOpponents - specialists - lieutenant; 
      //result += `${roll1} + ${roll2} + ${rollUnique} == ${totalOpponents}`;
      result += ` (+${opponentNumber} numbers) <div class='small'>${standardOponents} Standard, ${specialists} Specialists, ${lieutenant} Lieutenants`;      
      result += `, ${unique} Unique Individuals</div>`;      

      step.result = result;    
      if (!silent) this.$root.showUserMsg(`Determined Opponents`);
    },
   

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
