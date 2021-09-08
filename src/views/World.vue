<template>
  <div>
    <h1>2. World (Pg.76)</h1>

    <div class="row row-cols-1 row-cols-md-3 rows-cols-lg-4 g-4"> 
      <div class="col">
        <div class="card" v-for="(step, index) in steps" :key="index">
          <div class="card-header bg-light border-success">
            <h5><button type="button" class="btn btn-link" @click="setActiveStep(steps[index])">{{step.stepDetails.title}} (Pg.{{step.stepDetails.pageNumber}})</button></h5>
          </div>
        </div>      
      </div>

     <div v-if="activeStep" class="col">
        <div class="card">
          <h6>{{activeStep.stepDetails.title}}</h6>
          <div class="card-body" v-for="(input, index) in activeStep.inputs" :key="index">
            <div v-if="input.inputType == stepInputType.Roll">
              <i class="fas fa-dice pe-auto d-print-none fa-2x" @click="activeStep.processInput(input, $event)"></i> {{input.text}}
            </div>
            <div v-if="input.inputType == stepInputType.TableResult">
              <i class="fas fa-dice pe-auto d-print-none fa-2x" @click="activeStep.processInput(input, $event)"></i> {{input.text}}
            </div>   

            <div v-if="input.inputType == stepInputType.Input" class="input-group input-group-sm">
              <span class="input-group-text" id="rivals-addon">{{input.text}}</span>
              <input type="number" class="form-control" placeholder="0" :aria-label="input.text" 
                min="0" v-model.number="input.value" />
            </div>
            <div v-if="input.inputType == stepInputType.YesNo" class="input-group input-group-sm">
              <div class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox" value="" :aria-label="input.text" 
                  v-model="input.value" />
              </div>
              <span class="input-group-text" id="savvy-addon">{{input.text}}</span>
            </div>
          </div>
          <hr />
          <div class="card-body" v-html="activeStep.results">
          </div>
          <div class="card-footer" v-html="activeStep.breakdown">
            
          </div>
        </div>
      </div> 
      <div v-else>
        <div class="card">
          <h6>Select a step.</h6>
        </div>
      </div>  
            

      <div class="col">
        <div class="card">
          <div class="card-header bg-light border-success">
            <h5>4. Assign Equipment</h5>
          </div>
          <div class="card-body">
            Assign equipment to your crew (Pg.85)            
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card">
          <div class="card-header bg-light border-success">
            <h5>
              5. Resolve Rumors
              <i class="fas fa-dice pe-auto d-print-none" @click="resolveAnyRumors()"></i>
            </h5>
          </div>
          <div class="card-body">

            <div class="input-group mb-3 input-group-sm">
              <span class="input-group-text" id="savvy-addon">Total Rumors (Pg.85)</span>
              <input type="number" class="form-control" placeholder="0" aria-label="savvy" aria-describedby="savvy-addon" 
                min="0" v-model.number="resolveRumors.totalRumors" />
            </div>           
            <label>{{getResolveRumorsResults}}</label>

          </div>
        </div>
      </div>

      <div class="col">
        <div class="card">
          <div class="card-header bg-light border-success">
            <h5>6. Choose Battle</h5>
          </div>
         
          <div class="accordion" id="accordianBattle">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingCheckRivals">
                <button class="accordion-button collapsed" type="headingRivals" data-bs-toggle="collapse" data-bs-target="#collapseRivals" aria-expanded="false" aria-controls="collapseRivals">                  
                  Check for Rivals (Pg.85)
                </button>
              </h2>
              <div id="collapseRivals" class="accordion-collapse collapse" aria-labelledby="headingRivals" data-bs-parent="#accordianBattle">
                <div class="accordion-body">
                  <div class="col d-flex flex-column">
                    <div class="mb-3 text-center">
                      <i class="fas fa-dice me-1 mt-1 d-print-none fa-2x" @click="checkForRivals()"></i>
                    </div>
                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="decoy-addon">Total decoys</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Decoys" aria-describedby="decoy-addon" 
                        min="0" v-model.number="checkRivals.totalDecoys" />                      
                    </div>

                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="totalrivals-addon">Total rivals</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Total Rivals" aria-describedby="totalrivals-addon" 
                        min="0" v-model.number="checkRivals.totalRivals" />                      
                    </div>

                    <label>{{getCheckForRivalsResults}}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
        </div>
      </div>


    </div>  
</div>
   
</template>

<script>
import { FPFHTables } from '../js/tables.js';
import { CampaignStepResult, StepInputType }  from '../js/fiveParsecs';
import { Step, SubStep } from "../js/fiveParsecsEnums";

export default {
  name: 'World',  
  components: {    
  },
  mounted() {    
  }, 
  data() {
    return {
      activeStep: null,
      steps: [
        new CampaignStepResult(Step.World, SubStep.UpkeepRepairs, this),
        new CampaignStepResult(Step.World, SubStep.AssignCrewTasksFindPatron, this),
        new CampaignStepResult(Step.World, SubStep.AssignCrewTasksTrain, this),
        new CampaignStepResult(Step.World, SubStep.AssignCrewTasksTrade, this),
        new CampaignStepResult(Step.World, SubStep.AssignCrewTasksRecruit, this),
        new CampaignStepResult(Step.World, SubStep.AssignCrewTasksExplore, this),
        new CampaignStepResult(Step.World, SubStep.AssignCrewTasksTrack, this),
        new CampaignStepResult(Step.World, SubStep.AssignCrewTasksRepair, this),
        new CampaignStepResult(Step.World, SubStep.AssignCrewTasksDecoy, this),
        new CampaignStepResult(Step.World, SubStep.JobOffers, this),
      ],
      stepInputType: StepInputType,

      jobOffer: [],      
      resolveRumors : {
        totalRumors: 0,
        roll: 0,
        hasRolled: false,
      },
      checkRivals : {
        totalRivals: 0,
        totalDecoys: 0,
        roll: 0,
        hasRolled: false,
      },
      worldTrait: {        
        TechnicalKnowledge: false,        
      },
      RepairBot: false,
      SpareParts: false
    }
  },  
  tables: new FPFHTables(),
  computed : {    
    username: function() {
      return this.$store.state.user.username;
    },        
    
    getResolveRumorsResults() {     
      if (!this.resolveRumors.hasRolled) {
        return "Waiting on roll..."
      }
      const roll = this.resolveRumors.roll;     
      
      let result = `Rolled ${roll}: `;
      if (roll <= this.resolveRumors.totalRumors) {
        result += "Quest Found!"; 
      }
      else {       
       result += "No quest found.";
      }       
      return result;
    },
    getCheckForRivalsResults() {     
      if (!this.checkRivals.hasRolled) {
        return "Waiting on roll..."
      }
      const roll = this.checkRivals.roll;
      const decoys = this.checkRivals.totalDecoys;
      const finalResult = roll + decoys;
      
      let result = `Rolled ${roll} (+ ${decoys} decoys): `;
      if (finalResult <= this.checkRivals.totalRivals) {
        result += "A rival has tracked you down!"; 
      }
      else {       
       result += "No rivals have found you.";
      }       
      return result;
    },
  },
  methods: {
    setActiveStep(step) {
      this.activeStep = step;     
    },
    resolveActiveStep() {
      this.activeStep.processStep(this);
    },
    rerollTable(table) {
      const roll = this.$options.tables.GetFullTableResult(table);
      let jobLine = this.jobOffer.find( o => o.id === table);     
      jobLine.result = roll[0];

      this.$root.showUserMsg(`Re-rolled ${table}`);
    },
    rollDice(dice) {
      const roll = this.$options.tables.Roll(dice);      
      this.$root.showUserMsg(`Rolled ${dice}`);
      return roll;   
    },
    rollOnDangerPay(rollBonus) {
      let dangerPayTable = this.$options.tables.tables.dangerpay.tables.default;
      const dangerRoll = this.rollDice("1d10")+(rollBonus ? rollBonus : 0);
      let result = null;
      switch(dangerRoll) {
        case 1:
        case 2:
        case 3:
        case 4:
          result = dangerPayTable[0];
          break;
        case 5:
        case 6:
        case 7:
        case 8:
          result = dangerPayTable[1];
          break;
        case 9:
          result = dangerPayTable[2];
          break;
        default:
          result = dangerPayTable[3];
      }             
      return result.label;   
    },
    rollOnTimeFrame(rollBonus) {
      let timeFrameTable = this.$options.tables.tables.timeframe.tables.default;
      const timeFrameRoll = this.rollDice("1d10")+(rollBonus ? rollBonus : 0);
      let result = null;
      switch(timeFrameRoll) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          result = timeFrameTable[0];
          break;        
        case 6:
        case 7:
          result = timeFrameTable[1];
          break;
        case 8:
        case 9:
          result = timeFrameTable[2];
          break;                      
        default:
          result = timeFrameTable[3];
      }             
      return result.label;   
    },
    
    
    resolveAnyRumors() {      
      const dice = `1d6`;

      const roll = this.rollDice(dice);
      this.resolveRumors.roll = roll;
      this.resolveRumors.hasRolled = true;
    },
    checkForRivals() {
      const dice = `1d6`;

      const roll = this.rollDice(dice);
      this.checkRivals.roll = roll;
      this.checkRivals.hasRolled = true;
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
