<template>
  <div>
    <h1>1. Travel (Pg.69)</h1>

    <div class="row row-cols-1 row-cols-md-3 rows-cols-lg-4 g-4"> 
      <div class="col">
        <div class="card">
          <div class="card-header bg-light border-success">
            <h5><button type="button" class="btn btn-link" @click="setActiveStep(fleeInvasion)">Flee Invasion (Pg.69)</button></h5>
          </div>          
        </div>
        <div class="col">
          <div class="card">
            <div class="card-header bg-light border-success">
              <h5><button type="button" class="btn btn-link" @click="setActiveStep(travelEvent)">Decide Whether To Travel (Pg.69)</button></h5>
            </div>         
          </div>
        </div>
      </div>

      <div class="col">
        <div v-if="activeStep" class="card">
          <h6>{{activeStep.title}} Results</h6>
          <div class="card-body" v-for="(input, index) in activeStep.inputs" :key="index">
            <div v-if="input.inputType == 2">
              <i class="fas fa-dice pe-auto d-print-none fa-2x" @click="activeStep.processInput(input, $event)"></i> Roll {{input.text}}
            </div>
            <div v-if="input.inputType == 4">
              <i class="fas fa-dice pe-auto d-print-none fa-2x" @click="activeStep.processInput(input, $event)"></i> Roll {{input.text}} 
            </div>   

            <div v-if="input.inputType == 3" class="input-group mb-3 input-group-sm">
              <span class="input-group-text" id="rivals-addon">{{input.text}}</span>
              <input type="number" class="form-control" placeholder="0" :aria-label="input.text" 
                min="0" v-model.number="input.input" />
            </div>
            <div v-if="input.inputType == 1" class="input-group mb-3 input-group-sm">
              <div class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox" value="" :aria-label="input.text" 
                  v-model="input.input" />
              </div>
              <span class="input-group-text" id="savvy-addon">WildGalaxy</span>
            </div>
          </div>
          <div class="card-header">
            <i class="fas fa-sync-alt pe-auto d-print-none fa-2x" @click="resolveActiveStep"></i> Get Final Result
          </div>
          <div class="card-body">            
            {{activeStep.results}}                      
          </div>
          <div class="card-footer">
            {{activeStep.breakdown}}
          </div>
        </div>
      </div>
    
    
    
      <div class="col">
        <div class="card">         
          <div class="card-header bg-light border-success">
            <h5>New World Arrival (Pg.72) <i class="fas fa-dice pe-auto d-print-none" @click="resolveNewWorld()"></i></h5>
          </div>
          <div class="card-body">
            <div class="input-group mb-3 input-group-sm">
              <span class="input-group-text" id="rivals-addon">Number of Rivals</span>
              <input type="number" class="form-control" placeholder="0" aria-label="rivals" aria-describedby="rivals-addon" 
                min="0" v-model.number="newWorld.rivalNum" />
            </div>
            <div class="input-group mb-3 input-group-sm">
              <div class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Wild Galaxy" 
                  v-model="newWorld.wildGalaxy" />
              </div>
              <span class="input-group-text" id="savvy-addon">WildGalaxy</span>
            </div>
            <p class="card-text" v-html="getNewWorldResult">              
            </p>
          </div>
        </div>
      </div>
    </div>      
</div>
   
</template>

<script>
import { FPFHTables } from '../js/tables.js';
import { FiveParsecsStepResult }  from '../js/fiveParsecs';
import { Step, SubStep } from "../js/fiveParsecsEnums";

export default {
  name: 'Travel',  
  components: {    
  },
  mounted() {   
  }, 
  data() {
    return {
      activeStep: null,
      fleeInvasion : new FiveParsecsStepResult(Step.Travel, SubStep.FleeInvasion),
      travelEvent : new FiveParsecsStepResult(Step.Travel, SubStep.DecideToTravel),
      newWorld : {
        hasRolled: false,
        result: "",
        rivalNum: 0,
        rivalsRolls: [],
        licenseRoll: 0,
        licenseCredits: 0,        
        wildGalaxy: false,
        traits: [], 
      },      
    }
  },  
  tables: new FPFHTables(),
  computed : {    
    username: function() {
      return this.$store.state.user.username;
    },  
    getTravelEventResult() {
      if (!this.travelEvent.hasRolled) {
        return "Waiting on roll..."
      }      
      return `${this.travelEvent.result} (Pg.70)`;
    },
    getNewWorldResult() {
      if (!this.newWorld.hasRolled) {
        return "Waiting on roll..."
      }  

      let result = "<div class='d-flex flex-column mt-3'><h6>1. Check for rivals</h6>";
      let rivalRolls = this.newWorld.rivalsRolls;
      if (rivalRolls.length > 0) {      
        for(let i=0;i<rivalRolls.length;i++){
          result+= `<div>Rival ${i+1} ${rivalRolls[i] >= 6 ? 'followed you!' : 'did not follow you.'}</div>`;
        }
      } else {
        result+= "<div>You have no rivals. Lucky you!</div>";
      }
      result += "</div>"

      result += "<div class='d-flex flex-column mt-3'><h6>2. Dismiss Patrons</h6><div>Dismiss all patrons that are not persistent.</div></div>";

      result += "<div class='d-flex flex-column mt-3'><h6>3. Check for licensing</h6><div>";      
      result+= `<div>World ${this.newWorld.licenseRoll >= 5 ? 'requires a license which costs ' + this.newWorld.licenseCredits + ' credits.' : 'does not require a license.'}</div>`;
      result += "</div>"

      result += "<div class='d-flex flex-column mt-3'><h6>4. World Traits</h6><ul>";
      this.newWorld.traits.forEach( (trait) => {
        result += `<li>${trait}</li>`;
      });
      result += "</ul></div>";

      return result;
    }
  },
  methods: {    
    rollDice(dice) {
      const roll = this.$options.tables.Roll(dice);
      this.$root.showUserMsg(`Rolled ${dice}`);
      
      return roll;
    }, 
    setActiveStep(step) {
      this.activeStep = step;
    },
    resolveActiveStep() {
      this.activeStep.processStep(this);
    },
    resolveFleeInvasion() {    
      this.fleeInvasion.getStepInput();   
      this.fleeInvasion.processStep(this);
    },

    resolveTravelEvent() {
      this.travelEvent.getStepInput();
      this.travelEvent.processStep(this);  
    },
    resolveNewWorld() {
      const dice = `1d6`;
      if (this.newWorld.rivalNum > 0) {
        this.newWorld.rivalsRolls = [];
        for(let i=1;i<=this.newWorld.rivalNum;i++)
        {
          this.newWorld.rivalsRolls.push(this.rollDice(dice));        
        }
      }
      this.newWorld.licenseRoll = this.rollDice(dice);    
      this.newWorld.licenseCredits = this.rollDice(dice);

      this.newWorld.traits = [];
      this.newWorld.traits.push(this.$options.tables.GetFullTableResult("newworldtraits"));
      if (this.newWorld.wildGalaxy) {
        this.newWorld.traits.push(this.$options.tables.GetFullTableResult("newworldtraits"));
      }
      
      this.newWorld.hasRolled = true;
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

  
  .fa-dice {
    -moz-transition: all .5s linear;
    -webkit-transition: all .5s linear;
    transition: all .5s linear;
  }
  .fa-dice.roll {
      -moz-transform:rotate(360deg);
      -webkit-transform:rotate(360deg);
      transform:rotate(360deg);
  }
</style>
