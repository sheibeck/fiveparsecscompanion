<template>
  <div>
    <h1 class="d-print-none">3. Battle (Pg.87)</h1>
    <h4 class="d-none d-print-block">Encounter Log</h4>
    <div class="d-flex flex-column flex-md-row d-print-none">
      <i class="fas fa-dice me-1 mt-1 d-print-none fa-2x text-center mb-2 mb-md-0" @click="readyForBattle()"></i>
      <div class="d-flex flex-column flex-md-row">
        <div class="input-group-text me-2">Battle Type</div>
        <div class="d-flex flex-wrap">
          <div class="form-check pe-2 mt-2" v-for="btype in battleTypes" :key="btype">
            <input class="form-check-input" :checked="battleType===btype" type="radio" name="battleType" :id="`battle${btype}`" @change="readyForBattle()" v-model="battleType" :value="btype">
            <label class="form-check-label" for="battlePatron">
              {{btype}}
            </label>
          </div>
        </div>
      </div>
      <div class="col-auto ms-md-2">
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
              <li v-for="(item, idx) in tableResults" :key="item.key" class="d-flex flex-column flex-md-row list-group-item" :class="{'bg-light': idx%2 == 0}">
                <div class="col col-md-6">
                  <i class="fas fa-dice me-1 mt-1 d-print-none" @click="rollOnTable(item)"></i>                
                  <span class="h5">{{item.label}}</span>
                  <div v-if="idx === 3">
                    <label>Specific Enemy:</label><input type="text" @change="getSpecificEnemy($event.target.value)" />
                  </div>
                </div>
                <label class="" v-html="item.result"></label>                
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>  

    <div v-if="enemyTablePrint.length > 0" class=" d-md-flex d-print-flex">
      <div class="flex-fill">
        <h5 class="mt-3">Enemies</h5>
        <div class="table-responsive">
          <table class="table table-responsive small">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name/Type</th>
                <th scope="col">Number</th>
                <th scope="col">Panic</th>
                <th scope="col">Speed</th>
                <th scope="col">Combat</th>
                <th scope="col">Toughness</th>
                <th scope="col">AI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,idx) in enemyTablePrint" :key="idx">
                <th scope="row">{{idx+1}}</th>
                <td>{{item.name}}</td>
                <td>{{item.numbers}}</td>
                <td></td>   
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">*</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h5>Weapons</h5>
        <div class="table-responsive">
          <table class="table small">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col" class="flex-fill">Name/Type</th>
                <th scope="col">Range</th>
                <th scope="col">Shots</th>
                <th scope="col">Damage</th>
                <th scope="col">Traits</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,idx) in enemyWeaponTablePrint" :key="idx">
                <th scope="row">{{idx+1}}</th>
                <td>{{item}}</td>
                <td></td>
                <td></td>   
                <td></td>
                <td></td>          
              </tr>      
              <tr>
                <th scope="row">*</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col col-md-3 d-flex flex-column">
        <h5>Notes</h5>
        <textarea class="flex-fill" border="0">
        </textarea>
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
      enemyTablePrint: [],      
      enemyWeaponTablePrint: [],
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
          label: "Deployment Conditions (Pg. 88)",
          result: "",
        },
        {          
          key: "notablesights",
          tableResult: null,
          label: "Notable Sights (Pg. 89)",
          result: "",
        },
        {          
          key: "missionobjective",
          tableResult: null,
          label: "Mission Objective (Pg. 89)",
          result: "",
        },
        {          
          key: "enemyencountercategory",
          tableResult: null,
          label: "Determine the Enemy (Pg. 92)",          
          result: "",
        }
      ],      
      broughtFriends: false,
      opponent: {
        number: 0,
        data: null,
        type: "",
        name: ""
      }
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
          this.getRandomOpponent(step);
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

        case "rival": {
          result = step.tableResult[1];
          let rivalAttack = `${this.$options.tables.GetFullTableResult("rivalattack")[0].result}`;
          if (rivalAttack === "Brought friends") {
            this.broughtFriends = true;
            this.getSpecificEnemy(this.opponent.name);
          }
          result += `(Rival attack? ${rivalAttack})`;
          break;
        }
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
    getRandomOpponent(step, silent) {
      switch(this.battleType) {
        case "patron":
          this.opponent.type = `${step.tableResult[0]}`;
          this.opponent.name = `${step.tableResult[1]}`;          
          this.opponent.data = this.getOpponentData(step, 1);            
          break;

        case "opportunity":           
          this.opponent.type = `${step.tableResult[2]}`;
          this.opponent.name = `${step.tableResult[3]}`;          
          this.opponent.data = this.getOpponentData(step, 3);            
          break;       

        case "quest":
          this.opponent.type = `${step.tableResult[4]}`;
          this.opponent.name = `${step.tableResult[5]}`;          
          this.opponent.data = this.getOpponentData(step, 5);            
          break;

        case "rival":
          this.opponent.type = `${step.tableResult[6]}`;
          this.opponent.name = `${step.tableResult[7]}`;          
          this.opponent.data = this.getOpponentData(step, 7);            
          break;

        case "invasion":
          this.opponent.type = "Invasion";
          step.result = "Invasion!";
          break;   
      }
      this.formatOpponentData();

      if (!silent) this.$root.showUserMsg(`Determined Opponents`);
    },
    formatOpponentData() {
      this.enemyTablePrint = [];
      this.enemyWeaponTablePrint = [];
      
      let difficulty = "Normal";

      let result = "<div>"
      let opponentNumber = this.opponent.number;
      let opponentData = this.opponent.data;
      let opponentType = this.opponent.type;
      let opponentName = this.opponent.name;
      
      result += this.battleType !== "Invasion" ? `${opponentType}: ${opponentName}` : "Invasion!";

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

      if (this.broughtFriends) {
        totalOpponents++;
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

      const standardOpponents = totalOpponents - specialists - lieutenant;
                  
      //result += `${roll1} + ${roll2} + ${rollUnique} == ${totalOpponents}`;
      
      let standardWeapon = "";
      let specialistWeapon = "";
      if (opponentData.weapons.length > 2) {
          const customWeapon = opponentData.weapons.split(","); 
          standardWeapon = customWeapon[0];                 
          specialistWeapon = customWeapon[customWeapon.length-1];          
      } else {
        const weapons = this.$options.tables.GetFullTableResult("enemyweapons");
        standardWeapon = weapons[opponentData.weapons[0]-1];
                      
        if (specialists > 0) {
          const specialistWeapons = this.$options.tables.GetFullTableResult("specialistweapons");
          const specialWeaponMapping = {
            A: 0,
            B: 1,
            C: 2,
          }
          specialistWeapon = `${specialistWeapons[specialWeaponMapping[opponentData.weapons[1]]]}`;          
        }
      }

      //set some printables
      this.enemyTablePrint.push({name: opponentName, numbers: standardOpponents});      
      this.addPrintableWeaponEntry(standardWeapon);
      
      if (lieutenant > 0) {
        this.enemyTablePrint.push({name: `${opponentName} Lt.`, numbers: lieutenant});        
        this.addPrintableWeaponEntry("Blade");
      }      
      if (specialists > 0) {
        this.enemyTablePrint.push({name: `${opponentName} Spc.`, numbers: specialists});
        let spcWeapon = specialistWeapon.replace(/ *\([^)]*\) */g, "").split("+");
        spcWeapon.forEach((w) => {
          this.addPrintableWeaponEntry(w.trim());
        });
      }
      for(var i = 0; i<uniqueOpponents; i++) {
        this.enemyTablePrint.push({name: "Unique", numbers: i+1});
        this.addPrintableWeaponEntry(`*${i+1}:`);
        this.addPrintableWeaponEntry(`**${i+1}:`);
      }

      // formatted results
      result += ` (+${opponentData.numbers} numbers, ${opponentData.weapons} weapons) </div>`
      result += `<ul class='small'>`;
      result += `<li>${standardOpponents}x Standard: ${standardWeapon}</li>`;
      result += `<li>${specialists}x Specialists: ${specialistWeapon}</li>`;
      result += `<li>${lieutenant}x Lieutenants: ${standardWeapon}</li>`;
      result += `<li>${uniqueOpponents}x Unique Individuals (Pg. 105)</li>`;
      result += `</ul>`;

      result += `<div class='small fw-normal'>${pageNumber} <span class='fw-bold text-secondary'>${extraInfo}</span></div>`;

      this.tableResults[3].result = result;
    },
    addPrintableWeaponEntry(entry) {     
      entry = `${entry}`.replace(/ *\([^)]*\) */g, "");
      let weaponArray = this.enemyWeaponTablePrint;
      if (weaponArray.indexOf(entry) === -1) {
         weaponArray.push(entry);
      }
    },
    getSpecificEnemy(enemy) {
      let result = null;
      let enemyFound = false;

      result = this.$options.tables.tables.enemyencountercategory.tables.criminalelements.find(x => x.label.toLowerCase() == enemy.toLowerCase());
      if (result) {         
        this.opponent.data = JSON.parse(result.description);
        this.opponent.type = "Criminal Elements";
        this.opponent.name = enemy;
        enemyFound = true;
      } 

      if (!enemyFound) {
        result = this.$options.tables.tables.enemyencountercategory.tables.hiredmuscle.find(x => x.label.toLowerCase() == enemy.toLowerCase());
        if (result) {         
          this.opponent.data = JSON.parse(result.description);
          this.opponent.type = "Hired Muscle";
          this.opponent.name = enemy;
          enemyFound = true;
        } 
      }

      if (!enemyFound) {
      result = this.$options.tables.tables.enemyencountercategory.tables.interestedparties.find(x => x.label.toLowerCase() == enemy.toLowerCase());
        if (result) {         
          this.opponent.data = JSON.parse(result.description);
          this.opponent.type = "Interested Parties";
          this.opponent.name = enemy;
          enemyFound = true;
        } 
      }

      if (!enemyFound) {
        result = this.$options.tables.tables.enemyencountercategory.tables.rovingthreats.find(x => x.label.toLowerCase() == enemy.toLowerCase());
        if (result) {         
          this.opponent.data = JSON.parse(result.description);
          this.opponent.type = "Roving Threat";
          this.opponent.name = enemy;
          enemyFound = true;
        } 
      }

      if (!enemyFound) {
        this.$root.showUserMsg("No enemy found!", "error")
        return;
      }

      this.formatOpponentData();
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
