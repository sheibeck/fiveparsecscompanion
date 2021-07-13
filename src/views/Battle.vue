<template>
  <div>
    <h1 class="d-print-none">3. Battle (Pg.87)</h1>
    <h4 class="d-none d-print-block">Encounter Log</h4>
    <div class="d-flex flex-column flex-md-row d-print-none">
      <i class="fas fa-dice me-1 mt-1 d-print-none fa-2x text-center mb-2 mb-md-0" @click="readyForBattle()"></i>
      <div class="d-flex flex-column flex-md-row">
        <div class="input-group me-3 mb-1">
          <label class="input-group-text" for="battleType">Battle Type</label>
          <select class="form-select" aria-label="Battle Type" v-model="battleType" id="battleType" @change="triggerSetupChange()">
            <option v-for="btype in battleTypes" :key="btype" :value="btype" :selected="battleType===btype">{{btype}}</option>            
          </select>      
        </div>
                  
        <div class="input-group me-3 mb-1">
          <label class="input-group-text col-form-label-sm" for="crewSize">Cmpgn Crew Size</label>
          <select class="form-select" aria-label="Crew Size" v-model.number="crewSize" id="crewSize" @change="triggerSetupChange()">
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6" selected>6</option>
          </select> 
        </div>    

        <div class="input-group me-3 mb-1">
          <label class="input-group-text col-form-label-sm" for="numberOfCrew">No. of Crew</label>
          <select class="form-select" aria-label="Crew Size" v-model.number="numberOfCrew" id="numberOfCrew" @change="triggerSetupChange()">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6" selected>6</option>
          </select> 
        </div>    
     
        <div class="input-group me-3 mb-1">
          <label class="input-group-text" for="difficulty">Difficulty</label>        
          <select class="form-select" aria-label="Difficulty" v-model="difficulty" id="difficulty" @change="triggerSetupChange()">
            <option v-for="level in difficultyLevels" :key="level" :value="level" :selected="difficulty===level">{{level}}</option>            
          </select>      
        </div>

        <div class="input-group me-3 mb-1">
          <label class="input-group-text" for="adjustNumbers">Adjust Numbers</label>        
          <input type="number" class="form-control" aria-label="Adjust numbers" v-model.number="adjustNumbers" id="adjustNumbers" @change="triggerSetupChange()" />                      
        </div>

      </div>     
    </div>

    <div class="d-flex ms-0 ms-md-5 mt-1 flex-wrap">
      <div class="form-check">
        <input v-model="worldTrait.Dangerous" class="form-check-input" type="checkbox" id="dangerous" @change="triggerSetupChange()" />
        <label class="form-check-label small" for="dangerous">
          Dangerous
        </label>
      </div>
      <div class="form-check ms-2">
        <input v-model="worldTrait.HeavilyEnforced" class="form-check-input" type="checkbox" id="heavilyEnforced" @change="triggerSetupChange()" />
        <label class="form-check-label small" for="heavilyEnforced">
          Heavily enforced
        </label>
      </div>
      <div class="form-check ms-2">
        <input v-model="worldTrait.RampantCrime" class="form-check-input" type="checkbox" id="rampantCrime" @change="triggerSetupChange()" />
        <label class="form-check-label small" for="rampantCrime">
          Rampant crime
        </label>
      </div>
      <div class="form-check ms-2" v-if="battleType=='rival'">
        <input v-model="RivalHatred" class="form-check-input" type="checkbox" id="rival" @change="triggerSetupChange()" />
        <label class="form-check-label small" for="rival">
          Rival hates you
        </label>
      </div>
      <div class="form-check ms-2" v-if="this.battleType === 'quest'">
        <input v-model="QuestFinalBattle" class="form-check-input" type="checkbox" id="questFinalBattle" @change="triggerSetupChange()" />
        <label class="form-check-label small" for="questFinalBattle">
          Final quest battle
        </label>
      </div>
      <div class="d-print-none ms-2 pr-2 small">
        <label class="me-2">Specific Enemy</label>
        <input class="" type="text" ref="specificEnemy" @change="updateEnemy($event.target.value)" />        
      </div>
    </div>

    <div class="mt-5" v-if="!hasRolled">
      <h3>Waiting on roll ...</h3>
    </div>

    <div v-else class="row row-cols-1 mt-1 d-print-none">       
      <div class="col">
        <div class="card">
          <p class="card-text">
            <ul class="list-group">
              <li v-for="(item, idx) in tableResults" :key="item.key" class="d-flex flex-column flex-md-row list-group-item" :class="{'bg-light': idx%2 == 0}">
                <div class="col col-md-6">
                  <i class="fas fa-dice me-1 mt-1 d-print-none" @click="rollOnTable(item)"></i>                
                  <span class="h5">{{item.label}}</span>
                </div>
                <label class="" v-html="item.result"></label>                
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>  

    <div class="d-none d-print-block">
      <div class="d-flex justify-content-between">
        <div>
          <label>Deployment Conditions (Pg.88):</label>
          <div>{{tableResults[0].result}}</div>
        </div>
        <div>
          <label>Notable Sights (Pg.89)</label>
          <div>{{tableResults[1].result}}</div>
        </div>
        <div>
          <label>Mission Objective (Pg.89)</label>
          <div>{{tableResults[2].result}}</div>
        </div>
      </div>
      <div class="d-flex flex-column mt-2">
        <label>Enemies (Pg.92)</label>
        <div v-html="tableResults[3].result"></div>
      </div>
    </div>
    

    <div v-if="enemyTablePrint.length > 0" class=" d-md-flex d-print-flex">
      <div class="flex-fill">
        <h5 class="mt-3">Enemies 
          <button type="button" class="btn btn-secondary btn-sm mx-1 d-print-none" @click="print()">Print <i class="fas fa-print"></i></button>
        </h5>
        <div class="table-responsive">
          <table class="table table-responsive small">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name/Type</th>
                <th scope="col" style="text-align: center;">Number</th>
                <th scope="col" style="text-align: center;">Panic</th>
                <th scope="col" style="text-align: center;">Speed</th>
                <th scope="col" style="text-align: center;">Combat</th>
                <th scope="col" style="text-align: center;">Toughness</th>
                <th scope="col" style="text-align: center;">AI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,idx) in enemyTablePrint" :key="idx">
                <th scope="row">{{idx+1}}</th>
                <td>{{item.name}}</td>
                <td style="text-align: center;">{{item.numbers}}</td>
                <td style="text-align: center;">{{item.panic}}</td>
                <td style="text-align: center;">{{item.speed}}</td>
                <td style="text-align: center;">{{item.combat}}</td>
                <td style="text-align: center;">{{item.toughness}}</td>
                <td style="text-align: center;">{{item.ai}}</td>
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
                <th scope="col" class="">Name/Type</th>
                <th scope="col" style="text-align: center;">Range</th>
                <th scope="col" style="text-align: center;">Shots</th>
                <th scope="col" style="text-align: center;">Damage</th>
                <th scope="col">Traits</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,idx) in enemyWeaponTablePrint" :key="idx">
                <th scope="row">{{idx+1}}</th>
                <td>{{item.name}}</td>
                <td style="text-align: center;">{{item.range}}</td>
                <td style="text-align: center;">{{item.shots}}</td>   
                <td style="text-align: center;">{{item.damage}}</td>
                <td>{{item.traits}}</td>
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
  }, 
  data() {
    return {
      hasRolled: false,
      enemyTablePrint: [],      
      enemyWeaponTablePrint: [],
      adjustNumbers: 0,
      crewSize: 6,
      numberOfCrew: 6,
      battleTypes: [
        "patron",             
        "rival",
        "quest",
        "opportunity",
        "invasion",
      ],
      battleType: "patron",
      difficultyLevels: [
        "easy",             
        "normal",
        "challenging",
        "hardcore",
        "insanity",
      ],
      difficulty: "normal",
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
      },
      worldTrait: {
        Dangerous: false,
        HeavilyEnforced: false,
        RampantCrime: false,        
      },
      RivalHatred: false,
      QuestFinalBattle: false,
      opponentDataFormatSuccess: true,
      uniqueRoll: 0,
      bountyRoll: 0,
      roll1: 0,
      roll2: 0,
      enemyWeapons: {},
      specialistWeapons: {},
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
    triggerSetupChange: function() {
      if (this.hasRolled) {
        this.formatOpponentData();
      }
    },
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
        case "enemyencountercategory": {
          const specificEnemy = this.$refs.specificEnemy.value;
          this.specificEnemyError = false;

          if (specificEnemy) {
            this.getSpecificEnemy(specificEnemy);
          } else {
            this.getRandomOpponent(step);
          }
                  
          break;
        }
      }
    },
    rollDice(dice) {
      const roll = this.$options.tables.Roll(dice);      
      return roll;   
    },
    readyForBattle() {
      this.hasRolled = false;
      this.tableResults.forEach( (step) => {
        this.rollOnTable(step, true);
      });

      this.bountyRoll = this.rollDice("1d6");

      //roll numbers dice
      const dice = `1d6`;
      let roll1 = this.rollDice(dice);      
      let roll2 = this.rollDice(dice);
          
      const rerollNumberIfOne = this.battleType == "quest" ? true : false;

      if (rerollNumberIfOne) {
        if (roll1 == 1) roll1 = this.rollDice(dice);
        if (roll2 == 1) roll2 = this.rollDice(dice);
      }

      if (this.difficulty !== "easy" && this.difficulty !== "normal") {
        while (roll1 <= 2) {
          roll1 = this.rollDice(dice);
        }
        while (roll2 <= 2) {
          roll2 = this.rollDice(dice);
        }
      }

      this.roll1 = roll1;
      this.roll2 = roll2;

      //unique roll
      this.uniqueRoll = this.rollDice(`2d6`);

      //opponent weapons      
      this.enemyWeapons = this.$options.tables.GetFullTableResult("enemyweapons");
      this.specialistWeapons = this.$options.tables.GetFullTableResult("specialistweapons");

      //the dice have been cast!
      this.hasRolled = true;

      if (!this.specificEnemyError && this.opponentDataFormatSuccess) {
        this.$root.showUserMsg(`Readied for battle!`);
        this.formatOpponentData();
      }          
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
          if (rivalAttack == "Ambush") {
            this.numberOfCrew--;
          }
          break;
        }
        case "quest":
          result = step.tableResult[2];
          break;
      }     
      step.result = result;     
      if (!silent) {
        this.$root.showUserMsg(`Re-rolled Deployment Conditions`);
      }

      if (this.hasRolled) {
        this.formatOpponentData();
      }
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
      if (!silent) {
        this.$root.showUserMsg(`Re-rolled Notable Sights`);
      }

      if (this.hasRolled) {
        this.formatOpponentData();
      }
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
          if (this.QuestFinalBattle) {
            result = "Fight Off";
          }
          else {
            result = step.tableResult[2].result;
          }
          break;

        default:
          result = "Hold the field";
          break;
      }
     
      step.result = result;
      if (!silent) {
        this.$root.showUserMsg(`Re-rolled Mission Objective`);
      }

      if (this.hasRolled) {
        this.formatOpponentData();
      }
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

      if (this.hasRolled) {
        this.formatOpponentData();
      }

      if (!silent && this.opponentDataFormatSuccess) {
       this.$root.showUserMsg(`Determined Opponents`);
      }
    },
    formatOpponentData() {
      this.opponentDataFormatSuccess = true;
      this.enemyTablePrint = [];
      this.enemyWeaponTablePrint = [];
      
      let difficulty = "Normal";

      let result = "<div>"      
      let opponentData = this.opponent.data;
      let opponentType = this.opponent.type;
      let opponentName = this.opponent.name;
      let opponentNumber = opponentData.numbers;
      
      result += this.battleType !== "Invasion" ? `${opponentType}: ${opponentName}` : "Invasion!";

      let pageNumber = "";
      let extraInfo = "";
      let uniqueRollBonus = 0;
      
      switch(opponentType) {
        case "Criminal Elements": {
          pageNumber = "Pg.94";
          const bountyRoll = this.bountyRoll;
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
          break;
        }
        case "Roving Threats": {
          pageNumber = "Pg.101";
          extraInfo += ` This enemy never becomes a Rival.`
          break;
        }
      }
     
      //get the dice rolls for numbers rolled in the ReadyForBattle() method
      let roll1 = this.roll1;      
      let roll2 = this.roll2;     
      const maxRoll = Math.max(roll1,roll2);
      const minRoll = Math.min(roll1,roll2);

      //determine total opponents
      let totalOpponents = opponentNumber;
      let crewSize = this.crewSize;
      switch(crewSize) 
      {
        case 1:
        case 2:
        case 3:
        case 4:
          totalOpponents += minRoll;
          break;
        case 5:
          totalOpponents += roll1;
          break;
        default:
          totalOpponents += maxRoll;
          break;
      }

      if (this.QuestFinalBattle) {
        totalOpponents++;
      }

      const defenseOpponentIncrease = this.tableResults[2].result === "Defend";
      if (defenseOpponentIncrease) {
        totalOpponents++;
      }
     
      if (this.broughtFriends) {
        totalOpponents++;
      }

      if ( opponentType === 'Roving Threats' && this.worldTrait.Dangerous ) {
        totalOpponents++;
      }

      if (opponentType === 'Criminal Elements') {
        if (this.worldTrait.HeavilyEnforced) {
          totalOpponents--;
        }
        if (this.worldTrait.RampantCrime) {
          totalOpponents++;
        }
      }
      
      if ( (this.difficulty === "hardcore" || this.difficulty === "insanity")
        || (this.RivalHatred && this.battleType === "rival") ) 
      {
        totalOpponents++;
      }

      //add any final adjustments with the adjuster input
      totalOpponents += parseInt(this.adjustNumbers);          
      
      const smallEncounter = this.tableResults[0].result === "Small encounter";
      if (smallEncounter) {
        let reduceBy = 1;
        if (this.numberOfCrew < totalOpponents) {
          reduceBy = 2;
        }
        totalOpponents = totalOpponents - reduceBy;        
      }

      //make sure that specialists, lietenants and unique are determined AFTER
      // all number adjustments are made
 
      //determine specialists
      let specialists = 0;
      if (totalOpponents >= 3 && totalOpponents <=6) {
        specialists = 1;
      } 
      else if (totalOpponents >= 7) {
        specialists = 2;
      }

      if (this.difficulty === "insanity") {
        specialists++;
      }

      //determine lieutenants
      let lieutenant = 0;
      if (totalOpponents >= 4) {
        lieutenant = 1;        
      }
      

      //determine unique opponents
      let uniqueOpponents = 0;      
      if (this.difficulty === "insanity") {
        uniqueOpponents++;
        let rollUnique = this.rollDice(`2d6`);
        if (rollUnique >= 11) {
          uniqueOpponents++;
        }
      }
      else {
        if (opponentType !== "Roving Threats" ||  (opponentType !== "Roving Threats" && difficulty !== "insanity")) {       
          let rollUnique = this.uniqueRoll;
          
          if (this.difficulty === "hardcore" || this.difficulty === "insanity") {
            uniqueRollBonus++;
          }
          
          if (rollUnique + uniqueRollBonus >= 9) {
            uniqueOpponents++;
          }          
        }
      }


      //determine standard opponents
      let standardOpponents = totalOpponents - specialists - lieutenant;

      if (standardOpponents < 0) {        
        this.opponentDataFormatSuccess = false;
        this.$root.showUserMsg("Not enough standard enemies!", "error");        
      }

      if (this.difficulty === "easy" && totalOpponents >= 5 ) {
        standardOpponents--;
      }
      if (this.difficulty === "hardcore" || this.difficulty === "insanity") {
        standardOpponents++;
      }
            

      //get weapons            
      let standardWeapon = "";
      let specialistWeapon = "";
      if (opponentData.weapons.length > 2) {
          const customWeapon = opponentData.weapons.split(","); 
          standardWeapon = customWeapon[0];                 
          specialistWeapon = customWeapon[customWeapon.length-1];
      } else {
        const weapons = this.enemyWeapons;
        standardWeapon = weapons[opponentData.weapons[0]-1];
                      
        if (specialists > 0) {
          const specialistWeapons = this.specialistWeapons;
          const specialWeaponMapping = {
            A: 0,
            B: 1,
            C: 2,
          }
          specialistWeapon = `${specialistWeapons[specialWeaponMapping[opponentData.weapons[1]]]}`;          
        }
      }

      //set some printables      
      this.addPrintableEnemyEntry(opponentType, opponentName, opponentName, standardOpponents);    
      this.addPrintableWeaponEntry(standardWeapon);
      
      if (lieutenant > 0) {
        this.addPrintableEnemyEntry(opponentType, opponentName, `${opponentName} Lt.`, lieutenant, true);
        this.addPrintableWeaponEntry("Blade");
      }      
      if (specialists > 0) {        
        this.addPrintableEnemyEntry(opponentType, opponentName, `${opponentName} Spc.`, specialists);
        let spcWeapon = specialistWeapon.replace(/ *\([^)]*\) */g, "").split("+");
        spcWeapon.forEach((w) => {
          this.addPrintableWeaponEntry(w.trim());
        });
      }
      for(var i = 0; i<uniqueOpponents; i++) {        
        this.addPrintableEnemyEntry("Unique", "Unique", "Unique", 1, false);        
        this.addPrintableWeaponEntry(`*${i+1}:`);
        this.addPrintableWeaponEntry(`**${i+1}:`);
      }

      // formatted results
      const extraRoll = (crewSize !== 5) ? `Roll 2: ${roll2},` : "";      
      result += `<span class="small text-secondary"> (+${opponentData.numbers} numbers, ${opponentData.weapons} weapons, ${pageNumber})</span>`;
      result += `<div class="small">(Roll 1: ${roll1}, ${extraRoll} Difficulty: ${this.difficulty}${defenseOpponentIncrease ? ", +1 for Defend Objective " : ""})</div>`;
      result += `<ul class='small'>`;
      result += `<li>${standardOpponents}x Standard: ${standardWeapon}</li>`;
      result += `<li>${specialists}x Specialists: ${specialistWeapon}</li>`;
      result += `<li>${lieutenant}x Lieutenants: ${standardWeapon}</li>`;
      result += `<li>${uniqueOpponents}x Unique Individuals (Pg. 105)</li>`;
      result += `</ul>`;

      result += `<div class='small fw-normal'><span class='fw-bold text-secondary'>${extraInfo}</span></div>`;

      this.tableResults[3].result = result;
    },
    addPrintableEnemyEntry(type, name, label, numbers, isLieutenant) {
      let entry = {};
      if (type === "Unique") {
        entry = { numbers: 1, panic: "NA", speed: "", combat: "", toughness: "", ai: "", weapons: "" };
      }
      else {
        entry = this.getSpecificTableEntry("enemyencountercategory", name, type.replace(/\s/g,'').toLowerCase());
        const combat = parseInt(entry.combat);        
        if (isLieutenant) {
          if (!isNaN(combat)) {
            entry.combat = parseInt(entry.combat) + 1;
          }
          entry.panic = "NA";
        }
        //add some bling
        if (entry.speed) { 
          entry.speed = `${entry.speed}"`;
        }
        if (entry.combat) { 
          entry.combat = `+${entry.combat}`;
        }
      }
      //overwrite this with the exact number of units appearing in the battle
      entry.numbers = numbers;
      //add a proper label based on Lt., Specialist, etc
      entry.name = label;
      this.enemyTablePrint.push(entry);
    },
    addPrintableWeaponEntry(entry) {
      //TODO: if we find bonus damage in the name entry, add it to the damage listing for weapon
      const matches = `${entry}`.match(/(\w+)/g, "");
      entry = matches[0];
      let damageBonus = "0";
      if (matches.length > 1) {
        damageBonus = matches[matches.length-1];
      }      
      const entryList = entry.split("+");
      let weaponArray = this.enemyWeaponTablePrint;

      entryList.forEach( (item) => {
        entry = item.trim();
        
        //try to find the weapon entry in the weapon table
        const weaponStats = this.getSpecificTableEntry("weapons", entry);
        if (weaponStats) {
          entry = weaponStats;
        }
        else {
          //if we have special entries like claws/mandibles, etc
          if (entry.indexOf("*") === -1) {
            entry = { name: entry, range: "Brawl", shots: "-", damage: `+${damageBonus}`, traits: "Melee" };
          }
          else {
            //otherwise, we just want a blank entry
            entry = { name: entry, range: "", shots: "", damage: "", traits: "" };
          }
        }

        if (weaponArray.findIndex(e => e.name === entry.name) === -1) {
          weaponArray.push(entry);
        }
      });
    },    
    getSpecificTableEntry(key, label, subentry) {      
      const entry = this.$options.tables.tables[key].tables[subentry ?? "default"].find(w => w.label.toLowerCase() === label.toLowerCase());
      if (entry && entry.description) {
        return JSON.parse(entry.description);
      }
      else {
        return null;
      }
    },
    updateEnemy(enemy) {
      if (this.hasRolled) {
        this.getSpecificEnemy(enemy);
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
          this.opponent.type = "Roving Threats";
          this.opponent.name = enemy;
          enemyFound = true;
        } 
      }

      if (!enemyFound) {
        this.$root.showUserMsg("Invalid specific enemy!", "error")
        this.specificEnemyError = true;
        return;
      }

      if (this.hasRolled) {
        this.formatOpponentData();
      }
    },
    print() {
      window.print();
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
