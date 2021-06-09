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
          result += ` (Rival attack? ${this.$options.tables.GetFullTableResult("rivalattack")[0].result})`;
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
      
      switch(this.battleType) {
        case "opportunity":
        case "patron":
          result = step.tableResult[0].result;
          break;

        case "rival":
          result = step.tableResult[1].result;
          break;

        case "quest":
          result = step.tableResult[2].result;
          break;

        default:
          result = "None!";
          break;
      }
      
      step.result = result;   
      if (!silent) this.$root.showUserMsg(`Re-rolled Notable Sights`);    
    },
    missionObjectives(step, silent) {
      let result = null;
     
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

        default:
          result = "Hold the field";
          break;
      }
     
      step.result = result;
      if (!silent) this.$root.showUserMsg(`Re-rolled Mission Objective`);
    },
    getOpponentData(table, idx) {
      return JSON.parse(table.tableResult[idx].desc);
    },
    determineOpponents(step, silent) {
      let difficulty = "Normal";

      let result = "<div>"
      let opponentNumber = 0;
      let opponentData = null;
      let opponentType = "";
      switch(this.battleType) {
        case "patron":
          opponentType = `${step.tableResult[0]}`;
          result += `${opponentType}: ${step.tableResult[1]}`;
          opponentData = this.getOpponentData(step, 1);            
          break;

        case "opportunity":           
          opponentType = `${step.tableResult[2]}`;
          result += `${opponentType}: ${step.tableResult[3]}`;
          opponentData = this.getOpponentData(step, 3);            
          break;       

        case "quest":
          opponentType = `${step.tableResult[4]}`;
          result += `${opponentType}: ${step.tableResult[5]}`;
          opponentData = this.getOpponentData(step, 5);            
          break;

        case "rival":
          opponentType = `${step.tableResult[6]}`;
          result += `${opponentType}: ${step.tableResult[7]}`;
          opponentData = this.getOpponentData(step, 7);            
          break;

        case "invasion":
          opponentType = "Invasion";
          step.result = "Invasion!";
          return;   
      }

      
      let pageNumber = "";
      let extraInfo = "";
      let uniqueRollBonus = 0;
      let rerollNumberIfOne = false;
      switch(opponentType) {
        case "Criminal Elements": {
          pageNumber = "Pg.94";
          let bountyRoll = this.rollDice("1d6");
          if ( bountyRoll <= 3) {
            extraInfo += ` Bounty available: ${bountyRoll} credits.`;
          }
          else {
            extraInfo += ` No bounty available.`
          }          
          extraInfo += ` When determining if this enemy becomes a rival roll 2d6.`
          break;        
        }
        case "Hired Muscle": {
          pageNumber = "Pg.96";
          extraInfo += ` You are -1 to any attempt to Seize the Initiative.`
          break;
        }
        case "Interested Parties": {
          pageNumber = "Pg.98";
          uniqueRollBonus = 1;
          rerollNumberIfOne = this.battleType == "quest" ? true : false;
          break;
        }
        case "Roving Threats": {
          pageNumber = "Pg.101";
          extraInfo += ` This enemy never becomes a Rival.`
          break;
        }
      }
     
      const dice = `1d6`;
      let roll1 = this.rollDice(dice);      
      let roll2 = this.rollDice(dice);
      
      if (rerollNumberIfOne) {
        if (roll1 == 1) roll1 = this.rollDice(dice);
        if (roll2 == 1) roll2 = this.rollDice(dice);
      }

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
      
      let uniqueOpponents = 0;      
      if (opponentType !== "Roving Threats" ||  (opponentType !== "Roving Threats" && difficulty !== "Insanity")) {       
        const rollUnique = this.rollDice(`2d6`);
        if (rollUnique + uniqueRollBonus >= 9) {
          uniqueOpponents = 1;
        }      
      }

      const standardOponents = totalOpponents - specialists - lieutenant; 
      //result += `${roll1} + ${roll2} + ${rollUnique} == ${totalOpponents}`;

      const weapons = this.$options.tables.GetFullTableResult("enemyweapons");
      const standardWeapon = weapons[opponentData.weapons[0]-1];

      let specialistWeapon = "";
      if (specialists > 0) {
        const specialistWeapons = this.$options.tables.GetFullTableResult("specialistweapons");
        const specialWeaponMapping = {
          A: 0,
          B: 1,
          C: 2,
        }
        specialistWeapon = `${specialistWeapons[specialWeaponMapping[opponentData.weapons[1]]]}`;
      }
      
      result += ` (+${opponentData.numbers} numbers, ${opponentData.weapons} weapons) </div>`
      result += `<ul class='small'>`;
      result += `<li>${standardOponents}x Standard: ${standardWeapon} (Pg.92)</li>`;
      result += `<li>${specialists}x Specialists: ${specialistWeapon} (Pg.93)</li>`;
      result += `<li>${lieutenant}x Lieutenants: ${standardWeapon} (Pg.93)</li>`;
      result += `<li>${uniqueOpponents}x Unique Individuals (Pg. 105)</li>`;
      result += `</ul>`;

     

      result += `<div class='small fw-normal'>${pageNumber} <span class='fw-bold text-secondary'>${extraInfo}</span></div>`;

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
